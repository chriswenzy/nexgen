import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { writeFile, unlink } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

/* ================================
   POST /api/products
   Handles file upload + duplicate check + save record
================================== */
export async function POST(request) {
  try {
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

    if (!name || !category || !price || !imageFile) {
      return NextResponse.json(
        { success: false, message: "Missing required fields." },
        { status: 400 }
      );
    }

    // 🧩 Check if product already exists (by name + category + size)
    const existingProduct = await prisma.product.findFirst({
      where: {
        name: { equals: name, mode: "insensitive" },
        category: { equals: category, mode: "insensitive" },
        size: { equals: size, mode: "insensitive" },
        price: { equals: price, mode: "insensitive" },
      },
    });

    if (existingProduct) {
      return NextResponse.json(
        {
          success: false,
          message:
            "A product with the same name, category, and size already exists.",
        },
        { status: 409 }
      );
    }

    // 🧩 Save image to public/uploads
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const filename = `${uuidv4()}-${imageFile.name.replace(/\s+/g, "_")}`;
    const filePath = path.join(process.cwd(), "public/uploads", filename);
    await writeFile(filePath, buffer);

    // ✅ Public URL for image
    const imageUrl = `/uploads/${filename}`;

    // 🧩 Save product to database
    const product = await prisma.product.create({
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
      { success: true, message: "Product created successfully.", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("💥 Product Upload Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create product." },
      { status: 500 }
    );
  }
}

/* ================================
   GET /api/products
   Fetch products with image URLs
================================== */
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.error("💥 Product Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products." },
      { status: 500 }
    );
  }
}
