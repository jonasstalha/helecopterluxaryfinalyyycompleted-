import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import { CreditCard, Lock, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { updatePaymentStatusInGoogleSheets } from '../lib/googleSheets';
import { createPaymentIntent } from '../lib/stripe';
import { BookingFormData } from '../types';
import FacebookPixelTracker from '../lib/facebookPixel';

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ''
);

const PaymentForm: React.FC<{ bookingData: BookingFormData }> = ({ bookingData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    // Track payment process started
    FacebookPixelTracker.trackPaymentStarted({
      helicopter_id: bookingData.helicopterId,
      booking_reference: bookingData.bookingReference,
      total_price: bookingData.totalPrice,
      passengers_count: bookingData.passengers.length
    });

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setProcessing(false);
      return;
    }

    try {
      // Create payment intent using our backend API
      const { client_secret } = await createPaymentIntent(bookingData);

      // Confirm payment
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: bookingData.customerName,
            email: bookingData.customerEmail,
            phone: bookingData.customerPhone,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message || 'Payment failed');
        
        // Track payment failure
        FacebookPixelTracker.trackError('payment_failed', result.error.message);
      } else {
        setSucceeded(true);
        toast.success('Payment successful! Booking confirmed.');
        
        // Track successful purchase
        FacebookPixelTracker.trackPurchase(
          {
            currency: 'USD',
            value: bookingData.totalPrice,
            content_ids: [bookingData.helicopterId],
            content_type: 'helicopter_booking',
            content_name: `Helicopter Booking - ${bookingData.helicopterId}`,
            content_category: 'helicopter_rental'
          },
          {
            helicopter_id: bookingData.helicopterId,
            booking_reference: bookingData.bookingReference,
            flight_date: bookingData.flightDate.toISOString().split('T')[0],
            flight_time: bookingData.flightTime,
            passengers_count: bookingData.passengers.length,
            total_price: bookingData.totalPrice,
            customer_email: bookingData.customerEmail
          }
        );
        
        // Update payment status in Google Sheets
        if (bookingData.bookingReference) {
          try {
            await updatePaymentStatusInGoogleSheets(
              bookingData.bookingReference,
              result.paymentIntent.id
            );
          } catch (error) {
            console.error('Failed to update Google Sheets:', error);
            // Don't show error to user as payment already succeeded
          }
        }
        
        // Send booking confirmation emails
        try {
          const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
          const emailResponse = await fetch(`${API_BASE_URL}/api/send-booking-confirmation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              bookingData: {
                bookingReference: bookingData.bookingReference,
                paymentId: result.paymentIntent.id,
                customerName: bookingData.customerName,
                customerEmail: bookingData.customerEmail,
                customerPhone: bookingData.customerPhone,
                flightDate: new Date(bookingData.flightDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }),
                flightTime: new Date(bookingData.flightDate).toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                }),
                passengersCount: bookingData.passengers.length,
                passengersDetails: bookingData.passengers.map((p, index) => 
                  `${index + 1}. ${p.firstName} ${p.lastName} (${p.weight}kg)${p.wantsFrontSeat ? ' - Front seat requested' : ''}${p.additionalInfo ? ` - Note: ${p.additionalInfo}` : ''}`
                ).join('\n'),
                totalPrice: bookingData.totalPrice,
                specialRequests: bookingData.specialRequests || 'None'
              }
            })
          });
          
          if (emailResponse.ok) {
            console.log('Booking confirmation emails sent successfully');
            toast.success('Confirmation emails sent!');
          } else {
            console.error('Failed to send confirmation emails');
            // Don't show error to user as payment already succeeded
          }
        } catch (emailError) {
          console.error('Error sending confirmation emails:', emailError);
          // Don't show error to user as payment already succeeded
        }
        
        // Clear session storage and redirect to confirmation
        sessionStorage.removeItem('bookingFormData');
        setTimeout(() => {
          navigate('/booking/confirmation', { 
            state: { 
              bookingData, 
              paymentIntentId: result.paymentIntent.id 
            } 
          });
        }, 2000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment processing failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg border">
        <div className="flex items-center mb-4">
          <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Information
          </label>
          <div className="p-3 border border-gray-300 rounded-md">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-6">
          <Lock className="w-4 h-4 mr-2" />
          Your payment information is secure and encrypted
        </div>

        <Button
          type="submit"
          disabled={!stripe || processing || succeeded}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {processing ? (
            <>
              <LoadingSpinner size="sm" />
              Processing Payment...
            </>
          ) : succeeded ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Payment Successful!
            </>
          ) : (
            `Pay $${bookingData.totalPrice}`
          )}
        </Button>
      </div>
    </form>
  );
};

const PaymentSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState<BookingFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve booking data from session storage
    const storedData = sessionStorage.getItem('bookingFormData');
    if (storedData) {
      setBookingData(JSON.parse(storedData));
    } else {
      toast.error('No booking data found. Please start over.');
      navigate('/helicopters');
    }
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Data Not Found</h2>
          <p className="text-gray-600 mb-6">Please start a new booking.</p>
          <Button onClick={() => navigate('/helicopters')}>
            Browse Helicopters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">Complete Your Booking</h1>
                <p className="text-blue-100">Step 2: Payment Setup</p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Booking Summary */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Summary</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Contact Information</h3>
                    <p className="text-gray-600">{bookingData.customerName}</p>
                    <p className="text-gray-600">{bookingData.customerEmail}</p>
                    <p className="text-gray-600">{bookingData.customerPhone}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900">Flight Details</h3>
                    <p className="text-gray-600">
                      Date: {new Date(bookingData.flightDate).toLocaleDateString()} at{' '}
                      {new Date(bookingData.flightDate).toLocaleTimeString()}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900">Passengers ({bookingData.passengers.length})</h3>
                    <div className="space-y-2">
                      {bookingData.passengers.map((passenger, index) => (
                        <div key={passenger.id} className="text-sm text-gray-600">
                          {index + 1}. {passenger.firstName} {passenger.lastName} ({passenger.weight}kg)
                          {passenger.wantsFrontSeat && (
                            <span className="text-blue-600 ml-2">(Front seat requested)</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {bookingData.specialRequests && (
                    <div>
                      <h3 className="font-medium text-gray-900">Special Requests</h3>
                      <p className="text-gray-600">{bookingData.specialRequests}</p>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <h3 className="font-medium text-gray-900 mb-2">Price Breakdown</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Package Price</span>
                        <span>${bookingData.basePrice}</span>
                      </div>
                      {bookingData.frontSeatFee > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Front Seat Requests</span>
                          <span>${bookingData.frontSeatFee}</span>
                        </div>
                      )}
                      {bookingData.cancellationProtection && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Cancellation Protection</span>
                          <span>${bookingData.cancellationProtectionFee}</span>
                        </div>
                      )}
                      <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>${bookingData.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>
                <Elements stripe={stripePromise}>
                  <PaymentForm bookingData={bookingData} />
                </Elements>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSetupPage;
