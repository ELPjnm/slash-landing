"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Fade-and-rise reveal for marketing sections.
 *
 * Two deliberate properties:
 *
 * 1. Content is visible by default. The hidden state is applied by this
 *    effect after hydration, and only to elements that are already below
 *    the fold, so the server-rendered page, a no-JS visit, and a crawler
 *    all see the full page. Nothing can get stranded at opacity 0.
 *
 * 2. It reveals on scroll position rather than via IntersectionObserver.
 *    An observer never fires for elements that get skipped by an instant
 *    jump (anchor links, restored scroll, scripted scrolling), which is
 *    what leaves mid-page sections blank. Checking whether the element's
 *    top has ever been above the viewport bottom is true both while
 *    scrolling normally and after any jump past it.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  /** Stagger, in ms. */
  delay?: number;
  as?: ElementType;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  // "static" until hydration decides this element is worth animating.
  const [phase, setPhase] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const threshold = () => window.innerHeight * 0.92;

    // Already on screen at hydration: leave it alone rather than flashing it out.
    if (el.getBoundingClientRect().top < threshold()) return;

    setPhase("hidden");

    let frame = 0;
    const check = () => {
      frame = 0;
      if (!ref.current) return;
      if (ref.current.getBoundingClientRect().top < threshold()) {
        setPhase("shown");
        cleanup();
      }
    };
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(check);
    };
    const cleanup = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return cleanup;
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={phase}
      className={cn("slash-reveal", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
      {...rest}
    >
      {children}
    </Tag>
  );
}
