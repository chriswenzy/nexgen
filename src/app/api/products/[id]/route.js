import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

/* ================================
   GET /api/products/:id
   Fetch single product
================================== */
export async function GET(_, { params }) {
  try {
    const { id } = params;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    console.error("💥 Product Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch product." },
      { status: 500 }
    );
  }
}

/* ================================
   PUT /api/products/:id
   Update product (with optional new image)
================================== */
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const formData = await request.formData();

    const name = formData.get("name");
    const category = formData.get("category");
    const price = formData.get("price");
    const description = formData.get("description") || null;
    const subCategory = formData.get("subCategory") || null;
    const size = formData.get("size") || "N/A";
    const oldPrice = formData.get("oldPrice") || null;
    const stock = Number(formData.get("stock")) || 0;
    const featured = formData.get("featured") === "true";
    const imageFile = formData.get("image");

    const existing = await prisma.product.findUnique({ where: { id } });
    if (!existing)
      return NextResponse.json(
        { success: false, message: "Product not found." },
        { status: 404 }
      );

    let imageUrl = existing.image;

    // If new image is uploaded
    if (imageFile && imageFile.name) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = `${uuidv4()}-${imageFile.name.replace(/\s+/g, "_")}`;
      const filePath = path.join(process.cwd(), "public/uploads", filename);
      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${filename}`;

      // Delete old image if exists
      if (existing.image) {
        const oldPath = path.join(process.cwd(), "public", existing.image);
        try {
          await unlink(oldPath);
        } catch {
          console.warn("⚠️ Old image not found or already deleted:", oldPath);
        }
      }
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        category,
        subCategory,
        size,
        price,
        oldPrice,
        image: imageUrl,
        stock,
        featured,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product updated successfully.",
        product: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("💥 Product Update Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update product." },
      { status: 500 }
    );
  }
}

/* ================================
   DELETE /api/products/:id
   Remove product and image
================================== */
export async function DELETE(_, { params }) {
  try {
    const { id } = params;
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found." },
        { status: 404 }
      );
    }

    // Delete image file if exists
    if (product.image) {
      const filePath = path.join(process.cwd(), "public", product.image);
      try {
        await unlink(filePath);
      } catch {
        console.warn("⚠️ Image file not found:", filePath);
      }
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json(
      { success: true, message: "Product deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("💥 Product Delete Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete product." },
      { status: 500 }
    );
  }
}
