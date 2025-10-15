import nodemailer from "nodemailer";
import { generateInvoiceHtml } from "./invoiceHtml.js";

/**
 * Send invoice email to customer
 * @param {Object} orderData
 */
export async function emailInvoice(orderData) {
  const {
    order,
    items,
    total,
    customerName,
    customerEmail,
    shippingAddress,
    customerPhone,
  } = orderData;

  try {
    // 🧩 Generate HTML invoice content
    const html = await generateInvoiceHtml({
      order,
      items,
      total,
      customerName,
      customerEmail,
      shippingAddress,
      customerPhone,
    });

    // 📨 cPanel Email Configuration
    // const transporter = nodemailer.createTransport({
    //   host: process.env.EMAIL_SERVER || "mail.nexgenpaint.com", // Your cPanel mail server
    //   port: Number(process.env.EMAIL_PORT) || 587, // Usually 587 for TLS, 465 for SSL
    //   secure: false, // true for 465, false for 587
    //   auth: {
    //     user: process.env.EMAIL_USER || "info@nexgenpaint.com", // Your cPanel email
    //     pass: process.env.EMAIL_PASSWORD, // Your cPanel email password
    //   },
    //   // Important: Add TLS options
    //   tls: {
    //     rejectUnauthorized: false, // This might be needed for some cPanel hosts
    //     ciphers: "SSLv3",
    //   },
    //   connectionTimeout: 30000, // Increase timeout
    //   socketTimeout: 30000,
    // });

    const transporter = nodemailer.createTransport({
      host: "mail.nexgenpaint.com",
      port: 465,
      secure: true, // true for port 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    console.log("🔄 Attempting to connect to cPanel email...");

    // Verify connection
    await transporter.verify();
    console.log("✅ SMTP connection verified");

    // 🧾 Send mail
    const info = await transporter.sendMail({
      from: `"NextGen Paints" <sales@nexgenpaint.com>`, // Must match auth user or be an alias
      to: customerEmail,
      subject: `Your Order Invoice - ${order.id}`,
      html,
      headers: {
        "X-Priority": "1",
        "X-MSMail-Priority": "High",
        Importance: "high",
      },
    });

    console.log("✅ Invoice email sent:", info.messageId);
    return { success: true, message: "Invoice email sent." };
  } catch (error) {
    console.error("💥 Email sending failed:", error);
    return { success: false, message: "Failed to send invoice email." };
  }
}
