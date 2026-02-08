import { Resend } from "resend";

// ── Resend Client ──────────────────────────────────────────────────────
export const resend = new Resend(process.env.RESEND_API_KEY);

// ── Constants ──────────────────────────────────────────────────────────
// All emails are sent from and received at this single address
export const EMAIL_ADDRESS = "hello@syros.tech";
export const EMAIL_FROM = `Syros <${EMAIL_ADDRESS}>`;

// ── Helper: send a single email ────────────────────────────────────────
interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  tags?: { name: string; value: string }[];
}

export async function sendEmail({
  to,
  subject,
  html,
  tags,
}: SendEmailOptions) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set – skipping email send");
    return null;
  }

  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    reply_to: EMAIL_ADDRESS,
    tags,
  });

  if (error) {
    console.error("Resend error:", error);
    throw new Error(error.message);
  }

  return data;
}

// ── Waitlist Welcome Email Template ────────────────────────────────────
export function buildWaitlistWelcomeEmail(name?: string | null): {
  subject: string;
  html: string;
} {
  return {
    subject: "You're in! Welcome to Syros 🎉",
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          
          <!-- Gradient Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a855f7 100%);padding:40px 32px;text-align:center;">
              <div style="display:inline-block;background:rgba(255,255,255,0.2);border-radius:12px;padding:12px 16px;margin-bottom:16px;">
                <span style="font-size:28px;font-weight:900;color:white;">S</span>
              </div>
              <h1 style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                Syros
              </h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.8);letter-spacing:0.5px;text-transform:uppercase;">
                AI-Powered Meeting Intelligence
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 32px 0;">
              <h2 style="margin:0 0 8px;font-size:22px;font-weight:700;color:#1e293b;">
                You're on the list! 🎉
              </h2>
              <p style="margin:0 0 20px;font-size:15px;color:#64748b;line-height:1.7;">
                Hey${name ? ` <strong>${name}</strong>` : " there"},
              </p>
              <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.7;">
                Thanks for joining the Syros waitlist. We're building something special — an AI-powered tool that <strong>automatically turns your meeting notes into action items</strong> and syncs them directly to your project management tools.
              </p>
            </td>
          </tr>

          <!-- Feature Highlights -->
          <tr>
            <td style="padding:0 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom:14px;">
                          <span style="font-size:16px;margin-right:10px;">🎙️</span>
                          <span style="font-size:14px;color:#334155;font-weight:600;">AI Meeting Transcription</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom:14px;">
                          <span style="font-size:16px;margin-right:10px;">✅</span>
                          <span style="font-size:14px;color:#334155;font-weight:600;">Auto Action Item Extraction</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span style="font-size:16px;margin-right:10px;">🔄</span>
                          <span style="font-size:14px;color:#334155;font-weight:600;">Sync to Trello, Asana, ClickUp & More</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding:28px 32px 0;text-align:center;">
              <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.7;">
                We'll send you an exclusive invite as soon as we launch. Early waitlist members get <strong style="color:#6366f1;">priority access + special pricing</strong>.
              </p>
              <a href="https://syros.tech" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 32px;border-radius:10px;letter-spacing:0.3px;">
                Visit Syros →
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:32px 32px 0;">
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px 32px;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;color:#94a3b8;line-height:1.6;">
                Have questions or feature ideas? Just reply to this email — we read every message.
              </p>
              <p style="margin:0;font-size:12px;color:#cbd5e1;">
                © ${new Date().getFullYear()} Syros. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };
}
