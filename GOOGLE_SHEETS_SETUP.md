# Google Sheets Integration Setup Guide

## Step 1: Access Your Google Sheet
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1TrvaeZSqG_xnzFDL07pglH_ocQxO6VcR1dEZbQHBUQg/edit
2. Make sure you have edit permissions for this sheet

## Step 2: Create Google Apps Script
1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. This will open the Google Apps Script editor in a new tab
3. You'll see a default function called `myFunction()` - DELETE ALL THE DEFAULT CODE
4. Copy ALL the content from the `google-apps-script.js` file in your project root
5. Paste it into the Apps Script editor, replacing all default code

## Step 3: Save and Deploy the Script
1. Click **Save** (💾 icon) in the Apps Script editor
2. Give your project a name (e.g., "Helicopter Booking API")
3. Click **Deploy** → **New deployment**
4. Click the gear icon ⚙️ next to "Type" and select **Web app**
5. Configure the deployment:
   - **Description**: "Helicopter Booking Google Sheets API"
   - **Execute as**: "Me" (YOUR_EMAIL@gmail.com)
   - **Who has access**: "Anyone"
6. Click **Deploy**
7. You may need to authorize the script:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Your Project Name] (unsafe)**
   - Click **Allow**

## Step 4: Get the Web App URL
1. After successful deployment, you'll see a **Web app URL** like:
   ```
   https://script.google.com/macros/s/AKfycbz...../exec
   ```
2. **COPY THIS URL** - you'll need it for the next step

## Step 5: Update Your React App
1. Open `src/lib/googleSheets.ts` in your project
2. Find this line:
   ```typescript
   const GOOGLE_SHEETS_API_URL = 'https://script.google.com/macros/s/1vOn2WeWINWrgLjn2ERCBvNUKuFBWKmT4yESsI0asmMW40yVMgVfnDud8/exec';
   ```
3. Replace it with YOUR URL from Step 4:
   ```typescript
   const GOOGLE_SHEETS_API_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec';
   ```

## Step 6: Test the Integration
1. Start your React development server:
   ```bash
   npm run dev
   ```
2. Go to: `http://localhost:5173/test-google-sheets`
3. Click "Test Pre-Payment" button
4. Check your Google Sheet - you should see a new row with test data
5. Click "Test Payment Update" button
6. The row should update from "FORM_COMPLETED" to "PAYMENT_CONFIRMED"

## Step 7: Test the Full Booking Flow
1. Go to your helicopter listing page
2. Select a helicopter and book it
3. Fill out the booking form completely
4. Click "Proceed to Payment"
5. Check your Google Sheet - you should see the booking data with "FORM_COMPLETED" status
6. (For payment testing, you would complete the payment process)

## Expected Google Sheet Structure
Your sheet will automatically create these columns:
- **Status**: "FORM_COMPLETED" → "PAYMENT_CONFIRMED"
- **Booking Reference**: Unique ID like "HL12345678"
- **Payment ID**: "PENDING" → actual payment ID
- **Customer Name**: Full name from form
- **Customer Email**: Email from form
- **Customer Phone**: Phone from form
- **Flight Date**: Formatted date
- **Flight Time**: Formatted time
- **Passengers Count**: Number of passengers
- **Passengers Details**: Detailed passenger info
- **Base Price**: Flight base price
- **Front Seat Fee**: Additional fees
- **Cancellation Protection Fee**: Protection fee
- **Total Price**: Total amount
- **Special Requests**: Any special requests
- **Booking Date Time**: When booking was made
- **Front Seat Requests**: Who requested front seats
- **Cancellation Protection**: Yes/No

## Color Coding (Automatic)
- **Yellow background**: Form completed, payment pending
- **Green background**: Payment confirmed
- **Headers**: Blue background with white text
- **Alternating rows**: Light gray for readability

## Troubleshooting

### If you get "Script not found" errors:
1. Make sure you copied the EXACT URL from the deployment
2. Verify the script is deployed as a "Web app" not just saved
3. Check that access is set to "Anyone"

### If you get permission errors:
1. Re-authorize the script in Apps Script editor
2. Make sure "Execute as" is set to "Me"
3. Check that you have edit permissions on the Google Sheet

### If data isn't appearing:
1. Open browser developer tools (F12)
2. Check the Console tab for errors
3. Try the test page first: `/test-google-sheets`
4. Verify the Google Sheet ID is correct in the script

### If you need to redeploy:
1. Go back to Apps Script editor
2. Click **Deploy** → **Manage deployments**
3. Click the pencil icon to edit
4. Update the version and redeploy

## Manual Testing in Google Apps Script
You can also test directly in the Apps Script editor:
1. Go to the Apps Script editor
2. Select `testPrePaymentBooking` from the function dropdown
3. Click **Run** ▶️
4. Check your Google Sheet for the test data

## Security Notes
- The script only accepts POST requests with specific actions
- No sensitive data is logged
- All requests are validated before processing
- The "Anyone" access is safe for this use case as it only handles booking data

## Next Steps
Once everything is working:
1. Remove the test route from your production app
2. Consider adding error handling for failed Google Sheets writes
3. You may want to add additional validation in the Google Apps Script
