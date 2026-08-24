import type { Metadata } from "next";

import { Micro } from "@/components/slash/marks";
import { Reveal } from "@/components/slash/reveal";
import { AmbientWash, SiteFooter } from "@/components/slash/site-frame";
import { SiteHeader } from "@/components/slash/site-header";

export const metadata: Metadata = {
  title: "About us — Slash",
  description:
    "Why Slash exists: a spending firewall for iPhone that pauses your shopping apps when you cross the weekly cap you set.",
};

/* ══════════════════════════════════════════════════════════════════════
   EDIT THE ABOUT COPY HERE.

   Everything this page says in words lives in the `intro` block below.
   Rewrite the strings and the layout follows; nothing further down the
   file needs to change.

   The home page states what Slash is; this page is where the "why" lives,
   for someone who already wants in and came looking for it. It is the
   mission and nothing else — the founder card that used to sit under it
   was cut on purpose, so putting a person back here is a product call.
   ══════════════════════════════════════════════════════════════════════ */

const intro = {
  eyebrow: "About us",
  /** The headline reads as one sentence; the second half carries the
      accent gradient, the way the home page sets its own claims. */
  headline: {
    lead: "Most of us spend before we think.",
    accent: "Slash puts a block between the impulse and the tap.",
  },
  /** One string per paragraph. */
  body: [
    "Slash is a small, independent project with one job: help people spend less money.",
    "Not by nagging after the money is already gone, and not by charting it after. You set one weekly cap, choose which apps it covers, and Slash blocks them when you reach it.",
  ],
};

/* ═══════════════════════════════════════════════════════════════════ */

export default function About() {
  return (
    /* Column layout so the footer sits at the bottom of the viewport on
       this deliberately short page rather than floating mid-screen. */
    <main className="relative flex min-h-screen flex-col">
      <AmbientWash />

      <SiteHeader />

      {/* Centred in whatever room is left, so a short page sits in the
          middle of the viewport instead of hugging the header. The mission
          is the only section, so its padding is symmetric — anything
          lopsided reads as off-centre once the block is centred. */}
      <div className="flex flex-1 flex-col justify-center">
        {/* ── Why it exists ───────────────────────────────────────── */}
        <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-14 sm:py-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Micro className="text-accent">{intro.eyebrow}</Micro>
            <h1 className="slash-head mt-4 text-[clamp(28px,4.6vw,44px)]">
              {intro.headline.lead}{" "}
              <span className="gradient-text">{intro.headline.accent}</span>
            </h1>
            <div className="mt-6 flex flex-col gap-4">
              {intro.body.map((paragraph) => (
                <p
                  key={paragraph}
                  /* `text-pretty` so a short paragraph does not drop its
                     last word onto a line of its own. */
                  className="mx-auto max-w-[56ch] text-pretty text-[16px] leading-relaxed text-ink-2 sm:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
