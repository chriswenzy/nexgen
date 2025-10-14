import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/* ================================
   POST /api/order-items
   Create a new Order Item
================================== */
export async function POST(request) {
  try {
    const { orderId, productId, quantity, price } = await request.json();

    if (!orderId || !productId || !quantity || !price) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // ✅ Check if order exists
    const orderExists = await prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!orderExists) {
      return NextResponse.json(
        { success: false, message: "Order not found." },
        { status: 404 }
      );
    }

    // ✅ Check if product exists
    const productExists = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (!productExists) {
      return NextResponse.json(
        { success: false, message: "Product not found." },
        { status: 404 }
      );
    }

    // 🧩 Create the order item
    const orderItem = await prisma.orderItem.create({
      data: {
        orderId,
        productId,
        quantity: Number(quantity),
        price: price,
      },
      include: {
        product: { select: { name: true, image: true, price: true } },
      },
    });

    return NextResponse.json(
      { success: true, message: "Order item created successfully.", orderItem },
      { status: 201 }
    );
  } catch (error) {
    console.error("💥 OrderItem Create Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create order item." },
      { status: 500 }
    );
  }
}

/* ================================
   GET /api/order-items
   Fetch all or by orderId
================================== */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");

    const where = orderId ? { orderId } : {};

    const orderItems = await prisma.orderItem.findMany({
      where,
      include: {
        product: { select: { name: true, image: true, price: true } },
        order: { select: { id: true, status: true, createdAt: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, orderItems }, { status: 200 });
  } catch (error) {
    console.error("💥 OrderItem Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch order items." },
      { status: 500 }
    );
  }
}

/* ================================
   PUT /api/order-items
   Update an existing Order Item
================================== */
export async function PUT(request) {
  try {
    const { id, quantity, price } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Order item ID is required." },
        { status: 400 }
      );
    }

    const updatedOrderItem = await prisma.orderItem.update({
      where: { id },
      data: {
        quantity: quantity ? Number(quantity) : undefined,
        price: price ? price : undefined,
      },
      include: {
        product: { select: { name: true, price: true } },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order item updated successfully.",
        orderItem: updatedOrderItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("💥 OrderItem Update Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update order item." },
      { status: 500 }
    );
  }
}

/* ================================
   DELETE /api/order-items
   Delete an Order Item by ID
================================== */
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Order item ID is required." },
        { status: 400 }
      );
    }

    await prisma.orderItem.delete({ where: { id } });

    return NextResponse.json(
      { success: true, message: "Order item deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("💥 OrderItem Delete Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete order item." },
      { status: 500 }
    );
  }
}
