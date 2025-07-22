import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Users, CreditCard, Download, Share, Home, AlertCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { BookingFormData } from '../types';
import { sendBookingNotification } from '../lib/emailService';

const BookingConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSavingToSheets, setIsSavingToSheets] = useState(false);
  const [sheetsSaveStatus, setSheetsSaveStatus] = useState<'pending' | 'success' | 'error'>('pending');
  
  const { bookingData, paymentIntentId } = location.state as {
    bookingData: BookingFormData;
    paymentIntentId: string;
  } || {};

  // Generate booking reference number
  const bookingRef = `HL${Date.now().toString().slice(-8)}`;

  // Save booking to local storage when component mounts
  useEffect(() => {
    if (bookingData && paymentIntentId) {
      saveToGoogleSheets();
    }
  }, [bookingData, paymentIntentId]);

  const saveToGoogleSheets = async () => {
    setIsSavingToSheets(true);
    try {
      const success = await sendBookingNotification(bookingData, bookingRef, paymentIntentId);
      setSheetsSaveStatus(success ? 'success' : 'error');
    } catch (error) {
      console.error('Error saving booking data:', error);
      setSheetsSaveStatus('error');
    } finally {
      setIsSavingToSheets(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking not found</h2>
          <Button onClick={() => navigate('/helicopters')}>
            Browse Helicopters
          </Button>
        </div>
      </div>
    );
  }

  const handleDownloadConfirmation = () => {
    // Create a detailed confirmation text for download
    const confirmationText = `
VANGUARD HELICOPTERS - BOOKING CONFIRMATION

Booking Reference: ${bookingRef}
Payment ID: ${paymentIntentId}
System Status: ${sheetsSaveStatus === 'success' ? 'Confirmed & Saved' : 'Confirmed (Processing backup)'}

==================================================
CUSTOMER INFORMATION:
==================================================
Name: ${bookingData.customerName}
Email: ${bookingData.customerEmail}
Phone: ${bookingData.customerPhone}

==================================================
FLIGHT DETAILS:
==================================================
Date: ${new Date(bookingData.flightDate).toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})}
Time: ${new Date(bookingData.flightDate).toLocaleTimeString('en-US', {
  hour: '2-digit',
  minute: '2-digit'
})}

==================================================
PASSENGERS (${bookingData.passengers.length} Total):
==================================================
${bookingData.passengers.map((p, i) => `${i + 1}. ${p.firstName} ${p.lastName}
   Weight: ${p.weight}kg
   Front Seat: ${p.wantsFrontSeat ? 'Requested (+$60)' : 'No preference'}
   Notes: ${p.additionalInfo || 'None'}`).join('\n\n')}

==================================================
PRICING BREAKDOWN:
==================================================
Package Price: $${bookingData.basePrice}
Front Seat Fees: $${bookingData.frontSeatFee}
Cancellation Protection: $${bookingData.cancellationProtectionFee}
----------------------------------------
TOTAL PAID: $${bookingData.totalPrice}

==================================================
SPECIAL REQUESTS:
==================================================
${bookingData.specialRequests || 'None'}

==================================================
IMPORTANT REMINDERS:
==================================================
• Arrive 30 minutes before departure
• Bring valid photo ID for all passengers  
• Weather may affect schedules - we'll contact you
• Front seat requests confirmed at check-in
${bookingData.cancellationProtection ? '• Cancellation protection active (24hr changes allowed)' : ''}

==================================================
CONTACT INFORMATION:
==================================================
For changes or questions: vanguardhelicopter@gmail.com
Phone: (702) 815-8697

Booking confirmed on: ${new Date().toLocaleString('en-US')}

Thank you for choosing Vanguard Helicopters!
    `;

    const blob = new Blob([confirmationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vanguard-booking-${bookingRef}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Helicopter Booking Confirmation',
      text: `My helicopter flight is confirmed for ${new Date(bookingData.flightDate).toLocaleDateString()}! Booking reference: ${bookingRef}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying to clipboard
      navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`);
      alert('Booking details copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-xl text-gray-600 mb-4">
            Your helicopter flight has been successfully booked
          </p>
          <div className="bg-white rounded-lg p-4 inline-block shadow-sm">
            <p className="text-sm text-gray-500">Booking Reference</p>
            <p className="text-2xl font-bold text-blue-600">{bookingRef}</p>
            
            {/* Booking Data Save Status */}
            <div className="mt-3 flex items-center justify-center">
              {isSavingToSheets && (
                <div className="flex items-center text-sm text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Saving booking data...
                </div>
              )}
              {sheetsSaveStatus === 'success' && (
                <div className="flex items-center text-sm text-green-600">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Booking data saved successfully
                </div>
              )}
              {sheetsSaveStatus === 'error' && (
                <div className="flex items-center text-sm text-orange-600">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Booking confirmed (backup pending)
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">Booking Details</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Flight Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  Flight Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Date & Time</p>
                    <p className="font-medium">
                      {new Date(bookingData.flightDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} at {new Date(bookingData.flightDate).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Customer</p>
                    <p className="font-medium">{bookingData.customerName}</p>
                    <p className="text-sm text-gray-600">{bookingData.customerEmail}</p>
                    <p className="text-sm text-gray-600">{bookingData.customerPhone}</p>
                  </div>
                </div>
              </div>

              {/* Passenger Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Passengers ({bookingData.passengers.length})
                </h3>
                <div className="space-y-3">
                  {bookingData.passengers.map((passenger, index) => (
                    <div key={passenger.id} className="bg-gray-50 rounded-lg p-3">
                      <p className="font-medium">
                        {index + 1}. {passenger.firstName} {passenger.lastName}
                      </p>
                      <p className="text-sm text-gray-600">Weight: {passenger.weight}kg</p>
                      {passenger.wantsFrontSeat && (
                        <p className="text-sm text-blue-600">✓ Front seat requested</p>
                      )}
                      {passenger.additionalInfo && (
                        <p className="text-sm text-gray-600">Note: {passenger.additionalInfo}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {bookingData.specialRequests && (
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Special Requests</h3>
                <p className="text-gray-600 bg-gray-50 rounded-lg p-3">
                  {bookingData.specialRequests}
                </p>
              </div>
            )}

            {/* Payment Summary */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                Payment Summary
              </h3>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Package Price</span>
                    <span className="font-medium">${bookingData.basePrice}</span>
                  </div>
                  {bookingData.frontSeatFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Front Seat Requests</span>
                      <span className="font-medium">${bookingData.frontSeatFee}</span>
                    </div>
                  )}
                  {bookingData.cancellationProtection && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cancellation Protection</span>
                      <span className="font-medium">${bookingData.cancellationProtectionFee}</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Paid</span>
                      <span className="text-green-600">${bookingData.totalPrice}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Payment ID: {paymentIntentId}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={handleDownloadConfirmation}
            variant="outline"
            className="flex items-center justify-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Confirmation
          </Button>
          <Button
            onClick={handleShare}
            variant="outline"
            className="flex items-center justify-center"
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            onClick={() => navigate('/helicopters')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center"
          >
            <Home className="w-4 h-4 mr-2" />
            Book Another Flight
          </Button>
        </motion.div>

        {/* Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-yellow-50 border border-yellow-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold text-yellow-800 mb-3">Important Information</h3>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li>• Please arrive 30 minutes before your scheduled departure time</li>
            <li>• Bring valid photo identification for all passengers</li>
            <li>• Weather conditions may affect flight schedules - we'll contact you if changes are needed</li>
            <li>• Front seat requests are subject to confirmation at check-in</li>
            {bookingData.cancellationProtection && (
              <li>• Cancellation protection allows changes up to 24 hours before departure</li>
            )}
            <li>• For questions or changes, contact us at support@helicopterluxury.com</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
