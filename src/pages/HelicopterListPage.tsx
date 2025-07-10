import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { HelicopterCard } from '../components/helicopters/HelicopterCard';
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

const sharedImages = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14
];

// Helper to shuffle and pick N images
function getShuffledImages(count: number) {
  const images = [...sharedImages];
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
  return images.slice(0, count);
}

// Example static helicopter data with different offers
const staticHelicopters: Helicopter[] = [
  {
    id: '1',
    name: 'Helicopter Ride & Dinner Package',
    model: 'Vegas Luxury',
    manufacturer: 'Airbus',
    capacity: 2,
    pricePerHour: 829, // $829 for two (was $950)
    images: getShuffledImages(6),
    features: [
      'VIP Limo transfer',
      'VIP Check-In',
      '12-minute Strip helicopter tour',
      'Gourmet Dinner at top restaurant',
      'Optional champagne',
      'Skip the lines',
    ],
    specifications: {
      range: '340 nm',
      ceiling: '12,500 ft',
      engines: '1 x Turbomeca Arriel 2B1'
    },
    availability: true,
    location: 'Las Vegas',
    description: `Special Offer! Experience Vegas in Style: Enjoy a luxury limo transfer to the heliport, skip the lines, then soar above the dazzling Strip. After your flight, indulge in a gourmet dinner at a top-rated restaurant, with VIP seating and optional champagne.`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Romantic Helicopter Tour for Two',
    model: 'Robinson R44',
    manufacturer: 'Robinson',
    capacity: 2,
    pricePerHour: 1050, // $1,050 per couple (was $1,200)
    images: getShuffledImages(5),
    features: [
      'Private Flight',
      'Roses & Chocolates',
      'Sunset Option',
      'Limo transfer',
      'Optional photographer',
      'Personalized playlist',
    ],
    specifications: {
      range: '300 nm',
      ceiling: '14,000 ft',
      engines: '1 x Lycoming IO-540-AE1A5'
    },
    availability: true,
    location: 'Las Vegas',
    description: 'Perfect for Couples! A Private, Unforgettable Evening: Surprise your loved one with a sunset flight just for two, complete with roses and chocolates on board. Optional upgrades: champagne, photographer, and a personalized playlist.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'VIP Helicopter Tour Experience',
    model: 'Leonardo AW119',
    manufacturer: 'Leonardo',
    capacity: 2,
    pricePerHour: 1350, // $1,350 for two (was $1,450)
    images: getShuffledImages(4),
    features: [
      'VIP Lounge access',
      'Complimentary Champagne',
      'Premium Route',
      'Luxury Transfer',
      'Guaranteed front-row seats',
      'Professional photos available',
    ],
    specifications: {
      range: '400 nm',
      ceiling: '14,500 ft',
      engines: '1 x Pratt & Whitney PT6B-37A'
    },
    availability: true,
    location: 'Las Vegas',
    description: 'New Experience! All-Inclusive VIP Adventure: Arrive in a luxury SUV or stretch limo, enjoy private lounge access, skip the line, and board first. Premium flight route, complimentary champagne, and guaranteed front-row seats—plus pro photos available!',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Luxury Grand Canyon Helicopter Excursion',
    model: 'Bell 407',
    manufacturer: 'Bell',
    capacity: 2,
    pricePerHour: 1600, // $1,600 for two (was $1,800)
    images: getShuffledImages(4),
    features: [
      'Canyon Landing',
      'Champagne Toast',
      'Scenic Flight',
      'Picnic Option',
      'Hoover Dam flyover',
      'Photo ops at private plateau',
    ],
    specifications: {
      range: '330 nm',
      ceiling: '13,500 ft',
      engines: '1 x Rolls-Royce 250-C47B'
    },
    availability: true,
    location: 'Las Vegas',
    description: 'Bucket List Experience! Ultimate Grand Canyon Adventure: Fly from Vegas over Hoover Dam and Lake Mead, landing at a private Grand Canyon plateau for a champagne toast and photo ops. Optional gourmet picnic available at the canyon rim.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Helicopter Proposal Package',
    model: 'Airbus H145',
    manufacturer: 'Airbus',
    capacity: 2,
    pricePerHour: 1700, // $1,700 for two
    images: getShuffledImages(4),
    features: [
      'Private Flight',
      'Custom "Will You Marry Me?" sign',
      'Professional Photographer',
      'Celebration Package',
      'Romantic dinner option',
      'Limo transfer',
    ],
    specifications: {
      range: '351 nm',
      ceiling: '17,000 ft',
      engines: '2 x Safran Arriel 2E'
    },
    availability: true,
    location: 'Las Vegas',
    description: 'For Life\'s Biggest Question! The Ultimate Proposal: Plan the perfect proposal with a private helicopter, "Will You Marry Me?" sign on the ground, in-flight photographer, and post-flight celebration (roses, champagne, or a romantic dinner).',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Anniversary & Honeymoon Celebration Tour',
    model: 'Airbus H125',
    manufacturer: 'Airbus',
    capacity: 2,
    pricePerHour: 1300, // $1,300 per couple (was $1,450)
    images: getShuffledImages(4),
    features: [
      'Roses & Cake',
      'Champagne',
      'Custom Playlist',
      'VIP Limo',
      'In-flight video option',
      'Extra flowers available',
    ],
    specifications: {
      range: '340 nm',
      ceiling: '16,000 ft',
      engines: '1 x Turbomeca Arriel 2D'
    },
    availability: true,
    location: 'Las Vegas',
    description: 'Celebrate Love! Romantic Celebration in the Sky: A luxury helicopter tour with a custom celebration kit—roses, cake or desserts, bubbly, and a custom playlist. Optional in-flight video or extra flowers for a personalized touch.',
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

export const HelicopterListPage: React.FC = () => {
  const [helicopters, setHelicopters] = useState<Helicopter[]>(staticHelicopters);
  const [filteredHelicopters, setFilteredHelicopters] = useState<Helicopter[]>(staticHelicopters);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    capacity: '',
    priceRange: '',
    availability: 'all',
    manufacturer: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setHelicopters(staticHelicopters);
    setFilteredHelicopters(staticHelicopters);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let filtered = helicopters.filter(helicopter => {
      const matchesSearch =
        (typeof helicopter.name === 'string' && helicopter.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof helicopter.manufacturer === 'string' && helicopter.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof helicopter.model === 'string' && helicopter.model.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCapacity = !filters.capacity || helicopter.capacity >= parseInt(filters.capacity);
      
      const matchesPrice = !filters.priceRange || (() => {
        const [min, max] = filters.priceRange.split('-').map(p => parseInt(p));
        return helicopter.pricePerHour >= min && (!max || helicopter.pricePerHour <= max);
      })();

      const matchesAvailability = filters.availability === 'all' || 
                                 (filters.availability === 'available' && helicopter.availability) ||
                                 (filters.availability === 'booked' && !helicopter.availability);

      const matchesManufacturer = !filters.manufacturer || helicopter.manufacturer === filters.manufacturer;

      return matchesSearch && matchesCapacity && matchesPrice && matchesAvailability && matchesManufacturer;
    });

    setFilteredHelicopters(filtered);
  }, [helicopters, searchTerm, filters]);

  const clearFilters = () => {
    setFilters({
      capacity: '',
      priceRange: '',
      availability: 'all',
      manufacturer: ''
    });
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold text-navy-900 mb-2">
                Our Premium Fleet
              </h1>
              <p className="text-gray-600">
                Choose from {helicopters.length} luxury helicopters available for rental
              </p>
            </div>

            {/* Search and View Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 lg:mt-0">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search helicopters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent w-full sm:w-64"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={false}
            animate={{
              width: showFilters ? 'auto' : 0,
              opacity: showFilters ? 1 : 0
            }}
            className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-navy-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-gold-600 hover:text-gold-700"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Capacity Filter */}
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">
                    Minimum Capacity
                  </label>
                  <select
                    value={filters.capacity}
                    onChange={(e) => setFilters(prev => ({ ...prev, capacity: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  >
                    <option value="">Any</option>
                    <option value="2">2+ passengers</option>
                    <option value="4">4+ passengers</option>
                    <option value="6">6+ passengers</option>
                  </select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">
                    Price Range (per hour)
                  </label>
                  <select
                    value={filters.priceRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  >
                    <option value="">Any Price</option>
                    <option value="0-1500">Under $1,500</option>
                    <option value="1500-2500">$1,500 - $2,500</option>
                    <option value="2500-4000">$2,500 - $4,000</option>
                    <option value="4000-">Over $4,000</option>
                  </select>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">
                    Availability
                  </label>
                  <select
                    value={filters.availability}
                    onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  >
                    <option value="all">All Aircraft</option>
                    <option value="available">Available Now</option>
                    <option value="booked">Currently Booked</option>
                  </select>
                </div>

                {/* Manufacturer Filter */}
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-2">
                    Manufacturer
                  </label>
                  <select
                    value={filters.manufacturer}
                    onChange={(e) => setFilters(prev => ({ ...prev, manufacturer: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  >
                    <option value="">All Manufacturers</option>
                    <option value="Robinson">Robinson</option>
                    <option value="Bell">Bell</option>
                    <option value="Leonardo">Leonardo</option>
                    <option value="Airbus">Airbus</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredHelicopters.length} of {helicopters.length} helicopters
              </p>
            </div>

            {filteredHelicopters.length === 0 ? (
              <div className="text-center py-12">
                <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No helicopters found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredHelicopters.map((helicopter, index) => (
                  <HelicopterCard 
                    key={helicopter.id} 
                    helicopter={helicopter} 
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};