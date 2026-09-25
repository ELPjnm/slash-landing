"use client";

import { useEffect, useState } from "react";

/**
 * Supabase redirects here after confirming a sign-up, appending a URL
 * fragment. The fragment is only checked for `error=` and never read further,
 * stored, or sent, then dropped from the address bar so no token lingers.
 * Renders the confirmed copy by default, so it shows with JavaScript off.
 */
export function ConfirmationStatus() {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!window.location.hash) return;
    const failed = window.location.hash.includes("error=");
    window.history.replaceState(null, "", "/confirmed");
    if (failed) setExpired(true);
  }, []);

  return (
    <>
      <h1 className="gradient-text mb-10 text-4xl font-bold sm:text-5xl">
        {expired ? "This link has expired" : "Email confirmed"}
      </h1>

      <div className="space-y-5 text-[1.0625rem] leading-relaxed text-ink-2">
        <p>
          {expired
            ? "Open the Slash app and log in. If you can't, sign up again from the app."
            : "Your Slash account is ready. Open the Slash app on your iPhone and log in."}
        </p>
        <p className="pt-6 text-ink-3">Slash LLC</p>
      </div>
    </>
  );
}
