export async function generateInvoiceHtml({
  order,
  items,
  total,
  customerName,
  customerEmail,
  address,
  phone,
}) {
  const orderDate = new Date(order.createdAt).toLocaleString();

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Invoice - ${order.id}</title>
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
        }
      </style>
    </head>
    <body>
      <div class="invoice">
        <h1>Invoice</h1>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Date:</strong> ${orderDate}</p>
        <p><strong>Customer:</strong> ${customerName} (${customerEmail})</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Phone:</strong> ${phone}</p>

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
                <td>${item.name || item.productName}</td>
                <td>${item.quantity}</td>
                <td>₦${item.price.toLocaleString()}</td>
                <td>₦${(item.price * item.quantity).toLocaleString()}</td>
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
