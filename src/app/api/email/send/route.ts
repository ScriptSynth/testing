import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/resend";

/**
 * POST /api/email/send
 *
 * Protected endpoint to send emails from hello@syros.tech.
 * Requires ADMIN_PASSWORD in the Authorization header.
 *
 * Body: { to, subject, html }
 */
export async function POST(request: NextRequest) {
  // Auth check
  const authHeader = request.headers.get("Authorization");
  const password = authHeader?.replace("Bearer ", "");

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { to, subject, html } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, html" },
        { status: 400 }
      );
    }

    const data = await sendEmail({ to, subject, html });

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Send email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
