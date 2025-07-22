// Facebook Pixel tracking utilities for helicopter booking app
// This file contains all the tracking events for leads, conversions, and KPIs

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export interface HelicopterBookingData {
  helicopter_id?: string;
  helicopter_name?: string;
  flight_date?: string;
  flight_time?: string;
  passengers_count?: number;
  total_price?: number;
  booking_reference?: string;
  customer_email?: string;
  customer_phone?: string;
}

export interface PurchaseData {
  currency: string;
  value: number;
  content_ids?: string[];
  content_type?: string;
  content_name?: string;
  content_category?: string;
}

export interface ContactData {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export interface UserData {
  email?: string;
  user_id?: string;
}

export interface FormData {
  step_completed?: string;
  form_type?: string;
  [key: string]: unknown;
}

export class FacebookPixelTracker {
  // Initialize Facebook Pixel (called on app load)
  static init() {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }
  }

  // Page view tracking
  static trackPageView(pageName?: string) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
      
      if (pageName) {
        window.fbq('trackCustom', 'PageView', {
          page_name: pageName,
          timestamp: new Date().toISOString()
        });
      }
    }
  }

  // Lead generation events
  static trackLead(leadData?: Record<string, unknown>) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', leadData || {});
    }
  }

  // Contact form submission
  static trackContact(contactData?: ContactData) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Contact', contactData);
      window.fbq('trackCustom', 'ContactFormSubmitted', {
        form_type: 'contact',
        timestamp: new Date().toISOString(),
        ...contactData
      });
    }
  }

  // Helicopter viewing
  static trackHelicopterView(helicopterData: HelicopterBookingData) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_type: 'helicopter',
        content_ids: [helicopterData.helicopter_id],
        content_name: helicopterData.helicopter_name,
        content_category: 'helicopter_rental',
        value: helicopterData.total_price,
        currency: 'USD'
      });

      window.fbq('trackCustom', 'HelicopterViewed', {
        helicopter_id: helicopterData.helicopter_id,
        helicopter_name: helicopterData.helicopter_name,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Booking form started
  static trackBookingStarted(helicopterData: HelicopterBookingData) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_type: 'helicopter_booking',
        content_ids: [helicopterData.helicopter_id],
        content_name: helicopterData.helicopter_name,
        value: helicopterData.total_price,
        currency: 'USD',
        num_items: 1
      });

      window.fbq('trackCustom', 'BookingFormStarted', {
        helicopter_id: helicopterData.helicopter_id,
        helicopter_name: helicopterData.helicopter_name,
        flight_date: helicopterData.flight_date,
        passengers_count: helicopterData.passengers_count,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Form field completion tracking
  static trackFormProgress(step: string, formData?: FormData) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'FormProgress', {
        form_step: step,
        form_type: 'booking',
        timestamp: new Date().toISOString(),
        ...formData
      });
    }
  }

  // Payment process started
  static trackPaymentStarted(bookingData: HelicopterBookingData) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddPaymentInfo', {
        content_type: 'helicopter_booking',
        content_ids: [bookingData.helicopter_id],
        value: bookingData.total_price,
        currency: 'USD'
      });

      window.fbq('trackCustom', 'PaymentProcessStarted', {
        booking_reference: bookingData.booking_reference,
        total_price: bookingData.total_price,
        helicopter_id: bookingData.helicopter_id,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Successful purchase/booking completion
  static trackPurchase(purchaseData: PurchaseData, bookingData: HelicopterBookingData) {
    if (typeof window !== 'undefined' && window.fbq) {
      // Standard purchase event
      window.fbq('track', 'Purchase', {
        value: purchaseData.value,
        currency: purchaseData.currency,
        content_type: 'helicopter_booking',
        content_ids: [bookingData.helicopter_id],
        content_name: bookingData.helicopter_name,
        content_category: 'helicopter_rental'
      });

      // Custom booking completed event
      window.fbq('trackCustom', 'BookingCompleted', {
        booking_reference: bookingData.booking_reference,
        helicopter_id: bookingData.helicopter_id,
        helicopter_name: bookingData.helicopter_name,
        flight_date: bookingData.flight_date,
        flight_time: bookingData.flight_time,
        passengers_count: bookingData.passengers_count,
        total_price: bookingData.total_price,
        customer_email: bookingData.customer_email,
        timestamp: new Date().toISOString()
      });
    }
  }

  // User registration
  static trackRegistration(userData?: UserData) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'CompleteRegistration', {
        content_name: 'user_registration',
        status: 'completed'
      });

      window.fbq('trackCustom', 'UserRegistered', {
        registration_method: 'email',
        timestamp: new Date().toISOString(),
        ...userData
      });
    }
  }

  // User login
  static trackLogin(userData?: UserData) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'UserLoggedIn', {
        login_method: 'email',
        timestamp: new Date().toISOString(),
        ...userData
      });
    }
  }

  // Search activity
  static trackSearch(searchQuery: string, resultsCount?: number) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Search', {
        search_string: searchQuery,
        content_type: 'helicopter'
      });

      window.fbq('trackCustom', 'HelicopterSearched', {
        search_query: searchQuery,
        results_count: resultsCount,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Newsletter signup
  static trackNewsletterSignup(email?: string) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Subscribe', {
        content_name: 'newsletter_subscription'
      });

      window.fbq('trackCustom', 'NewsletterSignup', {
        email_provided: !!email,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Download brochure/catalog
  static trackBrochureDownload(helicopterId?: string) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'BrochureDownloaded', {
        helicopter_id: helicopterId,
        content_type: 'brochure',
        timestamp: new Date().toISOString()
      });
    }
  }

  // Phone number click (call tracking)
  static trackPhoneCall() {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'PhoneCallInitiated', {
        call_type: 'direct',
        timestamp: new Date().toISOString()
      });
    }
  }

  // Email click tracking
  static trackEmailClick() {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'EmailContactInitiated', {
        contact_type: 'email',
        timestamp: new Date().toISOString()
      });
    }
  }

  // Social media link clicks
  static trackSocialClick(platform: string) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'SocialMediaClick', {
        platform: platform,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Time spent on page (for engagement tracking)
  static trackTimeOnPage(pageName: string, timeSpent: number) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'PageEngagement', {
        page_name: pageName,
        time_spent_seconds: timeSpent,
        engagement_level: timeSpent > 60 ? 'high' : timeSpent > 30 ? 'medium' : 'low',
        timestamp: new Date().toISOString()
      });
    }
  }

  // Scroll depth tracking
  static trackScrollDepth(percentage: number, pageName: string) {
    if (typeof window !== 'undefined' && window.fbq && percentage >= 50) {
      window.fbq('trackCustom', 'PageScrollDepth', {
        page_name: pageName,
        scroll_percentage: percentage,
        timestamp: new Date().toISOString()
      });
    }
  }

  // Error tracking
  static trackError(errorType: string, errorMessage?: string) {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', 'ErrorOccurred', {
        error_type: errorType,
        error_message: errorMessage,
        timestamp: new Date().toISOString()
      });
    }
  }
}

// Export default instance
export default FacebookPixelTracker;
