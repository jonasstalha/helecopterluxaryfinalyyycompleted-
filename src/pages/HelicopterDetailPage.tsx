import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Users, 
  Clock, 
  MapPin, 
  Star, 
  Calendar,
  Shield,
  Wifi,
  Coffee,
  Camera,
  Phone,
  Mail,
  CheckCircle,
  Heart,
  Share2
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Helicopter } from '../types';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import img7 from '../assets/7.jpg';
import img8 from '../assets/8.jpg';
import img9 from '../assets/9.jpg';
import img10 from '../assets/10.jpg';
import img11 from '../assets/11.jpg';
import img12 from '../assets/12.jpg';
import img13 from '../assets/13.jpg';
import img14 from '../assets/14.jpg';

// Helper to shuffle and pick N images
function getShuffledImages(count: number) {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14];
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
  return images.slice(0, count);
}

// Mock data - Las Vegas luxury ride and dinner package
const mockHelicopter: Helicopter = {
  id: '1',
  name: 'Helicopter Ride & Dinner Package',
  model: 'Vegas Luxury',
  manufacturer: 'Airbus',
  capacity: 2,
  pricePerHour: 829,
  images: getShuffledImages(6),
  features: [
    'Luxury limousine transfers',
    '10–12 minute Strip helicopter tour',
    'Four-course dinner at Italian restaurant (The Venetian)',
    'VIP check-in & lounge access',
    'Reserved table & gourmet dinner',
    'Optional champagne',
  ],
  availability: true,
  description: 'A luxury helicopter flight over the Las Vegas Strip followed by a gourmet dinner at a top-rated restaurant. Includes limo transfers, VIP seating, and optional champagne.',
  createdAt: new Date(),
  updatedAt: new Date()
};

const amenities = [
  { icon: Shield, name: 'Safety Certified', description: 'FAA certified with perfect safety record' },
  { icon: Wifi, name: 'WiFi Available', description: 'Stay connected during your flight' },
  { icon: Coffee, name: 'Refreshments', description: 'Complimentary beverages and snacks' },
  { icon: Camera, name: 'Photo Service', description: 'Professional aerial photography available' }
];

const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    rating: 5,
    date: '2024-01-15',
    comment: 'Absolutely incredible experience! The pilot was professional and the views were breathtaking. Highly recommend for special occasions.',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    id: 2,
    name: 'Michael Chen',
    rating: 5,
    date: '2024-01-10',
    comment: 'Perfect for our business meeting transport. Punctual, comfortable, and impressive. Will definitely book again.',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const HelicopterDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [helicopter, setHelicopter] = useState<Helicopter | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [duration, setDuration] = useState(1);
  const [passengers, setPassengers] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // Simulate loading data from Firebase
    setTimeout(() => {
      setHelicopter(mockHelicopter);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!helicopter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Helicopter Not Found</h2>
          <Link to="/helicopters">
            <Button variant="primary">Back to Fleet</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = helicopter.pricePerHour * duration;

  const handleBookNow = () => {
    if (!helicopter || !selectedDate) return;
    const message = `Hello, I would like to book the following helicopter:\n\n` +
      `Helicopter: ${helicopter.name}\n` +
      `Model: ${helicopter.model}\n` +
      `Date: ${selectedDate}\n` +
      `Duration: ${duration} hour(s)\n` +
      `Passengers: ${passengers}\n` +
      `Location: ${helicopter.location}`;
    const phone = '+44 7939 956301'; // Replace with your WhatsApp number (no + or spaces)
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-navy-600 hover:text-gold-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/helicopters" className="text-navy-600 hover:text-gold-600">Fleet</Link>
            <span className="text-gray-400">/</span>
            <span className="text-navy-900 font-medium">{helicopter.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link to="/helicopters" className="inline-flex items-center text-navy-600 hover:text-gold-600 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Fleet
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="relative">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  src={helicopter.images[selectedImage]}
                  alt={helicopter.name}
                  className="w-full h-96 object-cover"
                />
                
                {/* Image Controls */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors duration-200 ${
                      isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-navy-700 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2 rounded-full bg-white/80 text-navy-700 hover:bg-white backdrop-blur-sm transition-colors duration-200">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Availability Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    helicopter.availability
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {helicopter.availability ? 'Available' : 'Booked'}
                  </span>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  {helicopter.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative rounded-lg overflow-hidden aspect-square ${
                        selectedImage === index ? 'ring-2 ring-gold-500' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${helicopter.name} view ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Helicopter Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-display font-bold text-navy-900 mb-2">
                    {helicopter.name}
                  </h1>
                  <p className="text-xl text-navy-600">
                    {helicopter.manufacturer} {helicopter.model}
                  </p>
                  <div className="flex items-center mt-2">
                    <div className="flex items-center space-x-1 mr-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gold-400 fill-current" />
                      ))}
                      <span className="text-sm text-navy-600 ml-1">(4.9)</span>
                    </div>
                    <div className="flex items-center text-navy-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{helicopter.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-navy-900">
                    ${helicopter.pricePerHour.toLocaleString()}
                    <span className="text-lg font-normal text-navy-600">/hour</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">
                {helicopter.description}
              </p>

              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <Users className="w-8 h-8 text-gold-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-navy-900">{helicopter.capacity}</div>
                  <div className="text-sm text-navy-600">Passengers</div>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 text-gold-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-navy-900">{helicopter.specifications.maxSpeed}</div>
                  <div className="text-sm text-navy-600">Max Speed</div>
                </div>
                <div className="text-center">
                  <MapPin className="w-8 h-8 text-gold-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-navy-900">{helicopter.specifications.range}</div>
                  <div className="text-sm text-navy-600">Range</div>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-gold-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-navy-900">{helicopter.specifications.ceiling}</div>
                  <div className="text-sm text-navy-600">Service Ceiling</div>
                </div>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {helicopter.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-navy-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold text-navy-900 mb-6">Premium Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <amenity.icon className="w-6 h-6 text-gold-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-navy-900 mb-1">{amenity.name}</h4>
                      <p className="text-sm text-navy-600">{amenity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-navy-900 mb-6">Customer Reviews</h3>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-navy-900">{review.name}</h4>
                          <span className="text-sm text-navy-600">{review.date}</span>
                        </div>
                        <div className="flex items-center mb-2">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-gold-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-navy-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-navy-900 mb-1">
                  ${helicopter.pricePerHour.toLocaleString()}
                  <span className="text-lg font-normal text-navy-600">/hour</span>
                </div>
                <p className="text-sm text-navy-600">Professional pilot included</p>
              </div>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">
                    Flight Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">
                    Duration (hours)
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 8].map(hour => (
                      <option key={hour} value={hour}>{hour} hour{hour > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">
                    Passengers
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  >
                    {Array.from({ length: helicopter.capacity }, (_, i) => i + 1).map(num => (
                      <option key={num} value={num}>{num} passenger{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-navy-600">Base price ({duration}h)</span>
                    <span className="font-medium">${(helicopter.pricePerHour * duration).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-navy-600">Service fee</span>
                    <span className="font-medium">$150</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold text-navy-900 border-t pt-2">
                    <span>Total</span>
                    <span>${(totalPrice + 150).toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  size="lg" 
                  className="w-full"
                  disabled={!helicopter.availability || !selectedDate}
                  onClick={handleBookNow}
                >
                  {helicopter.availability ? 'Book Now' : 'Currently Unavailable'}
                </Button>

                <div className="text-center">
                  <p className="text-xs text-navy-600">
                    Free cancellation up to 24 hours before flight
                  </p>
                </div>
              </form>

              {/* Contact Info */}
              <div className="border-t mt-6 pt-6">
                <h4 className="font-semibold text-navy-900 mb-3">Need Help?</h4>
                <div className="space-y-2">
                  <a href="tel:+1234567890" className="flex items-center text-navy-600 hover:text-gold-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">(234) 567-8900</span>
                  </a>
                  <a href="mailto:vanguardhelicopter@gmail.com" className="flex items-center text-navy-600 hover:text-gold-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <span className="text-sm">vanguardhelicopter@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};