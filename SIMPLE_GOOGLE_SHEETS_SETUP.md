# Simple Google Sheets Integration (Like the Video)

## ✅ Quick Setup (5 minutes total)

### Step 1: Create Google Apps Script (2 minutes)
1. Go to https://script.google.com
2. Click **"New project"**
3. Delete all the default code
4. Copy and paste the code from `simple-google-apps-script.js` file
5. Click **Save** and name it "Helicopter Booking Form"

### Step 2: Deploy as Web App (1 minute)
1. Click **"Deploy"** → **"New deployment"**
2. Click the gear icon and select **"Web app"**
3. Settings:
   - **Execute as:** "Me"
   - **Who has access:** "Anyone"
4. Click **"Deploy"**
5. **Copy the web app URL** (looks like: `https://script.google.com/macros/s/ABC123.../exec`)

### Step 3: Update Your Form (1 minute)
1. Open `src/pages/SimpleBookingFormPage.tsx`
2. Find this line:
   ```typescript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
3. Replace `YOUR_SCRIPT_ID` with your actual script ID from Step 2

### Step 4: Test It! (1 minute)
1. Start your app: `npm run dev`
2. Go to: `http://localhost:5173/simple-booking/h1` (or any helicopter ID)
3. Fill out the form and submit
4. Check your Google Sheet - data should appear instantly!

---

## Method 1: Google Forms (Easiest - 2 minutes setup)

### Step 1: Create a Google Form
1. Go to https://forms.google.com
2. Click "Blank form" 
3. Add these fields:
   - **Customer Name** (Short answer)
   - **Email** (Short answer)
   - **Phone** (Short answer)
   - **Flight Date** (Date)
   - **Number of Passengers** (Number)
   - **Special Requests** (Long answer)

### Step 2: Link to Google Sheet
1. In your form, click the "Responses" tab
2. Click the Google Sheets icon
3. Choose "Create a new spreadsheet"
4. Your form responses will automatically go to this sheet!

### Step 3: Get the Form URL
1. Click "Send" button in your form
2. Copy the form URL (it looks like: `https://forms.gle/xxxxx`)

### Step 4: Embed in Your React App
Replace your booking form with an iframe:

```jsx
<iframe 
  src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true" 
  width="640" 
  height="800" 
  frameborder="0" 
  marginheight="0" 
  marginwidth="0"
>
  Loading…
</iframe>
```

**✅ Done! Data automatically goes to Google Sheets with zero coding!**

---

## Method 2: Simple HTML Form (Like the Video)

### Step 1: Create Simple Google Apps Script
1. Go to https://script.google.com
2. Click "New project"
3. Paste this simple code:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.openById('1TrvaeZSqG_xnzFDL07pglH_ocQxO6VcR1dEZbQHBUQg');
  const data = e.parameter;
  
  // Add headers if first row
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Flight Date', 'Passengers', 'Special Requests']);
  }
  
  // Add form data
  sheet.appendRow([
    new Date(),
    data.name,
    data.email, 
    data.phone,
    data.flightDate,
    data.passengers,
    data.specialRequests
  ]);
  
  return ContentService.createTextOutput('Success');
}
```

### Step 2: Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Type: "Web app"
3. Execute as: "Me"
4. Access: "Anyone"
5. Copy the URL

### Step 3: Update Your React Form
Replace your complex form submission with this simple version:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  try {
    await fetch('YOUR_GOOGLE_SCRIPT_URL', {
      method: 'POST',
      body: formData
    });
    
    toast.success('Booking submitted successfully!');
    navigate('/booking/confirmation');
  } catch (error) {
    toast.error('Failed to submit booking');
  }
};

return (
  <form onSubmit={handleSubmit}>
    <input name="name" placeholder="Your Name" required />
    <input name="email" type="email" placeholder="Email" required />
    <input name="phone" placeholder="Phone" required />
    <input name="flightDate" type="date" required />
    <input name="passengers" type="number" min="1" required />
    <textarea name="specialRequests" placeholder="Special Requests"></textarea>
    <button type="submit">Submit Booking</button>
  </form>
);
```

**✅ Done! Much simpler than the complex setup!**

---

## Method 3: Even Simpler - Use a Service

### Formspree (Free)
1. Go to https://formspree.io
2. Create account
3. Add this to your form:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input name="name" placeholder="Name" required />
  <input name="email" type="email" required />
  <input name="phone" placeholder="Phone" required />
  <button type="submit">Submit</button>
</form>
```

### Netlify Forms (Free)
1. Add `netlify` attribute to your form
2. Deploy on Netlify
3. Forms automatically work!

```html
<form netlify>
  <input name="name" placeholder="Name" required />
  <input name="email" type="email" required />
  <button type="submit">Submit</button>
</form>
```

---

## Which Method Should You Use?

| Method | Pros | Cons | Time |
|--------|------|------|------|
| **Google Forms** | Zero coding, automatic validation | Less control over design | 2 min |
| **Simple Script** | More control, custom design | Some coding required | 5 min |
| **Formspree** | Very easy, good design | Limited free tier | 5 min |
| **Current Complex Setup** | Full control, payment integration | Complex, hard to debug | 2 hours |

## Recommendation

**For quick testing:** Use Google Forms (Method 1)
**For production:** Use Simple Script (Method 2) - **Already implemented!**
**For zero coding:** Use Formspree (Method 3)

The video method you mentioned is exactly Method 2 - simple HTML form + Google Apps Script. It's much easier than our current complex setup!

## What's Already Done For You

✅ **Simple booking form created** (`SimpleBookingFormPage.tsx`)
✅ **Google Apps Script code ready** (`simple-google-apps-script.js`)
✅ **Confirmation page created** (`SimpleBookingConfirmationPage.tsx`)
✅ **Routes added to your app**

## Test URLs
- Simple booking form: `http://localhost:5173/simple-booking/h1`
- Confirmation page: `http://localhost:5173/simple-booking/confirmation`

Just follow Step 1-3 above to deploy the script and update the URL!
