import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    const user = await prisma.user.update({
      where: { email },
      data: { isPreRegistered: true },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Pre-registration error:", error);
    return NextResponse.json(
      { error: "Failed to pre-register" },
      { status: 500 },
    );
  }
}

// GET route to check if a user is pre-registered
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ isPreRegistered: user.isPreRegistered });
  } catch (error) {
    console.error("Error checking pre-registration status:", error);
    return NextResponse.json(
      { error: "Failed to fetch pre-registration status" },
      { status: 500 },
    );
  }
}
