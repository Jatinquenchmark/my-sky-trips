export const generateInvoiceHTML = (order) => {
  const totalPaid = order.amount / 100;
  const subtotal = Math.round(totalPaid / 1.05);
  const gstAmount = totalPaid - subtotal;

  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; margin: 0; padding: 0; background-color: #f1f5f9; }
    .ticket-container { max-width: 500px; margin: 40px auto; background: #ffffff; border-radius: 40px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15); border: 1px solid #e2e8f0; }
    
    /* Blue Header */
    .header { background-color: #0066FF; padding: 32px; color: #ffffff; }
    .header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
    .brand-name { font-size: 20px; font-weight: 900; letter-spacing: -1px; text-transform: uppercase; margin: 0; }
    .badge { display: inline-block; padding: 6px 12px; background: rgba(255, 255, 255, 0.2); border-radius: 12px; font-size: 10px; font-weight: 900; text-transform: uppercase; border: 1px solid rgba(255, 255, 255, 0.2); color: #ffffff; }
    
    /* Info Grid inside Header */
    .info-grid { background: rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 20px; display: table; width: 100%; box-sizing: border-box; }
    .info-row { display: table-row; }
    .info-col { display: table-cell; width: 50%; padding: 10px; }
    .info-label { font-size: 9px; font-weight: 900; color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px; }
    .info-value { font-size: 13px; font-weight: 700; color: #ffffff; }

    .content { padding: 32px; }
    
    /* Booking ID section */
    .booking-id-row { display: table; width: 100%; margin-bottom: 24px; }
    .booking-id-cell { display: table-cell; }
    .paid-badge { background: #E6FFFA; color: #00A389; padding: 6px 16px; border-radius: 12px; font-size: 10px; font-weight: 900; text-transform: uppercase; border: 1px solid #B2F5EA; display: inline-block; }

    /* Activity Items */
    .section-title { font-size: 11px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; }
    .item-card { background: #ffffff; border: 1px solid #f1f5f9; border-radius: 20px; padding: 16px; margin-bottom: 12px; display: table; width: 100%; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
    .item-emoji { display: table-cell; width: 40px; font-size: 24px; vertical-align: middle; }
    .item-details { display: table-cell; vertical-align: middle; padding-left: 12px; }
    .item-name { font-size: 14px; font-weight: 900; color: #0f172a; text-transform: uppercase; margin: 0; }
    .item-sub { font-size: 10px; color: #64748b; font-weight: 700; margin-top: 2px; }
    .item-price { display: table-cell; vertical-align: middle; text-align: right; font-size: 14px; font-weight: 900; color: #0f172a; }

    /* Breakdown Section */
    .breakdown { border-top: 2px dashed #f1f5f9; padding-top: 24px; margin-top: 24px; }
    .breakdown-row { display: table; width: 100%; margin-bottom: 8px; }
    .breakdown-label { display: table-cell; font-size: 13px; font-weight: 700; color: #64748b; }
    .breakdown-value { display: table-cell; text-align: right; font-size: 13px; font-weight: 700; color: #1e293b; }
    .total-paid-row { margin-top: 16px; padding-top: 16px; }
    .grand-total-label { display: table-cell; font-size: 14px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
    .grand-total-value { display: table-cell; text-align: right; font-size: 36px; font-weight: 900; color: #0066FF; letter-spacing: -1px; }

    .disclaimers { margin-top: 32px; padding-top: 24px; border-top: 1px solid #f1f5f9; }
    .disclaimer-item { font-size: 10px; color: #94a3b8; margin-bottom: 6px; line-height: 1.4; font-weight: 500; }
    
    .footer { text-align: center; margin-top: 40px; padding-bottom: 32px; }
    .footer-text { font-size: 10px; font-weight: 900; color: #cbd5e1; text-transform: uppercase; letter-spacing: 1px; }
    
    .btn-container { text-align: center; margin: 24px 0; }
    .btn { display: inline-block; background-color: #004D56; color: #ffffff !important; padding: 18px 36px; border-radius: 16px; text-decoration: none; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
  </style>
</head>
<body>
  <div class="ticket-container">
    <div class="header">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td><div class="brand-name">MY SKY TRIPS</div></td>
          <td align="right"><div class="badge">Water Sports</div></td>
        </tr>
      </table>
      
      <div class="info-grid" style="margin-top: 24px;">
        <div class="info-row">
          <div class="info-col">
            <div class="info-label">Date</div>
            <div class="info-value">${order.bookingDate ? new Date(order.bookingDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'TBA'}</div>
          </div>
          <div class="info-col">
            <div class="info-label">Report By</div>
            <div class="info-value">08:45 AM</div>
          </div>
        </div>
        <div class="info-row">
          <div class="info-col">
            <div class="info-label">Venue</div>
            <div class="info-value">Tehri Lake Zone</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="content">
      <div class="booking-id-row">
        <div class="booking-id-cell">
          <div class="label">Booking ID</div>
          <div class="value" style="font-size: 20px; font-weight: 900;">${order.razorpayOrderId}</div>
        </div>
        <div class="booking-id-cell" style="text-align: right; vertical-align: middle;">
          <div class="paid-badge">Paid Status</div>
        </div>
      </div>

      <div class="section-title">Booked Activities</div>
      ${order.items.map(item => `
        <div class="item-card">
          <div class="item-emoji">${item.emoji || '🎫'}</div>
          <div class="item-details">
            <div class="item-name">${item.name}</div>
            <div class="item-sub">${item.persons} Persons • ${item.duration || 'Standard'}</div>
          </div>
          <div class="item-price">₹${item.totalPrice?.toLocaleString()}</div>
        </div>
      `).join('')}
      
      <div class="breakdown">
        <div class="breakdown-row">
          <div class="breakdown-label">Subtotal</div>
          <div class="breakdown-value">₹${subtotal.toLocaleString()}</div>
        </div>
        <div class="breakdown-row">
          <div class="breakdown-label" style="color: #059669;">GST (5%)</div>
          <div class="breakdown-value" style="color: #059669;">₹${gstAmount.toLocaleString()}</div>
        </div>
        <div class="breakdown-row total-paid-row">
          <div class="grand-total-label">Total Amount</div>
          <div class="grand-total-value">₹${totalPaid.toLocaleString()}</div>
        </div>
      </div>
      
      <div class="disclaimers">
        <div class="disclaimer-title">Important Info</div>
        <div class="disclaimer-item">• Participants with heart conditions must not participate.</div>
        <div class="disclaimer-item">• Life jacket and safety gear must be worn at all times.</div>
        <div class="disclaimer-item">• Please arrive 15 minutes before your report time.</div>
      </div>
      
      <div class="btn-container">
        <a href="https://myskytrips.com/ticket/${order.razorpayOrderId}" class="btn">Download E-Ticket</a>
      </div>
      
      <div class="footer">
        <div class="footer-text">Help: +91 98765 43210 | booking@myskytrips.com</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};
