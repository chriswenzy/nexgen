import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import crypto from "crypto";

export async function POST(req) {
  try {
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const body = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    // ✅ Verify webhook signature
    const hash = crypto.createHmac("sha512", secret).update(body).digest("hex");
    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    // ✅ Handle successful charge
    if (event.event === "charge.success") {
      const data = event.data;
      const email = data.customer.email;
      const amount = data.amount / 100; // Paystack sends kobo
      const reference = data.reference;

      // 🔍 Find order by email or your custom order reference
      const order = await prisma.order.findFirst({
        where: {
          customerEmail: email,
          total: amount,
          status: "PENDING",
        },
      });

      if (!order) {
        return NextResponse.json(
          { message: "Order not found" },
          { status: 404 }
        );
      }

      // ✅ Update status to PAID
      await prisma.order.update({
        where: { id: order.id },
        data: { status: "PAID", updatedAt: new Date() },
      });

      console.log("✅ Order marked as PAID:", order.id);
      return NextResponse.json({ message: "Order updated to PAID" });
    }

    // ❌ Handle failed charge
    if (event.event === "charge.failed") {
      const data = event.data;
      const email = data.customer.email;

      await prisma.order.updateMany({
        where: { customerEmail: email, status: "PENDING" },
        data: { status: "FAILED", updatedAt: new Date() },
      });

      console.log("❌ Payment failed for:", email);
      return NextResponse.json({ message: "Order marked as FAILED" });
    }

    return NextResponse.json({ message: "Event ignored" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
