"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { CursorTrail } from "@/components/cursor-trail";
import { WaitlistForm } from "@/components/waitlist-form";
import {
  Ban,
  Lock,
  EyeOff,
  Smartphone,
  Trash2,
  UserCheck,
  ShieldCheck,
  Clock,
} from "lucide-react";

/* ---------- Phone mockup primitives ---------- */

function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="w-[300px] rounded-[44px] p-3 border border-[#2c2c31] bg-gradient-to-b from-[#26262b] to-[#101014] shadow-[0_40px_90px_rgba(0,0,0,0.6),0_0_60px_rgba(99,102,241,0.12)]">
      <div
        className="relative h-[600px] overflow-hidden rounded-[34px] px-[18px] pb-6 pt-[18px]"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, #12131c 0%, #0a0a0f 60%)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function StatusBar({ right }: { right: string }) {
  return (
    <div className="mb-5 flex items-center justify-between text-[13px] text-gray-400">
      <span className="font-semibold text-white">9:41</span>
      <span>{right}</span>
    </div>
  );
}

function SpendRing({
  pct,
  color,
  label,
  value,
  of,
  glow,
}: {
  pct: number;
  color: string;
  label: string;
  value: string;
  of: string;
  glow: string;
}) {
  return (
    <div
      className="relative grid h-52 w-52 place-items-center rounded-full"
      style={{
        background: `conic-gradient(${color} 0 ${pct}%, #1f2937 ${pct}% 100%)`,
        boxShadow: `0 0 40px ${glow}`,
      }}
    >
      <div className="absolute inset-4 rounded-full bg-[#0a0a0f]" />
      <div className="relative text-center">
        <div className="text-[11px] uppercase tracking-[0.12em] text-gray-500">
          {label}
        </div>
        <div
          className="pb-0.5 text-[46px] font-bold leading-[1.18]"
          style={{ color }}
        >
          {value}
        </div>
        <div className="text-[13px] text-gray-400">{of}</div>
      </div>
    </div>
  );
}

function Transaction({
  logo,
  bg,
  name,
  meta,
  amount,
}: {
  logo: string;
  bg: string;
  name: string;
  meta: string;
  amount: string;
}) {
  return (
    <div className="flex items-center gap-3 border-t border-[#17171b] py-[11px]">
      <div
        className="grid h-[34px] w-[34px] place-items-center rounded-[9px] text-xs font-bold text-white"
        style={{ background: bg }}
      >
        {logo}
      </div>
      <div>
        <div className="text-sm font-medium text-white">{name}</div>
        <div className="text-[11.5px] text-gray-500">{meta}</div>
      </div>
      <div className="ml-auto text-sm font-semibold text-white">{amount}</div>
    </div>
  );
}

/* ---------- Section helpers ---------- */

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

/* ---------- Page ---------- */

export default function Home() {
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

  const steps = [
    {
      n: 1,
      title: "Set your weekly limit",
      body: "Pick what you're allowed to spend on shopping this week. Locked once set — no cheating mid-week.",
    },
    {
      n: 2,
      title: "Connect your bank",
      body: "Securely through Plaid. Slash watches your shopping transactions — that's all it reads.",
    },
    {
      n: 3,
      title: "Cross the line, apps lock",
      body: "Go over and Slash shields the apps you picked using Apple Screen Time. On your phone, by your rules.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <CursorTrail />

      {/* Gradient orbs background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[460px] w-[460px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -bottom-40 right-0 h-[460px] w-[460px] rounded-full bg-secondary/20 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="gradient-text text-2xl font-bold italic">Slash</span>
        <a
          href="#waitlist"
          className="hidden rounded-full border border-border px-4 py-2 text-sm text-gray-400 transition-colors hover:border-primary hover:text-white sm:block"
        >
          Join the waitlist
        </a>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-12">
        <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-6 inline-block rounded-full border border-secondary/35 bg-secondary/10 px-3 py-1.5 text-[12.5px] uppercase tracking-[0.16em] text-secondary">
              The Spending Firewall
            </span>
            <h1 className="text-[clamp(40px,6vw,68px)] font-bold leading-[1.1] tracking-[-0.02em]">
              Blocks your shopping apps{" "}
              <span className="gradient-text">when you overspend.</span>
            </h1>
            <p className="mt-6 max-w-[32ch] text-lg text-gray-400 sm:text-xl">
              Set a weekly limit. Connect your bank. Cross the line and Slash{" "}
              <span className="font-semibold text-white">
                locks the apps you chose
              </span>{" "}
              — right on your iPhone.
            </p>
            <div id="waitlist" className="mt-8">
              <WaitlistForm />
            </div>
            <div className="mt-6 flex flex-wrap gap-5 text-[13px] text-gray-500">
              {["No ads, ever", "Never sells your data", "iPhone · iOS 17+"].map(
                (t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-money" />
                    {t}
                  </span>
                )
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex justify-center"
          >
            <Phone>
              <StatusBar right="● ON TRACK" />
              <div className="mb-[18px] flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-semibold">Looking good.</h4>
                  <p className="mt-0.5 text-[12.5px] text-gray-500">
                    Week 8 · Tuesday
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-money/35 bg-money/10 px-[11px] py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-money">
                  ● On track
                </span>
              </div>
              <div className="my-3 mb-[22px] flex justify-center">
                <SpendRing
                  pct={63}
                  color="#34d399"
                  label="Left this week"
                  value="$28"
                  of="of $75"
                  glow="rgba(52,211,153,0.18)"
                />
              </div>
              <Transaction
                logo="a"
                bg="#ff9900"
                name="Amazon"
                meta="Shopping · Today"
                amount="$24.00"
              />
              <Transaction
                logo="D"
                bg="#ff3008"
                name="DoorDash"
                meta="Food · Yesterday"
                amount="$23.00"
              />
            </Phone>
          </motion.div>
        </div>
      </section>

      {/* Problem */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24 text-center">
        <motion.h2
          {...fadeUp}
          className="mx-auto max-w-[22ch] text-[clamp(26px,3.6vw,40px)] font-semibold italic leading-[1.32]"
        >
          We&rsquo;ve been trained to spend before we think.{" "}
          <span className="gradient-text">
            Slash puts a wall between the impulse and the tap.
          </span>
        </motion.h2>
      </section>

      {/* How it works */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <div className="grid items-center gap-14 md:grid-cols-2">
          <motion.div {...fadeUp}>
            <div className="mb-3.5 text-[12.5px] uppercase tracking-[0.16em] text-accent">
              How it works
            </div>
            <h2 className="text-[clamp(28px,4vw,40px)] font-bold leading-[1.2] tracking-[-0.01em]">
              Three steps. Then it runs itself.
            </h2>
            <p className="mt-3.5 max-w-[60ch] text-lg text-gray-400">
              No spreadsheets, no willpower streaks to protect. You set the rule
              once and Slash enforces it automatically.
            </p>
            <div className="mt-7 flex flex-col gap-[18px]">
              {steps.map((s) => (
                <div
                  key={s.n}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-white/[0.015] p-5"
                >
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-[17px] font-bold text-white">
                    {s.n}
                  </div>
                  <div>
                    <h4 className="mb-1 text-[17px] font-semibold">{s.title}</h4>
                    <p className="text-[14.5px] text-gray-400">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex justify-center md:order-last"
          >
            <Phone>
              <StatusBar right="● SOFT" />
              <div className="mb-[18px] flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-semibold">Slow down.</h4>
                  <p className="mt-0.5 text-[12.5px] text-gray-500">
                    You&rsquo;ve hit 50% of your limit
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/35 bg-amber-400/10 px-[11px] py-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-amber-400">
                  ● Soft
                </span>
              </div>
              <div className="my-3 mb-[22px] flex justify-center">
                <SpendRing
                  pct={62}
                  color="#fbbf24"
                  label="Spent this week"
                  value="$47"
                  of="of $75"
                  glow="rgba(251,191,36,0.16)"
                />
              </div>
              <div className="rounded-2xl border border-[#23201a] bg-amber-400/[0.06] p-4 text-center">
                <div className="mb-2 text-[13px] text-gray-400">
                  Amazon is blocked
                </div>
                <div className="flex items-center justify-center gap-2 text-[15px] font-semibold">
                  <Clock className="h-4 w-4 text-amber-400" />
                  Wait 1:00 to unlock for 1 hour
                </div>
              </div>
            </Phone>
          </motion.div>
        </div>
      </section>

      {/* Mechanic */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <motion.div {...fadeUp} className="mx-auto mb-11 max-w-[720px] text-center">
          <div className="mb-3.5 text-[12.5px] uppercase tracking-[0.16em] text-secondary">
            The mechanic
          </div>
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold leading-[1.2] tracking-[-0.01em]">
            Friction when you need it. Not a cage.
          </h2>
          <p className="mx-auto mt-3.5 max-w-[60ch] text-lg text-gray-400">
            Slash escalates as you approach your limit — enough resistance to
            break the impulse, without locking you out of your own life.
          </p>
        </motion.div>

        <motion.div {...fadeUp} className="mx-auto mb-11 max-w-[760px]">
          <div className="h-3 overflow-hidden rounded-full bg-[#16161a]">
            <div
              className="h-full w-full opacity-90"
              style={{
                background:
                  "linear-gradient(90deg, #34d399 0 50%, #fbbf24 50% 100%)",
              }}
            />
          </div>
          <div className="mt-2.5 flex justify-between px-1 text-xs text-gray-500">
            <span className="whitespace-nowrap">$0</span>
            <span className="whitespace-nowrap">50% — soft</span>
            <span className="whitespace-nowrap">100% — hard</span>
          </div>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              cls: "bg-money",
              tag: "Under · 0–50%",
              tagCls: "text-money",
              pct: "All clear",
              pctCls: "text-money",
              title: "Everything's open",
              body: "Spend freely. Slash quietly tracks your shopping in the background and shows what's left.",
              icon: ShieldCheck,
            },
            {
              cls: "bg-amber-400",
              tag: "Soft · 50%",
              tagCls: "text-amber-400",
              pct: "Blocked, not trapped",
              pctCls: "text-amber-400",
              title: "One-minute pause",
              body: "Your apps lock. Really want in? Wait 60 seconds, then unlock for one hour. The delay is the point.",
              icon: Clock,
            },
            {
              cls: "bg-red-400",
              tag: "Hard · 100%",
              tagCls: "text-red-400",
              pct: "The line",
              pctCls: "text-red-400",
              title: "Locked until Sunday",
              body: "Hit your limit and there's no override. Apps stay shielded until your week resets. The rule you set holds.",
              icon: Lock,
            },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.tag}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative overflow-hidden rounded-[18px] border border-border bg-card p-6"
              >
                <div className={`absolute inset-x-0 top-0 h-[3px] ${s.cls}`} />
                <Icon
                  className={`absolute right-5 top-5 h-8 w-8 opacity-15 ${s.pctCls}`}
                />
                <div
                  className={`mb-1.5 text-xs font-semibold uppercase tracking-[0.1em] ${s.tagCls}`}
                >
                  {s.tag}
                </div>
                <div className={`mb-2.5 text-3xl font-bold ${s.pctCls}`}>
                  {s.pct}
                </div>
                <h4 className="mb-2 text-[17px] font-semibold">{s.title}</h4>
                <p className="text-sm text-gray-400">{s.body}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Trust */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <motion.div {...fadeUp}>
          <div className="mb-3.5 text-[12.5px] uppercase tracking-[0.16em] text-accent">
            Built to be trusted with your money
          </div>
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold leading-[1.2] tracking-[-0.01em]">
            A finance app that isn&rsquo;t mining you.
          </h2>
        </motion.div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {guarantees.map((g, i) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
                className="rounded-2xl border border-border bg-white/[0.015] p-[22px]"
              >
                <div className="mb-3 grid h-[38px] w-[38px] place-items-center rounded-[10px] bg-primary/10">
                  <Icon className="h-[18px] w-[18px] text-primary" />
                </div>
                <h4 className="mb-1.5 text-[15.5px] font-semibold">{g.title}</h4>
                <p className="text-[13.5px] text-gray-400">{g.body}</p>
              </motion.div>
            );
          })}
        </div>
        <p className="mt-[22px] text-sm text-gray-500">
          Read the full{" "}
          <a
            href="/privacy"
            className="text-primary underline underline-offset-2"
          >
            Privacy Policy
          </a>{" "}
          — plain language, no surprises.
        </p>
      </section>

      {/* Savings */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <motion.div {...fadeUp} className="text-center">
          <div className="mb-3.5 text-[12.5px] uppercase tracking-[0.16em] text-money">
            The payoff
          </div>
          <div className="pb-2 text-[clamp(56px,10vw,104px)] font-bold leading-[1.22] tracking-[-0.03em] text-money">
            $1,240
          </div>
          <p className="mx-auto mt-2 max-w-[46ch] text-lg text-gray-400">
            Every impulse you skip adds up. Slash keeps a running total of what
            saying &ldquo;no&rdquo; has saved you.
          </p>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-4">
        <motion.div
          {...fadeUp}
          className="rounded-[28px] border border-border px-7 py-16 text-center"
          style={{
            background:
              "radial-gradient(120% 120% at 50% 0%, rgba(99,102,241,0.10), transparent 60%)",
          }}
        >
          <h2 className="mb-3.5 text-[clamp(30px,4.4vw,46px)] font-bold leading-[1.12]">
            Put a firewall on your spending.
          </h2>
          <p className="mb-7 text-lg text-gray-400">
            Be first in line when Slash launches.
          </p>
          <div className="flex justify-center">
            <WaitlistForm />
          </div>
          <div className="mt-5 text-[13.5px] text-gray-500">
            iPhone · iOS 17+ · $2.99/mo · launching soon
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-24 border-t border-white/5 px-6 py-9">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            © 2026 Slash. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-sm text-gray-500 transition-colors hover:text-white"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-500 transition-colors hover:text-white"
            >
              Terms
            </a>
            <a
              href="https://www.linkedin.com/company/the-slash-app/"
              className="text-sm text-gray-500 transition-colors hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="mailto:navya@theslash.app"
              className="text-sm text-gray-500 transition-colors hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
