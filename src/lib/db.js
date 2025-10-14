import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"], // Enable detailed logging
  });
} else {
  // Prevent multiple PrismaClient instances during dev hot-reload
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
  }
  prisma = global.prisma;
}

export const connectToDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

export { prisma };
