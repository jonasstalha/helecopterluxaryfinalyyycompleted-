import whatsappService from './whatsappService';
import toast from 'react-hot-toast';

/**
 * Utility functions for WhatsApp integration across the application
 */

/**
 * Handle contact form submission with WhatsApp integration
 */
export const handleContactFormWithWhatsApp = async (formData: any) => {
  try {
    // Send to WhatsApp
    await whatsappService.sendContactFormToWhatsApp(formData);
    
    // Show success message
    toast.success('Message sent successfully! Your inquiry has been forwarded to our WhatsApp. We\'ll get back to you within 2 hours.');
    
    return { success: true };
  } catch (error) {
    console.error('Error sending contact form to WhatsApp:', error);
    toast.error('Failed to send message to WhatsApp. Please try again.');
    return { success: false, error };
  }
};

/**
 * Handle booking form submission with WhatsApp integration
 */
export const handleBookingFormWithWhatsApp = async (formData: any) => {
  try {
    // Send to WhatsApp
    await whatsappService.sendBookingFormToWhatsApp(formData);
    
    // Show success message
    toast.success('Booking request sent successfully! We\'ve forwarded your request to our WhatsApp for immediate processing.');
    
    return { success: true };
  } catch (error) {
    console.error('Error sending booking form to WhatsApp:', error);
    toast.error('Failed to send booking to WhatsApp. Please try again.');
    return { success: false, error };
  }
};

/**
 * Send quick WhatsApp notification
 */
export const sendQuickWhatsAppNotification = async (name: string, email: string) => {
  try {
    await whatsappService.sendQuickNotification(name, email);
    toast.success('WhatsApp opened successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error sending WhatsApp notification:', error);
    toast.error('Failed to open WhatsApp. Please try again.');
    return { success: false, error };
  }
};

/**
 * Format phone number for WhatsApp
 */
export const formatPhoneForWhatsApp = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const cleanNumber = phoneNumber.replace(/\D/g, '');
  
  // If starts with 0, assume it's a UK number and add 44
  if (cleanNumber.startsWith('0')) {
    return '44' + cleanNumber.slice(1);
  }
  
  // If starts with 1, assume it's a US number
  if (cleanNumber.startsWith('1')) {
    return cleanNumber;
  }
  
  // If starts with +, remove it
  if (phoneNumber.startsWith('+')) {
    return cleanNumber;
  }
  
  // Otherwise, return as is
  return cleanNumber;
};

/**
 * Create WhatsApp URL with message
 */
export const createWhatsAppUrl = (phoneNumber: string, message: string): string => {
  const formattedPhone = formatPhoneForWhatsApp(phoneNumber);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
};

/**
 * Open WhatsApp with a custom message
 */
export const openWhatsAppWithMessage = (phoneNumber: string, message: string): void => {
  const url = createWhatsAppUrl(phoneNumber, message);
  window.open(url, '_blank');
};

/**
 * Check if WhatsApp is available (basic check)
 */
export const isWhatsAppAvailable = (): boolean => {
  return typeof window !== 'undefined' && window.navigator.userAgent.includes('WhatsApp');
};

/**
 * Get WhatsApp message template for different form types
 */
export const getWhatsAppMessageTemplate = (type: 'contact' | 'booking' | 'inquiry', data: any): string => {
  const timestamp = new Date().toLocaleString();
  
  switch (type) {
    case 'contact':
      return `🚁 *New Contact Inquiry*\n\n📅 ${timestamp}\n\n👤 ${data.name}\n📧 ${data.email}\n📞 ${data.phone || 'Not provided'}\n\n📝 ${data.subject}\n\n💬 ${data.message}`;
    
    case 'booking':
      return `🚁 *New Booking Request*\n\n📅 ${timestamp}\n\n👤 ${data.name}\n📧 ${data.email}\n📞 ${data.phone}\n\n✈️ Date: ${data.date}\n⏰ Time: ${data.time}\n👥 Passengers: ${data.passengers}\n\n📝 ${data.specialRequests || 'No special requests'}`;
    
    case 'inquiry':
      return `🚁 *General Inquiry*\n\n📅 ${timestamp}\n\n👤 ${data.name || 'Not provided'}\n📧 ${data.email || 'Not provided'}\n\n💬 ${data.message || 'Quick inquiry'}`;
    
    default:
      return `🚁 *New Message*\n\n📅 ${timestamp}\n\n${JSON.stringify(data, null, 2)}`;
  }
};

export default {
  handleContactFormWithWhatsApp,
  handleBookingFormWithWhatsApp,
  sendQuickWhatsAppNotification,
  formatPhoneForWhatsApp,
  createWhatsAppUrl,
  openWhatsAppWithMessage,
  isWhatsAppAvailable,
  getWhatsAppMessageTemplate
};
