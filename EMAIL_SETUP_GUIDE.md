# Email Setup Guide for Helicopter Booking System

## Overview
The system now sends automated emails after successful payments:
- **Customer Confirmation Email**: Sent to the customer with booking details
- **Admin Notification Email**: Sent to the admin/business owner about new bookings

## Setup Instructions

### 1. Gmail App Password Setup
Since we're using Gmail for sending emails, you need to create an App Password:

1. Go to your Google Account settings
2. Navigate to Security > 2-Step Verification
3. Enable 2-Step Verification if not already enabled
4. Go to Security > App passwords
5. Generate a new app password for "Mail"
6. Copy the generated password (16 characters)

### 2. Update Environment Variables
In your `backend/.env` file, update these variables:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
ADMIN_EMAIL=admin@yourdomain.com
```

### 3. Email Templates
The system includes professional HTML email templates with:
- Company branding
- Booking details
- Payment confirmation
- Next steps for customers
- Action items for admins

### 4. Email Triggers
Emails are sent automatically when:
- Payment is successfully processed
- Stripe webhook confirms payment
- Frontend payment completion

### 5. Testing
To test the email system:
1. Make sure both servers are running
2. Complete a test booking with payment
3. Check both customer and admin email addresses
4. Verify emails arrive in inbox (check spam folder too)

## Email Templates

### Customer Confirmation Email Includes:
- Booking reference number
- Payment ID
- Flight date and time
- Passenger details
- Total amount paid
- Special requests
- Next steps and contact information

### Admin Notification Email Includes:
- All booking details
- Customer contact information
- Payment confirmation
- Required actions
- Passenger details

## Troubleshooting

### Common Issues:
1. **Emails not sending**: Check Gmail App Password and credentials
2. **Emails going to spam**: Add sender to trusted contacts
3. **Template not rendering**: Check HTML email client compatibility
4. **Webhook not triggering**: Verify Stripe webhook configuration

### Error Handling:
- Payment succeeds even if email fails
- Errors are logged but don't affect user experience
- Fallback notifications can be implemented

## Production Considerations

### For Production Deployment:
1. Use a professional email service (SendGrid, Mailgun, etc.)
2. Set up proper domain authentication (SPF, DKIM)
3. Use environment variables for all sensitive data
4. Monitor email delivery rates
5. Implement email templates with your branding

### Alternative Email Services:
- **SendGrid**: Professional email service with better deliverability
- **Mailgun**: Transactional email service
- **AWS SES**: Amazon's email service
- **Nodemailer with other providers**: SMTP configuration for other services

## Security Notes:
- Never commit email passwords to version control
- Use App Passwords, not regular Gmail passwords
- Rotate credentials regularly
- Monitor email sending limits
- Use HTTPS in production

## Files Modified:
- `backend/emailService.js` - Email service implementation
- `backend/server.js` - Email endpoints and webhook integration
- `backend/.env` - Email configuration
- `src/pages/PaymentSetupPage.tsx` - Frontend email trigger
- `backend/package.json` - Added nodemailer dependency

The email system is now fully integrated and will automatically send confirmation emails after successful payments!
