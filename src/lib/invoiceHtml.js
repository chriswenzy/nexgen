export async function generateInvoiceHtml({
  items,
  total,
  customerName,
  customerEmail,
  shippingAddress,
  customerPhone,
}) {
  const orderDate = new Date().toLocaleString();

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Invoice</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          color: #333;
          line-height: 1.6;
          padding: 20px;
          max-width: 700px;
          margin: auto;
          background: #f8f8f8;
        }
        h1 {
          text-align: center;
          color: #2c3e50;
        }
        .invoice {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }
        th {
          background: #f2f2f2;
        }
        .total {
          font-weight: bold;
          text-align: right;
          font-size: 1.2em;
          margin-top: 20px;
        }
        .customer-info {
          margin: 20px 0;
        }
        .customer-info p {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="invoice">
        <h1>Invoice</h1>
        
        <div class="customer-info">
          <p><strong>Date:</strong> ${orderDate}</p>
          <p><strong>Customer:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          <p><strong>Phone:</strong> ${customerPhone}</p>
          <p><strong>Shipping Address:</strong> ${formatAddress(
            shippingAddress
          )}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item) => `
              <tr>
                <td>${item.name || item.productName || "Product"}</td>
                <td>${item.quantity}</td>
                <td>₦${(item.price || 0).toLocaleString()}</td>
                <td>₦${(
                  (item.price || 0) * (item.quantity || 0)
                ).toLocaleString()}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <p class="total">Total: ₦${total.toLocaleString()}</p>
      </div>
    </body>
  </html>
  `;
}

// Helper function to format address (handles both string and stringified object)
function formatAddress(address) {
  if (typeof address === "string") {
    try {
      const addressObj = JSON.parse(address);
      // Format address object into readable text
      return [
        addressObj.street,
        addressObj.city,
        addressObj.state,
        addressObj.postalCode,
        addressObj.country,
      ]
        .filter(Boolean)
        .join(", ");
    } catch (error) {
      // If parsing fails, return the original string
      return address;
    }
  }
  return address || "No address provided";
}
