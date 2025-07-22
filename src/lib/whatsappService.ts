import { sendContactFormEmail, sendQuickNotificationEmail } from './emailService';

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

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  passengers: number;
  specialRequests?: string;
  helicopterId?: string;
}

interface WhatsAppConfig {
  phoneNumber: string; // WhatsApp phone number (with country code, without +)
  businessName: string;
}

class WhatsAppService {
  private config: WhatsAppConfig;

  constructor(config: WhatsAppConfig) {
    this.config = config;
  }

  /**
   * Format contact form data into a WhatsApp message
   */
  private formatContactMessage(data: ContactFormData): string {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    let message = `🚁 *New Contact Form Submission*\n\n`;
    message += `📅 *Date:* ${currentDate} at ${currentTime}\n\n`;
    message += `👤 *Customer Information:*\n`;
    message += `• Name: ${data.name}\n`;
    message += `• Email: ${data.email}\n`;
    message += `• Phone: ${data.phone || 'Not provided'}\n\n`;
    
    message += `📋 *Service Details:*\n`;
    message += `• Service Type: ${data.serviceType || 'Not specified'}\n`;
    message += `• Preferred Date: ${data.preferredDate || 'Not specified'}\n`;
    message += `• Passengers: ${data.passengers || 'Not specified'}\n\n`;
    
    message += `📝 *Subject:* ${data.subject}\n\n`;
    message += `💬 *Message:*\n${data.message}\n\n`;
    
    message += `---\n`;
    message += `Please respond to this inquiry promptly.\n`;
    message += `From: ${this.config.businessName} Contact Form`;
    
    return message;
  }

  /**
   * Format booking form data into a WhatsApp message
   */
  private formatBookingMessage(data: BookingFormData): string {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    let message = `🚁 *New Booking Request*\n\n`;
    message += `📅 *Submitted:* ${currentDate} at ${currentTime}\n\n`;
    message += `👤 *Customer Information:*\n`;
    message += `• Name: ${data.name}\n`;
    message += `• Email: ${data.email}\n`;
    message += `• Phone: ${data.phone}\n\n`;
    
    message += `✈️ *Flight Details:*\n`;
    message += `• Preferred Date: ${data.date}\n`;
    message += `• Preferred Time: ${data.time}\n`;
    message += `• Number of Passengers: ${data.passengers}\n`;
    if (data.helicopterId) {
      message += `• Helicopter ID: ${data.helicopterId}\n`;
    }
    
    if (data.specialRequests) {
      message += `\n📝 *Special Requests:*\n${data.specialRequests}\n`;
    }
    
    message += `\n---\n`;
    message += `Please process this booking request promptly.\n`;
    message += `From: ${this.config.businessName} Booking System`;
    
    return message;
  }

  /**
   * Send contact form data to WhatsApp
   */
  async sendContactFormToWhatsApp(data: ContactFormData): Promise<void> {
    try {
      const message = this.formatContactMessage(data);
      const encodedMessage = encodeURIComponent(message);
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${this.config.phoneNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp in a new tab/window
      window.open(whatsappUrl, '_blank');
      
      // Also send email
      await sendContactFormEmail(data);
      
      // Log the action for debugging
      console.log('Contact form sent to WhatsApp and Email:', {
        timestamp: new Date().toISOString(),
        customerName: data.name,
        customerEmail: data.email,
        subject: data.subject
      });
      
    } catch (error) {
      console.error('Error sending contact form to WhatsApp:', error);
      throw new Error('Failed to send message to WhatsApp');
    }
  }

  /**
   * Send contact form data to WhatsApp (alternative method using WhatsApp Web API)
   */
  async sendContactFormToWhatsAppWeb(data: ContactFormData): Promise<void> {
    try {
      const message = this.formatContactMessage(data);
      const encodedMessage = encodeURIComponent(message);
      
      // Create WhatsApp Web URL
      const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${this.config.phoneNumber}&text=${encodedMessage}`;
      
      // Open WhatsApp Web in a new tab/window
      window.open(whatsappWebUrl, '_blank');
      
      // Log the action for debugging
      console.log('Contact form sent to WhatsApp Web:', {
        timestamp: new Date().toISOString(),
        customerName: data.name,
        customerEmail: data.email,
        subject: data.subject
      });
      
    } catch (error) {
      console.error('Error sending contact form to WhatsApp Web:', error);
      throw new Error('Failed to send message to WhatsApp Web');
    }
  }

  /**
   * Send a quick notification to WhatsApp about new contact
   */
  async sendQuickNotification(customerName: string, customerEmail: string): Promise<void> {
    try {
      const message = `🔔 *New Contact Alert*\n\n` +
                     `Customer: ${customerName}\n` +
                     `Email: ${customerEmail}\n` +
                     `Time: ${new Date().toLocaleString()}\n\n` +
                     `Check the full details in your contact management system.`;
      
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${this.config.phoneNumber}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      // Also send email notification
      await sendQuickNotificationEmail(customerName, customerEmail);
      
    } catch (error) {
      console.error('Error sending quick notification to WhatsApp:', error);
      throw new Error('Failed to send notification to WhatsApp');
    }
  }

  /**
   * Send booking form data to WhatsApp
   */
  async sendBookingFormToWhatsApp(data: BookingFormData): Promise<void> {
    try {
      const message = this.formatBookingMessage(data);
      const encodedMessage = encodeURIComponent(message);
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${this.config.phoneNumber}?text=${encodedMessage}`;
      
      // Open WhatsApp in a new tab/window
      window.open(whatsappUrl, '_blank');
      
      // Log the action for debugging
      console.log('Booking form sent to WhatsApp:', {
        timestamp: new Date().toISOString(),
        customerName: data.name,
        customerEmail: data.email,
        bookingDate: data.date,
        passengers: data.passengers
      });
      
    } catch (error) {
      console.error('Error sending booking form to WhatsApp:', error);
      throw new Error('Failed to send booking to WhatsApp');
    }
  }

  /**
   * Send booking form data to WhatsApp Web
   */
  async sendBookingFormToWhatsAppWeb(data: BookingFormData): Promise<void> {
    try {
      const message = this.formatBookingMessage(data);
      const encodedMessage = encodeURIComponent(message);
      
      // Create WhatsApp Web URL
      const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${this.config.phoneNumber}&text=${encodedMessage}`;
      
      // Open WhatsApp Web in a new tab/window
      window.open(whatsappWebUrl, '_blank');
      
      // Log the action for debugging
      console.log('Booking form sent to WhatsApp Web:', {
        timestamp: new Date().toISOString(),
        customerName: data.name,
        customerEmail: data.email,
        bookingDate: data.date,
        passengers: data.passengers
      });
      
    } catch (error) {
      console.error('Error sending booking form to WhatsApp Web:', error);
      throw new Error('Failed to send booking to WhatsApp Web');
    }
  }
}

// Create and export WhatsApp service instance
// Replace with your actual WhatsApp business number (without + sign)
const whatsappService = new WhatsAppService({
  phoneNumber: '17028158697', // Replace with your actual WhatsApp business number
  businessName: 'VanguardHelicopter'
});

export default whatsappService;
export { WhatsAppService };
export type { ContactFormData, WhatsAppConfig, BookingFormData };
