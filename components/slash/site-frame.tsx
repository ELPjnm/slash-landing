import { Mark } from "@/components/slash/marks";

/**
 * The ambient wash behind every page — one hue, softly blurred, fixed so
 * it stays put while the page scrolls.
 */
export function AmbientWash() {
  return (
    <div
      className="pointer-events-none fixed inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="absolute -left-40 -top-52 h-[620px] w-[620px] rounded-full bg-accent/[0.14] blur-[170px]" />
      <div className="absolute -right-48 top-[45%] h-[560px] w-[560px] rounded-full bg-accent-deep/[0.16] blur-[170px]" />
      <div className="absolute -bottom-56 left-1/3 h-[520px] w-[520px] rounded-full bg-accent/[0.07] blur-[180px]" />
    </div>
  );
}

const footerLinks: [string, string][] = [
  ["About us", "/about"],
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  // The Regulation P notice the iOS app links to at Plaid Link time. It is a
  // separate legal artifact from /privacy, not a duplicate of it.
  ["Consumer privacy notice", "/glba-privacy"],
  ["LinkedIn", "https://www.linkedin.com/company/the-slash-app/"],
  ["Contact", "mailto:navya@theslash.app"],
];

/** The site footer, shared by every top-level view. */
export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 px-6 py-9 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Mark size={20} />
          <p className="text-[13.5px] text-ink-3">
            © 2026 Slash. All rights reserved.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {footerLinks.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-[13.5px] text-ink-3 transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
