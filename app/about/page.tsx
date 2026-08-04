import type { Metadata } from "next";
import Image from "next/image";

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
  body: "Slash is a small, independent project with one job: help people spend less money.",
};

const team = [
  {
    name: "Jaiden Schraut",
    /** One string per paragraph. */
    blurb: [
      "A new-grad software engineer from the University of Michigan who builds things he wants to exist.",
      "Slash came out of wanting a spending tool that actually holds the line, not just watches it slip.",
    ],
    photo: {
      src: "/jaiden-schraut.jpg",
      /* The source is a head-and-shoulders frame; the avatar crops in on
         the face. `zoom` is how far in, and `face` is where the face sits
         in the source, as a fraction of its width and height. Re-frame a
         new photo by measuring those two numbers and nothing else. */
      zoom: 2,
      face: { x: 0.58, y: 0.31 },
    },
  },
];

/* ═══════════════════════════════════════════════════════════════════ */

/** Where the face should land inside the avatar: centred, slightly high. */
const FACE_TARGET = { x: 0.5, y: 0.45 };

/**
 * Round portrait, cropped to the face.
 *
 * A square source in a square frame fills it exactly, so `object-cover`
 * alone crops nothing — the zoom has to come from a scale. Scaling about
 * the right origin is what puts the face in the middle of the frame:
 * a source point `p` lands at `origin + zoom * (p - origin)`, so solving
 * that for the origin frames the face without any hand-tuned offsets.
 */
function Portrait({ person }: { person: (typeof team)[number] }) {
  const { src, zoom, face } = person.photo;
  const origin = {
    x: (zoom * face.x - FACE_TARGET.x) / (zoom - 1),
    y: (zoom * face.y - FACE_TARGET.y) / (zoom - 1),
  };

  return (
    <div className="relative h-24 w-24 flex-none overflow-hidden rounded-full border border-accent/30 bg-surface-2 sm:h-28 sm:w-28">
      <Image
        src={src}
        alt={person.name}
        fill
        /* The crop is a scaled-up slice of the source, so it needs `zoom`
           times the pixels the 96/112px frame would suggest. */
        sizes={`(min-width: 640px) ${112 * zoom}px, ${96 * zoom}px`}
        className="object-cover"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: `${origin.x * 100}% ${origin.y * 100}%`,
        }}
        priority
      />
    </div>
  );
}

function PersonCard({ person }: { person: (typeof team)[number] }) {
  return (
    <div className="slash-card-raised relative overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(179,136,255,0.16),transparent_65%)]" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
        <Portrait person={person} />

        <div className="min-w-0">
          <h2 className="slash-head text-[clamp(24px,3.6vw,30px)]">
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
    /* Column layout so the footer sits at the bottom of the viewport on
       this deliberately short page rather than floating mid-screen. */
    <main className="relative flex min-h-screen flex-col">
      <AmbientWash />

      <SiteHeader />

      {/* Centred in whatever room is left, so a short page sits in the
          middle of the viewport instead of hugging the header. */}
      <div className="flex flex-1 flex-col justify-center">
        {/* ── Intro ───────────────────────────────────────────────── */}
        <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-10 pt-14 sm:pb-14 sm:pt-20">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h1 className="slash-micro text-[11px] text-accent">
              {intro.eyebrow}
            </h1>
            <p className="mx-auto mt-4 max-w-[52ch] text-[18px] leading-relaxed text-ink-2 sm:text-[20px]">
              {intro.body}
            </p>
          </Reveal>
        </section>

        {/* ── The team ────────────────────────────────────────────── */}
        <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 sm:pb-28">
          <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
            {team.map((person, i) => (
              <Reveal key={person.name} delay={i * 80}>
                <PersonCard person={person} />
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      <SiteFooter />
    </main>
  );
}
