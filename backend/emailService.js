const nodemailer = require('nodemailer');

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

// Send booking confirmation email to customer
const sendBookingConfirmationEmail = async (bookingData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@helicopterrentals.com',
      to: bookingData.customerEmail,
      subject: `Booking Confirmation - ${bookingData.bookingReference}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🚁 Booking Confirmed!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hello ${bookingData.customerName},</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.5;">
              Your helicopter booking has been confirmed! We're excited to provide you with an unforgettable flight experience.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Booking Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Booking Reference:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.bookingReference}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Payment ID:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.paymentId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Flight Date:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.flightDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Flight Time:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.flightTime}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Passengers:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.passengersCount}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Total Amount:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: bold;">$${bookingData.totalPrice}</td>
                </tr>
              </table>
            </div>
            
            ${bookingData.specialRequests && bookingData.specialRequests !== 'None' ? `
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <h4 style="color: #856404; margin-top: 0;">Special Requests:</h4>
              <p style="color: #856404; margin-bottom: 0;">${bookingData.specialRequests}</p>
            </div>
            ` : ''}
            
            <div style="background: #d4edda; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
              <h4 style="color: #155724; margin-top: 0;">What's Next?</h4>
              <ul style="color: #155724; margin-bottom: 0;">
                <li>You'll receive a call from our team 24-48 hours before your flight</li>
                <li>Please arrive 15 minutes before your scheduled departure time</li>
                <li>Bring a valid ID and dress comfortably</li>
                <li>Weather conditions will be monitored - we'll contact you if any changes are needed</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #666; margin-bottom: 10px;">Questions? Contact us:</p>
              <p style="color: #333; font-weight: bold;">📧 vanguardhelicopter@gmail.com</p>
              <p style="color: #333; font-weight: bold;">📞 +1 (555) 123-4567</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="color: #999; font-size: 12px;">
                Thank you for choosing Helicopter Luxury Rentals<br>
                Safe skies ahead! 🌤️
              </p>
            </div>
          </div>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Customer email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Error sending customer email:', error);
    return { success: false, error: error.message };
  }
};

// Send booking notification email to admin
const sendAdminNotificationEmail = async (bookingData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@helicopterrentals.com',
      to: process.env.ADMIN_EMAIL || 'vanguardhelicopter@gmail.com',
      subject: `🚁 New Booking Received - ${bookingData.bookingReference}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #dc3545 0%, #c82333 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🚁 New Booking Alert!</h1>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">New Booking Received</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.5;">
              A new helicopter booking has been confirmed and payment has been processed successfully.
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0; border-bottom: 2px solid #dc3545; padding-bottom: 10px;">Booking Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Booking Reference:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.bookingReference}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Payment ID:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.paymentId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Customer Name:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.customerName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Customer Email:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.customerEmail}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Customer Phone:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.customerPhone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Flight Date:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.flightDate}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Flight Time:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.flightTime}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Passengers:</td>
                  <td style="padding: 8px 0; color: #333;">${bookingData.passengersCount}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-weight: bold;">Total Amount:</td>
                  <td style="padding: 8px 0; color: #333; font-weight: bold;">$${bookingData.totalPrice}</td>
                </tr>
              </table>
            </div>
            
            ${bookingData.passengersDetails ? `
            <div style="background: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff;">
              <h4 style="color: #004085; margin-top: 0;">Passenger Details:</h4>
              <pre style="color: #004085; margin-bottom: 0; white-space: pre-wrap;">${bookingData.passengersDetails}</pre>
            </div>
            ` : ''}
            
            ${bookingData.specialRequests && bookingData.specialRequests !== 'None' ? `
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
              <h4 style="color: #856404; margin-top: 0;">Special Requests:</h4>
              <p style="color: #856404; margin-bottom: 0;">${bookingData.specialRequests}</p>
            </div>
            ` : ''}
            
            <div style="background: #d1ecf1; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0dcaf0;">
              <h4 style="color: #055160; margin-top: 0;">Action Required:</h4>
              <ul style="color: #055160; margin-bottom: 0;">
                <li>Contact customer within 24-48 hours to confirm flight details</li>
                <li>Check weather conditions for the scheduled date</li>
                <li>Prepare helicopter and crew for the scheduled flight</li>
                <li>Send pre-flight instructions to customer</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
              <p style="color: #999; font-size: 12px;">
                Booking processed at ${new Date().toLocaleString()}<br>
                Helicopter Luxury Rentals - Admin System
              </p>
            </div>
          </div>
        </div>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Admin email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error('Error sending admin email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendBookingConfirmationEmail,
  sendAdminNotificationEmail
};
