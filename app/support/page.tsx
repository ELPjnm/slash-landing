import type { Metadata } from "next";

import { AmbientWash, SiteFooter } from "@/components/slash/site-frame";
import { SiteHeader } from "@/components/slash/site-header";

export const metadata: Metadata = {
  title: "Support — Slash",
  description: "Get help with Slash.",
};

/** Inline link styled for the dark theme. */
function Inline({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary"
    >
      {children}
    </a>
  );
}

export default function Support() {
  return (
    <main className="relative min-h-screen">
      <AmbientWash />

      <SiteHeader />

      {/* Same document column as /privacy and /terms. */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-20 pt-10 sm:pb-24 sm:pt-14">
        <h1 className="gradient-text mb-10 text-4xl font-bold sm:text-5xl">
          Support
        </h1>

        <div className="space-y-5 text-[1.0625rem] leading-relaxed text-ink-2">
          <p>
            Questions or problems with Slash? Email{" "}
            <Inline href="mailto:support@theslash.app">
              support@theslash.app
            </Inline>
            . We reply within 2 business days.
          </p>
          <p>
            To cancel your subscription: Settings → [your name] → Subscriptions
            on your iPhone.
          </p>
          <p>To delete your account and data: Settings in the Slash app.</p>
          <p>
            <Inline href="/privacy">Privacy Policy</Inline>
            <span className="mx-2 text-ink-3" aria-hidden>
              ·
            </span>
            <Inline href="/terms">Terms</Inline>
          </p>
          <p className="pt-6 text-ink-3">Slash LLC</p>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
