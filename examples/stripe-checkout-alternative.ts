// Alternative implementation using Stripe Checkout
// This would replace your current PaymentSetupPage.tsx

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY!);

interface BookingFormData {
  helicopterId: string;
  // Add other booking data properties as needed
}

export const redirectToCheckout = async (bookingData: BookingFormData) => {
  const stripe = await stripePromise;
  
  // Create checkout session via your backend
  const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || 'http://localhost:3001';
  const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      booking: bookingData,
      success_url: `${window.location.origin}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${window.location.origin}/booking/${bookingData.helicopterId}`,
    }),
  });

  const session = await response.json();
  
  // Redirect to Stripe Checkout
  const result = await stripe!.redirectToCheckout({
    sessionId: session.id,
  });

  if (result.error) {
    console.error('Stripe Checkout error:', result.error);
  }
};
