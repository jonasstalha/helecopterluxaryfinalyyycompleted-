# Complete Stripe Payment Integration Guide

## 🔑 API Keys Configuration

### Frontend (.env)
✅ **Already Updated**: Your publishable key is now configured
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51Rk0mCI1qYCIQN0OhAL7g9keKknPasSGq1PaBUdl9z4tSZJdwfC7s227ozdxnXl5sQjXJHiMX84Bpq23g8uwHngb00uDjV1Q7E
```

### Backend (backend/.env)
⚠️ **Needs Your Secret Key**: You need to add your Stripe secret key

**Steps to get your secret key:**
1. Go to https://dashboard.stripe.com/test/apikeys
2. Find your "Secret key" (starts with `sk_test_`)
3. Copy it and replace in `backend/.env`:

```
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY_HERE
```

## 🚀 How to Complete the Setup

### Step 1: Get Your Stripe Secret Key
1. Visit: https://dashboard.stripe.com/test/apikeys
2. Log in to your Stripe account
3. Look for "Secret key" in the API keys section
4. Click "Reveal test key" 
5. Copy the key (starts with `sk_test_`)

### Step 2: Update Backend Environment
Edit `backend/.env`:
```bash
# Replace this line:
STRIPE_SECRET_KEY=sk_test_REPLACE_WITH_YOUR_ACTUAL_SECRET_KEY

# With your actual secret key:
STRIPE_SECRET_KEY=sk_test_YOUR_COPIED_SECRET_KEY
```

### Step 3: Start the Backend Server
```bash
cd backend
npm install
npm start
```

### Step 4: Test the Payment System
1. Go to a helicopter booking page
2. Fill out the booking form
3. Proceed to payment
4. Use Stripe test card: `4242 4242 4242 4242`
5. Any future date, any CVC, any ZIP

## 🧪 Test Card Numbers

### Successful Payments
- **Visa**: `4242 4242 4242 4242`
- **Visa (debit)**: `4000 0566 5566 5556`
- **Mastercard**: `5555 5555 5555 4444`
- **American Express**: `3782 8224 6310 005`

### Failed Payments (for testing)
- **Declined**: `4000 0000 0000 0002`
- **Insufficient funds**: `4000 0000 0000 9995`
- **Expired card**: `4000 0000 0000 0069`

### Test Details
- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3-digit number (e.g., 123)
- **ZIP**: Any 5-digit number (e.g., 12345)

## 🔍 How to Verify It's Working

### 1. Check Stripe Dashboard
- Go to https://dashboard.stripe.com/test/payments
- You should see test payments after successful transactions

### 2. Check Browser Console
- Open Developer Tools (F12)
- Look for payment success/error messages
- Check network tab for API calls

### 3. Check Application Logs
- Backend server should log payment intents
- Frontend should show success/error toasts

## 📁 Files Updated

### Frontend Environment (/.env)
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51Rk0mCI1qYCIQN0OhAL7g9keKknPasSGq1PaBUdl9z4tSZJdwfC7s227ozdxnXl5sQjXJHiMX84Bpq23g8uwHngb00uDjV1Q7E
```

### Backend Environment (/backend/.env)
```
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY_HERE
```

## 🚨 Important Security Notes

1. **Never share your secret key** - it's in .env files which are ignored by git
2. **Use test keys** - your key starts with `pk_test_` and `sk_test_`
3. **For production** - replace test keys with live keys from Stripe dashboard

## 🛠️ Troubleshooting

### Backend Server Won't Start
```bash
cd backend
npm install
npm start
```

### Payment Intent Creation Fails
- Check that backend/.env has correct secret key
- Verify backend server is running on port 3001
- Check browser console for CORS errors

### Stripe Elements Not Loading
- Verify frontend .env has correct publishable key
- Check that HTTPS is used in production
- Restart development server after changing .env

## 📋 Next Steps After Setup

1. **Test all payment flows**
2. **Configure webhooks** for production
3. **Set up proper error handling**
4. **Add payment confirmation emails**
5. **Implement refund functionality**

## 🎯 Payment Flow Summary

1. **Customer** fills booking form
2. **Frontend** sends booking data to backend
3. **Backend** creates PaymentIntent with Stripe
4. **Frontend** confirms payment with card details
5. **Stripe** processes payment
6. **Backend** receives confirmation
7. **Frontend** shows success/failure message
8. **System** updates booking status

Your payment system is now ready for testing once you add your Stripe secret key!
