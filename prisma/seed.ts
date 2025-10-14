// prisma/seed.ts
import { hashPassword } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await hashPassword("admin123");

  await prisma.user.upsert({
    where: { email: "admin@nexgen.com" },
    update: {},
    create: {
      email: "admin@nexgen.com",
      password: hashedPassword,
      name: "Admin User",
      role: "ADMIN",
    },
  });

  // Create sample paint products
  const products = [
    {
      id: "00001",
      name: "Core Matt",
      description: "High-quality interior matt paint for walls and ceilings",
      category: "Interior Paint",
      subCategory: "Standard Matte",
      size: "20L",
      price: "₦55,000",
      oldPrice: "₦56,375",
      image: "/images/products/buckets/bucket_1.jpg",
      stock: 50,
      featured: true,
    },
    {
      id: "00002",
      name: "Premium Silk",
      description: "Washable silk finish paint for interior walls",
      category: "Interior Paint",
      subCategory: "Silk Finish",
      size: "4L",
      price: "₦15,000",
      oldPrice: "₦16,500",
      image: "/images/products/buckets/bucket_2.jpg",
      stock: 30,
      featured: true,
    },
    {
      id: "00003",
      name: "Weather Shield",
      description: "Exterior weather-resistant paint",
      category: "Exterior Paint",
      subCategory: "Weather Resistant",
      size: "20L",
      price: "₦65,000",
      oldPrice: "₦68,000",
      image: "/images/products/buckets/bucket_3.jpg",
      stock: 25,
      featured: false,
    },
    {
      id: "00004",
      name: "Bathroom & Kitchen",
      description: "Mold-resistant paint for humid areas",
      category: "Specialty Paint",
      subCategory: "Moisture Resistant",
      size: "4L",
      price: "₦18,500",
      oldPrice: "₦20,000",
      image: "/images/products/buckets/bucket_4.jpg",
      stock: 40,
      featured: true,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product,
    });
  }

  console.log("Seed data created successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
