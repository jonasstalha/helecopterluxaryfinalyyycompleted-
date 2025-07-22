import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  console.error('VITE_STRIPE_PUBLISHABLE_KEY is not set in environment variables');
}

export const stripePromise = loadStripe(stripePublishableKey || '');

// Create payment intent (used by PaymentSetupPage)
export const createPaymentIntent = async (bookingData: any) => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: bookingData.totalPrice * 100, // Convert to cents
        currency: 'usd',
        bookingData
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Legacy function name for backward compatibility
export const createCheckoutSession = createPaymentIntent;