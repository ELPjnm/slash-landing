import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The Slash mark, transcribed from the app's `SlashLogo`
 * (`Shared/Views/SlashLogo.swift`): the standard 18° parallelogram filled
 * with `purpleGrad`, #B388FF top-leading to #7A4FFF bottom-trailing.
 *
 * This is the site's only logo primitive. Every Slash mark on the site
 * renders through it, so the glyph is identical everywhere by construction.
 *
 * The polygon and the 48×60 frame are the app's verbatim, and `size` means
 * what it means in Swift: the frame height, with the width at 0.8 × that.
 * `<Mark size={28} />` is pixel-for-pixel `SlashLogo(size: 28)`. Do not
 * redraw the bar thinner, thicker, or at another slant; change the Swift
 * first and transcribe it.
 */
export function Mark({
  size = 28,
  className,
}: {
  /** Frame height in px, as `SlashLogo(size:)`; width follows at 0.8×. */
  size?: number;
  className?: string;
}) {
  // One gradient per instance so ids never collide; it spans the whole
  // frame, as SwiftUI's `.fill` maps `.topLeading`/`.bottomTrailing`.
  const id = useId();
  return (
    <svg
      aria-hidden
      className={cn("flex-none", className)}
      width={size * 0.8}
      height={size}
      viewBox="0 0 48 60"
      fill="none"
    >
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="48" y2="60">
          <stop offset="0" stopColor="#B388FF" />
          <stop offset="1" stopColor="#7A4FFF" />
        </linearGradient>
      </defs>
      <polygon points="27.6,5 36.6,5 20.4,55 11.4,55" fill={`url(#${id})`} />
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
