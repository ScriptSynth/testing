import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 }); // 1 hour
    return true;
  }

  if (entry.count >= 5) {
    return false;
  }

  entry.count++;
  return true;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 320;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, name, source } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Check if already exists
    const { data: existing } = await supabase
      .from("waitlist_entries")
      .select("id")
      .eq("email", normalizedEmail)
      .single();

    if (existing) {
      return NextResponse.json(
        { message: "You're already on the waitlist! We'll be in touch soon." },
        { status: 200 }
      );
    }

    // Create entry via Supabase REST API
    const { error: insertError } = await supabase
      .from("waitlist_entries")
      .insert({
        email: normalizedEmail,
        name: name ? String(name).trim().slice(0, 100) : null,
        source: source ? String(source).trim().slice(0, 50) : "direct",
      });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    // Send welcome email via Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_your_api_key_here") {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "Syros <onboarding@resend.dev>",
          to: normalizedEmail,
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
</html>
          `,
        });
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
      }
    }

    return NextResponse.json(
      { message: "You're on the list! We'll notify you when we launch. 🎉" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
