import jwt from "jsonwebtoken";

export async function verifyAuth(request) {
  try {
    // 🔎 Get token from Authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { authorized: false, message: "Missing or invalid token." };
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET not defined in environment variables.");
    }

    // ✅ Verify token
    const decoded = jwt.verify(token, secret);

    return { authorized: true, user: decoded };
  } catch (error) {
    console.error("🔒 Auth verification failed:", error.message);
    return { authorized: false, message: "Unauthorized access." };
  }
}
