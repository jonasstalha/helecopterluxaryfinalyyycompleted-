export interface Helicopter {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  capacity: number;
  pricePerHour: number;
  images: string[];
  features: string[];
  specifications: {
    maxSpeed: string;
    range: string;
    ceiling: string;
    engines: string;
  };
  availability: boolean;
  location: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Passenger {
  id: string;
  firstName: string;
  lastName: string;
  weight: number; // in kg
  additionalInfo?: string;
  wantsFrontSeat?: boolean;
}

export interface BookingFormData {
  helicopterId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  flightDate: Date;
  passengers: Passenger[];
  totalPrice: number;
  basePrice: number;
  frontSeatFee: number;
  cancellationProtection: boolean;
  cancellationProtectionFee: number;
  specialRequests?: string;
  bookingReference?: string;
}

export interface Booking {
  id: string;
  helicopterId: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  flightDate: Date;
  passengers: Passenger[];
  totalPrice: number;
  basePrice: number;
  frontSeatFee: number;
  cancellationProtection: boolean;
  cancellationProtectionFee: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  stripePaymentId?: string;
  specialRequests?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: 'customer' | 'admin';
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: Date;
  featuredImage: string;
  categories: string[];
  tags: string[];
  published: boolean;
  readTime: number; // minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'replied' | 'closed';
  createdAt: Date;
}