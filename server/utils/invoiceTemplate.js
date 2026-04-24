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
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #334155; margin: 0; padding: 0; background-color: #f8fafc; }
    .ticket-container { max-width: 500px; margin: 40px auto; background: #ffffff; border-radius: 40px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); border: 1px solid #f1f5f9; }
    .header { background-color: #004D56; padding: 40px; color: #ffffff; }
    .logo { font-size: 24px; font-weight: 900; letter-spacing: -1px; margin-bottom: 24px; }
    .logo span { color: #00F2FF; }
    .badge { display: inline-block; padding: 4px 12px; background: rgba(255, 255, 255, 0.1); border-radius: 20px; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; color: #00F2FF; margin-bottom: 12px; }
    .title { font-size: 28px; font-weight: 900; line-height: 1.2; margin: 0 0 8px 0; color: #ffffff; }
    .subtitle { font-size: 14px; color: rgba(255, 255, 255, 0.6); margin: 0; font-weight: 500; }
    
    .content { padding: 40px; }
    .grid { display: table; width: 100%; margin-bottom: 32px; }
    .grid-row { display: table-row; }
    .grid-col { display: table-cell; width: 50%; padding-bottom: 24px; }
    .label { font-size: 10px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .value { font-size: 16px; font-weight: 700; color: #1e293b; margin: 0; }
    
    .divider { border-top: 2px dashed #e2e8f0; margin: 0 0 32px 0; display: flex; justify-content: space-between; align-items: center; }
    .booking-section { display: table; width: 100%; margin-bottom: 32px; padding: 24px 0; border-top: 2px dashed #e2e8f0; border-bottom: 2px dashed #e2e8f0; }
    
    .customer-info { display: table; width: 100%; margin-bottom: 32px; }
    .customer-avatar { display: table-cell; width: 64px; vertical-align: middle; }
    .avatar-box { width: 64px; height: 64px; background: #f1f5f9; border-radius: 16px; text-align: center; line-height: 64px; font-size: 32px; }
    .customer-details { display: table-cell; padding-left: 16px; vertical-align: middle; }
    .customer-name { font-size: 20px; font-weight: 900; color: #0f172a; margin: 0; }
    .customer-sub { font-size: 12px; font-weight: 700; color: #64748b; margin: 4px 0 0 0; }
    
    .total-row { display: table; width: 100%; margin-bottom: 32px; }
    .total-label { display: table-cell; font-size: 14px; font-weight: 700; color: #64748b; font-style: italic; vertical-align: baseline; }
    .total-value { display: table-cell; text-align: right; font-size: 32px; font-weight: 900; color: #004D56; letter-spacing: -1px; vertical-align: baseline; }
    
    .disclaimers { border-top: 1px solid #f1f5f9; padding-top: 24px; }
    .disclaimer-title { font-size: 10px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
    .disclaimer-list { margin: 0; padding: 0; list-style: none; }
    .disclaimer-item { font-size: 11px; color: #64748b; margin-bottom: 8px; line-height: 1.5; font-weight: 500; }
    .disclaimer-item span { color: #cbd5e1; margin-right: 8px; }
    .disclaimer-highlight { color: #f43f5e; font-weight: 700; }
    
    .footer { text-align: center; margin-top: 40px; padding-bottom: 32px; }
    .footer-text { font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; }
    
    .btn-container { text-align: center; margin: 20px 0; }
    .btn { display: inline-block; background-color: #004D56; color: #ffffff !important; padding: 16px 32px; border-radius: 16px; text-decoration: none; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
  </style>
</head>
<body>
  <div class="ticket-container">
    <div class="header">
      <div class="logo">MY <span>SY</span> TRIPS</div>
      <div class="badge">Water Sports</div>
      <h1 class="title">${order.items.map(i => i.name).join(' + ')}</h1>
      <p class="subtitle">Tehri Lake Adventure Hub, Uttarakhand</p>
    </div>
    
    <div class="content">
      <div class="grid">
        <div class="grid-row">
          <div class="grid-col">
            <div class="label">Date</div>
            <div class="value">${order.bookingDate ? new Date(order.bookingDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'TBA'}</div>
          </div>
          <div class="grid-col">
            <div class="label">Time Slot</div>
            <div class="value">09:00 — 11:00 AM</div>
          </div>
        </div>
        <div class="grid-row">
          <div class="grid-col">
            <div class="label">Report By</div>
            <div class="value">08:45 AM</div>
          </div>
          <div class="grid-col">
            <div class="label">Venue</div>
            <div class="value">Tehri Lake Adventure Zone</div>
          </div>
        </div>
      </div>
      
      <div class="booking-section">
        <div style="display: table-cell;">
          <div class="label">Booking ID</div>
          <div class="value" style="font-size: 20px; letter-spacing: -0.5px;">MST-2025-00${Math.floor(100 + Math.random() * 900)}</div>
        </div>
        <div style="display: table-cell; text-align: right; vertical-align: middle;">
          <span style="background: #E6FFFA; color: #00A389; padding: 6px 16px; border-radius: 20px; font-size: 10px; font-weight: 900; text-transform: uppercase; border: 1px solid #B2F5EA;">Paid</span>
        </div>
      </div>
      
      <div class="customer-info">
        <div class="customer-avatar">
          <div class="avatar-box">${order.items[0]?.emoji || '🎫'}</div>
        </div>
        <div class="customer-details">
          <h3 class="customer-name">${order.customerName}</h3>
          <p class="customer-sub">Ticket #1 — Adult</p>
        </div>
      </div>
      
      <div class="total-row">
        <div class="total-label">Total Paid (incl. GST)</div>
        <div class="total-value">₹${totalPaid.toLocaleString()}</div>
      </div>
      
      <div class="disclaimers">
        <div class="disclaimer-title">Important Disclaimers</div>
        <ul class="disclaimer-list">
          <li class="disclaimer-item"><span>•</span>Participants with heart conditions, back/neck injuries, or pregnancy must not participate.</li>
          <li class="disclaimer-item disclaimer-highlight"><span>•</span>Activities subject to weather & lake conditions. Operator may reschedule.</li>
          <li class="disclaimer-item"><span>•</span>Life jacket and safety gear must be worn at all times.</li>
          <li class="disclaimer-item"><span>•</span>Participants under alcohol/substance influence will be denied entry — no refund.</li>
          <li class="disclaimer-item"><span>•</span>Company is not liable for loss of personal valuables during activity.</li>
          <li class="disclaimer-item"><span>•</span>Physical waiver must be signed at the venue before participating.</li>
          <li class="disclaimer-item"><span>•</span>Min. age 12 yrs; under 18 requires guardian consent at check-in.</li>
        </ul>
      </div>
      
      <div class="btn-container">
        <a href="https://sky-trip.vercel.app" class="btn">Download Your Ticket</a>
      </div>
      
      <div class="footer">
        <div class="footer-text">Help: +91 98765 43210 | support@mysytrips.com</div>
      </div>
    </div>
  </div>
</body>
</html>
  `;
};
