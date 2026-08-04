import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The Slash mark — a bare Signal Purple slash, drawn as a parallelogram.
 *
 * This is what the app actually renders (see `onboarding-welcome` and the
 * Home sticky header in the current screenshots): an unboxed accent glyph,
 * not a gradient squircle badge. Proportions are taken from those captures:
 * the stroke is 0.30× the height and the whole mark spans 0.50× the height.
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
      <path d="M20 0 H50 L30 100 H0 Z" fill="currentColor" />
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
