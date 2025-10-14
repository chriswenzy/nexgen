// /lib/pdf.js
import { jsPDF } from "jspdf";
import { writeFile } from "fs/promises";
import path from "path";

export async function generatePdfFromHtml(html, filename) {
  try {
    const pdf = new jsPDF({ unit: "pt", format: "a4" });

    const pdfBuffer = await new Promise((resolve) => {
      pdf.html(html, {
        callback: (doc) => {
          const buffer = Buffer.from(doc.output("arraybuffer"));
          resolve(buffer);
        },
        x: 10,
        y: 10,
      });
    });

    const filePath = path.join(process.cwd(), "public/invoices", filename);
    await writeFile(filePath, pdfBuffer);

    return `/invoices/${filename}`;
  } catch (error) {
    console.error("💥 PDF generation failed:", error);
    throw new Error("Failed to generate invoice PDF");
  }
}
