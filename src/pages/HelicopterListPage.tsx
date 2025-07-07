import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, SlidersHorizontal } from 'lucide-react';
import { HelicopterCard } from '../components/helicopters/HelicopterCard';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Helicopter } from '../types';

// Use images from src/assets for Vite static import
const sharedImages = Array.from({ length: 14 }, (_, i) => require(`../assets/${i + 1}.jpg`));

// Example static helicopter data with different offers
const staticHelicopters: Helicopter[] = [
  {
    id: '1',
    name: 'Helicopter Ride & Dinner Package',
    model: 'Vegas Luxury',
    manufacturer: 'Airbus',
    capacity: 2,
    pricePerHour: 829, // for 2 people
    images: sharedImages,
    features: [
      'Luxury limousine transfers',
      '10–12 minute Strip helicopter tour',
      'Four-course dinner at Italian restaurant (The Venetian)',
      'VIP check-in & lounge access',
      'Reserved table & gourmet dinner',
      'Optional champagne',
    ],
    specifications: {
      maxSpeed: '155 knots',
      range: '340 nm',
      ceiling: '12,500 ft',
      engines: '1 x Turbomeca Arriel 2B1'
    },
    availability: true,
    location: 'Las Vegas',
    description: `A luxury helicopter flight over the Las Vegas Strip followed by a gourmet dinner at a top-rated restaurant. Includes limo transfers, VIP seating, and optional champagne.\n\nTarget: Couples, special occasions, tourists wanting the full Vegas experience.\n\nStart your evening with a VIP limousine ride from your hotel to the heliport. Skip the lines and relax in an exclusive lounge before boarding your state-of-the-art helicopter. Soar above the neon lights of the Strip, taking in stunning aerial views of iconic landmarks. After landing, your limo takes you to the best Italian restaurant at The Venetian, where a reserved table and a gourmet four-course dinner await. Perfect for couples, celebrations, or anyone seeking the ultimate Vegas night out!`,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Grand Canyon Adventure',
    model: 'Bell 407',
    manufacturer: 'Bell',
    capacity: 5,
    pricePerHour: 3200,
    images: sharedImages,
    features: [
      'Grand Canyon landing',
      'Champagne picnic',
      'Aerial photo package',
      'VIP check-in',
      'Custom route',
    ],
    specifications: {
      maxSpeed: '140 knots',
      range: '330 nm',
      ceiling: '13,500 ft',
      engines: '1 x Rolls-Royce 250-C47B'
    },
    availability: false,
    location: 'Las Vegas',
    description: 'Experience the Grand Canyon like never before. Land inside the canyon and enjoy a champagne picnic. Includes custom route and VIP check-in.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Night Lights Romance',
    model: 'Robinson R44',
    manufacturer: 'Robinson',
    capacity: 2,
    pricePerHour: 999,
    images: sharedImages,
    features: [
      'Private couple flight',
      'Rose bouquet',
      'Dinner reservation included',
      'VIP lounge',
    ],
    specifications: {
      maxSpeed: '110 knots',
      range: '300 nm',
      ceiling: '14,000 ft',
      engines: '1 x Lycoming IO-540-AE1A5'
    },
    availability: true,
    location: 'Las Vegas',
    description: 'Perfect for proposals or anniversaries. Enjoy a romantic flight, rose bouquet, and a special dinner reservation with VIP lounge access.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Strip & Downtown Explorer',
    model: 'Leonardo AW119',
    manufacturer: 'Leonardo',
    capacity: 6,
    pricePerHour: 1800,
    images: sharedImages,
    features: [
      'Full Strip and Downtown route',
      'Photo stops',
      'VIP check-in',
      'Flexible timing',
    ],
    specifications: {
      maxSpeed: '150 knots',
      range: '400 nm',
      ceiling: '14,500 ft',
      engines: '1 x Pratt & Whitney PT6B-37A'
    },
    availability: true,
    location: 'Las Vegas',
    description: 'See the entire Las Vegas Strip and historic Downtown from above. Includes photo stops and flexible timing.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'VIP Business Charter',
    model: 'Airbus H145',
    manufacturer: 'Airbus',
    capacity: 8,
    pricePerHour: 4000,
    images: sharedImages,
    features: [
      'Executive seating',
      'WiFi on board',
      'Direct airport transfer',
      'Concierge service',
    ],
    specifications: {
      maxSpeed: '150 knots',
      range: '351 nm',
      ceiling: '17,000 ft',
      engines: '2 x Safran Arriel 2E'
    },
    availability: true,
    location: 'Las Vegas',
    description: 'Business charter with executive seating, WiFi, and direct airport transfer. Perfect for corporate groups.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    name: 'Aerial Photography Pro',
    model: 'Airbus H125',
    manufacturer: 'Airbus',
    capacity: 5,
    pricePerHour: 2200,
    images: sharedImages,
    features: [
      'Open-door shooting',
      'Professional pilot',
      'Flexible route',
      'Photo/video support',
    ],
    specifications: {
      maxSpeed: '140 knots',
      range: '340 nm',
      ceiling: '16,000 ft',
      engines: '1 x Turbomeca Arriel 2D'
    },
    availability: true,
    location: 'Las Vegas',
    description: 'For photographers and filmmakers. Open-door shooting, flexible route, and professional pilot support.',
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
      const matchesSearch = helicopter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           helicopter.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           helicopter.model.toLowerCase().includes(searchTerm.toLowerCase());

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