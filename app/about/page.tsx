import type { Metadata } from "next";

import { WaitlistForm } from "@/components/waitlist-form";
import { Mark, Micro } from "@/components/slash/marks";
import { Reveal } from "@/components/slash/reveal";
import { AmbientWash, SiteFooter } from "@/components/slash/site-frame";
import { SiteHeader } from "@/components/slash/site-header";

export const metadata: Metadata = {
  title: "About us — Slash",
  description:
    "Who is building Slash, the spending firewall for iPhone that pauses your shopping apps when you cross the weekly cap you set.",
};

/* ══════════════════════════════════════════════════════════════════════
   EDIT THE ABOUT COPY HERE.

   Everything this page says in words lives in the two blocks below.
   Rewrite the strings and the layout follows; nothing further down the
   file needs to change. Add a person by adding another entry to `team`.
   ══════════════════════════════════════════════════════════════════════ */

const intro = {
  eyebrow: "About us",
  title: "The people building Slash.",
  body: "Slash is a small, independent project with one job: hold the spending limit you set for yourself. Here's who's behind it.",
};

const team = [
  {
    name: "Jaiden Schraut",
    role: "Cofounder",
    initials: "JS",
    /** One string per paragraph. */
    blurb: [
      "A new-grad software engineer from the University of Michigan who builds things he wants to exist.",
      "Slash came out of wanting a spending tool that actually holds the line, not just watches it slip.",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════ */

function PersonCard({ person }: { person: (typeof team)[number] }) {
  return (
    <div className="slash-card-raised relative overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(179,136,255,0.16),transparent_65%)]" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
        <span className="slash-num grid h-16 w-16 flex-none place-items-center rounded-full border border-accent/30 bg-accent-soft text-[22px] text-accent">
          {person.initials}
        </span>

        <div className="min-w-0">
          <Micro className="text-accent">{person.role}</Micro>
          <h2 className="slash-head mt-2 text-[clamp(24px,3.6vw,30px)]">
            {person.name}
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            {person.blurb.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-[54ch] text-[15.5px] leading-relaxed text-ink-2 sm:text-[16px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <main className="relative min-h-screen">
      <AmbientWash />

      <SiteHeader />

      {/* ── Intro ─────────────────────────────────────────────────── */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 pt-12 sm:pb-16 sm:pt-20">
        <Reveal className="mx-auto max-w-3xl text-center">
          <Micro className="text-accent">{intro.eyebrow}</Micro>
          <h1 className="slash-head mt-3 text-[clamp(34px,6vw,56px)]">
            {intro.title}
          </h1>
          <p className="mx-auto mt-5 max-w-[54ch] text-[17px] leading-relaxed text-ink-2 sm:text-[19px]">
            {intro.body}
          </p>
        </Reveal>
      </section>

      {/* ── The team ──────────────────────────────────────────────── */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 sm:pb-20">
        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {team.map((person, i) => (
            <Reveal key={person.name} delay={i * 80}>
              <PersonCard person={person} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Waitlist ──────────────────────────────────────────────── */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 sm:pb-28">
        <Reveal
          id="waitlist"
          className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-rule-strong bg-[image:var(--gradient-card)] px-6 py-14 text-center sm:px-10 sm:py-16"
        >
          <div className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(122,79,255,0.30),transparent_65%)]" />
          <div className="relative flex flex-col items-center">
            <Mark size={40} />
            <h2 className="slash-head mt-6 text-[clamp(26px,4.4vw,40px)]">
              Slash is coming to iPhone.
            </h2>
            <p className="mt-4 text-[16px] text-ink-2 sm:text-[17px]">
              Be first in line when it launches.
            </p>
            <div className="mt-8 flex w-full justify-center">
              <WaitlistForm />
            </div>
            <p className="slash-mono mt-2 text-[11px] tracking-[0.12em] text-ink-3">
              IPHONE · IOS 17+ · $2.99/MO · LAUNCHING SOON
            </p>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
}
