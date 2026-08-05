import { Building2 } from "lucide-react";

import { WaitlistForm } from "@/components/waitlist-form";
import { Mark, Micro, ShieldMark } from "@/components/slash/marks";
import { AccessRing, Meter, PhoneShot } from "@/components/slash/phone";
import { Reveal } from "@/components/slash/reveal";
import { AmbientWash, SiteFooter } from "@/components/slash/site-frame";
import { SiteHeader } from "@/components/slash/site-header";

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

/**
 * The three claims the page is built on. They sit in the hero, above the
 * fold, because they are the whole pitch — everything below only shows
 * what they look like in the app.
 */
const tenets = [
  "Spend less, on purpose.",
  "One honest number.",
  "It stops you, not just tracks you.",
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
    body: "Spend freely. Slash keeps a running count of what's left this week.",
    shot: "home-under" as const,
    alt: "The Slash home screen under the weekly cap, showing $28.00 of $75.00 spent.",
    meter: { state: "under" as const, pct: 37, size: 10 },
    reading: "37% OF CAP",
  },
  {
    eyebrow: "Halfway",
    headline: "Take a beat.",
    body: "Your apps pause. Wait sixty seconds to unlock for an hour. The delay is the point.",
    shot: "home-healthy" as const,
    alt: "The Slash home screen at the halfway mark, showing $47.00 of $75.00 spent.",
    meter: { state: "halfway" as const, pct: 63, size: 12 },
    reading: "63% OF CAP",
  },
  {
    eyebrow: "Over cap",
    headline: "You've hit your cap.",
    body: "No override. Your apps stay shielded until the week resets on Sunday.",
    shot: "home-over" as const,
    alt: "The Slash home screen over the weekly cap, showing $79.00 of $75.00 spent and apps paused.",
    meter: { state: "over" as const, pct: undefined, size: 14 },
    reading: "105% OF CAP",
  },
];

/* ── Page ───────────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <AmbientWash />

      <SiteHeader />

      {/* ── 1 · Hero ──────────────────────────────────────────────── */}
      <Section className="pb-20 pt-6 sm:pb-28 sm:pt-10">
        {/* The text column is wide enough to hold "Slash makes it hold." on
            one line at the headline's largest size; the phone is capped at
            its natural width, so the extra room costs it nothing. */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.16fr_0.84fr] lg:gap-8">
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
              {/* The deck, the tenets, and the form all share the form's
                  measure, so the left column reads as one stack. */}
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-ink-2 sm:text-[19px]">
                Slash watches what you spend on shopping and{" "}
                <span className="font-semibold text-foreground">
                  pauses the apps you picked
                </span>{" "}
                when you cross the line, right on your iPhone.
              </p>
            </Reveal>

            {/* The three claims, stated plainly. Each carries the app's own
                mark rather than a bullet, so the row reads as Slash talking. */}
            <Reveal delay={180}>
              <ul className="mt-7 max-w-md border-y border-rule">
                {tenets.map((tenet) => (
                  <li
                    key={tenet}
                    className="flex items-center gap-3.5 border-t border-rule py-3.5 first:border-t-0"
                  >
                    <Mark size={16} />
                    <span className="font-display text-[16.5px] font-semibold tracking-tight sm:text-[17.5px]">
                      {tenet}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={240} id="waitlist" className="mt-7">
              <WaitlistForm />
            </Reveal>

            <Reveal delay={300}>
              <p className="slash-mono text-[11px] tracking-[0.12em] text-ink-3">
                IPHONE · IOS 17+ · LAUNCHING SOON
              </p>
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

      {/* ── 2 · The mechanic: one hue, three states ───────────────── */}
      <Section className="py-16 sm:py-20">
        <SectionHead
          eyebrow="The mechanic"
          title="One meter. Three states."
          body="Set a cap, link your bank through Plaid, pick the apps to shield. From there it is one bar filling toward the line: dim while there's room, solid past halfway, hatched past the cap. Slash never swaps in a warning color."
          centered
        />

        {/* The motif and the shipping screen it comes from, side by side in
            each column: the meter is drawn to the app's own ruleset. */}
        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {states.map((s, i) => (
            <Reveal
              key={s.headline}
              delay={i * 90}
              className="flex flex-col items-center text-center"
            >
              <div className="w-full max-w-[228px]">
                <PhoneShot shot={s.shot} width={228} alt={s.alt} />

                <div className="mt-6 flex items-baseline justify-between gap-3">
                  <Micro className="text-[10px] text-ink-3">{s.eyebrow}</Micro>
                  <span className="slash-mono text-[10.5px] tracking-[0.1em] text-ink-3">
                    {s.reading}
                  </span>
                </div>
                <Meter
                  className="mt-2.5"
                  state={s.meter.state}
                  pct={s.meter.pct}
                  size={s.meter.size}
                />
              </div>

              <h3 className="slash-head mt-6 text-[21px]">{s.headline}</h3>
              <p className="mt-2.5 max-w-[32ch] text-[14px] leading-relaxed text-ink-2">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── 3 · What's inside ────────────────────────────────────── */}
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
              Every shopping charge lands in Slash within minutes, so the number
              you see is the number you have left.
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
              Link your account through Plaid, the same connector your other
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

        {/* The whole trust story, in one line. */}
        <Reveal delay={220}>
          <p className="mx-auto mt-8 max-w-[70ch] text-center text-[14px] leading-relaxed text-ink-3">
            Slash makes money from a subscription, not from you: no ads, no data
            selling, no tracking, and everything deletable from Settings. Read
            the full{" "}
            <a
              href="/privacy"
              className="text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent"
            >
              Privacy Policy
            </a>
            .
          </p>
        </Reveal>
      </Section>

      {/* ── 4 · Closing CTA ──────────────────────────────────────── */}
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

      <SiteFooter />
    </main>
  );
}
