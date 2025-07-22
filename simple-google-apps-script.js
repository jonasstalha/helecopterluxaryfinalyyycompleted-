/**
 * Simple Google Apps Script for Helicopter Booking Form
 * Just like the video method - simple and easy!
 * 
 * Instructions:
 * 1. Go to https://script.google.com
 * 2. Create new project
 * 3. Paste this code
 * 4. Deploy as web app
 * 5. Copy URL and use in your form
 */

function doPost(e) {
  try {
    // Your Google Sheet ID
    const spreadsheetId = '1TrvaeZSqG_xnzFDL07pglH_ocQxO6VcR1dEZbQHBUQg';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();
    
    // Get form data
    const data = e.parameter;
    
    // Add headers if this is the first entry
    if (sheet.getLastRow() === 0) {
      const headers = [
        'Timestamp',
        'Customer Name', 
        'Email',
        'Phone',
        'Flight Date',
        'Passengers Count',
        'Preferred Time',
        'Special Requests',
        'Front Seat Preference',
        'Photography Service',
        'Newsletter Subscribe',
        'Helicopter ID',
        'Status'
      ];
      
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Style the headers
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setBackground('#4285f4')
        .setFontColor('white');
    }
    
    // Prepare the row data
    const rowData = [
      new Date(),                              // Timestamp
      data.customerName || '',                 // Customer Name
      data.customerEmail || '',                // Email
      data.customerPhone || '',                // Phone
      data.flightDate || '',                   // Flight Date
      data.passengersCount || '',              // Passengers Count
      data.preferredTime || '',                // Preferred Time
      data.specialRequests || '',              // Special Requests
      data.frontSeatPreference || 'No',        // Front Seat Preference
      data.photographyService || 'No',         // Photography Service
      data.newsletterSubscribe || 'No',        // Newsletter Subscribe
      data.helicopterId || '',                 // Helicopter ID
      'NEW BOOKING'                            // Status
    ];
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Style the new row
    const lastRow = sheet.getLastRow();
    
    // Add alternating colors
    if (lastRow % 2 === 0) {
      sheet.getRange(lastRow, 1, 1, rowData.length).setBackground('#f8f9fa');
    }
    
    // Highlight the status column
    sheet.getRange(lastRow, 13, 1, 1)
      .setBackground('#fff3cd')
      .setFontColor('#856404')
      .setFontWeight('bold');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, rowData.length);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Booking submitted successfully!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - you can run this to test
function testFormSubmission() {
  const testData = {
    parameter: {
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      customerPhone: '+1234567890',
      flightDate: '2025-07-15',
      passengersCount: '2',
      preferredTime: 'morning',
      specialRequests: 'Test booking',
      frontSeatPreference: 'yes',
      helicopterId: 'test123'
    }
  };
  
  return doPost(testData);
}
