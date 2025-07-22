import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Users, 
  MapPin, 
  Star, 
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
import { helicopterPackages } from '../data/helicopters';

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
  const navigate = useNavigate();
  const [helicopter, setHelicopter] = useState<Helicopter | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Track Facebook Pixel 'Lead' event when detail page is viewed
  useEffect(() => {
    if (helicopter && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: helicopter.name,
        content_type: 'helicopter',
        content_ids: [helicopter.id],
      });
    }
  }, [helicopter]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const found = helicopterPackages.find(h => h.id === id) || null;
      setHelicopter(found);
      setLoading(false);
    }, 500);
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

  // Track 'Purchase' event on Book Now
  const handleBookNow = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    
    if (!selectedDate) {
      alert('Please select a flight date');
      return;
    }
    
    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        value: helicopter.pricePerHour,
        currency: 'USD',
        content_name: helicopter.name,
        content_type: 'helicopter',
        content_ids: [helicopter.id],
      });
    }
    
    // Navigate to booking form with pre-filled data
    const searchParams = new URLSearchParams({
      date: selectedDate,
      duration: '1', // Default duration for packages
      passengers: '1' // Default passengers, can be changed in form
    });
    
    navigate(`/booking/${helicopter.id}?${searchParams.toString()}`);
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
                    {helicopter.model} • {helicopter.manufacturer}
                  </p>
                  <div className="flex items-center mt-2">
                    <MapPin className="w-5 h-5 text-navy-400 mr-2" />
                    <span className="text-navy-600">{helicopter.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-gold-400 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-navy-600">(24 reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-navy-400 mr-2" />
                    <span className="text-navy-600">Up to {helicopter.capacity} passengers</span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-navy-900 mb-4">Package Includes</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {helicopter.features.map((feature, index) => (
                    <div key={index} className="flex items-center bg-navy-50 rounded-lg p-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-navy-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-navy-900 mb-4">Experience Description</h3>
                <div className="prose prose-lg max-w-none">
                  {helicopter.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-navy-600 mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-navy-900 mb-4">Aircraft Specifications</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-navy-50 rounded-lg p-4">
                    <h4 className="font-semibold text-navy-900 mb-2">Max Speed</h4>
                    <p className="text-navy-600">{helicopter.specifications.maxSpeed}</p>
                  </div>
                  <div className="bg-navy-50 rounded-lg p-4">
                    <h4 className="font-semibold text-navy-900 mb-2">Range</h4>
                    <p className="text-navy-600">{helicopter.specifications.range}</p>
                  </div>
                  <div className="bg-navy-50 rounded-lg p-4">
                    <h4 className="font-semibold text-navy-900 mb-2">Ceiling</h4>
                    <p className="text-navy-600">{helicopter.specifications.ceiling}</p>
                  </div>
                  <div className="bg-navy-50 rounded-lg p-4">
                    <h4 className="font-semibold text-navy-900 mb-2">Engines</h4>
                    <p className="text-navy-600">{helicopter.specifications.engines}</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-navy-900 mb-4">Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-start bg-navy-50 rounded-lg p-4">
                      <amenity.icon className="w-6 h-6 text-gold-500 mr-3 mt-1" />
                      <div>
                        <h4 className="font-semibold text-navy-900">{amenity.name}</h4>
                        <p className="text-navy-600">{amenity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h3 className="text-2xl font-semibold text-navy-900 mb-4">Customer Reviews</h3>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="border border-navy-200 rounded-lg p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-navy-900">{review.name}</h4>
                            <span className="text-sm text-navy-500">{review.date}</span>
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
          </div>

          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="inline-block bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl px-8 py-6 shadow-lg mb-2">
                  <span className="text-4xl font-extrabold text-white tracking-tight">
                    ${helicopter.pricePerHour.toLocaleString()}
                  </span>
                </div>
                <p className="text-base text-navy-700 mt-2 font-semibold">All-inclusive package price</p>
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
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-navy-600 font-semibold">Package Price</span>
                    <span className="font-bold text-lg">${helicopter.pricePerHour.toLocaleString()}</span>
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
                  <a href="tel:+17028158697" className="flex items-center text-navy-600 hover:text-gold-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="text-sm">(702) 815-8697</span>
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
