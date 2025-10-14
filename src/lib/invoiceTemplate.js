// /lib/invoiceTemplate.js
export function generateInvoiceHtml({ order, items, products, company }) {
  const taxRate = 0.075;
  const tax = order.totalAmount * taxRate;
  const total = order.totalAmount + tax;

  return `
  <html>
    <head>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #333; margin: 40px; }
        header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid ${
          company.themeColor
        }; padding-bottom: 10px; }
        .logo { font-size: 24px; font-weight: bold; color: ${
          company.themeColor
        }; }
        .company-info { text-align: right; font-size: 13px; }
        h1 { color: ${
          company.themeColor
        }; text-align: center; margin-top: 30px; }
        table { width: 100%; border-collapse: collapse; margin-top: 30px; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background-color: ${company.themeColor}; color: white; }
        tfoot td { font-weight: bold; }
        .summary { margin-top: 30px; text-align: right; }
        .summary p { margin: 4px 0; }
        .signature { margin-top: 60px; text-align: right; }
        .signature span { display: inline-block; border-top: 1px solid #333; padding-top: 5px; }
        footer { margin-top: 40px; text-align: center; font-size: 13px; color: #555; border-top: 1px solid #ddd; padding-top: 10px; }
      </style>
    </head>
    <body>
      <header>
        <div class="logo">${company.name}</div>
        <div class="company-info">
          <p>${company.address}</p>
          <p>${company.email}</p>
          <p>${company.phone}</p>
        </div>
      </header>

      <h1>Invoice</h1>

      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Customer:</strong> ${order.name}</p>
      <p><strong>Email:</strong> ${order.email}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>

      <table>
        <thead>
          <tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr>
        </thead>
        <tbody>
          ${items
            .map((i) => {
              const product = products.find((p) => p.id === i.productId);
              return `<tr>
                <td>${product?.name || "N/A"}</td>
                <td>${i.quantity}</td>
                <td>₦${i.price.toLocaleString()}</td>
                <td>₦${(i.quantity * i.price).toLocaleString()}</td>
              </tr>`;
            })
            .join("")}
        </tbody>
      </table>

      <div class="summary">
        <p>Subtotal: ₦${order.totalAmount.toLocaleString()}</p>
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
