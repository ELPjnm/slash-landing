import type { Metadata } from "next";

import { AmbientWash, SiteFooter } from "@/components/slash/site-frame";
import { SiteHeader } from "@/components/slash/site-header";

export const metadata: Metadata = {
  title: "U.S. Consumer Privacy Notice — Slash",
  description:
    "The Gramm-Leach-Bliley Act and Regulation P consumer privacy notice for Slash: what personal information we collect, how we share it, and how we protect it.",
};

/** External link styled for the dark theme. */
function Ext({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary"
    >
      {children}
    </a>
  );
}

/** The Regulation P model-form sharing table. */
const sharingRows: [reason: string, detail: string, shares: string, limit: string][] = [
  [
    "For our everyday business purposes",
    "such as to process your transactions, maintain your account, and respond to court orders and legal investigations",
    "Yes",
    "No",
  ],
  [
    "For our marketing purposes",
    "to offer our products and services to you",
    "No",
    "We don't share",
  ],
  ["For joint marketing with other financial companies", "", "No", "We don't share"],
  [
    "For our affiliates' everyday business purposes",
    "information about your transactions and experiences",
    "No",
    "We don't share",
  ],
  [
    "For our affiliates' everyday business purposes",
    "information about your creditworthiness",
    "No",
    "We don't share",
  ],
  ["For our affiliates to market to you", "", "No", "We don't share"],
  ["For nonaffiliates to market to you", "", "No", "We don't share"],
];

export default function GlbaPrivacyNotice() {
  return (
    <main className="relative min-h-screen">
      <AmbientWash />

      <SiteHeader />

      {/* The document column is narrower than the 6xl chrome above and
          below it, but it shares the same px-6 gutter, so its left edge
          lines up with the header's mark on narrow viewports. */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-20 pt-10 sm:pb-24 sm:pt-14">
        <h1 className="gradient-text mb-3 text-4xl font-bold sm:text-5xl">
          Slash — U.S. Consumer Privacy Notice
        </h1>
        <p className="mb-10 text-sm text-ink-3">
          <span className="font-semibold text-ink-2">Rev.</span> August 13, 2026
        </p>

        <div className="space-y-5 text-[1.0625rem] leading-relaxed text-ink-2">
          <Section title="FACTS — What does Slash do with your personal information?">
            <SubHeading>Why?</SubHeading>
            <p>
              Financial companies choose how they share your personal
              information. Federal law gives consumers the right to limit some
              but not all sharing. Federal law also requires us to tell you how
              we collect, share, and protect your personal information. Please
              read this notice carefully to understand what we do.
            </p>

            <SubHeading>What?</SubHeading>
            <p>
              The types of personal information we collect and share depend on
              the product or service you have with us. This information can
              include:
            </p>
            <List>
              <li>
                <strong className="font-semibold text-foreground">
                  Name and email address
                </strong>
              </li>
              <li>
                <strong className="font-semibold text-foreground">
                  Transaction history
                </strong>{" "}
                — the amount, date, merchant, and category of transactions in
                the bank account you choose to connect
              </li>
              <li>
                <strong className="font-semibold text-foreground">
                  Account identifiers
                </strong>{" "}
                for the financial institution you connect
              </li>
            </List>
            <p>
              When you are no longer our customer, we continue to share your
              information only as described in this notice.
            </p>

            <SubHeading>How?</SubHeading>
            <p>
              All financial companies need to share customers' personal
              information to run their everyday business. In the section below,
              we list the reasons financial companies can share their customers'
              personal information, whether Slash shares, and whether you can
              limit that sharing.
            </p>
          </Section>

          <Section title="Reasons we can share your personal information">
            <div className="overflow-x-auto rounded-lg border border-rule">
              <table className="w-full min-w-[34rem] border-collapse text-left text-[0.9375rem]">
                <thead>
                  <tr className="border-b border-rule bg-surface">
                    <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-ink-3">
                      Reason
                    </th>
                    <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-ink-3">
                      Does Slash share?
                    </th>
                    <th className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-ink-3">
                      Can you limit this sharing?
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sharingRows.map(([reason, detail, shares, limit], i) => (
                    <tr
                      key={i}
                      className="border-b border-rule last:border-b-0 align-top"
                    >
                      <td className="px-4 py-3">
                        <strong className="font-semibold text-foreground">
                          {reason}
                        </strong>
                        {detail ? <span className="text-ink-3"> — {detail}</span> : null}
                      </td>
                      <td className="px-4 py-3 font-semibold text-foreground">
                        {shares}
                      </td>
                      <td className="px-4 py-3">{limit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              <strong className="font-semibold text-foreground">
                Because we do not share your personal information in any way
                that you can limit, there is nothing for you to opt out of.
              </strong>
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Questions?
              </strong>{" "}
              Email{" "}
              <Ext href="mailto:privacy@theslash.app">privacy@theslash.app</Ext>
            </p>
          </Section>

          <Section title="Who we are">
            <SubHeading>Who is providing this notice?</SubHeading>
            <p>
              Slash LLC, an Illinois limited liability company, operator of the
              Slash mobile application and theslash.app.
            </p>
          </Section>

          <Section title="What we do">
            <SubHeading>How does Slash protect my personal information?</SubHeading>
            <p>
              To protect your personal information from unauthorized access and
              use, we use security measures that comply with federal law. These
              measures include computer safeguards and secured files and
              buildings.
            </p>
            <p>
              Specifically: the access token that lets us retrieve your
              transactions is encrypted at rest using AES-256-GCM and is never
              returned to the app or to any third party. All communication
              between the app and our servers is encrypted in transit. Access to
              your records is restricted to your own account through database
              row-level security. We maintain a written information security
              program, we require multi-factor authentication for everyone who
              can reach a system holding customer information, and we
              contractually require our service providers to protect your
              information.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                We never receive or store your online banking username or
                password.
              </strong>{" "}
              You enter those directly with Plaid.
            </p>

            <SubHeading>How does Slash collect my personal information?</SubHeading>
            <p>
              We collect your personal information, for example, when you:
            </p>
            <List>
              <li>
                <strong className="font-semibold text-foreground">
                  create an account
                </strong>{" "}
                or provide your email address
              </li>
              <li>
                <strong className="font-semibold text-foreground">
                  connect a bank account
                </strong>{" "}
                through Plaid
              </li>
              <li>
                <strong className="font-semibold text-foreground">
                  set a spending limit
                </strong>{" "}
                or change your settings
              </li>
              <li>
                <strong className="font-semibold text-foreground">
                  purchase a subscription
                </strong>{" "}
                through the Apple App Store
              </li>
            </List>
            <p>
              We also collect your personal information from others, such as
              Plaid Inc., the financial data provider that connects to your bank
              at your direction.
            </p>

            <SubHeading>Why can't I limit all sharing?</SubHeading>
            <p>Federal law gives you the right to limit only:</p>
            <List>
              <li>
                sharing for affiliates' everyday business purposes — information
                about your creditworthiness
              </li>
              <li>affiliates from using your information to market to you</li>
              <li>sharing for nonaffiliates to market to you</li>
            </List>
            <p>
              State laws and individual companies may give you additional rights
              to limit sharing.{" "}
              <strong className="font-semibold text-foreground">
                See "Other important information" below.
              </strong>
            </p>
          </Section>

          <Section title="Definitions">
            <p>
              <strong className="font-semibold text-foreground">
                Affiliates
              </strong>{" "}
              — Companies related by common ownership or control. They can be
              financial and nonfinancial companies.
            </p>
            <Note>Slash has no affiliates.</Note>

            <p>
              <strong className="font-semibold text-foreground">
                Nonaffiliates
              </strong>{" "}
              — Companies not related by common ownership or control. They can
              be financial and nonfinancial companies.
            </p>
            <Note>
              Slash does not share your personal information with nonaffiliates
              so they can market to you. We do use service providers to run our
              business — Plaid Inc. (bank connection and transaction data),
              Supabase (authentication and database hosting), Railway (backend
              hosting), and Apple (subscription processing and the App Store).
              These providers may use your information only to perform services
              for us.
            </Note>

            <p>
              <strong className="font-semibold text-foreground">
                Joint marketing
              </strong>{" "}
              — A formal agreement between nonaffiliated financial companies
              that together market financial products or services to you.
            </p>
            <Note>Slash does not jointly market.</Note>
          </Section>

          <Section title="Other important information">
            <p>
              <strong className="font-semibold text-foreground">
                We do not sell your personal information,
              </strong>{" "}
              and we do not use it for advertising or for cross-context
              behavioral advertising, as those terms are defined under the
              California Consumer Privacy Act.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                The apps you choose to block stay on your phone.
              </strong>{" "}
              Your Family Activity selection and your Screen Time usage data are
              handled entirely by Apple's on-device framework. They are never
              transmitted to us and we cannot access them.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                You can delete everything.
              </strong>{" "}
              You can disconnect your bank at any time from within the app, and
              you can delete your account and all associated data from within
              the app — including before you subscribe. Deleting your account
              permanently removes your profile, settings, transaction records,
              and bank connections, and revokes your bank access token with
              Plaid. It does not cancel your App Store subscription; you cancel
              that through Apple.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Plaid's own practices
              </strong>{" "}
              are governed by Plaid's end-user privacy policy at{" "}
              <Ext href="https://plaid.com/legal/">plaid.com/legal</Ext>.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                This notice is one of two.
              </strong>{" "}
              Our general{" "}
              <a
                href="/privacy"
                className="text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary"
              >
                Privacy Policy
              </a>{" "}
              describes everything we do with all of your information, including
              your rights under state privacy laws and the GDPR. This notice
              covers specifically what federal financial privacy law requires us
              to tell you.
            </p>
          </Section>

          <Section title="Delivery and revision">
            <p>
              You receive this notice when you first connect a bank account, and
              it is always available at{" "}
              <a
                href="/glba-privacy"
                className="text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary"
              >
                theslash.app/glba-privacy
              </a>
              .
            </p>
            <p>
              Because we do not share your personal information with
              nonaffiliated third parties in any manner that would require us to
              offer you an opt-out, and because our policies and practices have
              not changed since we last delivered this notice, we are not
              required to send you an annual copy.{" "}
              <strong className="font-semibold text-foreground">
                If that ever changes, we will resume sending you this notice
                every year
              </strong>{" "}
              and we will tell you before the change takes effect.
            </p>
          </Section>

          <p className="pt-6 text-sm text-ink-3">
            Prepared under the Gramm-Leach-Bliley Act and Regulation P, 12 CFR
            Part 1016.
          </p>
        </div>
      </div>

      <SiteFooter />
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pt-6">
      <h2 className="mb-4 text-2xl font-semibold text-foreground">{title}</h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="pt-1 text-lg font-semibold text-foreground">{children}</h3>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-primary">{children}</ul>
  );
}

/** The blockquote asides that gloss each Regulation P definition. */
function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-l-2 border-primary/40 pl-4 text-ink-3">{children}</p>
  );
}
