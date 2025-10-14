import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

/* ================================
   POST /api/users
   Create (Register) a new user
================================== */
export async function POST(request) {
  try {
    const { email, password, name, role } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // ✅ Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists." },
        { status: 409 }
      );
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧩 Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || "CUSTOMER",
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { success: true, message: "User registered successfully.", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("💥 User Creation Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to register user." },
      { status: 500 }
    );
  }
}

/* ================================
   GET /api/users
   Fetch all users (admin use)
================================== */
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        emailVerified: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error("💥 User Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users." },
      { status: 500 }
    );
  }
}

/* ================================
   PUT /api/users
   Update user details
================================== */
export async function PUT(request) {
  try {
    const { id, name, role, emailVerified } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, role, emailVerified },
      select: { id: true, name: true, role: true, emailVerified: true },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User updated successfully.",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("💥 User Update Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update user." },
      { status: 500 }
    );
  }
}

/* ================================
   DELETE /api/users
   Delete user by ID
================================== */
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json(
      { success: true, message: "User deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("💥 User Delete Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete user." },
      { status: 500 }
    );
  }
}
