import { BookingFormData } from '../types';

// Google Sheets API configuration
const GOOGLE_SHEETS_API_URL = 'https://script.google.com/macros/s/1vOn2WeWINWrgLjn2ERCBvNUKuFBWKmT4yESsI0asmMW40yVMgVfnDud8/exec';

export interface BookingSheetData {
  bookingReference: string;
  paymentId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  flightDate: string;
  flightTime: string;
  passengersCount: number;
  passengersDetails: string;
  basePrice: number;
  frontSeatFee: number;
  cancellationProtectionFee: number;
  totalPrice: number;
  specialRequests: string;
  bookingDateTime: string;
  frontSeatRequests: string;
  cancellationProtection: boolean;
}

// Function to update payment status in Google Sheets
export const updatePaymentStatusInGoogleSheets = async (
  bookingRef: string,
  paymentIntentId: string
): Promise<boolean> => {
  try {
    const response = await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        action: 'updatePaymentStatus',
        data: {
          bookingReference: bookingRef,
          paymentId: paymentIntentId
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log('Payment status updated successfully in Google Sheets:', result);
      return true;
    } else {
      console.error('Error updating payment status in Google Sheets:', result.error);
      return false;
    }
  } catch (error) {
    console.error('Failed to update payment status in Google Sheets:', error);
    return false;
  }
};

// Function to save booking data BEFORE payment (pre-payment data)
export const savePrePaymentBookingData = async (
  bookingData: BookingFormData,
  bookingRef: string
): Promise<boolean> => {
  try {
    // Prepare passengers details
    const passengersDetails = bookingData.passengers.map((p, index) => 
      `${index + 1}. ${p.firstName} ${p.lastName} (${p.weight}kg)${p.wantsFrontSeat ? ' - Front seat requested' : ''}${p.additionalInfo ? ` - Note: ${p.additionalInfo}` : ''}`
    ).join(' | ');

    // Prepare front seat requests
    const frontSeatRequests = bookingData.passengers
      .filter(p => p.wantsFrontSeat)
      .map(p => `${p.firstName} ${p.lastName}`)
      .join(', ') || 'None';

    // Prepare data for Google Sheets (pre-payment)
    const sheetData = {
      bookingReference: bookingRef,
      paymentId: 'PENDING', // Mark as pending payment
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
      passengersDetails,
      basePrice: bookingData.basePrice,
      frontSeatFee: bookingData.frontSeatFee,
      cancellationProtectionFee: bookingData.cancellationProtectionFee,
      totalPrice: bookingData.totalPrice,
      specialRequests: bookingData.specialRequests || 'None',
      bookingDateTime: new Date().toLocaleString('en-US'),
      frontSeatRequests,
      cancellationProtection: bookingData.cancellationProtection,
      status: 'FORM_COMPLETED' // Add status field
    };

    // Send data to Google Sheets via Google Apps Script
    const response = await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        action: 'addPrePaymentBooking',
        data: sheetData
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log('Pre-payment booking data successfully saved to Google Sheets:', result);
      return true;
    } else {
      console.error('Error saving pre-payment data to Google Sheets:', result.error);
      return false;
    }
  } catch (error) {
    console.error('Failed to save pre-payment booking data to Google Sheets:', error);
    
    // Fallback: Save to localStorage if Google Sheets fails
    try {
      const existingBookings = JSON.parse(localStorage.getItem('helicopter-bookings-fallback') || '[]');
      existingBookings.push({
        ...bookingData,
        timestamp: new Date().toISOString(),
        source: 'fallback-cors-error'
      });
      localStorage.setItem('helicopter-bookings-fallback', JSON.stringify(existingBookings));
      console.log('Booking data saved to localStorage as fallback');
    } catch (fallbackError) {
      console.error('Failed to save to localStorage fallback:', fallbackError);
    }
    
    return false;
  }
};

export const saveBookingToGoogleSheets = async (
  bookingData: BookingFormData,
  bookingRef: string,
  paymentIntentId: string
): Promise<boolean> => {
  try {
    // Prepare passengers details
    const passengersDetails = bookingData.passengers.map((p, index) => 
      `${index + 1}. ${p.firstName} ${p.lastName} (${p.weight}kg)${p.wantsFrontSeat ? ' - Front seat requested' : ''}${p.additionalInfo ? ` - Note: ${p.additionalInfo}` : ''}`
    ).join(' | ');

    // Prepare front seat requests
    const frontSeatRequests = bookingData.passengers
      .filter(p => p.wantsFrontSeat)
      .map(p => `${p.firstName} ${p.lastName}`)
      .join(', ') || 'None';

    // Prepare data for Google Sheets
    const sheetData: BookingSheetData = {
      bookingReference: bookingRef,
      paymentId: paymentIntentId,
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
      passengersDetails,
      basePrice: bookingData.basePrice,
      frontSeatFee: bookingData.frontSeatFee,
      cancellationProtectionFee: bookingData.cancellationProtectionFee,
      totalPrice: bookingData.totalPrice,
      specialRequests: bookingData.specialRequests || 'None',
      bookingDateTime: new Date().toLocaleString('en-US'),
      frontSeatRequests,
      cancellationProtection: bookingData.cancellationProtection
    };

    // Send data to Google Sheets via Google Apps Script
    const response = await fetch(GOOGLE_SHEETS_API_URL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'addBooking',
        data: sheetData
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      console.log('Booking successfully saved to Google Sheets:', result);
      return true;
    } else {
      console.error('Error saving to Google Sheets:', result.error);
      return false;
    }
  } catch (error) {
    console.error('Failed to save booking to Google Sheets:', error);
    return false;
  }
};

// Function to create the Google Apps Script URL (you'll need to set this up)
export const setupGoogleSheetsInstructions = () => {
  return `
To set up Google Sheets integration:

1. Create a new Google Sheet for storing bookings
2. Go to Extensions > Apps Script
3. Replace the code with the provided Google Apps Script code
4. Deploy as a web app with permissions to execute as you and access by anyone
5. Copy the deployment URL and replace YOUR_SCRIPT_ID in the GOOGLE_SHEETS_API_URL

The Google Sheet will have columns:
- Booking Reference
- Payment ID
- Customer Name
- Customer Email
- Customer Phone
- Flight Date
- Flight Time
- Passengers Count
- Passengers Details
- Base Price
- Front Seat Fee
- Cancellation Protection Fee
- Total Price
- Special Requests
- Booking Date Time
- Front Seat Requests
- Cancellation Protection
`;
};
