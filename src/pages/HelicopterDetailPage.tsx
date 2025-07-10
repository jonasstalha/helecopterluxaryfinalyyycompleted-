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

// Array of real helicopter packages
const helicopterPackages: Helicopter[] = [
  {
    id: '1',
    name: 'Helicopter Ride & Dinner Package',
    model: 'Vegas Luxury',
    manufacturer: 'Airbus',
    capacity: 2,
    pricePerHour: 829,
    images: getShuffledImages(6),
    features: [
      'VIP Limo',
      'VIP Check-In',
      'Helicopter',
      'Gourmet Dinner',
    ],
    specifications: {
      range: '340 nm',
      ceiling: '12,500 ft',
      engines: '1 x Turbomeca Arriel 2B1'
    },
    availability: true,
    location: 'Las Vegas',
    description: `Have you ever dreamed of starting your Las Vegas evening with a breathtaking flight over the Strip and ending with a gourmet dinner at a top-rated restaurant? Our Helicopter Ride & Dinner Package is the perfect blend of excitement and elegance.\n\nBegin your journey with a luxury limo transfer and VIP lounge access. Then, soar high above the neon-lit city before indulging in a reserved four-course dinner, complete with VIP seating and optional champagne to toast the night.\n\nDeparting From: Las Vegas Strip\nDestination: Las Vegas Strip & Top Restaurant\nDuration: Approximately 3–3.5 hours from hotel pick-up to drop-off\nProduct Code: HDP-VIP\n\nTour Highlights\n• Helicopter flight above the Las Vegas Strip and Downtown\n• VIP check-in and private lounge experience\n• Luxury limo pick-up and drop-off\n• Reserved gourmet dinner at a top-rated Strip restaurant\n• Optional champagne or dessert upgrades\n\nIncluded\n• Helicopter ride over the Strip\n• Limo transfers\n• VIP lounge access\n• Four-course dinner reservation (tax & gratuity included)\n\nPlanning\n• Tour Duration: Approximately 3–3.5 hours (hotel-to-hotel)\n• Flight Duration: 10–12 minutes\n• Dinner Duration: 1.5–2 hours\n• Transportation: Hotel pickup & drop-off by private limo (included)\n  Guests should be ready in hotel lobby 15 minutes prior to scheduled time\n\nWhat to Bring\n• Valid photo I.D. (required for all guests 18+)\n• Smart-casual attire for dinner\n• Appetite for great food and adventure\n• Camera or smartphone for photos`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Romantic Helicopter Tour for Two',
    model: 'Robinson R44',
    manufacturer: 'Robinson',
    capacity: 2,
    pricePerHour: 1050,
    images: getShuffledImages(6),
    features: [
      'Private Flight',
      'Roses & Chocolates',
      'Sunset Option',
      'Limo',
    ],
    specifications: {
      range: '300 nm',
      ceiling: '14,000 ft',
      engines: '1 x Lycoming IO-540-AE1A5'
    },
    availability: true,
    location: 'Las Vegas',
    description: `Have you ever imagined surprising your partner with the most romantic evening in Las Vegas? Our Romantic Helicopter Tour for Two is crafted just for you and your loved one.\n\nYour adventure begins with a private limo pick-up and a personalized welcome. Board your exclusive helicopter for a sunset flight above the Strip, where roses and chocolates await on board. Optional champagne and a private photographer can make your evening even more magical.\n\nDeparting From: Las Vegas Strip\nDestination: Las Vegas Strip\nDuration: Approximately 1½ to 2 hours from hotel pick-up to drop-off\nProduct Code: RHT-2\n\nTour Highlights\n• Private helicopter flight just for two at sunset\n• Bouquet of roses and gourmet chocolates on board\n• Private luxury limo transfer\n• VIP lounge welcome\n• Optional champagne and in-flight photographer\n\nIncluded\n• Private helicopter tour\n• Limo pick-up and drop-off\n• Roses and chocolates\n• VIP check-in\n\nPlanning\n• Tour Duration: 1.5–2 hours (hotel-to-hotel)\n• Flight Duration: 12–15 minutes\n• Transportation: Limo pick-up and drop-off (included)\n  Guests should be ready 10 minutes prior to pick-up\n\nWhat to Bring\n• Valid I.D. (for all guests 18+)\n• Romantic playlist (Bluetooth welcome)\n• Camera or smartphone\n• Smart, comfortable clothing`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'VIP Helicopter Tour Experience',
    model: 'Airbus H130',
    manufacturer: 'Airbus',
    capacity: 2,
    pricePerHour: 1350,
    images: getShuffledImages(6),
    features: [
      'VIP Lounge',
      'Champagne',
      'Premium Route',
      'Luxury Transfer',
    ],
    specifications: {
      range: '350 nm',
      ceiling: '13,500 ft',
      engines: '1 x Turbomeca Arriel 2D'
    },
    availability: true,
    location: 'Las Vegas',
    description: `Ever wondered what it feels like to be treated like a true VIP in Las Vegas? The VIP Helicopter Tour Experience elevates luxury to new heights.\n\nEnjoy a luxury SUV or stretch limo transfer and private lounge access, then skip the lines and be the first to board. Glide along a premium extended route, taking in the full glitter of the Strip and downtown, with complimentary champagne and guaranteed front-row seats.\n\nDeparting From: Las Vegas Strip\nDestination: Extended Strip & Downtown\nDuration: Approximately 2 hours from hotel pick-up to drop-off\nProduct Code: VIP-EX\n\nTour Highlights\n• VIP lounge access and front-of-the-line boarding\n• Extended, premium helicopter flight route (Strip & Downtown)\n• Complimentary champagne service\n• Guaranteed front-row/window seats\n• Luxury SUV or stretch limo transfer\n\nIncluded
    • Premium helicopter flight\n• Private luxury transfer\n• VIP lounge & priority boarding\n• Champagne\n\nPlanning\n• Tour Duration: 2 hours (hotel-to-hotel)\n• Flight Duration: 20–30 minutes\n• Transportation: Luxury vehicle pick-up/drop-off (included)\n  Arrive at lobby 15 minutes before pick-up\n\nWhat to Bring
    • I.D. (18+)\n• Dress to impress!\n• Camera or smartphone`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Luxury Grand Canyon Helicopter Excursion',
    model: 'Bell 407',
    manufacturer: 'Bell',
    capacity: 2,
    pricePerHour: 1600,
    images: getShuffledImages(6),
    features: [
      'Canyon Landing',
      'Champagne',
      'Scenic Flight',
      'Picnic Option',
    ],
    specifications: {
      range: '330 nm',
      ceiling: '13,500 ft',
      engines: '1 x Rolls-Royce 250-C47B'
    },
    availability: true,
    location: 'Las Vegas',
    description: `Have you ever wondered what it’s like to touch down deep in the Grand Canyon? Our Luxury Grand Canyon Helicopter Excursion whisks you from Las Vegas over the Hoover Dam, Lake Mead, and Mojave Desert before landing on a private plateau 3,200 feet below the canyon rim. Celebrate with a champagne toast and an optional gourmet picnic, surrounded by breathtaking views of ancient rock formations and the Colorado River.\n\nDeparting From: Las Vegas Strip\nDestination: Grand Canyon West (Landing)\nDuration: Approximately 4 to 4½ hours from hotel pick-up to drop-off\nProduct Code: GCH-LUX\n\nTour Highlights\n• Scenic flight over Hoover Dam, Lake Mead, and the Grand Canyon\n• Canyon landing 3,200 feet below the rim\n• Champagne toast and optional gourmet picnic at the canyon\n• Photo time among ancient rock formations and the Colorado River\n• Luxury limo transfer and VIP service\n\nIncluded\n• Helicopter flight (Vegas to Grand Canyon & back)\n• Canyon landing\n• Champagne\n• Limo transfers\n\nPlanning\n• Tour Duration: 4–4.5 hours (hotel-to-hotel)\n• Flight Duration: 70–90 minutes total\n• Ground Time: ~30 minutes at canyon\n• Transportation: Limo pick-up from most major hotels (included)\n  Guests ready 15 minutes before pick-up\n  Self-drive option available (arrive 45 minutes before departure)\n\nWhat to Bring\n• I.D. (18+)\n• Camera or smartphone (no selfie sticks or poles)\n• Bottle of water\n• Sunglasses, sunblock, and hat\n• Layered clothing (March–September); warm clothes (October–March)\n• Sturdy, toe-covering shoes (sneakers/hiking boots recommended)`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'Helicopter Proposal Package',
    model: 'Leonardo AW119',
    manufacturer: 'Leonardo',
    capacity: 2,
    pricePerHour: 1700,
    images: getShuffledImages(6),
    features: [
      'Private Flight',
      'Proposal Sign',
      'Photographer',
      'Celebration',
    ],
    specifications: {
      range: '400 nm',
      ceiling: '14,500 ft',
      engines: '1 x Pratt & Whitney PT6B-37A'
    },
    availability: true,
    location: 'Las Vegas',
    description: `Have you ever dreamed of proposing in the most unforgettable way possible? Our Helicopter Proposal Package makes your moment truly legendary.\n\nBegin with a luxury limo ride and a private flight over Las Vegas or the Grand Canyon. At the perfect moment, spot a “Will You Marry Me?” sign on the ground—timed with your in-flight photographer to capture every emotion. Celebrate with roses, champagne, and the post-flight celebration you deserve.\n\nDeparting From: Las Vegas Strip\nDestination: Las Vegas Strip or Grand Canyon\nDuration: Approximately 2 to 2½ hours from hotel pick-up to drop-off\nProduct Code: PROPOSE-VIP\n\nTour Highlights\n• Private helicopter for two with VIP limo pick-up\n• “Will You Marry Me?” sign revealed on the ground\n• Professional in-flight photographer\n• Champagne and roses for celebration\n• Optional dinner reservation or custom cake\n\nIncluded\n• Private helicopter flight\n• Limo transfer\n• Proposal sign\n• Photographer\n• Champagne & roses\n\nPlanning\n• Tour Duration: 2–2.5 hours (hotel-to-hotel)\n• Flight Duration: 12–30 minutes (choice of route)\n• Transportation: Limo pick-up (included)\n  Arrive in hotel lobby 10–15 minutes prior\n\nWhat to Bring\n• The engagement ring!\n• Camera/smartphone (for your own memories)\n• Special outfit for photos`,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    name: 'Anniversary & Honeymoon Celebration Tour',
    model: 'Airbus H145',
    manufacturer: 'Airbus',
    capacity: 2,
    pricePerHour: 1300,
    images: getShuffledImages(6),
    features: [
      'Roses & Cake',
      'Bubbly',
      'Playlist',
      'VIP Limo',
    ],
    specifications: {
      range: '351 nm',
      ceiling: '17,000 ft',
      engines: '2 x Safran Arriel 2E'
    },
    availability: true,
    location: 'Las Vegas',
    description: `Have you ever wanted to celebrate your love high above the lights of Las Vegas? Our Anniversary & Honeymoon Celebration Tour brings romance to new heights.\n\nYour evening begins with a luxury limo and VIP lounge welcome, followed by a private flight over the Strip or Grand Canyon. On board, you’ll find roses, a gourmet cake or desserts, bubbly, and your own custom playlist. Optional in-flight video or photography ensures every magical moment is yours to keep.\n\nDeparting From: Las Vegas Strip\nDestination: Las Vegas Strip or Grand Canyon\nDuration: Approximately 2 to 3 hours from hotel pick-up to drop-off\nProduct Code: CELEBRATE-LOVE\n\nTour Highlights\n• Private helicopter tour with celebration kit: roses, cake/dessert, bubbly\n• Custom music playlist for your special occasion\n• Luxury limo round-trip and VIP welcome\n• Optional in-flight video or professional photographer\n\nIncluded\n• Limo transfers\n• Private helicopter flight\n• Celebration kit (roses, cake, bubbly)\n• Playlist option\n\nPlanning\n• Tour Duration: 2–3 hours (hotel-to-hotel)\n• Flight Duration: 12–30 minutes\n• Transportation: Private limo pick-up (included)\n  Ready 10 minutes before pick-up\n\nWhat to Bring\n• Valid I.D. (18+)\n• Song list (optional)\n• Camera/smartphone\n• Romantic/celebratory attire`,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

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

  // Remove duration and passengers, price is fixed per package
  const totalPrice = helicopter.pricePerHour;

  // Track 'Purchase' event on Book Now
  const handleBookNow = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (window.fbq) {
      window.fbq('track', 'Purchase', {
        value: helicopter.pricePerHour,
        currency: 'USD',
        content_name: helicopter.name,
        content_type: 'helicopter',
        content_ids: [helicopter.id],
      });
    }
    // Always redirect to WhatsApp with the correct phone number
    const phone = '447939956301'; // WhatsApp expects country code without '+'
    const message = `Hello, I would like to book the following helicopter:\n\n` +
      `Helicopter: ${helicopter.name}\n` +
      `Model: ${helicopter.model}\n` +
      `Date: ${selectedDate}\n` +
      `Location: ${helicopter.location}`;
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
                  <div className="inline-block bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl px-6 py-4 shadow-lg">
                    <span className="text-4xl font-extrabold text-white tracking-tight">
                      ${helicopter.pricePerHour.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Description Styling */}
              <div className="prose prose-lg max-w-none text-navy-800 bg-gold-50 rounded-xl p-6 mb-8 border border-gold-200 shadow-inner">
                {helicopter.description.split('\n').map((line, idx) => (
                  <p key={idx} className="mb-2 whitespace-pre-line">{line}</p>
                ))}
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <Users className="w-8 h-8 text-gold-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-navy-900">{helicopter.capacity}</div>
                  <div className="text-sm text-navy-600">Passengers</div>
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
                {/* Remove duration and passengers fields */}
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