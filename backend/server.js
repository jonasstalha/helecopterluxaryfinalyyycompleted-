const express = require('express');
const cors = require('cors');
const stripe = require('stripe');
const { sendBookingConfirmationEmail, sendAdminNotificationEmail } = require('./emailService');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Debug: Check if environment variables are loaded
console.log('🔍 Environment check:');
console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY ? 'Found ✅' : 'Missing ❌');
console.log('NODE_ENV:', process.env.NODE_ENV);

// Initialize Stripe with your secret key
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('❌ STRIPE_SECRET_KEY is not set in environment variables');
  process.exit(1);
}
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL] 
    : [
        process.env.FRONTEND_URL || 'http://localhost:5173',
        process.env.VITE_DEV_SERVER_URL || 'http://localhost:5174',
        process.env.REACT_DEV_SERVER_URL || 'http://localhost:3000',
        process.env.BACKEND_URL || 'http://localhost:3001'
      ],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Helicopter Rental Payment API is running',
    timestamp: new Date().toISOString()
  });
});

// Create payment intent endpoint
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', bookingData } = req.body;

    // Validate amount
    if (!amount || amount < 50) { // Minimum $0.50
      return res.status(400).json({ 
        error: 'Invalid amount. Minimum charge is $0.50' 
      });
    }

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: Math.round(amount), // Amount in cents
      currency: currency,
      description: `Helicopter Booking - ${bookingData?.helicopterName || 'Unknown Helicopter'}`,
      metadata: {
        booking_reference: bookingData?.bookingReference || '',
        customer_name: bookingData?.customerName || '',
        customer_email: bookingData?.customerEmail || '',
        customer_phone: bookingData?.customerPhone || '',
        helicopter_id: bookingData?.helicopterId || '',
        flight_date: bookingData?.flightDate || '',
        flight_time: bookingData?.flightTime || '',
        duration: bookingData?.duration?.toString() || '',
        passengers_count: bookingData?.passengers?.length?.toString() || '0',
        passengers_details: bookingData?.passengers?.map((p, i) => 
          `${i + 1}. ${p.firstName} ${p.lastName} (${p.weight}kg)${p.wantsFrontSeat ? ' - Front seat' : ''}`
        ).join(', ') || '',
        special_requests: bookingData?.specialRequests || 'None',
        base_price: bookingData?.basePrice?.toString() || '0',
        front_seat_fee: bookingData?.frontSeatFee?.toString() || '0',
        cancellation_fee: bookingData?.cancellationProtectionFee?.toString() || '0',
        total_price: (amount / 100).toFixed(2)
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    console.log('Payment Intent created:', paymentIntent.id);

    res.json({
      client_secret: paymentIntent.client_secret
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ 
      error: 'Failed to create payment intent',
      message: error.message 
    });
  }
});

// Send booking confirmation email endpoint
app.post('/api/send-booking-confirmation', async (req, res) => {
  try {
    const { bookingData } = req.body;
    
    // Validate required fields
    if (!bookingData || !bookingData.customerEmail || !bookingData.bookingReference) {
      return res.status(400).json({ 
        error: 'Missing required booking data' 
      });
    }
    
    // Send email to customer
    const customerEmailResult = await sendBookingConfirmationEmail(bookingData);
    
    // Send email to admin
    const adminEmailResult = await sendAdminNotificationEmail(bookingData);
    
    console.log('Booking confirmation emails sent:', {
      customer: customerEmailResult.success,
      admin: adminEmailResult.success,
      bookingRef: bookingData.bookingReference
    });
    
    res.json({
      success: true,
      message: 'Booking confirmation emails sent successfully',
      customerEmail: customerEmailResult.success,
      adminEmail: adminEmailResult.success
    });
    
  } catch (error) {
    console.error('Error sending booking confirmation emails:', error);
    res.status(500).json({ 
      error: 'Failed to send booking confirmation emails',
      message: error.message 
    });
  }
});

// Webhook endpoint for Stripe events (optional but recommended)
app.post('/api/stripe-webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      
      // Extract booking data from payment intent metadata
      const bookingData = {
        bookingReference: paymentIntent.metadata.booking_reference,
        paymentId: paymentIntent.id,
        customerName: paymentIntent.metadata.customer_name,
        customerEmail: paymentIntent.metadata.customer_email,
        customerPhone: paymentIntent.metadata.customer_phone,
        flightDate: paymentIntent.metadata.flight_date,
        flightTime: paymentIntent.metadata.flight_time,
        passengersCount: paymentIntent.metadata.passengers_count,
        passengersDetails: paymentIntent.metadata.passengers_details,
        totalPrice: (paymentIntent.amount / 100).toFixed(2),
        specialRequests: paymentIntent.metadata.special_requests || 'None'
      };
      
      // Send confirmation emails if we have all required data
      if (bookingData.customerEmail && bookingData.bookingReference) {
        try {
          await sendBookingConfirmationEmail(bookingData);
          await sendAdminNotificationEmail(bookingData);
          console.log('Booking confirmation emails sent via webhook');
        } catch (emailError) {
          console.error('Error sending emails via webhook:', emailError);
        }
      }
      
      break;
    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      console.log('Payment failed:', failedPayment.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

app.listen(port, () => {
  console.log(`🚁 Helicopter Rental Payment API running on port ${port}`);
  console.log(`📍 Health check: http://localhost:${port}/api/health`);
  console.log(`💳 Payment endpoint: http://localhost:${port}/api/create-payment-intent`);
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`);
});
