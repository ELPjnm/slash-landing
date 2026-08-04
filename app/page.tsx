import {
  Ban,
  Building2,
  EyeOff,
  Lock,
  Smartphone,
  Trash2,
  UserCheck,
} from "lucide-react";

import { WaitlistForm } from "@/components/waitlist-form";
import { Mark, Micro, ShieldMark } from "@/components/slash/marks";
import { AccessRing, Meter, PhoneShot } from "@/components/slash/phone";
import { Reveal } from "@/components/slash/reveal";

/* ── Section chrome ─────────────────────────────────────────────────── */

function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative z-10 mx-auto w-full max-w-6xl px-6 ${
        className ?? ""
      }`}
    >
      {children}
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  body,
  centered,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : undefined}>
      <Micro className="text-accent">{eyebrow}</Micro>
      <h2 className="slash-head mt-3 text-[clamp(28px,4.6vw,44px)]">{title}</h2>
      {body && (
        <p
          className={`mt-4 text-[16px] leading-relaxed text-ink-2 sm:text-[17px] ${
            centered ? "mx-auto max-w-[58ch]" : "max-w-[58ch]"
          }`}
        >
          {body}
        </p>
      )}
    </Reveal>
  );
}

/* ── Page data ──────────────────────────────────────────────────────── */

const steps = [
  {
    n: "01",
    title: "Set your weekly cap",
    body: "Pick what you're allowed to spend on shopping this week. Locked once set — no cheating mid-week.",
  },
  {
    n: "02",
    title: "Connect your bank",
    body: "Securely through Plaid. Slash watches your shopping transactions — that's all it reads.",
  },
  {
    n: "03",
    title: "Cross the cap, apps pause",
    body: "Go over and Slash shields the apps you picked using Apple Screen Time. On your phone, by your rules.",
  },
];

/**
 * The three states of the meter. One hue throughout: the escalation is
 * carried by fill length and by the breach furniture, never by a hue swap,
 * exactly as the app draws it.
 */
const states = [
  {
    eyebrow: "Under cap",
    headline: "Nothing in the way.",
    body: "Spend freely. Slash sits quietly in the background and keeps a running count of what's left this week.",
    shot: "home-under" as const,
    alt: "The Slash home screen under the weekly cap, showing $28.00 of $75.00 spent.",
    meter: { state: "under" as const, pct: 37 },
    reading: "37% OF CAP",
  },
  {
    eyebrow: "Halfway",
    headline: "Take a beat.",
    body: "Past the halfway mark your apps pause. Really want in? Wait sixty seconds, then unlock for one hour. The delay is the point.",
    shot: "home-healthy" as const,
    alt: "The Slash home screen at the halfway mark, showing $47.00 of $75.00 spent.",
    meter: { state: "halfway" as const, pct: 63 },
    reading: "63% OF CAP",
  },
  {
    eyebrow: "Over cap",
    headline: "You've hit your cap.",
    body: "There is no override past the cap. Your apps stay shielded until the week resets on Sunday. The rule you set holds.",
    shot: "home-over" as const,
    alt: "The Slash home screen over the weekly cap, showing $79.00 of $75.00 spent and apps paused.",
    meter: { state: "over" as const },
    reading: "105% OF CAP",
  },
];

const guarantees = [
  {
    icon: Ban,
    title: "No ads, no selling",
    body: "We never sell or rent your data, and there are no advertising or analytics SDKs in the app.",
  },
  {
    icon: Lock,
    title: "Bank-grade encryption",
    body: "Bank access tokens are encrypted at rest (AES-256) and never exposed to the app or any third party.",
  },
  {
    icon: EyeOff,
    title: "No tracking",
    body: "Slash doesn't track you across other apps or websites. It reads your shopping transactions and nothing else.",
  },
  {
    icon: Smartphone,
    title: "Choices stay on-device",
    body: "The apps you pick to block are chosen through Apple's system picker and never leave your phone.",
  },
  {
    icon: Trash2,
    title: "Delete anytime",
    body: "Wipe your account and every trace of your data instantly, right from Settings. No emails, no waiting.",
  },
  {
    icon: UserCheck,
    title: "Yours, not a guardian's",
    body: "Slash is self-monitoring — you watching your own spending. No parent, no boss, no one else involved.",
  },
];

/* ── Page ───────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Ambient wash — one hue, softly blurred. */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -left-40 -top-52 h-[620px] w-[620px] rounded-full bg-accent/[0.14] blur-[170px]" />
        <div className="absolute -right-48 top-[45%] h-[560px] w-[560px] rounded-full bg-accent-deep/[0.16] blur-[170px]" />
        <div className="absolute -bottom-56 left-1/3 h-[520px] w-[520px] rounded-full bg-accent/[0.07] blur-[180px]" />
      </div>

      {/* ── Nav ───────────────────────────────────────────────────── */}
      <header className="relative z-20">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:py-6">
          <a href="/" className="flex items-center gap-2.5">
            <Mark size={26} />
            <span className="font-display text-[19px] font-semibold tracking-tight">
              Slash
            </span>
          </a>
          <a
            href="#waitlist"
            className="rounded-full border border-rule-strong px-4 py-2 text-[13.5px] font-medium text-ink-2 transition-colors hover:border-accent hover:text-foreground"
          >
            Join the waitlist
          </a>
        </nav>
      </header>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <Section className="pb-16 pt-6 sm:pb-24 sm:pt-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div>
            <Reveal>
              <span className="slash-micro inline-block rounded-full border border-accent/30 bg-accent-soft px-3 py-1.5 text-[10.5px] text-accent">
                The Spending Firewall
              </span>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="slash-head mt-5 text-[clamp(38px,7vw,64px)]">
                Set a weekly cap.{" "}
                <span className="gradient-text sm:block">
                  Slash makes it hold.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-5 max-w-[40ch] text-[17px] leading-relaxed text-ink-2 sm:text-[19px]">
                Slash watches what you spend on shopping and{" "}
                <span className="font-semibold text-foreground">
                  pauses the apps you picked
                </span>{" "}
                when you cross the line, right on your iPhone.
              </p>
            </Reveal>

            <Reveal delay={180} id="waitlist" className="mt-7">
              <WaitlistForm />
            </Reveal>

            <Reveal delay={240}>
              <ul className="slash-mono flex flex-wrap gap-x-5 gap-y-2 text-[11px] tracking-[0.12em] text-ink-3">
                {["NO ADS, EVER", "NEVER SELLS YOUR DATA", "IPHONE · IOS 17+"].map(
                  (t) => (
                    <li key={t} className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                      {t}
                    </li>
                  )
                )}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={140} className="flex justify-center lg:justify-end">
            <PhoneShot
              shot="home-healthy"
              width={318}
              priority
              alt="The Slash home screen: $47.00 spent of a $75.00 weekly cap, with the spending meter just past halfway."
            />
          </Reveal>
        </div>
      </Section>

      {/* ── Why it exists ─────────────────────────────────────────── */}
      <Section className="py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Micro className="text-ink-3">Why it exists</Micro>
          <p className="slash-head mt-4 text-[clamp(26px,4.4vw,42px)]">
            We&rsquo;ve been trained to spend before we think.{" "}
            <span className="gradient-text">
              Slash puts a wall between the impulse and the tap.
            </span>
          </p>
        </Reveal>
      </Section>

      {/* ── How it works ─────────────────────────────────────────── */}
      <Section className="py-16 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead
              eyebrow="How it works"
              title="Three steps. Then it runs itself."
              body="No spreadsheets, no willpower streaks to protect. You set the rule once and Slash enforces it automatically."
            />
            <div className="mt-8 flex flex-col gap-3">
              {steps.map((s, i) => (
                <Reveal
                  key={s.n}
                  delay={i * 80}
                  className="slash-card flex items-start gap-4 p-5"
                >
                  <span className="slash-mono grid h-11 w-11 flex-none place-items-center rounded-md bg-[image:var(--gradient-accent)] text-[14px] font-semibold text-accent-ink">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-[16.5px] font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">
                      {s.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={120} className="flex justify-center lg:order-last">
            <PhoneShot
              shot="access-hard"
              width={310}
              alt="The Slash lock screen: “You've hit your cap.” $118.00 of $100.00 spent, apps return Sunday 12:00 AM."
            />
          </Reveal>
        </div>
      </Section>

      {/* ── The mechanic — one hue, three states ─────────────────── */}
      <Section className="py-16 sm:py-20">
        <SectionHead
          eyebrow="The mechanic"
          title="One meter. Three states."
          body="Slash never swaps in a warning color. It shows one bar filling toward your cap: dim while there's room, solid past halfway, hatched past the line."
          centered
        />

        {/* The motif itself, drawn to the app's ruleset. */}
        <Reveal delay={80} className="slash-card-raised mx-auto mt-12 max-w-3xl p-6 sm:p-8">
          <div className="flex flex-col gap-7">
            {states.map((s) => (
              <div key={s.eyebrow}>
                <div className="flex items-baseline justify-between gap-3">
                  <Micro className="text-[10px] text-ink-3">{s.eyebrow}</Micro>
                  <span className="slash-mono text-[10.5px] tracking-[0.1em] text-ink-3">
                    {s.reading}
                  </span>
                </div>
                <Meter
                  className="mt-3"
                  state={s.meter.state}
                  pct={s.meter.pct}
                  size={s.meter.state === "under" ? 10 : s.meter.state === "halfway" ? 13 : 15}
                />
              </div>
            ))}
          </div>
        </Reveal>

        {/* The same three states, in the shipping app. */}
        <div className="mt-14 grid gap-8 sm:grid-cols-3 sm:gap-5">
          {states.map((s, i) => (
            <Reveal key={s.headline} delay={i * 90} className="flex flex-col items-center text-center">
              <PhoneShot shot={s.shot} width={214} alt={s.alt} />
              <h3 className="slash-head mt-6 text-[21px]">{s.headline}</h3>
              <p className="mt-2.5 max-w-[34ch] text-[14px] leading-relaxed text-ink-2">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── The ritual ───────────────────────────────────────────── */}
      <Section className="py-16 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <Reveal className="flex justify-center gap-4 sm:gap-6">
            <PhoneShot
              shot="override-idle"
              width={240}
              className="sm:mt-8"
              alt="The Slash pause screen: “Take a beat.” with a one-minute pause ready to start."
            />
            {/* The second beat of the ritual. Dropped on the narrowest
                screens rather than shrinking both frames past legibility. */}
            <PhoneShot
              shot="override-counting"
              width={240}
              className="hidden sm:block"
              alt="The Slash pause screen counting down, with the option to stop the timer."
            />
          </Reveal>

          <div>
            <SectionHead
              eyebrow="One-minute pause · One-hour unlock"
              title="Blocked, not trapped."
              body="Past halfway, Slash asks for sixty seconds before it lets you back in. Long enough for the urge to pass, short enough that it never holds your life hostage. Past your cap, the pause is gone and the cap just holds."
            />
            <Reveal delay={120} className="mt-8 flex flex-wrap gap-2">
              {[
                "Wait 60 seconds",
                "Unlock for 1 hour",
                "No unlock past the cap",
              ].map((t) => (
                <span
                  key={t}
                  className="slash-mono rounded-full border border-accent/25 bg-accent-soft px-3 py-1.5 text-[10.5px] uppercase tracking-[0.12em] text-accent"
                >
                  {t}
                </span>
              ))}
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ── What's inside ────────────────────────────────────────── */}
      <Section className="py-16 sm:py-20">
        <SectionHead
          eyebrow="What's inside"
          title="A tracker and a lock, in one app."
          body="Slash reads what you spend and acts on it. No manual logging, no dashboards to babysit."
          centered
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {/* Real-time spend tracking */}
          <Reveal className="slash-card-raised flex flex-col overflow-hidden p-6">
            <div className="relative flex justify-center py-4">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(179,136,255,0.14),transparent_65%)]" />
              <AccessRing
                label="Spent this week"
                value="$47.00"
                caption="of $75.00"
                progress={0.63}
                size={148}
              />
            </div>
            <h3 className="mt-6 font-display text-[18px] font-semibold tracking-tight">
              Real-time spend tracking
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
              Every shopping charge lands in Slash within minutes. The ring
              shows exactly what&rsquo;s left before your apps start closing.
            </p>
            <div className="mt-6">
              <Meter state="halfway" pct={63} size={9} />
              <div className="slash-mono mt-2 flex justify-between text-[10.5px] tracking-[0.1em] text-ink-3">
                <span>63% OF CAP</span>
                <span>RESETS SUN</span>
              </div>
            </div>
          </Reveal>

          {/* Screen Time blocking */}
          <Reveal
            delay={80}
            className="slash-card-raised flex flex-col overflow-hidden p-6"
          >
            <div className="relative flex justify-center py-4">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(179,136,255,0.14),transparent_65%)]" />
              <div className="grid h-[148px] w-[148px] place-items-center rounded-full border border-rule bg-surface/60">
                <ShieldMark size={82} className="text-accent" />
              </div>
            </div>
            <h3 className="mt-6 font-display text-[18px] font-semibold tracking-tight">
              Blocking that actually holds
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
              Slash uses Apple Screen Time to shield the apps you picked. Past
              halfway you get a pause; past your cap it holds until the reset.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Halfway pause", "Hard cap", "Your picks only"].map((t) => (
                <span
                  key={t}
                  className="slash-mono rounded-full border border-rule bg-surface px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-ink-2"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Plaid */}
          <Reveal
            delay={160}
            className="slash-card-raised flex flex-col overflow-hidden p-6"
          >
            <div className="relative flex justify-center py-4">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(122,79,255,0.16),transparent_65%)]" />
              <div className="grid h-[148px] w-[148px] place-items-center rounded-full border border-rule bg-surface/60">
                <Building2
                  className="h-[70px] w-[70px] text-accent"
                  strokeWidth={1.25}
                />
              </div>
            </div>
            <h3 className="mt-6 font-display text-[18px] font-semibold tracking-tight">
              Bank connect via Plaid
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
              Link your account through Plaid — the same connector your other
              finance apps use. Slash gets read-only transactions, nothing more.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              {[
                "Read-only access",
                "No card numbers stored",
                "Revoke whenever",
              ].map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-[13px] text-ink-2"
                >
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  {label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── The payoff ───────────────────────────────────────────── */}
      <Section className="py-16 sm:py-20">
        <Reveal className="slash-card-raised relative overflow-hidden">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(179,136,255,0.18),transparent_65%)]" />
          <div className="relative grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <Micro className="text-accent">The payoff</Micro>
              <h2 className="slash-head mt-3 text-[clamp(28px,4.6vw,44px)]">
                Stop early and you keep the difference.
              </h2>
              <div className="slash-num mt-8 text-[clamp(56px,10vw,96px)] text-accent-strong">
                +$28.00
              </div>
              <p className="slash-mono mt-3 text-[11px] tracking-[0.14em] text-ink-3">
                ADDS TO LIFETIME SAVINGS SUNDAY AT THIS PACE
              </p>
              <p className="mt-6 max-w-[46ch] text-[16px] leading-relaxed text-ink-2 sm:text-[17px]">
                Whatever&rsquo;s left under your cap on Sunday is money you
                didn&rsquo;t spend. Slash banks it and keeps a running total, so
                every impulse you skip shows up somewhere.
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <PhoneShot
                shot="home-healthy-scrolled"
                width={276}
                alt="The Slash savings card: “STOP TODAY +$28.00 adds to lifetime savings Sunday at this pace.”"
              />
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ── Trust ────────────────────────────────────────────────── */}
      <Section className="py-16 sm:py-20">
        <SectionHead
          eyebrow="Built to be trusted with your money"
          title={
            <>
              A finance app that{" "}
              <span className="gradient-text">isn&rsquo;t mining you.</span>
            </>
          }
          body="Slash makes money from a subscription, not from you. Here's exactly what that means."
          centered
        />

        <div className="mt-12">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {guarantees.map((g, i) => {
              const Icon = g.icon;
              return (
                <Reveal
                  key={g.title}
                  delay={(i % 3) * 70}
                  className="slash-card p-5"
                >
                  <span className="mb-3.5 grid h-10 w-10 place-items-center rounded-sm bg-accent-soft">
                    <Icon className="h-[18px] w-[18px] text-accent" />
                  </span>
                  <h3 className="font-display text-[15px] font-semibold tracking-tight">
                    {g.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-2">
                    {g.body}
                  </p>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={120}>
            <p className="mt-7 text-center text-[14px] text-ink-3">
              Read the full{" "}
              <a
                href="/privacy"
                className="text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent"
              >
                Privacy Policy
              </a>{" "}
              — plain language, no surprises.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <Section className="pb-20 pt-6 sm:pb-28">
        <Reveal className="relative overflow-hidden rounded-2xl border border-rule-strong bg-[image:var(--gradient-card)] px-6 py-16 text-center sm:px-10">
          <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(122,79,255,0.30),transparent_65%)]" />
          <div className="relative flex flex-col items-center">
            <Mark size={44} />
            <h2 className="slash-head mt-6 text-[clamp(28px,4.8vw,46px)]">
              Put a firewall on your spending.
            </h2>
            <p className="mt-4 text-[16px] text-ink-2 sm:text-[17px]">
              Be first in line when Slash launches.
            </p>
            <div className="mt-8 flex w-full justify-center">
              <WaitlistForm />
            </div>
            <p className="slash-mono mt-2 text-[11px] tracking-[0.12em] text-ink-3">
              IPHONE · IOS 17+ · $2.99/MO · LAUNCHING SOON
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-9 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Mark size={20} />
            <p className="text-[13.5px] text-ink-3">
              © 2026 Slash. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              ["Privacy", "/privacy"],
              ["Terms", "/terms"],
              ["LinkedIn", "https://www.linkedin.com/company/the-slash-app/"],
              ["Contact", "mailto:navya@theslash.app"],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-[13.5px] text-ink-3 transition-colors hover:text-foreground"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
