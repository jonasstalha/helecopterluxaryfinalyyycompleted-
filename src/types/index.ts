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

export interface Booking {
  id: string;
  helicopterId: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  flightDate: Date;
  duration: number; // hours
  passengers: number;
  totalPrice: number;
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