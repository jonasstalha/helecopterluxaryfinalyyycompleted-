# Helicopter Luxury Booking System

This project now includes a comprehensive booking system with passenger information collection and Stripe payment integration.

## New Features Added

### 🚁 Booking Form System
- **Multi-step booking process**: Form → Payment → Confirmation
- **Passenger Information Collection**: 
  - First name, last name, weight
  - Additional information field for special requirements
  - Front seat request option (+$60 fee)
- **Contact Information**: Customer name, email, phone
- **Flight Details**: Date, time, duration
- **Special Options**: Cancellation protection (10% of base price)

### 💳 Payment Integration
- **Stripe Payment Processing**: Secure card payments
- **Real-time Price Calculation**: Base price + front seat fees + cancellation protection
- **Payment Confirmation**: Success/failure handling

### 📄 Booking Confirmation
- **Detailed Confirmation Page**: All booking details displayed
- **Booking Reference Number**: Auto-generated reference
- **Download Feature**: Text file with booking details
- **Share Feature**: Share booking information

## How to Use

### 1. Browse Helicopters
- Visit `/helicopters` to see available helicopters
- Click on any helicopter to view details

### 2. Start Booking
- On helicopter detail page, select flight date
- Click "Book Now" button
- This redirects to `/booking/{helicopterId}` with pre-filled data

### 3. Fill Booking Form
- **Contact Information**: Enter your details
- **Flight Details**: Confirm date and duration
- **Passenger Information**: 
  - Add passenger details (can add/remove passengers up to helicopter capacity)
  - Enter first name, last name, weight
  - Optional: Additional info and front seat requests
- **Additional Options**: 
  - Toggle cancellation protection
  - Add special requests
- **Price Summary**: Real-time calculation display

### 4. Payment
- Click "Proceed to Payment"
- Review booking summary
- Enter credit card information
- Complete payment

### 5. Confirmation
- View booking confirmation
- Download booking details
- Share booking information

## Routes Added

```
/booking/:helicopterId     - Booking form page
/booking/payment          - Payment setup page  
/booking/confirmation     - Booking confirmation page
```

## Technical Implementation

### Components
- `BookingFormPage.tsx` - Main booking form with passenger collection
- `PaymentSetupPage.tsx` - Stripe payment integration
- `BookingConfirmationPage.tsx` - Confirmation and receipt

### Types Added
```typescript
interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  weight: number;
  additionalInfo?: string;
  wantsFrontSeat?: boolean;
}

interface BookingFormData {
  helicopterId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  flightDate: Date;
  duration: number;
  passengers: Passenger[];
  totalPrice: number;
  basePrice: number;
  frontSeatFee: number;
  cancellationProtection: boolean;
  cancellationProtectionFee: number;
  specialRequests?: string;
}
```

### Dependencies Added
- `@stripe/react-stripe-js` - Stripe React components
- `@types/react-helmet` - TypeScript definitions

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here
# ... other variables
```

## Features

### ✅ Form Validation
- Required field validation
- Email format validation
- Phone number validation
- Weight input validation
- Date selection validation

### ✅ Dynamic Pricing
- Base price calculation (helicopter hourly rate × duration)
- Front seat fee: $60 per request
- Cancellation protection: 10% of base price
- Real-time total calculation

### ✅ User Experience
- Responsive design
- Loading states
- Error handling
- Toast notifications
- Form persistence (session storage)
- Animated components (Framer Motion)

### ✅ Passenger Management
- Add/remove passengers dynamically
- Respect helicopter capacity limits
- Individual passenger information collection
- Front seat preference tracking

### ✅ Payment Security
- Stripe secure payment processing
- PCI compliance through Stripe
- Payment intent creation
- Success/failure handling

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Future Enhancements

- Email confirmation system
- SMS notifications
- Calendar integration
- Admin dashboard for booking management
- Booking modification/cancellation
- Multi-language support
- Weather integration
- Real-time availability checking

## Notes

- Demo Stripe key is included for testing
- Replace with real Stripe keys for production
- Firebase integration ready for backend storage
- All components are fully typed with TypeScript
- Responsive design works on all screen sizes
