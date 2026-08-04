"use client";

import type React from "react";

import { useState } from "react";
import { joinWaitlist } from "@/app/actions/waitlist";
import { cn } from "@/lib/utils";

/**
 * Waitlist capture — the page's conversion goal.
 *
 * Styled after the app's primary CTA: full capsule, `accentGrad` fill, and
 * an `accentInk` label. Submission goes through the `joinWaitlist` action.
 */
export function WaitlistForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const result = await joinWaitlist(email);

    if (result.success) {
      setStatus("success");
      setMessage(result.message);
      setEmail("");
    } else {
      setStatus("error");
      setMessage(result.message);
    }

    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("w-full max-w-md", className)}>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <label htmlFor="waitlist-email" className="sr-only">
          Email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={status === "loading"}
          className="h-12 min-w-0 flex-1 rounded-full border border-rule-strong bg-surface px-5 text-[15px] text-foreground transition-colors placeholder:text-ink-4 hover:border-accent/40 focus:border-accent focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-12 flex-none rounded-full bg-[image:var(--gradient-accent)] px-7 font-display text-[15px] font-semibold tracking-tight text-accent-ink shadow-cta transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "Joining…" : "Join waitlist"}
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={cn(
          // One hue: success and error are tones of the accent, not a
          // green/red pair. Emphasis comes from weight, not from a new colour.
          "mt-2.5 min-h-[1.25rem] text-[13px] transition-opacity",
          status === "success" ? "text-accent" : "text-accent-strong",
          message ? "opacity-100" : "opacity-0"
        )}
      >
        {message || " "}
      </p>
    </form>
  );
}
