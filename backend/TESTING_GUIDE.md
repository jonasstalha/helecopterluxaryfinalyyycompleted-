# Testing Backend Server

## Quick Test Script

To test if the backend is working properly, follow these steps:

### 1. Start Backend Server
```bash
cd backend
npm start
```

### 2. Test Health Endpoint
Open browser or use curl:
```
http://localhost:3001/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Helicopter Rental Payment API is running",
  "timestamp": "2025-07-13T..."
}
```

### 3. Test Payment Intent Creation
You'll need to add your Stripe secret key first in `backend/.env`:
```
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_SECRET_KEY_HERE
```

Then test with this curl command:
```bash
curl -X POST http://localhost:3001/api/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 50000,
    "currency": "usd",
    "bookingData": {
      "customerName": "Test Customer",
      "customerEmail": "test@example.com"
    }
  }'
```

### 4. Integration Test
1. Start backend server
2. Start frontend development server
3. Go to booking page
4. Fill out form and proceed to payment
5. Use test card: 4242 4242 4242 4242

## Current Status
✅ Frontend publishable key configured
✅ Backend dependencies installed
⚠️ Need to add Stripe secret key to backend/.env
⚠️ Need to test payment flow
