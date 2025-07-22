/**
 * Google Apps Script for Helicopter Booking Google Sheets Integration
 * 
 * Instructions:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Replace the default code with this code
 * 4. Save and deploy as a web app
 * 5. Set permissions to execute as you and access by anyone
 * 6. Copy the deployment URL and use it in your React app
 */

// Helper function to create response with CORS headers
function createCORSResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    .setHeader('Access-Control-Max-Age', '86400');
}

function doPost(e) {
  try {
    // Parse the request
    const requestData = JSON.parse(e.postData.contents);
    
    if (requestData.action === 'addBooking') {
      return addBookingToSheet(requestData.data);
    } else if (requestData.action === 'addPrePaymentBooking') {
      return addPrePaymentBookingToSheet(requestData.data);
    } else if (requestData.action === 'updatePaymentStatus') {
      return updatePaymentStatusInSheet(requestData.data);
    }
    
    return createCORSResponse({
      success: false,
      error: 'Unknown action'
    });
      
  } catch (error) {
    return createCORSResponse({
      success: false,
      error: error.toString()
    });
  }
}

// Handle preflight OPTIONS requests for CORS
function doOptions(e) {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With')
    .setHeader('Access-Control-Max-Age', '86400');
}

function doGet(e) {
  return createCORSResponse({
    success: true,
    message: 'Helicopter Booking API is running'
  });
}

function updatePaymentStatusInSheet(updateData) {
  try {
    const spreadsheetId = '1TrvaeZSqG_xnzFDL07pglH_ocQxO6VcR1dEZbQHBUQg';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Find the row with the booking reference
    const bookingRefColumn = 2; // Column B (Booking Reference)
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) { // Start from row 2 (skip header)
      if (data[i][bookingRefColumn - 1] === updateData.bookingReference) {
        // Update the status and payment ID
        sheet.getRange(i + 1, 1).setValue('PAYMENT_CONFIRMED'); // Status column (A)
        sheet.getRange(i + 1, 3).setValue(updateData.paymentId); // Payment ID column (C)
        
        // Color code the status
        const statusRange = sheet.getRange(i + 1, 1, 1, 1);
        statusRange.setBackground('#d4edda').setFontColor('#155724'); // Green for confirmed
        
        return ContentService
          .createTextOutput(JSON.stringify({
            success: true,
            message: 'Payment status updated successfully',
            row: i + 1
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // If booking reference not found, return error
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: 'Booking reference not found'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function addPrePaymentBookingToSheet(bookingData) {
  try {
    // Use the specific Google Sheet ID you provided
    const spreadsheetId = '1TrvaeZSqG_xnzFDL07pglH_ocQxO6VcR1dEZbQHBUQg';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Check if headers exist, if not add them
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Status',
        'Booking Reference',
        'Payment ID', 
        'Customer Name',
        'Customer Email',
        'Customer Phone',
        'Flight Date',
        'Flight Time',
        'Passengers Count',
        'Passengers Details',
        'Base Price',
        'Front Seat Fee',
        'Cancellation Protection Fee', 
        'Total Price',
        'Special Requests',
        'Booking Date Time',
        'Front Seat Requests',
        'Cancellation Protection'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setBackground('#4285f4')
        .setFontColor('white');
    }
    
    // Prepare row data
    const rowData = [
      bookingData.status || 'FORM_COMPLETED',
      bookingData.bookingReference,
      bookingData.paymentId,
      bookingData.customerName,
      bookingData.customerEmail,
      bookingData.customerPhone,
      bookingData.flightDate,
      bookingData.flightTime,
      bookingData.passengersCount,
      bookingData.passengersDetails,
      bookingData.basePrice,
      bookingData.frontSeatFee,
      bookingData.cancellationProtectionFee,
      bookingData.totalPrice,
      bookingData.specialRequests,
      bookingData.bookingDateTime,
      bookingData.frontSeatRequests,
      bookingData.cancellationProtection ? 'Yes' : 'No'
    ];
    
    // Add the new row
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, rowData.length);
    
    // Add alternating row colors for better readability
    if ((lastRow + 1) % 2 === 0) {
      sheet.getRange(lastRow + 1, 1, 1, rowData.length).setBackground('#f8f9fa');
    }
    
    // Color code the status column
    const statusRange = sheet.getRange(lastRow + 1, 1, 1, 1);
    if (bookingData.status === 'FORM_COMPLETED') {
      statusRange.setBackground('#fff3cd').setFontColor('#856404'); // Yellow for pending
    } else if (bookingData.status === 'PAYMENT_CONFIRMED') {
      statusRange.setBackground('#d4edda').setFontColor('#155724'); // Green for confirmed
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Pre-payment booking data added successfully',
        row: lastRow + 1
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function addBookingToSheet(bookingData) {
  try {
    // Get or create the spreadsheet
    const spreadsheetId = '1TrvaeZSqG_xnzFDL07pglH_ocQxO6VcR1dEZbQHBUQg'; // Your Google Sheet ID
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Check if headers exist, if not add them
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Status',
        'Booking Reference',
        'Payment ID', 
        'Customer Name',
        'Customer Email',
        'Customer Phone',
        'Flight Date',
        'Flight Time',
        'Passengers Count',
        'Passengers Details',
        'Base Price',
        'Front Seat Fee',
        'Cancellation Protection Fee', 
        'Total Price',
        'Special Requests',
        'Booking Date Time',
        'Front Seat Requests',
        'Cancellation Protection'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format headers
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setBackground('#4285f4')
        .setFontColor('white');
    }
    
    // Prepare row data
    const rowData = [
      'PAYMENT_CONFIRMED', // Status
      bookingData.bookingReference,
      bookingData.paymentId,
      bookingData.customerName,
      bookingData.customerEmail,
      bookingData.customerPhone,
      bookingData.flightDate,
      bookingData.flightTime,
      bookingData.passengersCount,
      bookingData.passengersDetails,
      bookingData.basePrice,
      bookingData.frontSeatFee,
      bookingData.cancellationProtectionFee,
      bookingData.totalPrice,
      bookingData.specialRequests,
      bookingData.bookingDateTime,
      bookingData.frontSeatRequests,
      bookingData.cancellationProtection ? 'Yes' : 'No'
    ];
    
    // Add the new row
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, rowData.length);
    
    // Add alternating row colors for better readability
    if ((lastRow + 1) % 2 === 0) {
      sheet.getRange(lastRow + 1, 1, 1, rowData.length).setBackground('#f8f9fa');
    }
    
    // Color code the status column - Green for payment confirmed
    const statusRange = sheet.getRange(lastRow + 1, 1, 1, 1);
    statusRange.setBackground('#d4edda').setFontColor('#155724'); // Green for confirmed
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Booking added successfully',
        row: lastRow + 1
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the setup
function testAddBooking() {
  const testData = {
    bookingReference: 'HL12345678',
    paymentId: 'pi_test123456',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+1234567890',
    flightDate: 'Monday, July 15, 2024',
    flightTime: '10:00 AM',
    passengersCount: 2,
    passengersDetails: '1. John Doe (70kg) | 2. Jane Doe (60kg) - Front seat requested',
    basePrice: 829,
    frontSeatFee: 60,
    cancellationProtectionFee: 88,
    totalPrice: 977,
    specialRequests: 'Vegetarian meal',
    bookingDateTime: '7/11/2025, 3:00:00 PM',
    frontSeatRequests: 'Jane Doe',
    cancellationProtection: true
  };
  
  return addBookingToSheet(testData);
}

// Test function for pre-payment booking
function testPrePaymentBooking() {
  const testData = {
    status: 'FORM_COMPLETED',
    bookingReference: 'HL87654321',
    paymentId: 'PENDING',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+1234567890',
    flightDate: 'Tuesday, July 16, 2024',
    flightTime: '02:00 PM',
    passengersCount: 1,
    passengersDetails: '1. Jane Smith (65kg)',
    basePrice: 829,
    frontSeatFee: 0,
    cancellationProtectionFee: 0,
    totalPrice: 829,
    specialRequests: 'None',
    bookingDateTime: '7/11/2025, 4:00:00 PM',
    frontSeatRequests: 'None',
    cancellationProtection: false
  };
  
  return addPrePaymentBookingToSheet(testData);
}

// Test function for payment status update
function testPaymentStatusUpdate() {
  const testData = {
    bookingReference: 'HL87654321',
    paymentId: 'pi_confirmed123456'
  };
  
  return updatePaymentStatusInSheet(testData);
}
