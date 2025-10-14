// lib/email.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_SERVER,
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (email, token) => {
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Your Paint Store Password",
    html: `
      <div>
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password. Click the link below to proceed:</p>
        <a href="${resetUrl}" style="background-color: #0070f3; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  });
};

export async function sendInvoiceEmail(to, invoiceUrl) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"NextGen Paints" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Order Invoice",
    html: `<p>Thank you for your purchase!</p>
           <p>You can download your invoice here:</p>
           <a href="${process.env.NEXT_PUBLIC_BASE_URL}${invoiceUrl}">View Invoice</a>`,
  });
}
