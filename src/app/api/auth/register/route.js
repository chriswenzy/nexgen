import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    // 🧩 Input validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    // 🔍 Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists." },
        { status: 400 }
      );
    }

    // 🔐 Hash password
    const hashedPassword = await hashPassword(password);

    // 🧾 Create new user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        name: name.trim(),
      },
    });

    // 🚫 Exclude password from response
    const { password: _, ...safeUser } = user;

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully.",
        user: safeUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("💥 Registration error:", error);

    // Handle Prisma or database connection errors gracefully
    if (error.code === "P1001") {
      return NextResponse.json(
        { success: false, message: "Cannot connect to the database." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
