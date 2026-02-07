import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
    const existing = await prisma.waitlistEntry.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { message: "You're already on the waitlist! We'll be in touch soon." },
        { status: 200 }
      );
    }

    // Create entry
    await prisma.waitlistEntry.create({
      data: {
        email: normalizedEmail,
        name: name ? String(name).trim().slice(0, 100) : null,
        source: source ? String(source).trim().slice(0, 50) : "direct",
      },
    });

    // Optional: Send welcome email via Resend
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_your_api_key_here") {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
          from: "MeetingSync <onboarding@resend.dev>",
          to: normalizedEmail,
          subject: "Welcome to the MeetingSync waitlist! 🎉",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px;">
              <h1 style="font-size: 24px; font-weight: 700; color: #1e293b; margin-bottom: 16px;">
                You're on the list! 🎉
              </h1>
              <p style="font-size: 16px; color: #475569; line-height: 1.6; margin-bottom: 24px;">
                Hey${name ? ` ${name}` : ""},<br/><br/>
                Thanks for joining the MeetingSync waitlist. We're building something special — an AI-powered tool that automatically turns your meeting notes into action items and syncs them to your favorite project management tools.
              </p>
              <p style="font-size: 16px; color: #475569; line-height: 1.6; margin-bottom: 24px;">
                We'll notify you as soon as we launch. In the meantime, feel free to reply to this email with any questions or feature requests!
              </p>
              <p style="font-size: 14px; color: #94a3b8;">
                — The MeetingSync Team
              </p>
            </div>
          `,
        });
      } catch (emailError) {
        // Don't fail the signup if email fails
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
