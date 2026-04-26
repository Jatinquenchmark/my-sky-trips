export const generateInvoiceHTML = (order) => {
  const totalPaid = order.amount / 100;
  const subtotal = Math.round(totalPaid / 1.05);
  const gstAmount = totalPaid - subtotal;

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Your Sky Trip Ticket</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased; margin: 0; padding: 0; background-color: #f1f5f9; }
    table { border-collapse: collapse; }
    .container { max-width: 500px; margin: 20px auto; background-color: #ffffff; border-radius: 40px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background-color: #0066FF; padding: 30px; color: #ffffff; }
    .content { padding: 25px; background-color: #ffffff; }
    .card { background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 20px; padding: 15px; margin-bottom: 20px; }
    .label { font-size: 10px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .value { font-size: 16px; font-weight: 900; color: #0f172a; }
    .item-card { background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 15px; padding: 12px; margin-bottom: 10px; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td style="padding: 20px 0 30px 0;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="500" style="background-color: #ffffff; border-radius: 40px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
          
          <!-- Header Area -->
          <tr>
            <td bgcolor="#0066FF" style="padding: 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="70%" style="color: #ffffff; font-size: 20px; font-weight: 900; letter-spacing: -1px;">
                    SKY TRIP
                  </td>
                  <td width="30%" align="right">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 10px; color: #ffffff; font-size: 9px; font-weight: 900; text-transform: uppercase;">
                          Water Sports
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" align="center" style="padding-top: 25px; color: #ffffff; font-size: 14px; font-weight: 900; letter-spacing: 4px; text-transform: uppercase; opacity: 0.9;">
                    E-TICKET
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 30px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="50%" valign="top">
                          <div style="color: rgba(255,255,255,0.6); font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Date</div>
                          <div style="color: #ffffff; font-size: 13px; font-weight: 700;">${order.bookingDate ? new Date(order.bookingDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'TBA'}</div>
                        </td>
                        <td width="50%" valign="top">
                          <div style="color: rgba(255,255,255,0.6); font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Venue Timing</div>
                          <div style="color: #ffffff; font-size: 13px; font-weight: 700;">09:00 AM - 06:00 PM</div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top: 15px;">
                          <div style="color: rgba(255,255,255,0.6); font-size: 9px; font-weight: 900; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Venue</div>
                          <div style="color: #ffffff; font-size: 13px; font-weight: 700;">Tehri Lake Zone</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Area -->
          <tr>
            <td style="padding: 25px;">
              
              <!-- Booking & Aadhar Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 20px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 15px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td>
                          <div style="font-size: 10px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Booking ID</div>
                          <div style="font-size: 18px; font-weight: 900; color: #0f172a; text-transform: uppercase;">${order.razorpayOrderId}</div>
                        </td>
                      </tr>
                      <tr><td style="padding-top: 15px; border-top: 1px solid #e2e8f0;"></td></tr>
                      <tr>
                        <td>
                          <div style="font-size: 10px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px;">Aadhar Number</div>
                          <div style="font-size: 16px; font-weight: 700; color: #0f172a;">${order.customerAadhar || 'XXXX XXXX XXXX'}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Customer Card -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #f1f5f9; border-radius: 20px; margin-bottom: 25px;">
                <tr>
                  <td style="padding: 15px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="40" style="background-color: #0066FF; border-radius: 12px; color: #ffffff; font-size: 18px; font-weight: 900; text-align: center; height: 40px; width: 40px;">
                          ${order.customerName ? order.customerName.charAt(0).toUpperCase() : 'C'}
                        </td>
                        <td style="padding-left: 15px;">
                          <div style="font-size: 9px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 2px;">Customer Name</div>
                          <div style="font-size: 16px; font-weight: 900; color: #0f172a;">${order.customerName}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Activities List -->
              <div style="font-size: 11px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px;">Booked Activities</div>
              ${order.items.map(item => `
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 15px; margin-bottom: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                  <tr>
                    <td style="padding: 12px;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td width="35" style="font-size: 20px; vertical-align: middle;">${item.emoji || '🎫'}</td>
                          <td style="padding-left: 10px;">
                            <div style="font-size: 13px; font-weight: 900; color: #0f172a; text-transform: uppercase;">${item.name}</div>
                            <div style="font-size: 10px; color: #64748b; font-weight: 700;">${item.persons} Persons • ${item.duration || 'Standard'}</div>
                          </td>
                          <td align="right" style="font-size: 13px; font-weight: 900; color: #0f172a;">
                            ₹${item.totalPrice?.toLocaleString()}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              `).join('')}

              <!-- Price Breakdown -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 25px; border-top: 2px dashed #f1f5f9; padding-top: 20px;">
                <tr>
                  <td style="padding-bottom: 8px;">
                    <div style="font-size: 13px; font-weight: 700; color: #64748b;">Subtotal</div>
                  </td>
                  <td align="right" style="padding-bottom: 8px;">
                    <div style="font-size: 13px; font-weight: 700; color: #1e293b;">₹${subtotal.toLocaleString()}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 15px;">
                    <div style="font-size: 13px; font-weight: 700; color: #059669;">GST (5%)</div>
                  </td>
                  <td align="right" style="padding-bottom: 15px;">
                    <div style="font-size: 13px; font-weight: 700; color: #059669;">₹${gstAmount.toLocaleString()}</div>
                  </td>
                </tr>
                <tr>
                  <td style="border-top: 1px solid #f1f5f9; padding-top: 15px;">
                    <div style="font-size: 12px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Total Amount</div>
                  </td>
                  <td align="right" style="border-top: 1px solid #f1f5f9; padding-top: 15px;">
                    <div style="font-size: 32px; font-weight: 900; color: #0066FF; letter-spacing: -1px;">₹${totalPaid.toLocaleString()}</div>
                  </td>
                </tr>
              </table>

              <!-- Terms & Conditions -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 35px; border-top: 1px solid #f1f5f9; padding-top: 20px;">
                <tr>
                  <td>
                    <div style="font-size: 9px; font-weight: 900; color: #cbd5e1; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px;">Important Terms & Conditions</div>
                    <div style="font-size: 9px; color: #94a3b8; line-height: 1.5; font-weight: 500;">
                      • Participants with heart conditions, back/neck injuries, or pregnancy must not participate.<br/>
                      • Activities subject to weather & sea conditions. Operator may reschedule.<br/>
                      • Life jacket and safety gear must be worn at all times.<br/>
                      • Participants under alcohol/substance influence will be denied entry.<br/>
                      • Company is not liable for loss of personal valuables during activity.<br/>
                      • Physical waiver must be signed at the venue before participating.<br/>
                      • Min. age 12 yrs; under 18 requires guardian consent at check in.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Download Button -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px; text-align: center;">
                <tr>
                  <td>
                    <a href="https://myskytrips.com/ticket/${order.razorpayOrderId}" 
                       style="background-color: #004D56; color: #ffffff; padding: 15px 30px; border-radius: 12px; text-decoration: none; font-weight: 900; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: inline-block;">
                      Download E-Ticket
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Footer Help -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 20px; text-align: center;">
                <tr>
                  <td style="font-size: 10px; font-weight: 900; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">
                    Help: +91 6395678642 | BOOKING@MYSKYTRIPS.COM
                  </td>
                </tr>
              </table>

            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};
