import Image from "next/image";
import { cn } from "@/lib/utils";

/* ── Device frame ─────────────────────────────────────────────────────────

   The mockups on this page are real captures of the shipping iOS app
   (public/app/*.jpg, 1206×2622 @3x from an iPhone 17 Pro). Nothing in the
   app canvas is redrawn.

   The only chrome the frame supplies itself is the iOS status bar: the
   captures were taken on a charging simulator, so their status bar carries
   a green battery glyph that is not part of Slash's palette. The frame
   hides that top strip behind its own neutral status bar instead. */

/** Natural pixel size of every capture in public/app. */
const SHOT_W = 1206;
const SHOT_H = 2622;
/** Rows of the capture covered by the frame's own status bar. */
const CROP_TOP = 170;

const STRIP_PCT = (CROP_TOP / SHOT_H) * 100; // of screen height
const SHOT_SHIFT_PCT = -(CROP_TOP / (SHOT_H - CROP_TOP)) * 100; // of viewport height

export type Shot =
  | "home-under"
  | "home-healthy"
  | "home-over"
  | "home-healthy-scrolled"
  | "access-hard"
  | "override-idle"
  | "override-counting";

/** Bezel thickness as a fraction of the outer device width. */
const BEZEL = 0.032;
/** Everything inside the frame is sized against the screen, not the device. */
const S = 1 - BEZEL * 2;
/** `n` as a fraction of the screen, expressed in container-width units. */
const cq = (n: number) => `${(n * S * 100).toFixed(3)}cqw`;

/**
 * An iPhone showing one of the real app captures.
 *
 * `width` is the device's natural width; the frame is fluid below that, so it
 * can never push a narrow viewport sideways. Every internal measurement is in
 * container-width units, which keeps the drawn status bar in proportion at any
 * size — the 320px hero phone and the 214px three-up use the same component.
 */
export function PhoneShot({
  shot,
  alt,
  width = 310,
  priority,
  className,
}: {
  shot: Shot;
  alt: string;
  width?: number;
  priority?: boolean;
  className?: string;
}) {
  return (
    // The container-query context. Container units never resolve against the
    // element that establishes them, so the frame itself has to be a child.
    <div
      className={cn("min-w-0", className)}
      style={{ width: "100%", maxWidth: width, containerType: "inline-size" }}
    >
      <div
        className={cn(
          "border border-rule-strong shadow-device",
          "bg-[linear-gradient(165deg,#2f2760_0%,#171233_55%,#0e0b22_100%)]"
        )}
        style={{
          padding: `${BEZEL * 100}cqw`,
          borderRadius: "14.8cqw",
        }}
      >
        <div
          className="relative overflow-hidden bg-[image:var(--gradient-app-bg)]"
          style={{
            aspectRatio: `${SHOT_W} / ${SHOT_H}`,
            borderRadius: "12cqw",
          }}
        >
          {/* Capture, pushed up so its own status bar sits out of frame. */}
          <div
            className="absolute inset-x-0 bottom-0 overflow-hidden"
            style={{ top: `${STRIP_PCT}%` }}
          >
            <Image
              src={`/app/${shot}.jpg`}
              alt={alt}
              width={SHOT_W}
              height={SHOT_H}
              priority={priority}
              sizes={`(max-width: 640px) 90vw, ${width}px`}
              className="absolute left-0 w-full max-w-none"
              style={{ top: `${SHOT_SHIFT_PCT}%` }}
            />
          </div>

          <StatusBar />
        </div>
      </div>
    </div>
  );
}

/** iOS status bar, redrawn in the app's ink so no foreign hue leaks in. */
function StatusBar() {
  return (
    <div
      className="absolute inset-x-0 top-0 flex items-center justify-between"
      style={{
        height: cq(CROP_TOP / SHOT_W),
        paddingLeft: cq(0.1),
        paddingRight: cq(0.085),
      }}
      aria-hidden
    >
      <span
        className="font-sans font-semibold text-foreground"
        style={{ fontSize: cq(0.042), letterSpacing: "-0.01em" }}
      >
        9:41
      </span>

      {/* Dynamic Island */}
      <span
        className="absolute rounded-full bg-black"
        style={{
          width: cq(0.313),
          height: cq(0.077),
          top: cq(0.043),
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <span
        className="flex items-end text-foreground"
        style={{ gap: cq(0.02) }}
      >
        {/* Cellular */}
        <span className="flex items-end" style={{ gap: cq(0.005) }}>
          {[0.4, 0.6, 0.8, 1].map((h) => (
            <span
              key={h}
              className="rounded-[1px] bg-current"
              style={{ width: cq(0.009), height: cq(0.031 * h) }}
            />
          ))}
        </span>
        {/* Wi-Fi */}
        <svg
          style={{ width: cq(0.045), height: cq(0.033) }}
          viewBox="0 0 16 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        >
          <path d="M1 4.2a10 10 0 0 1 14 0" />
          <path d="M3.6 6.9a6.3 6.3 0 0 1 8.8 0" />
          <path d="M6.2 9.5a2.6 2.6 0 0 1 3.6 0" />
        </svg>
        {/* Battery — ink, not the simulator's charging green */}
        <span
          className="relative rounded-[3px] border border-current"
          style={{
            width: cq(0.068),
            height: cq(0.034),
            padding: cq(0.005),
            opacity: 0.9,
          }}
        >
          <span className="block h-full w-4/5 rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}

/* ── The meter ────────────────────────────────────────────────────────────

   The app's signature motif, transcribed from HomeView.swift:342-399. One
   hue throughout: the state is carried by fill length, bar weight, and the
   breach + hatch furniture — never by a second colour.

     under     6pt bar, accentDim fill, no tick
     halfway   8pt bar, full accent fill, 50% tick in ink3
     over      9pt bar, full accent fill with a glow, a breach marker at the
               cap, and a detached diagonal-hatched overflow capsule past it
*/

export function Meter({
  state,
  pct,
  size,
  className,
}: {
  state: "under" | "halfway" | "over";
  /** Fill length as a percentage of the cap. Ignored when over. */
  pct?: number;
  /** Bar height in px. Defaults to the app's 6 / 8 / 9. */
  size?: number;
  className?: string;
}) {
  const h = size ?? { under: 6, halfway: 8, over: 9 }[state];
  const isOver = state === "over";

  // Over-cap: the fill runs to the cap, then a gap, then the overflow.
  const OVERFLOW = 6;
  const GAP = 1.6;
  const fill = isOver ? 100 - OVERFLOW - GAP : (pct ?? 40);

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ height: h * 1.75 }}
      aria-hidden
    >
      {/* Track */}
      <div
        className="absolute inset-x-0 rounded-full bg-surface-2"
        style={{ height: h, top: `calc(50% - ${h / 2}px)` }}
      />

      {/* Fill */}
      <div
        className="absolute left-0 rounded-full"
        style={{
          width: `${fill}%`,
          height: h,
          top: `calc(50% - ${h / 2}px)`,
          background: isOver
            ? "var(--color-accent)"
            : state === "halfway"
              ? "var(--color-accent)"
              : "var(--color-accent-dim)",
          boxShadow: isOver
            ? `0 0 ${h * 1.6}px rgba(179,136,255,0.55)`
            : undefined,
        }}
      />

      {/* 50% tick — shown only while approaching; once over, the bar is past it */}
      {state === "halfway" && (
        <div
          className="absolute rounded-[1px] bg-ink-3"
          style={{
            left: "50%",
            width: h * 0.25,
            height: h * 1.75,
            top: `calc(50% - ${(h * 1.75) / 2}px)`,
            transform: "translateX(-50%)",
          }}
        />
      )}

      {/* Breach marker, pinned at the cap */}
      {isOver && (
        <div
          className="absolute rounded-[1px] bg-accent-strong"
          style={{
            left: `${fill}%`,
            width: h * 0.34,
            height: h * 1.67,
            top: `calc(50% - ${(h * 1.67) / 2}px)`,
            transform: "translateX(-50%)",
            boxShadow: "0 0 6px rgba(201,166,255,0.75)",
          }}
        />
      )}

      {/* Hatched overflow past the cap */}
      {isOver && (
        <div
          className="slash-hatch absolute right-0 rounded-full"
          style={{
            width: `${OVERFLOW}%`,
            height: h,
            top: `calc(50% - ${h / 2}px)`,
            border: "1px solid var(--color-accent-dim)",
          }}
        />
      )}
    </div>
  );
}

/* ── The Access ring ──────────────────────────────────────────────────────
   The open-ended arc from `access-clear.png`: an accent arc on a bg3 track,
   with a tick at the bottom marking the 50% point. */

export function AccessRing({
  value,
  caption,
  label,
  progress,
  size = 168,
}: {
  value: string;
  /** Small mono line under the value, e.g. "of $100.00". */
  caption?: string;
  /** Uppercase mono eyebrow above the value. */
  label?: string;
  /** 0–1. */
  progress: number;
  size?: number;
}) {
  const stroke = size * 0.07;
  const r = 50 - (stroke / size) * 100 / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <div
      className="relative grid flex-none place-items-center"
      style={{ width: size, height: size }}
    >
      <svg
        className="absolute inset-0 -rotate-90"
        viewBox="0 0 100 100"
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--color-surface-2)"
          strokeWidth={(stroke / size) * 100}
        />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={(stroke / size) * 100}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
        />
      </svg>
      {/* The 50% tick, at the bottom of the ring */}
      <span
        className="absolute rounded-full bg-ink-3"
        style={{
          width: stroke * 0.35,
          height: stroke * 1.5,
          bottom: -stroke * 0.25,
          left: "50%",
          transform: "translateX(-50%)",
        }}
        aria-hidden
      />
      <div className="relative px-4 text-center">
        {label && (
          <div
            className="slash-micro text-ink-3"
            style={{ fontSize: Math.max(8, size * 0.058) }}
          >
            {label}
          </div>
        )}
        <div
          className="slash-num mt-1 text-foreground"
          style={{ fontSize: size * 0.2 }}
        >
          {value}
        </div>
        {caption && (
          <div
            className="slash-mono mt-1 text-ink-3"
            style={{ fontSize: Math.max(9, size * 0.062) }}
          >
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}
