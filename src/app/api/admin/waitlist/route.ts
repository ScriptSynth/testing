import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  // Simple password auth
  const authHeader = request.headers.get("Authorization");
  const password = authHeader?.replace("Bearer ", "");

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const entries = await prisma.waitlistEntry.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ entries, count: entries.length });
  } catch (error) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch entries" },
      { status: 500 }
    );
  }
}
