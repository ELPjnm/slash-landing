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
import { Mark, Micro, Serif, ShieldSoft } from "@/components/slash/marks";
import {
  HomeScreen,
  Phone,
  ShieldScreen,
  SpendBar,
  StreakRing,
} from "@/components/slash/phone";
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
      className={`relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 ${
        className ?? ""
      }`}
    >
      {children}
    </section>
  );
}

function SectionHead({
  eyebrow,
  eyebrowTone = "text-accent",
  title,
  body,
  centered,
}: {
  eyebrow: string;
  eyebrowTone?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : undefined}>
      <Micro className={eyebrowTone}>{eyebrow}</Micro>
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

/* ── Page ───────────────────────────────────────────────────────────── */

const steps = [
  {
    n: "01",
    title: "Set your weekly limit",
    body: "Pick what you're allowed to spend on shopping this week. Locked once set — no cheating mid-week.",
  },
  {
    n: "02",
    title: "Connect your bank",
    body: "Securely through Plaid. Slash watches your shopping transactions — that's all it reads.",
  },
  {
    n: "03",
    title: "Cross the line, apps lock",
    body: "Go over and Slash shields the apps you picked using Apple Screen Time. On your phone, by your rules.",
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

const tiers = [
  {
    tag: "Under · 0–50%",
    accent: "text-money",
    rail: "bg-money",
    ring: "border-money/25",
    headline: "All clear",
    title: "Everything's open",
    body: "Spend freely. Slash quietly tracks your shopping in the background and shows what's left.",
  },
  {
    tag: "Soft · 50%",
    accent: "text-amber",
    rail: "bg-amber",
    ring: "border-amber/25",
    headline: "Blocked, not trapped",
    title: "One-minute pause",
    body: "Your apps lock. Really want in? Wait 60 seconds, then unlock for one hour. The delay is the point.",
  },
  {
    tag: "Hard · 100%",
    accent: "text-coral",
    rail: "bg-coral",
    ring: "border-coral/25",
    headline: "The line",
    title: "Locked until Sunday",
    body: "Hit your limit and there's no override. Apps stay shielded until your week resets. The rule you set holds.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Ambient orbs — the app's purple/green wash, softly blurred. */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -left-40 -top-52 h-[620px] w-[620px] rounded-full bg-accent/[0.14] blur-[170px]" />
        <div className="absolute -right-48 top-[45%] h-[560px] w-[560px] rounded-full bg-primary/[0.16] blur-[170px]" />
        <div className="absolute -bottom-56 left-1/3 h-[520px] w-[520px] rounded-full bg-money/[0.06] blur-[180px]" />
      </div>

      {/* ── Nav ───────────────────────────────────────────────────── */}
      <header className="relative z-20">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-6 sm:py-6">
          <a href="/" className="flex items-center gap-2.5">
            <Mark size={30} />
            <span className="font-display text-[19px] font-bold tracking-tight">
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
              <span className="slash-micro inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-[10.5px] text-accent">
                The Spending Firewall
              </span>
            </Reveal>

            <Reveal delay={60}>
              <h1 className="slash-head mt-5 text-[clamp(38px,7vw,66px)]">
                Blocks your shopping apps{" "}
                <span className="gradient-text">when you overspend.</span>
              </h1>
            </Reveal>

            <Reveal delay={120}>
              <p className="mt-5 max-w-[38ch] text-[17px] leading-relaxed text-ink-2 sm:text-[19px]">
                Set a weekly limit. Connect your bank. Cross the line and Slash{" "}
                <span className="font-semibold text-foreground">
                  locks the apps you chose
                </span>{" "}
                — right on your iPhone.
              </p>
            </Reveal>

            <Reveal delay={180} id="waitlist" className="mt-7">
              <WaitlistForm />
            </Reveal>

            <Reveal delay={240}>
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-ink-3">
                {["No ads, ever", "Never sells your data", "iPhone · iOS 17+"].map(
                  (t) => (
                    <li key={t} className="inline-flex items-center gap-2">
                      <span className="h-1.5 w-1.5 flex-none rounded-full bg-money" />
                      {t}
                    </li>
                  )
                )}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={140} className="flex justify-center lg:justify-end">
            <Phone>
              <HomeScreen />
            </Phone>
          </Reveal>
        </div>
      </Section>

      {/* ── The problem — the italic serif moment ─────────────────── */}
      <Section className="py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Micro className="text-ink-3">Why it exists</Micro>
          <p className="slash-head mt-4 text-[clamp(26px,4.4vw,42px)] leading-[1.14]">
            We&rsquo;ve been trained to spend before we think.{" "}
            <Serif className="gradient-text text-[1.12em]">
              Slash puts a wall between the impulse and the tap.
            </Serif>
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
                  <span className="slash-num grid h-11 w-11 flex-none place-items-center rounded-md bg-[image:var(--gradient-purple)] text-[15px] text-background">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-[16.5px] font-bold tracking-tight">
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
            <Phone>
              <ShieldScreen tier="timeout" />
            </Phone>
          </Reveal>
        </div>
      </Section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <Section className="py-16 sm:py-20">
        <SectionHead
          eyebrow="What's inside"
          eyebrowTone="text-money"
          title="A tracker and a lock, in one app."
          body="Slash reads what you spend and acts on it. No manual logging, no dashboards to babysit."
          centered
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {/* Real-time spend tracking */}
          <Reveal className="slash-card-raised flex flex-col overflow-hidden p-6">
            <div className="relative flex justify-center py-4">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(52,240,181,0.12),transparent_65%)]" />
              <StreakRing
                value="$28"
                label="Remaining"
                size={132}
                progress={0.63}
                numerals="display"
              />
            </div>
            <h3 className="mt-5 font-display text-[18px] font-bold tracking-tight">
              Real-time spend tracking
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
              Every shopping charge lands in Slash within minutes. The ring shows
              exactly what&rsquo;s left before your apps start closing.
            </p>
            <div className="mt-6">
              <SpendBar pct={63} />
              <div className="slash-mono mt-2 flex justify-between text-[10.5px] text-ink-3">
                <span>$47 SPENT</span>
                <span>OF $75</span>
              </div>
            </div>
          </Reveal>

          {/* Screen Time blocking */}
          <Reveal delay={80} className="slash-card-raised flex flex-col overflow-hidden p-6">
            <div className="relative flex justify-center py-4">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(179,136,255,0.14),transparent_65%)]" />
              <div className="grid h-[132px] w-[132px] place-items-center rounded-full border border-rule bg-surface/60">
                <ShieldSoft size={76} className="text-accent" />
              </div>
            </div>
            <h3 className="mt-5 font-display text-[18px] font-bold tracking-tight">
              Blocking that actually holds
            </h3>
            <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
              Slash uses Apple Screen Time to shield the apps you picked. Soft
              caps buy you a pause; hard caps hold until the week resets.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Soft cap", "Hard cap", "Your picks only"].map((t) => (
                <span
                  key={t}
                  className="slash-mono rounded-full border border-rule bg-surface px-2.5 py-1 text-[10px] font-bold tracking-[0.06em] text-ink-2"
                >
                  {t.toUpperCase()}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Plaid */}
          <Reveal delay={160} className="slash-card-raised flex flex-col overflow-hidden p-6">
            <div className="relative flex justify-center py-4">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(122,79,255,0.16),transparent_65%)]" />
              <div className="grid h-[132px] w-[132px] place-items-center rounded-full border border-rule bg-surface/60">
                <Building2 className="h-[62px] w-[62px] text-accent" strokeWidth={1.25} />
              </div>
            </div>
            <h3 className="mt-5 font-display text-[18px] font-bold tracking-tight">
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
                  <span className="h-1.5 w-1.5 flex-none rounded-full bg-money" />
                  {label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── The escalation ───────────────────────────────────────── */}
      <Section className="py-16 sm:py-20">
        <SectionHead
          eyebrow="The mechanic"
          title="Friction when you need it. Not a cage."
          body="Slash escalates as you approach your limit — enough resistance to break the impulse, without locking you out of your own life."
          centered
        />

        <Reveal delay={80} className="mx-auto mt-10 max-w-3xl">
          <div className="h-2.5 overflow-hidden rounded-full bg-surface-2">
            <div className="h-full w-full bg-[linear-gradient(90deg,#34f0b5_0%,#34f0b5_32%,#ffc34a_56%,#ff5c8a_100%)]" />
          </div>
          <div className="slash-mono mt-2.5 flex justify-between text-[10.5px] text-ink-3">
            <span>$0</span>
            <span className="text-amber">50% · SOFT</span>
            <span className="text-coral">100% · HARD</span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal
              key={t.tag}
              delay={i * 80}
              className={`relative overflow-hidden rounded-xl border ${t.ring} bg-[image:var(--gradient-card)] p-6`}
            >
              <div className={`absolute inset-x-0 top-0 h-[3px] ${t.rail}`} />
              <Micro className={t.accent}>{t.tag}</Micro>
              <div
                className={`slash-head mt-2.5 text-[26px] ${t.accent}`}
              >
                {t.headline}
              </div>
              <h3 className="mt-4 font-display text-[16.5px] font-bold tracking-tight">
                {t.title}
              </h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
                {t.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ── The payoff ───────────────────────────────────────────── */}
      <Section className="py-16 sm:py-20">
        <Reveal className="slash-card-raised relative overflow-hidden px-6 py-14 text-center sm:px-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(52,240,181,0.16),transparent_65%)]" />
          <div className="relative">
            <Micro className="text-money">The payoff · your vault</Micro>
            <div className="slash-num mt-5 text-[clamp(56px,11vw,110px)] text-money">
              $1,240
            </div>
            <p className="mx-auto mt-5 max-w-[46ch] text-[16px] leading-relaxed text-ink-2 sm:text-[17px]">
              Every impulse you skip adds up. Slash keeps a running total of what
              saying <Serif className="text-foreground">&ldquo;no&rdquo;</Serif>{" "}
              has saved you.
            </p>
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
              <Serif className="gradient-text text-[1.1em]">
                isn&rsquo;t mining you.
              </Serif>
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
                  <span className="mb-3.5 grid h-10 w-10 place-items-center rounded-sm bg-accent/10">
                    <Icon className="h-[18px] w-[18px] text-accent" />
                  </span>
                  <h3 className="font-display text-[15px] font-bold tracking-tight">
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
            <p className="slash-mono mt-2 text-[11px] tracking-[0.06em] text-ink-3">
              IPHONE · IOS 17+ · $2.99/MO · LAUNCHING SOON
            </p>
          </div>
        </Reveal>
      </Section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-rule">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-5 py-9 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2.5">
            <Mark size={22} />
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
