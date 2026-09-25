import type { Metadata } from "next";

import { AmbientWash, SiteFooter } from "@/components/slash/site-frame";
import { SiteHeader } from "@/components/slash/site-header";

import { ConfirmationStatus } from "./confirmation-status";

export const metadata: Metadata = {
  title: "Email confirmed — Slash",
  description: "Your Slash email is confirmed.",
};

export default function Confirmed() {
  return (
    <main className="relative min-h-screen">
      <AmbientWash />

      <SiteHeader />

      {/* Same document column as /support, /privacy and /terms. */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-20 pt-10 sm:pb-24 sm:pt-14">
        <ConfirmationStatus />
      </div>

      <SiteFooter />
    </main>
  );
}
