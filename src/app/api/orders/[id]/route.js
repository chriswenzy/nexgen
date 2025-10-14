import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * GET /api/orders/:id
 * Fetch single order by ID
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: { product: true },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, order }, { status: 200 });
  } catch (error) {
    console.error("💥 Get order error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch order." },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/orders/:id
 * Update order status
 */
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { status } = await request.json();

    if (!status) {
      return NextResponse.json(
        { success: false, message: "Missing status field." },
        { status: 400 }
      );
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(
      { success: true, message: "Order updated successfully.", order: updated },
      { status: 200 }
    );
  } catch (error) {
    console.error("💥 Update order error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update order." },
      { status: 500 }
    );
  }
}
