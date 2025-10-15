const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function updateOrderItemsWithProductNames() {
  try {
    // Get all order items that don't have productName
    const orderItems = await prisma.orderItem.findMany({
      where: {
        productName: null,
      },
      include: {
        product: true,
      },
    });

    console.log(`Found ${orderItems.length} order items to update`);

    // Update each order item with the product name
    for (const item of orderItems) {
      if (item.product) {
        await prisma.orderItem.update({
          where: { id: item.id },
          data: { productName: item.product.name },
        });
        console.log(
          `Updated order item ${item.id} with product name: ${item.product.name}`
        );
      }
    }

    console.log("✅ Successfully updated all order items with product names");
  } catch (error) {
    console.error("❌ Error updating order items:", error);
  } finally {
    await prisma.$disconnect();
  }
}

updateOrderItemsWithProductNames();
