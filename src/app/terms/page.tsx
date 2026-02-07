import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "MeetingSync terms of service — the rules governing use of our platform.",
};

export default function TermsOfService() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: February 7, 2026</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing or using MeetingSync (&quot;the Service&quot;), you agree to be bound by
            these Terms of Service. If you do not agree to these terms, please do not use the
            Service.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">2. Description of Service</h2>
          <p>
            MeetingSync is a software-as-a-service (SaaS) platform that uses artificial intelligence
            to detect action items from meeting notes and sync them to project management tools. The
            Service is currently in pre-launch (waitlist) phase.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">3. Waitlist</h2>
          <p>
            By joining our waitlist, you consent to receive email communications about product
            updates, launch announcements, and related information. You can unsubscribe at any time
            using the link in our emails or by contacting us directly.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">4. User Accounts</h2>
          <p>
            When the Service launches, you may need to create an account. You are responsible for
            maintaining the confidentiality of your account credentials and for all activities under
            your account.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">5. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Use the Service for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to the Service or its systems</li>
            <li>Interfere with or disrupt the Service&apos;s infrastructure</li>
            <li>Submit false or misleading information</li>
            <li>Use automated systems to excessively access the Service</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">6. Intellectual Property</h2>
          <p>
            All content, features, and functionality of the Service are owned by MeetingSync and are
            protected by international copyright, trademark, and other intellectual property laws.
            Your meeting notes and data remain your property.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">7. Limitation of Liability</h2>
          <p>
            MeetingSync is provided &quot;as is&quot; without warranties of any kind. We shall not be
            liable for any indirect, incidental, special, or consequential damages resulting from
            your use of the Service. Our total liability shall not exceed the amounts paid by you in
            the 12 months preceding the claim.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">8. Termination</h2>
          <p>
            We may terminate or suspend your access to the Service at any time, with or without
            cause, with or without notice. You may cancel your account or remove yourself from the
            waitlist at any time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify you of material
            changes via email or a notice on our website. Continued use of the Service after changes
            constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-foreground">10. Contact Us</h2>
          <p>
            Questions about these terms? Contact us at{" "}
            <a href="mailto:legal@meetingsync.io" className="text-primary underline">
              legal@meetingsync.io
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
