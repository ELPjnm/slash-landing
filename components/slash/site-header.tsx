"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Mark } from "@/components/slash/marks";
import { cn } from "@/lib/utils";

/**
 * The site nav — one row, shared by every top-level view so the header
 * never drifts between the home page and the pages beside it.
 *
 * Add a tab by adding a row here; the active tab is derived from the
 * current path rather than passed in by each page.
 */
const tabs = [{ label: "About us", href: "/about" }];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="relative z-20">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 sm:py-6">
        {/* One mark everywhere. The header used to render the square app
            icon here, which put a 1:1 badge next to the bare 1:2 slash the
            hero, the footer, and the app itself draw. `Mark` is the only
            logo primitive on the site, so every instance is in proportion
            by construction. The favicon keeps the app icon; that is the
            iOS artwork, not the site's mark. */}
        <Link href="/" className="flex flex-none items-center gap-2.5">
          <Mark size={28} />
          <span className="font-display text-[19px] font-semibold tracking-tight">
            Slash
          </span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex-none text-[13.5px] font-medium transition-colors",
                  active
                    ? "text-accent"
                    : "text-ink-2 hover:text-foreground"
                )}
              >
                {tab.label}
              </Link>
            );
          })}

          {/* Plain anchor: on the home page this is a same-document jump to
              the hero form, and from any other view it lands on that anchor. */}
          <a
            href="/#waitlist"
            className="flex-none rounded-full border border-rule-strong px-4 py-2 text-[13.5px] font-medium text-ink-2 transition-colors hover:border-accent hover:text-foreground"
          >
            Join the waitlist
          </a>
        </div>
      </nav>
    </header>
  );
}
