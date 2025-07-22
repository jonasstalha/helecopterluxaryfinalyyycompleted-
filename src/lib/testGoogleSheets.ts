import { saveBookingToGoogleSheets } from './googleSheets';
import { BookingFormData } from '../types';

// Test function to verify Google Sheets integration
export const testGoogleSheetsIntegration = async (): Promise<void> => {
  console.log('🧪 Testing Google Sheets integration...');
  
  // Sample booking data for testing
  const testBookingData: BookingFormData = {
    helicopterId: 'test-helicopter-1',
    customerName: 'John Test',
    customerEmail: 'test@example.com',
    customerPhone: '+17028158697',
    flightDate: new Date('2025-07-15T10:00:00'),
    passengers: [
      {
        id: 'test-passenger-1',
        firstName: 'John',
        lastName: 'Test',
        weight: 70,
        wantsFrontSeat: true,
        additionalInfo: 'Test passenger'
      },
      {
        id: 'test-passenger-2',
        firstName: 'Jane',
        lastName: 'Test',
        weight: 60,
        wantsFrontSeat: false,
        additionalInfo: ''
      }
    ],
    basePrice: 829,
    frontSeatFee: 60,
    cancellationProtectionFee: 88,
    totalPrice: 977,
    specialRequests: 'This is a test booking',
    cancellationProtection: true
  };

  try {
    const result = await saveBookingToGoogleSheets(
      testBookingData,
      'TEST-' + Date.now(),
      'pi_test_' + Date.now()
    );
    
    if (result) {
      console.log('✅ Google Sheets integration test PASSED!');
      console.log('📊 Check your Google Sheets document for the test booking');
    } else {
      console.log('❌ Google Sheets integration test FAILED!');
    }
    
  } catch (error) {
    console.error('❌ Google Sheets integration test ERROR:', error);
  }
};

// Helper function to run test from browser console
(window as any).testGoogleSheets = testGoogleSheetsIntegration;
