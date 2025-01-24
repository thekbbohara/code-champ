import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

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

    // Send thank you email
    await transporter.sendMail({
      from: "thekbbohara@gmail.com",
      to: email,
      subject: "Welcome to CodeArena - Thank You for Pre-registering!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #6d28d9;">Welcome to CodeArena!</h1>
          <p>Thank you for pre-registering with CodeArena. We're excited to have you join our community of developers!</p>
          <p>You're now part of an exclusive group who will be first to experience our innovative coding platform when we launch. We're building something special, and your early interest means a lot to us.</p>
          <p>Here's what you can expect:</p>
          <ul>
            <li>Early access to our platform</li>
            <li>Special perks for pre-registered members</li>
            <li>Regular updates on our development progress</li>
          </ul>
          <p>We'll notify you as soon as CodeArena is ready to welcome you in. Get ready to level up your coding journey!</p>
          <p>Best regards,<br>The CodeArena Team</p>
        </div>
      `,
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
    //console.log(email);
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });
    //console.log("user", user);

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
