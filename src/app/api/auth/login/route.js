export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword, generateToken } from "@/lib/auth";
import validator from "validator";

// ✅ Unified error response helper
function errorResponse(message, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function POST(request) {
  try {
    // ✅ Handle malformed or non-JSON body safely
    let body;
    try {
      body = await request.json();
    } catch {
      return errorResponse(
        "Invalid request body format. Must be valid JSON.",
        400
      );
    }

    const { email, password } = body || {};

    // ✅ Validate required fields
    if (!email || !password) {
      return errorResponse("Email and password are required.", 400);
    }

    // ✅ Validate email format and password strength
    if (!validator.isEmail(email)) {
      return errorResponse("Please provide a valid email address.", 400);
    }

    if (typeof password !== "string" || password.length < 6) {
      return errorResponse("Password must be at least 6 characters long.", 400);
    }

    // ✅ Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (!user) {
      return errorResponse("Invalid email or password.", 401);
    }

    // ✅ Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    if (!isValidPassword) {
      return errorResponse("Invalid email or password.", 401);
    }

    // ✅ Generate token
    const token = generateToken(user.id);
    const { password: _, ...userWithoutPassword } = user;

    // ✅ Prepare response
    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      user: userWithoutPassword,
      token,
    });

    // ✅ Set cookie securely
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("💥 Login error:", error);

    // ✅ Handle Prisma known errors or fallback
    if (error.name === "PrismaClientKnownRequestError") {
      return errorResponse("Database error. Please try again later.", 500);
    }

    return errorResponse(
      "An unexpected error occurred. Please try again later.",
      500
    );
  }
}

// ✅ Optional: Explicitly handle unsupported methods
export async function GET() {
  return errorResponse("Method not allowed. Use POST instead.", 405);
}
