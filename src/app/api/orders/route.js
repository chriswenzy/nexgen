import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateInvoiceHtml } from "@/lib/invoiceTemplate";
import { generatePdfFromHtml } from "@/lib/pdf";
import { emailInvoice } from "@/lib/emailInvoice";

/* ================================
   POST /api/orders
   Create an order + order items
   Supports guest checkout
================================== */
/* ================================
   POST /api/orders
   Create an order + order items + invoice
================================== */
// export async function POST(request) {
//   const tx = prisma.$transaction.bind(prisma);

//   try {
//     const {
//       name,
//       email,
//       phone,
//       address,
//       userId = null,
//       items,
//       totalAmount,
//     } = await request.json();

//     if (!name || !email || !address || !items?.length) {
//       return NextResponse.json(
//         { success: false, message: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const productIds = items.map((i) => i.productId);
//     const products = await prisma.product.findMany({
//       where: { id: { in: productIds } },
//     });

//     if (products.length !== items.length)
//       throw new Error("Some products not found");

//     const order = await prisma.$transaction(async (tx) => {
//       const newOrder = await tx.order.create({
//         data: {
//           userId,
//           name,
//           email,
//           phone,
//           address,
//           totalAmount,
//           status: "PENDING",
//         },
//       });

//       const orderItemsData = [];
//       for (const item of items) {
//         const product = products.find((p) => p.id === item.productId);
//         if (!product) throw new Error(`Product not found`);
//         if (product.stock < item.quantity)
//           throw new Error(`Insufficient stock for ${product.name}`);

//         orderItemsData.push({
//           orderId: newOrder.id,
//           productId: product.id,
//           quantity: item.quantity,
//           price: item.price,
//         });

//         await tx.product.update({
//           where: { id: product.id },
//           data: { stock: { decrement: item.quantity } },
//         });
//       }

//       await tx.orderItem.createMany({ data: orderItemsData });

//       return newOrder;
//     });

//     // 🧩 Generate invoice (rollback safe)
//     const invoiceId = uuidv4();
//     const company = {
//       name: "NextGen Paints Ltd.",
//       email: "support@nextgenpaints.com",
//       phone: "+234 800 555 9999",
//       address: "Plot 15, Industrial Layout, Lagos, Nigeria",
//       themeColor: "#008037",
//     };

//     const invoiceHtml = generateInvoiceHtml({
//       order,
//       items,
//       products,
//       company,
//     });
//     const invoiceUrl = await generatePdfFromHtml(
//       invoiceHtml,
//       `${invoiceId}.pdf`
//     );

//     // ✅ Save invoice URL
//     await prisma.order.update({
//       where: { id: order.id },
//       data: { invoiceUrl },
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Order placed successfully and stock updated",
//         order,
//         invoiceUrl,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("💥 Checkout Error:", error);

//     // ⚠️ Rollback stock if failed
//     if (error.message.includes("Failed to generate invoice PDF")) {
//       console.log("Rolling back stock due to PDF failure...");
//       for (const item of items || []) {
//         await prisma.product.update({
//           where: { id: item.productId },
//           data: { stock: { increment: item.quantity } },
//         });
//       }
//     }

//     return NextResponse.json(
//       { success: false, message: error.message || "Checkout failed" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request) {
  try {
    const data = await request.json();
    const { customerName, customerEmail, items, address, phone } = data;

    if (!items || !items.length) {
      return NextResponse.json(
        { success: false, message: "No order items provided." },
        { status: 400 }
      );
    }

    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          customerName,
          customerEmail,
          address,
          phone,
          total,
          status: "PENDING",
        },
      });

      for (const item of items) {
        await tx.orderItem.create({
          data: {
            orderId: newOrder.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          },
        });

        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: { decrement: item.quantity },
          },
        });
      }

      return newOrder;
    });

    const invoiceHtml = await generateInvoiceHtml({
      order,
      items,
      total,
      customerName,
      customerEmail,
      address,
      phone,
    });

    // 💌 Send invoice email asynchronously (don’t block API)
    emailInvoice({
      order,
      items,
      total,
      customerName,
      customerEmail,
      address,
      phone,
    }).then((r) => console.log(r.message));

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully.",
        order,
        invoiceHtml,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("💥 Order Creation Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create order." },
      { status: 500 }
    );
  }
}

/* ================================
   GET /api/orders
   Fetch all or by userId
================================== */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const where = userId ? { userId } : {};

    const orders = await prisma.order.findMany({
      where,
      include: {
        orderItems: {
          include: {
            product: { select: { name: true, image: true, price: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error("💥 Order Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders." },
      { status: 500 }
    );
  }
}

/* ================================
   PUT /api/orders
   Update order status
================================== */
export async function PUT(request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Order ID and status are required." },
        { status: 400 }
      );
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order updated successfully.",
        order: updatedOrder,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("💥 Order Update Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update order." },
      { status: 500 }
    );
  }
}

/* ================================
   DELETE /api/orders
   Cancel or delete order
================================== */
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Order ID is required." },
        { status: 400 }
      );
    }

    await prisma.order.delete({ where: { id } });

    return NextResponse.json(
      { success: true, message: "Order deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("💥 Order Delete Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete order." },
      { status: 500 }
    );
  }
}
