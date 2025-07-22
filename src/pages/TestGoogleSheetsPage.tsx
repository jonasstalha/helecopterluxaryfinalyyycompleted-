import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '../components/common/Button';
import { savePrePaymentBookingData, updatePaymentStatusInGoogleSheets } from '../lib/googleSheets';
import { BookingFormData } from '../types';

const TestGoogleSheetsPage: React.FC = () => {
  const [testing, setTesting] = useState(false);

  const testPrePaymentData = async () => {
    setTesting(true);
    try {
      const testBookingData: BookingFormData = {
        helicopterId: 'h1',
        customerName: 'Test Customer',
        customerEmail: 'test@example.com',
        customerPhone: '+17028158697',
        flightDate: new Date('2025-07-15T10:00:00'),
        passengers: [
          {
            id: 'p1',
            firstName: 'John',
            lastName: 'Doe',
            weight: 70,
            additionalInfo: 'Test passenger',
            wantsFrontSeat: true
          }
        ],
        basePrice: 829,
        frontSeatFee: 60,
        cancellationProtectionFee: 88,
        totalPrice: 977,
        cancellationProtection: true,
        specialRequests: 'Test booking from React app'
      };

      const bookingRef = `TEST${Date.now()}`;
      const success = await savePrePaymentBookingData(testBookingData, bookingRef);
      
      if (success) {
        toast.success('Test pre-payment data saved successfully!');
      } else {
        toast.error('Failed to save test pre-payment data');
      }
    } catch (error) {
      toast.error('Error testing pre-payment data');
      console.error(error);
    } finally {
      setTesting(false);
    }
  };

  const testPaymentUpdate = async () => {
    setTesting(true);
    try {
      // Use a recent booking reference from your sheet
      const testBookingRef = `TEST${Date.now() - 60000}`; // Use a reference from 1 minute ago
      const testPaymentId = `pi_test_${Date.now()}`;
      
      const success = await updatePaymentStatusInGoogleSheets(testBookingRef, testPaymentId);
      
      if (success) {
        toast.success('Payment status updated successfully!');
      } else {
        toast.error('Failed to update payment status (make sure booking reference exists)');
      }
    } catch (error) {
      toast.error('Error testing payment update');
      console.error(error);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Google Sheets Integration Test
          </h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Instructions:
              </h3>
              <ol className="text-blue-800 space-y-2">
                <li>1. Make sure you've completed the Google Apps Script setup</li>
                <li>2. Update the GOOGLE_SHEETS_API_URL in googleSheets.ts</li>
                <li>3. Click the buttons below to test the integration</li>
                <li>4. Check your Google Sheet to see if data appears</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-yellow-900 mb-4">
                  Test Pre-Payment Data
                </h3>
                <p className="text-yellow-800 mb-4">
                  This will add a new row with "FORM_COMPLETED" status and "PENDING" payment ID.
                </p>
                <Button
                  onClick={testPrePaymentData}
                  disabled={testing}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  {testing ? 'Testing...' : 'Test Pre-Payment'}
                </Button>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-4">
                  Test Payment Update
                </h3>
                <p className="text-green-800 mb-4">
                  This will update an existing row to "PAYMENT_CONFIRMED" status.
                </p>
                <Button
                  onClick={testPaymentUpdate}
                  disabled={testing}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {testing ? 'Testing...' : 'Test Payment Update'}
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Expected Google Sheet Structure:
              </h3>
              <div className="bg-white p-4 rounded border overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-blue-500 text-white">
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Booking Reference</th>
                      <th className="p-2 text-left">Payment ID</th>
                      <th className="p-2 text-left">Customer Name</th>
                      <th className="p-2 text-left">Customer Email</th>
                      <th className="p-2 text-left">...</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-yellow-100">
                      <td className="p-2">FORM_COMPLETED</td>
                      <td className="p-2">TEST123456</td>
                      <td className="p-2">PENDING</td>
                      <td className="p-2">Test Customer</td>
                      <td className="p-2">test@example.com</td>
                      <td className="p-2">...</td>
                    </tr>
                    <tr className="bg-green-100">
                      <td className="p-2">PAYMENT_CONFIRMED</td>
                      <td className="p-2">TEST123456</td>
                      <td className="p-2">pi_confirmed123</td>
                      <td className="p-2">Test Customer</td>
                      <td className="p-2">test@example.com</td>
                      <td className="p-2">...</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestGoogleSheetsPage;
