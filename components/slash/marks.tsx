import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The Slash mark — a gradient squircle with the "/" glyph knocked out in the
 * app's base navy. Ported from design-reference `slash-badge/c-base.jsx`
 * (`CMark`), including its radius ratio of 0.28 × size.
 */
export function Mark({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-grid flex-none place-items-center overflow-hidden bg-[image:var(--gradient-purple)]",
        className
      )}
      style={{ width: size, height: size, borderRadius: size * 0.28 }}
    >
      <span
        className="font-display font-extrabold leading-none text-background"
        style={{ fontSize: size * 0.7, transform: "translateY(-1px)" }}
      >
        /
      </span>
    </span>
  );
}

/** Eyebrow label — `CMicro`: 700 weight, 0.18em tracking, uppercase. */
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

/** The italic serif moment — `CSerif`. Used once per section, at most. */
export function Serif({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("slash-serif", className)}>{children}</span>;
}

/* ── Shield icons ────────────────────────────────────────────────────────
   The block screen's icon is the only surface Apple's ShieldConfiguration
   lets the app art-direct, so these three marks carry the whole block
   identity. Ported from design-reference `BlockShield.jsx`. */

/** Soft tier — open circle with the slash drawn through it. */
export function ShieldSoft({
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
      fill="none"
      aria-hidden
      className={className}
    >
      <circle cx="40" cy="40" r="33" stroke="currentColor" strokeWidth="2.25" />
      <path
        d="M52 20 L28 60"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Timeout tier — hourglass; universally readable for "wait". */
export function ShieldTimeout({
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
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M22 14 H58" strokeWidth="2.5" />
      <path d="M22 66 H58" strokeWidth="2.5" />
      <path
        d="M24 14 C24 28, 36 36, 40 40 C44 44, 56 52, 56 66"
        strokeWidth="2.25"
      />
      <path
        d="M56 14 C56 28, 44 36, 40 40 C36 44, 24 52, 24 66"
        strokeWidth="2.25"
      />
      <circle cx="40" cy="58" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="36" cy="62" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="44" cy="62" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Deep tier — the wax seal: filled disc with the slash cut out of it. */
export function ShieldDeep({
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
      <circle cx="40" cy="40" r="33" fill="currentColor" />
      <path
        d="M52 20 L28 60"
        stroke="#0e0b22"
        strokeWidth="3.75"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
