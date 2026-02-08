import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase";
import { EMAIL_ADDRESS } from "@/lib/resend";

/**
 * POST /api/email/inbound
 *
 * Resend Inbound Webhook — receives emails sent TO hello@syros.tech only.
 * Verifies the webhook signature using RESEND_WEBHOOK_SECRET.
 *
 * Setup in Resend dashboard:
 *   1. Go to https://resend.com/webhooks
 *   2. Add a webhook with URL: https://syros.tech/api/email/inbound
 *   3. Select the "email.received" event
 *   4. Copy the signing secret into RESEND_WEBHOOK_SECRET env var
 */

interface InboundEmailPayload {
  type: string;
  created_at: string;
  data: {
    from: string;
    to: string[];
    cc?: string[];
    bcc?: string[];
    subject: string;
    text?: string;
    html?: string;
    headers?: Record<string, string>;
    attachments?: {
      filename: string;
      content_type: string;
      size: number;
    }[];
  };
}

// ── Webhook signature verification ─────────────────────────────────────
function verifyWebhookSignature(body: string, signature: string | null): boolean {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) {
    console.warn("RESEND_WEBHOOK_SECRET not set — skipping verification");
    return true; // allow in dev
  }
  if (!signature) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();

    // Verify webhook signature
    const signature = request.headers.get("resend-signature");
    if (!verifyWebhookSignature(rawBody, signature)) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload: InboundEmailPayload = JSON.parse(rawBody);

    // Verify this is an inbound email event
    if (payload.type !== "email.received") {
      return NextResponse.json({ received: true });
    }

    const { from, to, cc, subject, text, html } = payload.data;

    // Only process emails sent to hello@syros.tech
    const isForUs = to.some(
      (addr) => addr.toLowerCase().includes(EMAIL_ADDRESS)
    );
    if (!isForUs) {
      console.log(`Ignoring email to ${to.join(", ")} — not for ${EMAIL_ADDRESS}`);
      return NextResponse.json({ received: true });
    }

    console.log(
      `📩 Inbound email from ${from} to ${to.join(", ")} — Subject: ${subject}`
    );

    // Store in Supabase (create table if using this feature)
    const { error } = await supabase.from("inbound_emails").insert({
      from_address: from,
      to_addresses: to,
      cc_addresses: cc || [],
      subject: subject || "(no subject)",
      body_text: text || null,
      body_html: html || null,
      received_at: payload.created_at || new Date().toISOString(),
      raw_payload: payload,
    });

    if (error) {
      console.error("Failed to store inbound email:", error);
      // Still return 200 so Resend doesn't retry
    }

    // ── Auto-reply or routing logic can go here ──
    // All inbound emails arrive at hello@syros.tech.

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Inbound email webhook error:", error);
    // Return 200 to prevent Resend from retrying on parse errors
    return NextResponse.json({ received: true });
  }
}
