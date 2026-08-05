import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The Slash mark — a bare Signal Purple slash, drawn as a parallelogram.
 *
 * This is the site's only logo primitive. Every Slash mark on the site
 * renders through it, so the glyph is identical everywhere by construction.
 *
 * Geometry, all in viewBox units where the height is 100:
 *
 *   stroke   0.10 × height, the horizontal thickness of the bar
 *   slant    0.20 × height of horizontal run, top-right to bottom-left
 *   glyph    0.30 × height wide (stroke + slant), centred in the box
 *   box      0.50 × height wide, so the element is always 1:2
 *
 * The box stays 1:2 because every call site sizes against it; the glyph is
 * inset within it rather than filling it. That is what lets the bar thin
 * out without changing either the element's proportions or the angle.
 *
 * **The 0.10 stroke is a deliberate divergence from the app.** The iOS
 * captures draw this bar at 0.30 × height, filling the box edge to edge,
 * and the mark was transcribed at that weight; on the web it read chunky,
 * so the owner asked for a thin, typographic slash instead. Do not "restore"
 * the heavier bar by citing `onboarding-welcome` or the Home sticky header.
 */
export function Mark({
  size = 28,
  className,
}: {
  /** Height of the mark in px; width follows at half the height. */
  size?: number;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      className={cn("flex-none text-accent", className)}
      width={size * 0.5}
      height={size}
      viewBox="0 0 50 100"
      fill="none"
    >
      <path d="M30 0 H40 L20 100 H10 Z" fill="currentColor" />
    </svg>
  );
}

/** Eyebrow label — `SlashType.eyebrow()`: mono, uppercase, wide tracking. */
export function Micro({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("slash-micro text-[11px] text-ink-3", className)}>
      {children}
    </div>
  );
}

/**
 * The Access-tab shield glyph — `shield.lefthalf.filled`, the SF Symbol the
 * app uses for the shield tab and its lock screens.
 */
export function ShieldMark({
  size = 80,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      aria-hidden
      className={className}
    >
      <path
        d="M40 8 L66 17 V40 C66 56 55 66 40 72 C25 66 14 56 14 40 V17 Z"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M40 12 L18 19.5 V40 C18 54 27.5 62.8 40 68.2 Z"
        fill="currentColor"
      />
    </svg>
  );
}
