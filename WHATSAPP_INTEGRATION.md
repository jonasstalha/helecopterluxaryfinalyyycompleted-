# WhatsApp Integration Documentation

## Overview
This document describes the WhatsApp integration implemented for the helicopter rental marketplace. When users fill out contact forms or booking forms, their information is automatically sent to a designated WhatsApp number for immediate attention.

## Features

### 1. Contact Form Integration
- **Location**: `src/pages/ContactPage.tsx`
- **Functionality**: When users submit the contact form, their details are formatted and sent to WhatsApp
- **Data Sent**: Name, email, phone, service type, preferred date, passengers, subject, and message

### 2. Booking Form Integration
- **Location**: Available for all booking forms
- **Functionality**: Booking details are formatted and sent to WhatsApp
- **Data Sent**: Customer information, flight details, special requests, and helicopter ID

### 3. Quick WhatsApp Contact
- **Location**: Contact page quick contact section
- **Functionality**: Direct WhatsApp messaging for immediate assistance
- **Features**: Emergency hotline, instant messaging support

## Implementation Details

### WhatsApp Service (`src/lib/whatsappService.ts`)

#### Configuration
```typescript
const whatsappService = new WhatsAppService({
  phoneNumber: '447939956301', // Your WhatsApp business number (without + sign)
  businessName: 'VanguardHelicopter'
});
```

#### Key Methods

1. **sendContactFormToWhatsApp(data: ContactFormData)**
   - Formats contact form data into a structured WhatsApp message
   - Opens WhatsApp with pre-filled message
   - Logs the action for debugging

2. **sendBookingFormToWhatsApp(data: BookingFormData)**
   - Formats booking form data into a structured WhatsApp message
   - Opens WhatsApp with pre-filled booking details
   - Logs the booking action for debugging

3. **sendQuickNotification(customerName: string, customerEmail: string)**
   - Sends a quick alert notification to WhatsApp
   - Used for immediate contact requests

#### Message Format Examples

**Contact Form Message:**
```
🚁 *New Contact Form Submission*

📅 *Date:* 7/13/2025 at 3:30:00 PM

👤 *Customer Information:*
• Name: John Doe
• Email: john.doe@email.com
• Phone: +1234567890

📋 *Service Details:*
• Service Type: City Tours & Sightseeing
• Preferred Date: 2025-07-15
• Passengers: 4

📝 *Subject:* Planning a city tour

💬 *Message:*
I'm interested in booking a helicopter tour for my family visiting Chicago next week.

---
Please respond to this inquiry promptly.
From: VanguardHelicopter Contact Form
```

**Booking Form Message:**
```
🚁 *New Booking Request*

📅 *Submitted:* 7/13/2025 at 3:30:00 PM

👤 *Customer Information:*
• Name: Jane Smith
• Email: jane.smith@email.com
• Phone: +1234567890

✈️ *Flight Details:*
• Preferred Date: 2025-07-20
• Preferred Time: 10:00 AM
• Number of Passengers: 2
• Helicopter ID: luxury-001

📝 *Special Requests:*
Please arrange for airport pickup

---
Please process this booking request promptly.
From: VanguardHelicopter Booking System
```

## Usage Instructions

### For Contact Form
The integration is automatically active when users submit the contact form. The system will:
1. Validate the form data
2. Format the information into a WhatsApp message
3. Open WhatsApp with the pre-filled message
4. Display a success notification to the user

### For Booking Forms
To integrate with booking forms, import the WhatsApp service and call the booking method:

```typescript
import whatsappService from '../lib/whatsappService';

// In your booking form submission handler
const handleBookingSubmit = async (bookingData: BookingFormData) => {
  try {
    // Send to WhatsApp
    await whatsappService.sendBookingFormToWhatsApp(bookingData);
    
    // Your existing booking logic
    // ...
    
    toast.success('Booking submitted and sent to WhatsApp!');
  } catch (error) {
    toast.error('Failed to send booking to WhatsApp');
  }
};
```

## Configuration

### WhatsApp Number Setup
1. Update the `phoneNumber` in `src/lib/whatsappService.ts`
2. Use the format without the `+` sign (e.g., `447939956301` for +44 7939 956301)
3. Ensure the number is registered for WhatsApp Business

### Business Name
Update the `businessName` in the configuration to match your company name.

## Browser Compatibility
- Works with WhatsApp Web and WhatsApp mobile app
- Automatically detects the platform and uses the appropriate URL format
- Falls back to WhatsApp Web if mobile app is not available

## Security Considerations
- All messages are sent client-side through WhatsApp's official URLs
- No sensitive data is stored on servers
- Customer data is only transmitted to WhatsApp when explicitly triggered by form submission

## Testing
1. Fill out the contact form on the website
2. Verify that WhatsApp opens with the formatted message
3. Check that all form fields are properly included in the message
4. Test on both desktop (WhatsApp Web) and mobile (WhatsApp app)

## Troubleshooting

### Common Issues
1. **WhatsApp doesn't open**: Ensure the phone number is correctly formatted
2. **Message not formatted**: Check that all required fields are being passed to the service
3. **Pop-up blocked**: Ensure pop-ups are enabled for the website

### Debug Logging
The service includes console logging for debugging:
- Contact form submissions are logged with timestamp and customer details
- Booking form submissions are logged with booking details
- Error messages are logged for failed attempts

## Future Enhancements
- Integration with WhatsApp Business API for automated responses
- Message templates for different service types
- Automatic customer service routing based on inquiry type
- Integration with CRM systems for better customer management
