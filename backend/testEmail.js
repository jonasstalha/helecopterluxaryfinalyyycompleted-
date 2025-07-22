const { sendBookingConfirmationEmail, sendAdminNotificationEmail } = require('./emailService');

// Test email function
async function testEmailSystem() {
  console.log('🧪 Testing Email System...');
  
  const testBookingData = {
    bookingReference: 'TEST-' + Date.now(),
    paymentId: 'pi_test_123456789',
    customerName: 'John Doe',
    customerEmail: 'test@example.com', // Replace with your email for testing
    customerPhone: '+1 (555) 123-4567',
    flightDate: 'Saturday, December 23, 2023',
    flightTime: '10:00 AM',
    passengersCount: 2,
    passengersDetails: '1. John Doe (75kg) - Front seat requested\n2. Jane Doe (65kg)',
    totalPrice: '299.99',
    specialRequests: 'Window seats preferred'
  };
  
  try {
    console.log('📧 Sending customer confirmation email...');
    const customerResult = await sendBookingConfirmationEmail(testBookingData);
    console.log('Customer email result:', customerResult);
    
    console.log('📧 Sending admin notification email...');
    const adminResult = await sendAdminNotificationEmail(testBookingData);
    console.log('Admin email result:', adminResult);
    
    console.log('✅ Email test completed!');
  } catch (error) {
    console.error('❌ Email test failed:', error);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testEmailSystem();
}

module.exports = { testEmailSystem };
