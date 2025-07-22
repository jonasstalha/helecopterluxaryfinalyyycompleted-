## Instructions to Fix CORS and Backend Issues

### ✅ What's Been Fixed:

1. **Backend Server**: Now running on port 3001 with proper Stripe configuration
2. **CORS Headers**: Added proper CORS handling in Google Apps Script
3. **Fetch Calls**: Updated frontend to use 'cors' mode for all Google Sheets requests
4. **Environment Variables**: Created proper .env file with your Stripe keys

### 🔧 Next Steps You Need to Complete:

#### 1. Update Google Apps Script (CRITICAL)
- Go to: https://script.google.com/home
- Open your existing Google Apps Script project
- Replace ALL the code with the updated content from `google-apps-script.js`
- **Save** the script
- **Deploy** > New deployment
- Choose type: Web app
- Set execute as: Me
- Set access: Anyone
- Click Deploy
- **Copy the new deployment URL** (if different from current)

#### 2. Update Google Sheets URL (if needed)
If you get a new deployment URL, update it in:
- `src/lib/googleSheets.ts` (line 4)

#### 3. Test the Application
- Frontend should be running on: http://localhost:5174
- Backend is now running on: http://localhost:3001
- Try making a booking to test both Google Sheets and Stripe integration

### 🚨 Important Notes:
- Keep the backend server running for payments to work
- The Google Apps Script MUST be redeployed with the new CORS code
- Make sure the Google Sheet ID in the script matches your actual sheet

### 🔍 Verification:
After updating the Google Apps Script, you should see:
- No more CORS errors in browser console
- Successful booking data submission to Google Sheets
- Stripe payment processing working

### 📁 Files Updated:
- ✅ `backend/.env` - Added Stripe secret key
- ✅ `src/lib/googleSheets.ts` - Added CORS mode to fetch calls
- ✅ `google-apps-script.js` - Fixed CORS headers and OPTIONS handling
- ✅ Backend server running on port 3001
