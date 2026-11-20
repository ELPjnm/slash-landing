#!/usr/bin/env bash
# Launch, check, query and tear down a local slash-landing for verification.
# The database is never hosted: static runs point the Supabase variables at a
# dead local address, waitlist runs at a throwaway local stack. See ../SKILL.md.
#
#   verify.sh launch [--waitlist]   start `npm run dev`; with --waitlist also a local Supabase + the two SQL files
#   verify.sh doctor [--waitlist]   read-only: is this instance ours and worth driving?
#   verify.sh shots <route> <slug>  open the route, screenshot + aria snapshot at desktop and phone width
#   verify.sh ref '<role> "<name>"' current chrome-devtools-axi uid for that node
#   verify.sh sql '<query>' [name]  read-only query on the local waitlist database; with a name, saves to $VERIFY_EVIDENCE/<name>.txt
#   verify.sh cleanup               stop what launch started (dev server by pgid, local Supabase stack); keeps the evidence
#
# Env: VERIFY_STATE     scratch dir (dev pgid, env, Supabase workdir); default $TMPDIR/verify-slash-landing; cleanup deletes it
#      VERIFY_EVIDENCE  where proof goes; never removed by cleanup (required for `shots` and `sql <q> <name>`)
#      VERIFY_PORT      dev server port; default 3200
#      CHROME_DEVTOOLS_AXI_SESSION  set it (e.g. verify-sl) so the browser is ours alone
#      SUPABASE_BIN_DIR directory holding a `supabase` binary, prepended to PATH for this script only
set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd -P)"
STATE="${VERIFY_STATE:-${TMPDIR:-/tmp}/verify-slash-landing}"
PORT="${VERIFY_PORT:-3200}"
SBDIR="$STATE/supabase-workdir"
API=http://127.0.0.1:54721
DB_URL='postgresql://postgres:postgres@127.0.0.1:54722/postgres'
# A port nothing listens on: a static run's waitlist submit fails fast and goes nowhere.
DEAD=http://127.0.0.1:9
[ -z "${SUPABASE_BIN_DIR:-}" ] || export PATH="$SUPABASE_BIN_DIR:$PATH"

die() { echo "❌ $*" >&2; exit 1; }
ok() { echo "✅ $*"; }

real_path() {
  local d="$1" rest=''
  until [ -d "$d" ]; do rest="/$(basename "$d")$rest"; d="$(dirname "$d")"; done
  printf '%s%s' "$(cd "$d" && pwd -P)" "$rest"
}

evidence_outside_state_and_repo() {
  [ -n "${VERIFY_EVIDENCE:-}" ] || return 0
  local s e r
  s="$(real_path "$STATE")"; e="$(real_path "$VERIFY_EVIDENCE")"; r="$REPO"
  case "$e/" in "$s"/*) die "VERIFY_EVIDENCE ($VERIFY_EVIDENCE) is inside VERIFY_STATE ($STATE), which cleanup deletes; move it outside" ;; esac
  case "$e/" in "$r"/*) die "VERIFY_EVIDENCE ($VERIFY_EVIDENCE) is inside the repo; keep proof outside the worktree" ;; esac
}

# The dev server reads the repo's own env files unless the process env overrides
# them. launch always overrides, but a stray file is still a reason to stop: never
# read one, just refuse.
refuse_repo_env_files() {
  local f
  f="$(find "$REPO" -maxdepth 1 -type f -name '.env*' ! -name '.env.example' | head -1)"
  [ -z "$f" ] || die "the worktree has an env file ($(basename "$f")); remove it or use a clean worktree. This skill never reads it."
}

anon_key() {
  # The local stack's well-known demo anon JWT (public in Supabase's docs), derived rather than read from any env file.
  node -e '
const c = require("crypto"), b = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
const h = b({ alg: "HS256", typ: "JWT" }), p = b({ iss: "supabase-demo", role: "anon", exp: 1983812996 });
console.log(h + "." + p + "." + c.createHmac("sha256", "super-secret-jwt-token-with-at-least-32-characters-long").update(h + "." + p).digest("base64url"));'
}

pgid() { cat "$STATE/dev.pgid" 2>/dev/null || true; }

# Local-address gate shared by launch and doctor: exit non-zero unless the URL host is loopback.
is_local_url() { case "$1" in http://127.0.0.1:*|http://localhost:*|http://\[::1\]:*) return 0 ;; *) return 1 ;; esac; }

stack_up() {
  command -v supabase >/dev/null || die 'Supabase CLI not on PATH. Without installing system-wide: npm install --prefix <dir outside repo> supabase@2, then SUPABASE_BIN_DIR=<dir>/node_modules/.bin'
  docker info >/dev/null 2>&1 || die 'Docker is not running (Colima: colima status / colima start).'
  command -v psql >/dev/null || die 'psql not on PATH.'
  mkdir -p "$SBDIR"
  supabase init --workdir "$SBDIR" --force --with-vscode-settings=false --with-intellij-settings=false >/dev/null 2>&1
  # Own project id and 547xx ports, so this stack coexists with other repos' default 543xx stacks.
  sed -i '' -e 's/^project_id = .*/project_id = "verify-slash-landing"/' \
    -e 's/^port = 54321/port = 54721/' -e 's/^port = 54322/port = 54722/' -e 's/^shadow_port = 54320/shadow_port = 54720/' \
    -e 's/^port = 54323/port = 54723/' -e 's/^port = 54324/port = 54724/' -e 's/^port = 54327/port = 54727/' -e 's/^port = 54329/port = 54729/' \
    "$SBDIR/supabase/config.toml"
  echo '… supabase start (database + PostgREST + Kong only)'
  # The waitlist needs only Postgres and the REST API; the rest of the stack is dead weight.
  supabase start --workdir "$SBDIR" -x gotrue,realtime,storage-api,imgproxy,mailpit,edge-runtime,logflare,vector,supavisor,studio,postgres-meta >"$STATE/supabase-start.log" 2>&1 \
    || die "supabase start failed; see $STATE/supabase-start.log"
  touch "$STATE/stack.started"
  local f
  for f in 001-create-waitlist-table 002-add-waitlist-rls-policies; do
    psql "$DB_URL" -v ON_ERROR_STOP=1 -q -f "$REPO/scripts/$f.sql" >>"$STATE/supabase-start.log" 2>&1 || die "applying scripts/$f.sql failed; see $STATE/supabase-start.log"
  done
  ok 'local Supabase up, scripts/001 and scripts/002 applied'
}

start_dev() {
  local url="$1" key="$2" i
  : >"$STATE/dev.log"
  printf 'NEXT_PUBLIC_SUPABASE_URL=%s\n' "$url" >"$STATE/dev.env"
  echo "… npm run dev on 127.0.0.1:$PORT (own process group), Supabase URL $url"
  # exec via perl setpgrp: the backgrounded pid IS the new group leader, so pgid == $!.
  # env overrides any env file Next would otherwise load; both variables are always set.
  (cd "$REPO" && exec env NEXT_PUBLIC_SUPABASE_URL="$url" NEXT_PUBLIC_SUPABASE_ANON_KEY="$key" NEXT_TELEMETRY_DISABLED=1 \
    perl -e 'setpgrp(0,0); exec @ARGV' -- npm run dev -- --port "$PORT" --hostname 127.0.0.1) >"$STATE/dev.log" 2>&1 </dev/null &
  echo $! >"$STATE/dev.pgid"
  for i in $(seq 1 120); do
    curl -fsS "http://127.0.0.1:$PORT/" 2>/dev/null | grep -q 'The Spending Firewall' && { ok "/ renders at http://127.0.0.1:$PORT/"; return; }
    kill -0 "$(pgid)" 2>/dev/null || break
    sleep 1
  done
  die "/ did not render; see $STATE/dev.log"
}

cmd_launch() {
  local waitlist=0 url key
  [ "${1:-}" != --waitlist ] || waitlist=1
  mkdir -p "$STATE"
  evidence_outside_state_and_repo
  refuse_repo_env_files
  [ -d "$REPO/node_modules" ] || die 'run npm ci in the repo first'
  if lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; then die "port $PORT is already in use by something that is not ours; set VERIFY_PORT to a free one"; fi
  if [ "$waitlist" = 1 ]; then
    stack_up; url="$API"; key="$(anon_key)"
  else
    url="$DEAD"; key=static-run-no-database
  fi
  is_local_url "$url" || die "refusing to start: Supabase URL $url is not a local address"
  start_dev "$url" "$key"
  [ "$waitlist" = 1 ] && echo "mode=waitlist" >"$STATE/mode" || echo "mode=static" >"$STATE/mode"
  ok "ready ($(cat "$STATE/mode"))"
}

cmd_doctor() {
  local waitlist=0 g listener url n=0
  [ "${1:-}" != --waitlist ] || waitlist=1
  [ -f "$STATE/dev.pgid" ] || die "no dev.pgid in $STATE; run launch first"
  g="$(pgid)"
  kill -0 "$g" 2>/dev/null && ok "dev server process group $g is alive" || die "dev server $g is dead; see $STATE/dev.log"
  listener="$(lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t 2>/dev/null | head -1)"
  [ -n "$listener" ] || die "nothing listens on port $PORT"
  [ "$(ps -o pgid= -p "$listener" | tr -d ' ')" = "$g" ] && ok "port $PORT is ours (listener pid $listener is in group $g)" || die "port $PORT is held by pid $listener, which is not in our process group"
  [ -z "$(find "$REPO" -maxdepth 1 -type f -name '.env*' ! -name '.env.example' | head -1)" ] && ok 'no env file in the worktree' || die 'the worktree has an env file'
  url="$(sed -n 's/^NEXT_PUBLIC_SUPABASE_URL=//p' "$STATE/dev.env")"
  is_local_url "$url" && ok "Supabase URL the dev server uses is local: $url" || die "Supabase URL $url is not local; stop"
  curl -fsS "http://127.0.0.1:$PORT/" | grep -q 'The Spending Firewall' && ok '/ renders' || die '/ does not render'
  for n in about support privacy terms glba-privacy confirmed; do
    [ "$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:$PORT/$n")" = 200 ] || die "/$n did not answer 200"
  done
  ok 'all seven routes answer 200'
  if [ "$waitlist" = 1 ]; then
    [ "$url" = "$API" ] || die "waitlist journey refused: the dev server's Supabase URL is $url, not the local stack $API"
    docker ps --format '{{.Names}}' | grep -qx supabase_rest_verify-slash-landing || die 'local PostgREST container is not running'
    [ "$(psql "$DB_URL" -Atc "select count(*) from pg_policies where tablename='waitlist' and cmd='INSERT'")" = 1 ] || die 'waitlist table or its INSERT policy is missing; scripts/001 and 002 not applied'
    ok 'local waitlist table has its RLS insert policy; the waitlist journey is allowed'
  else
    echo 'ℹ️  static run: the waitlist journey is refused (doctor --waitlist needs a local stack launched with --waitlist)'
  fi
}

cmd_shots() {
  local route="${1:?route}" slug="${2:?slug}" w spec h
  [ -n "${VERIFY_EVIDENCE:-}" ] || die 'set VERIFY_EVIDENCE'
  evidence_outside_state_and_repo; mkdir -p "$VERIFY_EVIDENCE"
  chrome-devtools-axi open "http://127.0.0.1:$PORT$route" >/dev/null
  for w in desktop:1280 phone:390; do
    spec="${w#*:}x900x1"; [ "${w%%:*}" = phone ] && spec="$spec,mobile,touch"
    chrome-devtools-axi emulate --viewport "$spec" >/dev/null
    chrome-devtools-axi wait 1500 >/dev/null
    # Reveals fire on scroll position: scroll through once so nothing is left hidden.
    chrome-devtools-axi eval 'async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); return 1; }' >/dev/null
    # --full-page stitches unreliably (repeats or drops the top). Instead make the viewport as tall as the document and take a plain capture.
    h="$(chrome-devtools-axi eval '() => document.documentElement.scrollHeight' | sed -n 's/^result: *//p' | tr -dc 0-9)"
    chrome-devtools-axi emulate --viewport "${w#*:}x${h:-900}x1$([ "${w%%:*}" = phone ] && echo ',mobile,touch')" >/dev/null
    chrome-devtools-axi wait 1500 >/dev/null  # let lazy images decode before the capture
    chrome-devtools-axi screenshot "$VERIFY_EVIDENCE/$slug-${w%%:*}.png" >/dev/null
    chrome-devtools-axi snapshot >"$VERIFY_EVIDENCE/$slug-${w%%:*}.aria.txt"
    echo "captured $slug-${w%%:*}.png (${w#*:}x${h:-?}) + .aria.txt"
  done
}

cmd_ref() {
  chrome-devtools-axi snapshot | grep -F -- "$1" | head -1 | sed -n 's/.*uid=\([A-Za-z0-9:_]*\).*/@\1/p' | head -1
}

cmd_sql() {
  [ "$(sed -n 's/^NEXT_PUBLIC_SUPABASE_URL=//p' "$STATE/dev.env" 2>/dev/null)" = "$API" ] || die 'no local waitlist stack for this run (launch --waitlist)'
  local out
  out="$(psql "$DB_URL" -X -c 'begin read only' -c "$1" 2>&1)" || die "$out"
  echo "$out"
  if [ -n "${2:-}" ]; then
    evidence_outside_state_and_repo; mkdir -p "$VERIFY_EVIDENCE"
    printf '%s\n' "$out" >"$VERIFY_EVIDENCE/$2.txt"
  fi
}

cmd_cleanup() {
  local g
  g="$(pgid)"
  if [ -n "$g" ] && kill -0 "$g" 2>/dev/null; then
    kill -TERM -- "-$g" 2>/dev/null || true
    for _ in 1 2 3 4 5; do kill -0 "$g" 2>/dev/null || break; sleep 1; done
    kill -KILL -- "-$g" 2>/dev/null || true
  fi
  if [ -f "$STATE/stack.started" ] && command -v supabase >/dev/null; then
    supabase stop --workdir "$SBDIR" --no-backup >/dev/null 2>&1 || true
  fi
  [ ! -d "$STATE" ] || rm -rf "$STATE"
  ok "cleaned: dev server group ${g:-none}, local stack, $STATE (evidence kept at ${VERIFY_EVIDENCE:-<unset>})"
}

case "${1:-}" in
  launch) shift; cmd_launch "$@" ;;
  doctor) shift; cmd_doctor "$@" ;;
  shots) shift; cmd_shots "$@" ;;
  ref) shift; cmd_ref "$@" ;;
  sql) shift; cmd_sql "$@" ;;
  cleanup) cmd_cleanup ;;
  *) sed -n '2,15p' "${BASH_SOURCE[0]}"; exit 2 ;;
esac
