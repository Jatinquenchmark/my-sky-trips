export const generateInvoiceHTML = (order) => {
  const date = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const totalPaid = order.amount / 100;
  const subtotal = order.items.reduce((acc, item) => acc + item.totalPrice, 0);
  
  // Back-calculate charge and GST
  // total = (subtotal + charge) * 1.05
  const taxable = Math.round(totalPaid / 1.05);
  const gst = totalPaid - taxable;
  const charge = taxable - subtotal;

  const itemRows = order.items.map(item => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #eee;">
        <span style="font-size: 20px; margin-right: 8px;">${item.emoji}</span>
        <strong>${item.name}</strong>
        ${item.duration ? `<br><small style="color: #666;">Duration: ${item.duration}</small>` : ''}
      </td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center;">${item.persons}</td>
      <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.totalPrice).toLocaleString()}</td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; }
    .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #1a56db; }
    .logo { font-size: 28px; font-weight: bold; color: #1a56db; text-transform: uppercase; letter-spacing: 2px; }
    .invoice-title { font-size: 20px; margin-top: 10px; color: #555; }
    .details { margin: 20px 0; display: flex; justify-content: space-between; }
    .section-title { font-size: 14px; font-weight: bold; color: #1a56db; text-transform: uppercase; margin-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background: #f8fafc; padding: 12px; text-align: left; font-size: 13px; color: #64748b; text-transform: uppercase; }
    .total-section { margin-top: 20px; padding: 20px; background: #f1f5f9; border-radius: 8px; text-align: right; }
    .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #94a3b8; }
    .btn { display: inline-block; padding: 12px 24px; background: #1a56db; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://sky-trip.vercel.app/logo.png" alt="Sky Trip Logo" style="width: 80px; height: auto; margin-bottom: 10px;">
      <div class="logo">SKY TRIP</div>
      <div class="invoice-title">Booking Confirmation & Invoice</div>
    </div>

    <div style="margin-top: 25px;">
      <p>Hi <strong>${order.customerName}</strong>,</p>
      <p>Thank you for booking your adventure with Sky Trip! Your payment was successful and your seats are reserved.</p>
      ${order.bookingDate ? `<p><strong>Planned Visit Date:</strong> ${new Date(order.bookingDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</p>` : ''}
    </div>

    <div style="display: table; width: 100%; margin-top: 20px;">
      <div style="display: table-cell;">
        <div class="section-title">Billed To</div>
        <p style="margin: 0;">${order.customerName}</p>
        <p style="margin: 0;">${order.customerEmail}</p>
        <p style="margin: 0;">${order.customerPhone}</p>
        ${order.customerAadhar ? `<p style="margin: 0;"><strong>Aadhar:</strong> ${order.customerAadhar}</p>` : ''}
      </div>
      <div style="display: table-cell; text-align: right;">
        <div class="section-title">Invoice Details</div>
        <p style="margin: 0;"><strong>Date:</strong> ${date}</p>
        <p style="margin: 0;"><strong>Order ID:</strong> ${order.razorpayOrderId}</p>
        <p style="margin: 0;"><strong>Status:</strong> Paid</p>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Activity</th>
          <th style="text-align: center;">Persons</th>
          <th style="text-align: right;">Amount</th>
        </tr>
      </thead>
      <tbody>
        ${itemRows}
      </tbody>
    </table>

    <div class="total-section">
      <table style="width: 250px; margin-left: auto; margin-top: 0; border: none;">
        <tr>
          <td style="text-align: right; font-size: 13px; color: #64748b; padding: 4px 0;">Subtotal:</td>
          <td style="text-align: right; font-size: 13px; font-weight: bold; padding: 4px 0;">₹${subtotal.toLocaleString()}</td>
        </tr>
        ${charge > 0 ? `
        <tr>
          <td style="text-align: right; font-size: 13px; color: #64748b; padding: 4px 0;">Convenience Charge:</td>
          <td style="text-align: right; font-size: 13px; font-weight: bold; padding: 4px 0;">₹${charge.toLocaleString()}</td>
        </tr>` : ''}
        <tr>
          <td style="text-align: right; font-size: 13px; color: #64748b; padding: 4px 0;">GST (5%):</td>
          <td style="text-align: right; font-size: 13px; font-weight: bold; padding: 4px 0;">₹${gst.toLocaleString()}</td>
        </tr>
        <tr>
          <td style="text-align: right; font-size: 16px; font-weight: bold; color: #1a56db; padding: 12px 0 0;">Total Paid:</td>
          <td style="text-align: right; font-size: 20px; font-weight: bold; color: #1a56db; padding: 12px 0 0;">₹${totalPaid.toLocaleString()}</td>
        </tr>
      </table>
    </div>

    <div style="margin-top: 25px; padding: 15px; border-left: 4px solid #f59e0b; background: #fffbeb;">
      <p style="margin: 0; font-size: 13px; color: #92400e;">
        <strong>Note:</strong> Please arrive at the Tehri Lake Adventure Zone 15 minutes before your scheduled time. Carry a digital or printed copy of this invoice.
      </p>
    </div>

    <div style="text-align: center;">
      <a href="https://sky-trip.vercel.app" class="btn">Visit Website</a>
    </div>

    <div class="footer">
      <p>&copy; 2026 Sky Trip Adventures. All rights reserved.</p>
      <p>Tehri Lake, Uttarakhand, India</p>
    </div>
  </div>
</body>
</html>
  `;
};
