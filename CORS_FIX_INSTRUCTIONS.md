# Google Apps Script CORS Fix Instructions

## Issue
The Google Apps Script is returning CORS errors when called from the React application.

## Solution
Update the Google Apps Script to include CORS headers in all responses.

## Updated Google Apps Script Code

Replace the entire `google-apps-script.js` content with this CORS-enabled version:

```javascript
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
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
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

function doGet(e) {
  return createCORSResponse({
    success: true,
    message: 'Helicopter Booking API is running'
  });
}

// Handle OPTIONS requests for CORS preflight
function doOptions(e) {
  return createCORSResponse({
    success: true,
    message: 'CORS preflight handled'
  });
}
```

## Important Notes

1. **Replace ALL `ContentService.createTextOutput()` calls** with `createCORSResponse()` throughout the file
2. **Add the `doOptions` function** to handle preflight requests
3. **Redeploy the Google Apps Script** after making changes
4. **Test the deployment** by visiting the script URL in a browser

## Alternative Solution

If CORS issues persist, you can also create a simple Node.js proxy server:

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/sheets', async (req, res) => {
  try {
    const response = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('Proxy server running on port 3001');
});
```

This proxy server would handle CORS for you and forward requests to Google Apps Script.
