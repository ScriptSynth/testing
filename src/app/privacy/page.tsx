import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "MeetingSync privacy policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: February 7, 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">1. Information We Collect</h2>
          <p>
            When you join our waitlist, we collect your <strong>email address</strong> and optionally
            your <strong>name</strong>. We also collect basic analytics data such as referral source
            (UTM parameters) and your approximate location based on IP address. We do not collect
            sensitive personal data.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Send you updates about our launch and product development</li>
            <li>Respond to your questions and support requests</li>
            <li>Improve our website and user experience</li>
            <li>Analyze aggregated, anonymized usage patterns</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">3. Data Storage & Security</h2>
          <p>
            Your data is stored securely on servers provided by Supabase (PostgreSQL databases hosted
            on AWS). All data is encrypted at rest using AES-256 and in transit using TLS 1.3. We
            follow industry-standard security practices to protect your information.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">4. Data Sharing</h2>
          <p>
            We do not sell, rent, or share your personal data with third parties for marketing
            purposes. We may share data with service providers (e.g., email delivery via Resend,
            hosting via Vercel) solely to operate our service. These providers are contractually
            obligated to protect your data.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">5. Cookies</h2>
          <p>
            We use essential cookies to ensure our website functions properly. We do not use
            advertising cookies or third-party tracking cookies. You can disable cookies in your
            browser settings at any time.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Unsubscribe from our communications at any time</li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, email us at{" "}
            <a href="mailto:privacy@meetingsync.io" className="text-primary underline">
              privacy@meetingsync.io
            </a>.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">7. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. We will notify you of significant changes
            via email or a prominent notice on our website.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">8. Contact Us</h2>
          <p>
            If you have questions about this privacy policy, contact us at{" "}
            <a href="mailto:privacy@meetingsync.io" className="text-primary underline">
              privacy@meetingsync.io
            </a>.
          </p>
        </section>
      </div>

      <div className="mt-12">
        <a href="/" className="text-sm text-primary hover:underline">
          ← Back to MeetingSync
        </a>
      </div>
    </main>
  );
}
