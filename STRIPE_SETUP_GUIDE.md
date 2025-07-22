# 🚁 Stripe Payment Setup Guide

This guide will help you activate real Stripe payments for your helicopter booking system.

## 📋 Prerequisites

- A Stripe account (free to create at [stripe.com](https://stripe.com))
- Node.js installed on your system
- Your project files ready

## 🔐 Step 1: Get Stripe API Keys

1. **Sign up for Stripe** (if you haven't already):
   - Go to [https://stripe.com](https://stripe.com)
   - Click "Start now" and create your account
   - Complete the account verification process

2. **Get your API keys**:
   - Log into your Stripe Dashboard
   - Click "Developers" in the left sidebar
   - Click "API keys"
   - Copy both keys:
     - **Publishable key** (starts with `pk_test_` or `pk_live_`)
     - **Secret key** (starts with `sk_test_` or `sk_live_`)

## ⚙️ Step 2: Configure Environment Variables

### Frontend Configuration (.env file)
```bash
# Replace 'pk_test_YOUR_PUBLISHABLE_KEY_HERE' with your actual publishable key
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51Hxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Keep this as is for local development
VITE_API_BASE_URL=http://localhost:3001
```

### Backend Configuration (backend/.env file)
```bash
# Replace with your actual secret key from Stripe dashboard
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# Keep these as is for local development
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 🛠️ Step 3: Install and Run the Backend

1. **Navigate to backend folder**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the backend server**:
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   🚁 Helicopter Rental Payment API running on port 3001
   📍 Health check: http://localhost:3001/api/health
   💳 Payment endpoint: http://localhost:3001/api/create-payment-intent
   🔧 Environment: development
   ```

## 🚀 Step 4: Run Your Frontend

1. **In a new terminal, navigate to your main project**:
   ```bash
   cd ..
   ```

2. **Install frontend dependencies** (if not already done):
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

## 🧪 Step 5: Test the Payment System

### Test with Stripe Test Cards

Use these test card numbers for testing:

| Card Number | Brand | Result |
|------------|-------|--------|
| `4242424242424242` | Visa | Success |
| `4000000000000002` | Visa | Declined |
| `4000000000009995` | Visa | Insufficient funds |

- **Expiry Date**: Any future date (e.g., 12/34)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

### Testing Steps:
1. Go to your helicopter booking site
2. Select a helicopter and create a booking
3. Fill in the booking form
4. Proceed to payment
5. Use the test card `4242424242424242`
6. Complete the payment

## 🔴 IMPORTANT: Test vs Live Mode

### Test Mode (Development)
- Use keys starting with `pk_test_` and `sk_test_`
- Only test cards work
- No real money is charged
- Perfect for development and testing

### Live Mode (Production)
- Use keys starting with `pk_live_` and `sk_live_`
- Real cards are charged
- Real money transactions
- Only use when ready for production

## 🔧 Troubleshooting

### Backend Not Starting?
- Check if Node.js is installed: `node --version`
- Check if port 3001 is available
- Make sure `.env` file exists in `backend/` folder

### Payment Not Working?
- Check browser console for errors
- Verify Stripe keys are correct (no extra spaces)
- Make sure backend is running on port 3001
- Check that API keys match (test with test, live with live)

### CORS Errors?
- Make sure backend is running
- Check that `FRONTEND_URL` in backend `.env` matches your frontend URL

## 📱 Production Deployment

When ready for production:

1. **Update to Live Keys**:
   - Replace test keys with live keys in both `.env` files
   
2. **Update URLs**:
   - Change `VITE_API_BASE_URL` to your production backend URL
   - Change `FRONTEND_URL` in backend to your production frontend URL

3. **Security**:
   - Never commit `.env` files to git
   - Use environment variables in production
   - Enable HTTPS for both frontend and backend

## 📞 Support

If you need help:
- Check Stripe's documentation: [https://stripe.com/docs](https://stripe.com/docs)
- Review Stripe's test cards: [https://stripe.com/docs/testing](https://stripe.com/docs/testing)
- Check browser console for error messages

## 🎉 Success!

Once everything is working:
- ✅ Backend API running on port 3001
- ✅ Frontend connecting to backend
- ✅ Test payments working with test cards
- ✅ Ready to switch to live mode for production

Your helicopter booking system now has real Stripe payment processing! 🚁💳
