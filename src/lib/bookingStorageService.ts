import { BookingFormData } from '../types';

// Simple booking storage service that doesn't rely on external APIs
class BookingStorageService {
  private storageKey = 'helicopter-bookings';
  private fallbackStorageKey = 'helicopter-bookings-fallback';

  /**
   * Save booking data to localStorage with structured format
   */
  saveBookingData(bookingData: BookingFormData, status: 'FORM_COMPLETED' | 'PAYMENT_PROCESSING' | 'PAYMENT_SUCCESS' | 'PAYMENT_FAILED' = 'FORM_COMPLETED'): boolean {
    try {
      const bookingRecord = {
        id: this.generateBookingId(),
        status,
        timestamp: new Date().toISOString(),
        submittedAt: new Date().toLocaleString(),
        ...bookingData,
        // Additional metadata
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        currentUrl: window.location.href
      };

      // Get existing bookings
      const existingBookings = this.getAllBookings();
      
      // Add new booking
      existingBookings.push(bookingRecord);
      
      // Save to localStorage
      localStorage.setItem(this.storageKey, JSON.stringify(existingBookings));
      
      console.log('✅ Booking saved successfully:', bookingRecord);
      return true;
      
    } catch (error) {
      console.error('❌ Failed to save booking:', error);
      return false;
    }
  }

  /**
   * Get all bookings from localStorage
   */
  getAllBookings(): any[] {
    try {
      const bookings = localStorage.getItem(this.storageKey);
      return bookings ? JSON.parse(bookings) : [];
    } catch (error) {
      console.error('Error retrieving bookings:', error);
      return [];
    }
  }

  /**
   * Update booking status
   */
  updateBookingStatus(bookingId: string, status: string, paymentData?: any): boolean {
    try {
      const bookings = this.getAllBookings();
      const bookingIndex = bookings.findIndex(b => b.id === bookingId);
      
      if (bookingIndex !== -1) {
        bookings[bookingIndex] = {
          ...bookings[bookingIndex],
          status,
          lastUpdated: new Date().toISOString(),
          ...(paymentData && { paymentData })
        };
        
        localStorage.setItem(this.storageKey, JSON.stringify(bookings));
        console.log('✅ Booking status updated:', bookingId, status);
        return true;
      }
      
      console.warn('⚠️ Booking not found:', bookingId);
      return false;
      
    } catch (error) {
      console.error('❌ Failed to update booking status:', error);
      return false;
    }
  }

  /**
   * Generate unique booking ID
   */
  private generateBookingId(): string {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 9);
    return `BOOK-${timestamp}-${random}`;
  }

  /**
   * Export bookings as CSV
   */
  exportBookingsAsCSV(): void {
    try {
      const bookings = this.getAllBookings();
      
      if (bookings.length === 0) {
        alert('No bookings found to export.');
        return;
      }
      
      // Define CSV headers
      const headers = [
        'Booking ID',
        'Status',
        'Customer Name',
        'Customer Email',
        'Customer Phone',
        'Flight Date',
        'Passengers Count',
        'Helicopter ID',
        'Base Price',
        'Total Price',
        'Special Requests',
        'Submitted At',
        'Last Updated'
      ];
      
      // Convert bookings to CSV format
      const csvContent = [
        headers.join(','),
        ...bookings.map(booking => [
          booking.id || '',
          booking.status || '',
          booking.customerName || '',
          booking.customerEmail || '',
          booking.customerPhone || '',
          booking.flightDate || '',
          booking.passengers?.length || '',
          booking.helicopterId || '',
          booking.basePrice || '',
          booking.totalPrice || '',
          booking.specialRequests || '',
          booking.submittedAt || '',
          booking.lastUpdated || booking.timestamp || ''
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
      
      console.log('✅ CSV export completed successfully');
      
    } catch (error) {
      console.error('❌ Error exporting bookings as CSV:', error);
      alert('Failed to export bookings. Please try again.');
    }
  }

  /**
   * Clear all bookings (for testing)
   */
  clearAllBookings(): void {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.fallbackStorageKey);
    console.log('🗑️ All bookings cleared');
  }

  /**
   * Get booking statistics
   */
  getBookingStats(): any {
    const bookings = this.getAllBookings();
    const stats = {
      total: bookings.length,
      byStatus: {} as Record<string, number>,
      totalRevenue: 0,
      recentBookings: bookings.slice(-10).reverse()
    };

    bookings.forEach(booking => {
      const status = booking.status || 'unknown';
      stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;
      
      if (booking.totalPrice) {
        stats.totalRevenue += parseFloat(booking.totalPrice) || 0;
      }
    });

    return stats;
  }
}

// Create and export service instance
const bookingStorageService = new BookingStorageService();
export default bookingStorageService;
export { BookingStorageService };
