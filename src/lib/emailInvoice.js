import nodemailer from "nodemailer";
import { generateInvoiceHtml } from "./invoiceHtml.js";

/**
 * Send invoice email to customer
 * @param {Object} orderData
 */
export async function emailInvoice(orderData) {
  const { order, items, total, customerName, customerEmail, address, phone } =
    orderData;

  try {
    // 🧩 Generate HTML invoice content
    const html = await generateInvoiceHtml({
      order,
      items,
      total,
      customerName,
      customerEmail,
      address,
      phone,
    });

    // 📨 Configure mail transporter (use environment vars in production)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false, // true for port 465, false for 587
      auth: {
        user: process.env.EMAIL_USER, // your email
        pass: process.env.EMAIL_PASSWORD, // your app password
      },
    });

    // 🧾 Send mail
    const info = await transporter.sendMail({
      from: `"NextGen Paints" <${process.env.EMAIL_USER}>`,
      to: customerEmail,
      subject: `Your Order Invoice - ${order.id}`,
      html,
    });

    console.log("✅ Invoice email sent:", info.messageId);
    return { success: true, message: "Invoice email sent." };
  } catch (error) {
    console.error("💥 Email sending failed:", error);
    return { success: false, message: "Failed to send invoice email." };
  }
}
