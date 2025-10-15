export function generateInvoiceHtml({
  items,
  total,
  customerName,
  customerEmail,
  shippingAddress,
  customerPhone,
}) {
  const taxRate = 0.075;
  const subtotal = total / (1 + taxRate);
  const tax = total - subtotal;

  // Parse shipping address if it's a stringified object
  let addressText = shippingAddress;
  if (typeof shippingAddress === "string") {
    try {
      const addressObj = JSON.parse(shippingAddress);
      // Format address object into readable text
      addressText = [
        addressObj.street,
        addressObj.city,
        addressObj.state,
        addressObj.postalCode,
        addressObj.country,
      ]
        .filter(Boolean)
        .join(", ");
    } catch (error) {
      // If parsing fails, use the original string
      addressText = shippingAddress;
    }
  }

  return `
  <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; margin: 40px; }
        header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #4F46E5; padding-bottom: 10px; }
        .logo { font-size: 24px; font-weight: bold; color: #4F46E5; }
        .company-info { text-align: right; font-size: 13px; }
        h1 { color: #4F46E5; text-align: center; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin-top: 30px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: #4F46E5; color: white; }
        tfoot td { font-weight: bold; }
        .summary { margin-top: 30px; text-align: right; }
        .summary p { margin: 4px 0; }
        .signature { margin-top: 60px; text-align: right; }
        .signature span { display: inline-block; border-top: 1px solid #333; padding-top: 5px; }
        footer { margin-top: 40px; text-align: center; font-size: 13px; color: #555; border-top: 1px solid #ddd; padding-top: 10px; }
        .customer-info { margin: 20px 0; }
        .customer-info p { margin: 4px 0; }
      </style>
    </head>
    <body>
    <header>
    <div class="logo">Nexgen Paints</div>
    <div class="company-info">
      <p>Lagos: 4c idowu Martins street, off Adeola Odeku ,Victoria Island Lagos</p>
      <p>Abuja: D15, Rukayat Plaza, Obafemi Awolowo way, Jabi</p>
      <p>info@nexgenpaint.com
      </p>
      <p>+234 906 796 6435
      </p>
    </div>
  </header>

      <h1>Invoice</h1>

      <div class="customer-info">
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Phone:</strong> ${customerPhone}</p>
        <p><strong>Shipping Address:</strong> ${addressText}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
      </div>

      <table>
        <thead>
          <tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr>
        </thead>
        <tbody>
          ${items
            .map(
              (item) => `
              <tr>
                <td>${item.name || item.productName || "Product"}</td>
                <td>${item.quantity}</td>
                <td>₦${item.price?.toLocaleString() || "0"}</td>
                <td>₦${(
                  (item.quantity || 0) * (item.price || 0)
                ).toLocaleString()}</td>
              </tr>`
            )
            .join("")}
        </tbody>
      </table>

      <div class="summary">
        <p>Subtotal: ₦${subtotal.toLocaleString()}</p>
        <p>Tax (7.5%): ₦${tax.toLocaleString()}</p>
        <p><strong>Total: ₦${total.toLocaleString()}</strong></p>
      </div>

      <div class="signature">
        <span>Authorized Signature</span>
      </div>

      <footer>
        <p>Thank you for your business!</p>
      </footer>
    </body>
  </html>
  `;
}
