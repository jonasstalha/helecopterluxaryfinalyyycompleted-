import { BookingFormData } from '../types';

// Contact form data interface
interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  serviceType: string;
  preferredDate: string;
  passengers: number;
}

// Alternative booking data storage - Email notification system
export const sendBookingNotification = async (
  bookingData: BookingFormData,
  bookingRef: string,
  paymentIntentId: string
): Promise<boolean> => {
  try {
    // Prepare booking summary email
    const bookingDetails = {
      bookingReference: bookingRef,
      paymentId: paymentIntentId,
      customerName: bookingData.customerName,
      customerEmail: bookingData.customerEmail,
      customerPhone: bookingData.customerPhone,
      flightDate: new Date(bookingData.flightDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      flightTime: new Date(bookingData.flightDate).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      passengersCount: bookingData.passengers.length,
      passengersDetails: bookingData.passengers.map((p, index) => 
        `${index + 1}. ${p.firstName} ${p.lastName} (${p.weight}kg)${p.wantsFrontSeat ? ' - Front seat requested' : ''}${p.additionalInfo ? ` - Note: ${p.additionalInfo}` : ''}`
      ).join('\n'),
      basePrice: bookingData.basePrice,
      frontSeatFee: bookingData.frontSeatFee,
      cancellationProtectionFee: bookingData.cancellationProtectionFee,
      totalPrice: bookingData.totalPrice,
      specialRequests: bookingData.specialRequests || 'None',
      bookingDateTime: new Date().toLocaleString('en-US'),
      frontSeatRequests: bookingData.passengers
        .filter(p => p.wantsFrontSeat)
        .map(p => `${p.firstName} ${p.lastName}`)
        .join(', ') || 'None',
      cancellationProtection: bookingData.cancellationProtection
    };

    // For now, log the booking details and save to localStorage
    console.log('📧 Booking Notification:', bookingDetails);
    
    // Save to localStorage as backup
    const existingBookings = JSON.parse(localStorage.getItem('helicopter-bookings') || '[]');
    existingBookings.push({
      ...bookingDetails,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('helicopter-bookings', JSON.stringify(existingBookings));

    // TODO: Implement actual email service (EmailJS, SendGrid, etc.)
    // For now, return success
    return true;
    
  } catch (error) {
    console.error('Failed to send booking notification:', error);
    return false;
  }
};

/**
 * Send contact form data to email
 */
export const sendContactFormEmail = async (data: ContactFormData): Promise<void> => {
  try {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    const subject = `New Contact Form Submission: ${data.subject}`;
    const body = `New Contact Form Submission\n\n` +
                 `Date: ${currentDate} at ${currentTime}\n\n` +
                 `Customer Information:\n` +
                 `• Name: ${data.name}\n` +
                 `• Email: ${data.email}\n` +
                 `• Phone: ${data.phone || 'Not provided'}\n\n` +
                 `Service Details:\n` +
                 `• Service Type: ${data.serviceType || 'Not specified'}\n` +
                 `• Preferred Date: ${data.preferredDate || 'Not specified'}\n` +
                 `• Passengers: ${data.passengers || 'Not specified'}\n\n` +
                 `Subject: ${data.subject}\n\n` +
                 `Message:\n${data.message}\n\n` +
                 `---\n` +
                 `Please respond to this inquiry promptly.\n` +
                 `From: VanguardHelicopter Contact Form`;
    
    // Create mailto URL
    const mailtoUrl = `mailto:vanguardhelicopter@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.open(mailtoUrl, '_blank');
    
    // Log the action for debugging
    console.log('Contact form email created:', {
      timestamp: new Date().toISOString(),
      customerName: data.name,
      customerEmail: data.email,
      subject: data.subject,
      recipientEmail: 'vanguardhelicopter@gmail.com'
    });
    
  } catch (error) {
    console.error('Error creating contact form email:', error);
    throw new Error('Failed to create email');
  }
};

/**
 * Send a quick notification email
 */
export const sendQuickNotificationEmail = async (customerName: string, customerEmail: string): Promise<void> => {
  try {
    const subject = `New Contact Alert - ${customerName}`;
    const body = `New Contact Alert\n\n` +
                 `Customer: ${customerName}\n` +
                 `Email: ${customerEmail}\n` +
                 `Time: ${new Date().toLocaleString()}\n\n` +
                 `Check the full details in your contact management system.`;
    
    const mailtoUrl = `mailto:vanguardhelicopter@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(mailtoUrl, '_blank');
    
  } catch (error) {
    console.error('Error sending quick notification email:', error);
    throw new Error('Failed to send notification email');
  }
};

export type { ContactFormData };

/**
 * Get all bookings from localStorage
 */
export const getAllBookings = (): any[] => {
  try {
    const bookings = JSON.parse(localStorage.getItem('helicopter-bookings') || '[]');
    return bookings;
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    return [];
  }
};

/**
 * Export bookings as CSV
 */
export const exportBookingsAsCSV = (): void => {
  try {
    const bookings = getAllBookings();
    
    if (bookings.length === 0) {
      alert('No bookings found to export.');
      return;
    }
    
    // Define CSV headers
    const headers = [
      'Booking Reference',
      'Payment ID',
      'Customer Name',
      'Customer Email',
      'Customer Phone',
      'Flight Date',
      'Flight Time',
      'Passengers Count',
      'Base Price',
      'Front Seat Fee',
      'Cancellation Protection Fee',
      'Total Price',
      'Special Requests',
      'Booking Date/Time',
      'Front Seat Requests',
      'Cancellation Protection'
    ];
    
    // Convert bookings to CSV format
    const csvContent = [
      headers.join(','),
      ...bookings.map(booking => [
        booking.bookingReference || '',
        booking.paymentId || '',
        booking.customerName || '',
        booking.customerEmail || '',
        booking.customerPhone || '',
        booking.flightDate || '',
        booking.flightTime || '',
        booking.passengersCount || '',
        booking.basePrice || '',
        booking.frontSeatFee || '',
        booking.cancellationProtectionFee || '',
        booking.totalPrice || '',
        booking.specialRequests || '',
        booking.bookingDateTime || '',
        booking.frontSeatRequests || '',
        booking.cancellationProtection || ''
      ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `helicopter-bookings-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log('CSV export completed successfully');
    
  } catch (error) {
    console.error('Error exporting bookings as CSV:', error);
    alert('Failed to export bookings. Please try again.');
  }
};
