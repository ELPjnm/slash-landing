import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Slash",
  description:
    "How Slash collects, uses, shares, and protects your information, and the choices and rights you have.",
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

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <h1 className="gradient-text mb-3 text-4xl font-bold italic sm:text-5xl">
          Slash Privacy Policy
        </h1>
        <p className="mb-10 text-sm text-gray-400">
          <span className="font-semibold text-gray-300">Effective date:</span>{" "}
          <Placeholder>[EFFECTIVE DATE]</Placeholder>
        </p>

        <div className="space-y-5 text-[1.0625rem] leading-relaxed text-gray-300">
          <p>
            Slash is a personal financial-wellness app that helps you stay
            within a spending limit you set for yourself. When you exceed that
            limit, Slash uses Apple's Screen Time technology to block the
            shopping apps you choose, on your own iPhone. This Privacy Policy
            explains what information Slash collects, how we use it, who we share
            it with, and the choices and rights you have.
          </p>
          <p>
            In this policy, "Slash," "we," "us," and "our" refer to{" "}
            <Placeholder>[LEGAL ENTITY]</Placeholder>, the operator of the Slash
            app and the theslash.app website. "You" refers to the person using
            the app.
          </p>
          <p>
            We do not sell your personal information, we do not use it for
            advertising, and we do not track you across other apps or websites.
          </p>

          <Section title="1. Information we collect">
            <SubHeading>Account information</SubHeading>
            <p>
              When you create an account, we collect your{" "}
              <strong className="font-semibold text-white">email address</strong>{" "}
              and an authentication credential (your password is never stored by
              us in readable form; it is handled by our authentication provider,
              Supabase). We may also collect your{" "}
              <strong className="font-semibold text-white">name</strong> where it
              is provided to us in connection with your account or bank
              connection.
            </p>

            <SubHeading>Financial information (through Plaid)</SubHeading>
            <p>
              To detect your spending, Slash connects to your bank through{" "}
              <strong className="font-semibold text-white">Plaid Inc.</strong>, a
              third-party financial data provider. When you link a bank, Plaid
              provides us with:
            </p>
            <List>
              <li>
                the{" "}
                <strong className="font-semibold text-white">
                  name of your financial institution
                </strong>{" "}
                and identifiers for the connected accounts;
              </li>
              <li>
                your{" "}
                <strong className="font-semibold text-white">transactions</strong>
                , including the amount, date, merchant or description, and
                category of each transaction.
              </li>
            </List>
            <p>
              We use this information solely to calculate how much you have spent
              during the current period and to compare it against your limit.
              Plaid provides us with a secure access token that lets us retrieve
              your transactions; we store that token in{" "}
              <strong className="font-semibold text-white">encrypted</strong> form
              and never expose it to the app or any third party. We do not receive
              or store your online banking username or password — you enter those
              directly with Plaid. Plaid's handling of your information is
              governed by Plaid's own end-user privacy policy, available at{" "}
              <Ext href="https://plaid.com/legal/">plaid.com/legal</Ext>.
            </p>

            <SubHeading>Spending settings</SubHeading>
            <p>
              We store the settings you configure, such as your weekly spending
              limit, your next-period limit, and whether blocking is enabled.
            </p>

            <SubHeading>Subscription information</SubHeading>
            <p>
              Slash offers an auto-renewable subscription that is purchased and
              managed through{" "}
              <strong className="font-semibold text-white">Apple</strong>. Apple
              processes your payment; we never receive your credit card or payment
              details. We receive from Apple your subscription status (for
              example, whether your subscription is active) so we can provide the
              paid features.
            </p>

            <SubHeading>Information that stays on your device</SubHeading>
            <p>
              The selection of{" "}
              <strong className="font-semibold text-white">
                which apps you choose to block
              </strong>{" "}
              is made through Apple's system Family Activity picker and is stored
              only on your device. Because of how Apple's Screen Time framework is
              designed, this selection and your app-usage data are{" "}
              <strong className="font-semibold text-white">
                never transmitted to us
              </strong>{" "}
              and are not accessible to us or to any third party. Slash also
              stores small amounts of app-state data on your device (for example,
              your onboarding progress) to make the app function.
            </p>

            <SubHeading>Information we do not collect</SubHeading>
            <p>
              Slash does not collect your precise location, your contacts, your
              photos, your microphone or camera input, or advertising
              identifiers. Slash does not include analytics or advertising
              software development kits, and it does not use the App Tracking
              Transparency framework because it does not track you.
            </p>
          </Section>

          <Section title="2. How we use your information">
            <p>We use the information described above to:</p>
            <List>
              <li>
                provide the core function of the app — monitoring your spending
                against the limit you set and blocking the apps you selected when
                you exceed it;
              </li>
              <li>authenticate you and keep your account secure;</li>
              <li>provide and manage your subscription;</li>
              <li>
                respond to your support requests and send you essential service
                messages;
              </li>
              <li>
                maintain the security and integrity of the service, prevent fraud
                and abuse, and comply with legal obligations.
              </li>
            </List>
            <p>
              We do not use your financial or personal information for
              advertising, marketing profiling, or use-based data mining, and we
              do not sell or rent it.
            </p>
          </Section>

          <Section title="3. Legal bases for processing">
            <p>
              Where the EU or UK General Data Protection Regulation applies, we
              process your information on the following bases:
            </p>
            <List>
              <li>
                to{" "}
                <strong className="font-semibold text-white">
                  perform our contract
                </strong>{" "}
                with you (providing the app's core spending-monitoring and
                blocking features, and your subscription);
              </li>
              <li>
                your <strong className="font-semibold text-white">consent</strong>{" "}
                (for example, when you choose to connect a bank account), which
                you may withdraw at any time by disconnecting the bank or deleting
                your account;
              </li>
              <li>
                our{" "}
                <strong className="font-semibold text-white">
                  legitimate interests
                </strong>{" "}
                in securing the service and preventing abuse;
              </li>
              <li>
                <strong className="font-semibold text-white">
                  compliance with legal obligations
                </strong>
                .
              </li>
            </List>
          </Section>

          <Section title="4. How we share information">
            <p>
              We share information only with the service providers that make Slash
              work, and only to the extent needed to provide the service. We
              require these providers to protect your information to a standard
              consistent with this policy and with applicable law.
            </p>
            <List>
              <li>
                <strong className="font-semibold text-white">Plaid</strong> —
                connects to your bank and provides transaction data. See{" "}
                <Ext href="https://plaid.com/legal/">plaid.com/legal</Ext>.
              </li>
              <li>
                <strong className="font-semibold text-white">Supabase</strong> —
                provides authentication and database hosting for your account,
                settings, and transaction records. See{" "}
                <Ext href="https://supabase.com/privacy">
                  supabase.com/privacy
                </Ext>
                .
              </li>
              <li>
                <strong className="font-semibold text-white">Railway</strong> —
                hosts our backend server infrastructure. See{" "}
                <Ext href="https://railway.app/legal/privacy">
                  railway.app/legal/privacy
                </Ext>
                .
              </li>
              <li>
                <strong className="font-semibold text-white">Apple</strong> —
                processes your subscription purchases and operates the App Store
                and Screen Time technology. See{" "}
                <Ext href="https://www.apple.com/legal/privacy/">
                  apple.com/legal/privacy
                </Ext>
                .
              </li>
            </List>
            <p>
              We may also disclose information if required to do so by law, or to
              protect the rights, safety, and security of our users, the public,
              or Slash. If Slash is involved in a merger, acquisition, or sale of
              assets, we will provide notice before your information is
              transferred and becomes subject to a different privacy policy.
            </p>
            <p>
              We do not share your information with third parties for their own
              marketing or advertising purposes.
            </p>
          </Section>

          <Section title="5. Data security">
            <p>
              We protect your information using industry-standard measures. Bank
              access tokens are encrypted at rest using AES-256-GCM, and they are
              never returned to the app or to any client. All communication
              between the app and our servers occurs over encrypted connections
              (HTTPS/TLS). Access to your records is restricted to your own
              account through database row-level security and authenticated
              requests. No method of transmission or storage is completely secure,
              but we work to protect your information and to limit what we collect
              to what the app needs.
            </p>
          </Section>

          <Section title="6. Data retention">
            <p>
              We retain your account information, settings, and transaction
              records for as long as your account is active. When you delete your
              account, we permanently delete this information, as described in
              Section 7. We may retain a limited amount of information where
              necessary to comply with legal obligations, resolve disputes, or
              enforce our agreements, after which it is deleted.
            </p>
          </Section>

          <Section title="7. Your choices and rights">
            <SubHeading>Disconnecting your bank</SubHeading>
            <p>
              You can disconnect a linked bank account at any time from within the
              app. When you do, we instruct Plaid to remove the connection and we
              stop retrieving your transactions.
            </p>

            <SubHeading>Deleting your account</SubHeading>
            <p>
              You can delete your account and all associated data entirely from
              within the app, in Settings. Deleting your account permanently
              removes your profile, your settings, your transaction records, and
              your bank connections, and it revokes your bank access token with
              Plaid. Account deletion is immediate and cannot be undone; it is
              separate from simply signing out.
            </p>

            <SubHeading>Your privacy rights</SubHeading>
            <p>
              Depending on where you live, you may have the right to access,
              correct, delete, or export your personal information, to object to
              or restrict certain processing, and to withdraw consent. Because
              Slash lets you view your data in the app and delete your account and
              data directly, you can exercise the core of these rights yourself at
              any time. For any additional request, contact us at{" "}
              <Ext href="mailto:privacy@theslash.app">privacy@theslash.app</Ext>{" "}
              and we will respond as required by applicable law. You will not be
              discriminated against for exercising your privacy rights.
            </p>

            <SubHeading>California residents</SubHeading>
            <p>
              We do not sell or share your personal information as those terms are
              defined under the California Consumer Privacy Act, and we do not use
              it for cross-context behavioral advertising. California residents
              have the rights described above and may exercise them as set out
              here.
            </p>
          </Section>

          <Section title="8. Children's privacy">
            <p>
              Slash is not directed to children, and it is not intended for use by
              anyone under the age of 16. We do not knowingly collect personal
              information from children. If you believe a child has provided us
              with personal information, contact us at{" "}
              <Ext href="mailto:privacy@theslash.app">privacy@theslash.app</Ext>{" "}
              and we will delete it.
            </p>
          </Section>

          <Section title="9. International data transfers">
            <p>
              We operate in the United States, and our service providers may
              process your information in the United States and other countries.
              Where required, we rely on appropriate safeguards for international
              transfers of personal information.
            </p>
          </Section>

          <Section title="10. Changes to this policy">
            <p>
              We may update this Privacy Policy from time to time. When we make
              material changes, we will update the effective date above and, where
              appropriate, provide additional notice within the app. Your
              continued use of Slash after an update means you accept the revised
              policy.
            </p>
          </Section>

          <Section title="11. Contact us">
            <p>
              If you have questions about this Privacy Policy or how we handle
              your information, contact us at:
            </p>
            <p className="text-gray-300">
              <Placeholder>[LEGAL ENTITY]</Placeholder>
              <br />
              <Ext href="mailto:privacy@theslash.app">privacy@theslash.app</Ext>
            </p>
            <p>
              This policy is governed by the laws of{" "}
              <Placeholder>[JURISDICTION]</Placeholder>, without regard to its
              conflict-of-laws rules.
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
