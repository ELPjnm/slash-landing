import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use — Slash",
  description:
    "The terms governing your use of the Slash app and website, including subscriptions, bank connections, app blocking, and your responsibilities.",
};

/** Visibly-marked placeholder to be filled in before publishing. */
function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-0.5 rounded border border-primary/40 bg-primary/15 px-1.5 py-0.5 font-mono text-[0.85em] text-primary">
      {children}
    </span>
  );
}

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

export default function TermsOfUse() {
  return (
    <main className="min-h-screen bg-transparent">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <h1 className="gradient-text mb-3 text-4xl font-bold italic sm:text-5xl">
          Slash Terms of Use
        </h1>
        <p className="mb-10 text-sm text-gray-400">
          <span className="font-semibold text-gray-300">Effective date:</span>{" "}
          <Placeholder>[EFFECTIVE DATE]</Placeholder>
        </p>

        <div className="space-y-5 text-[1.0625rem] leading-relaxed text-gray-300">
          <p>
            These Terms of Use ("Terms") are a legal agreement between you and{" "}
            <Placeholder>[LEGAL ENTITY]</Placeholder> ("Slash," "we," "us," or
            "our") governing your use of the Slash mobile application and the
            theslash.app website (together, the "Service"). By creating an
            account or using the Service, you agree to these Terms and to our{" "}
            <Ext href="https://theslash.app/privacy">Privacy Policy</Ext>. If you
            do not agree, do not use the Service.
          </p>

          <Section title="1. What Slash is">
            <p>
              Slash is a personal financial-wellness tool. You set a weekly
              spending limit for yourself, connect a bank account so Slash can
              measure your spending, and choose shopping apps for Slash to block
              on your own device when you exceed that limit. Slash uses Apple's
              Screen Time technology to apply that blocking on the iPhone you
              control. Slash is a self-discipline aid; it is not a bank, lender,
              broker, investment adviser, or financial planner, and it does not
              hold, move, or manage your money.
            </p>
          </Section>

          <Section title="2. Eligibility and accounts">
            <p>
              You must be at least 16 years old and able to form a binding
              contract to use the Service. You are responsible for the accuracy
              of the information you provide, for keeping your login credentials
              secure, and for all activity under your account. Notify us promptly
              at{" "}
              <Ext href="mailto:support@theslash.app">support@theslash.app</Ext>{" "}
              if you believe your account has been compromised.
            </p>
          </Section>

          <Section title="3. Subscriptions, billing, and cancellation">
            <p>
              Access to Slash requires an{" "}
              <strong className="font-semibold text-white">
                auto-renewable subscription
              </strong>{" "}
              priced at{" "}
              <strong className="font-semibold text-white">
                $2.99 per month
              </strong>{" "}
              (or the equivalent in your local currency, as shown in the app
              before you purchase).
            </p>
            <List>
              <li>
                Your subscription is purchased through your{" "}
                <strong className="font-semibold text-white">
                  Apple App Store account
                </strong>
                , and Apple processes all payments; we never receive your payment
                card details.
              </li>
              <li>
                Your subscription{" "}
                <strong className="font-semibold text-white">
                  automatically renews
                </strong>{" "}
                each month unless you cancel it at least 24 hours before the end
                of the current period.
              </li>
              <li>
                Your Apple account is charged for renewal within 24 hours before
                the end of the current period.
              </li>
              <li>
                You can{" "}
                <strong className="font-semibold text-white">
                  manage or cancel
                </strong>{" "}
                your subscription at any time in your Apple account settings
                (Settings → your name → Subscriptions).
              </li>
              <li>
                Deleting the app does not cancel your subscription; you must
                cancel through Apple.
              </li>
              <li>
                Any unused portion of a free trial, if one is offered, is
                forfeited when you purchase a subscription.
              </li>
              <li>
                Payments are non-refundable except where required by law or by
                Apple's App Store policies; refund requests are handled by Apple.
              </li>
              <li>
                If we change the subscription price, we will give you notice and,
                where required, obtain your consent before the change takes
                effect; you may cancel before it does.
              </li>
            </List>
          </Section>

          <Section title="4. Connecting a bank account">
            <p>
              To measure your spending, you may connect a financial account
              through{" "}
              <strong className="font-semibold text-white">Plaid Inc.</strong> By
              connecting an account, you authorize Slash and Plaid to access
              transaction information from that account for the purpose of
              operating the Service, as described in our{" "}
              <Ext href="https://theslash.app/privacy">Privacy Policy</Ext> and
              Plaid's{" "}
              <Ext href="https://plaid.com/legal/">
                end-user privacy policy
              </Ext>
              . You represent that you are authorized to connect any account you
              link. You can disconnect a linked account at any time within the
              app. Transaction data is provided by third parties and may be
              delayed, incomplete, or miscategorized; Slash does not guarantee
              its accuracy or timeliness.
            </p>
          </Section>

          <Section title="5. App blocking and your responsibility">
            <p>
              The app-blocking feature depends on Apple's Screen Time technology
              and on the apps and limits you choose. Blocking is provided on a
              best-effort basis and may be affected by device settings, software
              updates, connectivity, and Apple's platform behavior. You remain in
              control of your device at all times, you choose which apps to block,
              and you can adjust or remove Screen Time authorization and app
              selections through the app and through iOS settings. Slash is a tool
              to support your own spending decisions; you are solely responsible
              for your financial choices and for any consequences of relying on,
              or of blocking access to, any app.
            </p>
          </Section>

          <Section title="6. No financial advice">
            <p>
              Slash provides budgeting and self-control tools for informational
              purposes only. Nothing in the Service is financial, investment,
              tax, legal, or accounting advice, and nothing in the Service should
              be relied upon as a recommendation to take or refrain from any
              financial action. You should consult a qualified professional for
              advice specific to your situation.
            </p>
          </Section>

          <Section title="7. Acceptable use">
            <p>You agree not to:</p>
            <List>
              <li>
                use the Service for any unlawful purpose or in violation of these
                Terms;
              </li>
              <li>
                access an account or financial data that is not yours or that you
                are not authorized to connect;
              </li>
              <li>
                reverse engineer, decompile, interfere with, or attempt to gain
                unauthorized access to the Service or its systems, except to the
                extent this restriction is prohibited by law;
              </li>
              <li>
                misrepresent your identity or your authority to connect an
                account;
              </li>
              <li>
                use the Service in a way that could damage, disable, or impair it
                or interfere with any other party's use.
              </li>
            </List>
          </Section>

          <Section title="8. License">
            <p>
              Subject to these Terms, we grant you a limited, personal,
              non-exclusive, non-transferable, revocable license to use the Slash
              app on an Apple-branded device that you own or control, as permitted
              by the Usage Rules in the Apple App Store Terms of Service. We and
              our licensors retain all right, title, and interest in and to the
              Service, including all software, content, trademarks, and other
              intellectual property. These Terms do not grant you any rights in
              the Service except as expressly stated.
            </p>
          </Section>

          <Section title="9. Third-party services">
            <p>
              The Service relies on third parties, including Apple, Plaid,
              Supabase, and our hosting provider. Your use of those services may
              be subject to their own terms and privacy policies, and we are not
              responsible for their acts or omissions.
            </p>
          </Section>

          <Section title="10. Disclaimers">
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT
              WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY,
              INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT. We do not warrant
              that the Service will be uninterrupted, timely, secure, or
              error-free, that spending calculations or app blocking will be
              accurate or effective, or that the Service will prevent any
              particular spending or purchase. Some jurisdictions do not allow the
              exclusion of certain warranties, so some of the above may not apply
              to you.
            </p>
          </Section>

          <Section title="11. Limitation of liability">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, SLASH AND ITS OWNERS,
              EMPLOYEES, AND SUPPLIERS WILL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR ANY
              LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATING TO
              YOUR USE OF, OR INABILITY TO USE, THE SERVICE. OUR TOTAL LIABILITY
              FOR ANY CLAIM RELATING TO THE SERVICE WILL NOT EXCEED THE GREATER OF
              THE AMOUNT YOU PAID US FOR THE SERVICE IN THE TWELVE MONTHS BEFORE
              THE CLAIM, OR TWENTY U.S. DOLLARS. Some jurisdictions do not allow
              certain limitations, so some of the above may not apply to you.
            </p>
          </Section>

          <Section title="12. Indemnification">
            <p>
              You agree to indemnify and hold harmless Slash and its owners,
              employees, and suppliers from any claims, damages, liabilities, and
              expenses arising out of your misuse of the Service, your violation
              of these Terms, or your violation of any law or the rights of any
              third party.
            </p>
          </Section>

          <Section title="13. Termination">
            <p>
              You may stop using the Service and delete your account at any time
              from within the app. We may suspend or terminate your access if you
              violate these Terms or if we discontinue the Service. Provisions
              that by their nature should survive termination, including Sections
              6 and 8 through 15, will survive.
            </p>
          </Section>

          <Section title="14. Apple App Store — additional terms">
            <p>
              These terms apply because you obtained the Slash app through the
              Apple App Store, and they are required by Apple. You and we
              acknowledge that:
            </p>
            <List>
              <li>
                These Terms are between you and{" "}
                <Placeholder>[LEGAL ENTITY]</Placeholder> only, and not with
                Apple; Apple is not responsible for the Slash app or its content.
              </li>
              <li>
                Apple has no obligation to furnish any maintenance or support
                services for the Slash app; any support questions should be
                directed to us at{" "}
                <Ext href="mailto:support@theslash.app">support@theslash.app</Ext>
                .
              </li>
              <li>
                In the event the app fails to conform to any applicable warranty,
                you may notify Apple, and Apple may refund the purchase price (if
                any) to you; to the maximum extent permitted by law, Apple has no
                other warranty obligation with respect to the app.
              </li>
              <li>
                We, not Apple, are responsible for addressing any claims by you or
                a third party relating to the app or your use of it, including
                product liability claims, claims that the app fails to conform to
                legal or regulatory requirements, and claims arising under
                consumer protection or similar law.
              </li>
              <li>
                We, not Apple, are responsible for investigating and resolving any
                third-party claim that the app or your use of it infringes that
                party's intellectual property rights.
              </li>
              <li>
                You represent that you are not located in a country subject to a
                U.S. Government embargo or designated as "terrorist supporting,"
                and that you are not listed on any U.S. Government list of
                prohibited or restricted parties.
              </li>
              <li>
                Apple and its subsidiaries are third-party beneficiaries of these
                Terms and, upon your acceptance, have the right to enforce these
                Terms against you.
              </li>
              <li>
                You must comply with any applicable third-party terms of agreement
                when using the app.
              </li>
            </List>
          </Section>

          <Section title="15. Changes, governing law, and contact">
            <p>
              We may update these Terms from time to time; when we make material
              changes we will update the effective date above and, where
              appropriate, provide notice in the app. Your continued use of the
              Service after an update means you accept the revised Terms.
            </p>
            <p>
              These Terms are governed by the laws of{" "}
              <Placeholder>[JURISDICTION]</Placeholder>, without regard to its
              conflict-of-laws rules, and any dispute will be resolved in the
              courts located there, unless applicable law requires otherwise.
            </p>
            <p>Questions about these Terms can be sent to:</p>
            <p className="text-gray-300">
              <Placeholder>[LEGAL ENTITY]</Placeholder>
              <br />
              <Ext href="mailto:support@theslash.app">support@theslash.app</Ext>
            </p>
          </Section>
        </div>

        <footer className="mt-16 border-t border-white/5 pt-8">
          <p className="text-sm text-gray-500">
            © 2025 Slash. All rights reserved.
          </p>
        </footer>
      </div>
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
      <h2 className="mb-4 text-2xl font-semibold text-white">{title}</h2>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="pt-1 text-lg font-semibold text-white/90">{children}</h3>
  );
}

function List({ children }: { children: React.ReactNode }) {
  return (
    <ul className="list-disc space-y-2 pl-6 marker:text-primary">{children}</ul>
  );
}
