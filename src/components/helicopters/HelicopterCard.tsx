import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Clock, MapPin, Star } from 'lucide-react';
import { Helicopter } from '../../types';
import { Button } from '../common/Button';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

interface HelicopterCardProps {
  helicopter: Helicopter;
  index?: number;
}

export const HelicopterCard: React.FC<HelicopterCardProps> = ({ helicopter, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          src={helicopter.images[0]}
          alt={helicopter.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Availability Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            helicopter.availability
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {helicopter.availability ? 'Available' : 'Booked'}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <p className="text-lg font-bold text-navy-900">
              ${helicopter.pricePerHour.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-xl font-bold text-navy-900 mb-1">{helicopter.name}</h3>
            <p className="text-sm text-navy-600">{helicopter.manufacturer} {helicopter.model}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-gold-400 fill-current" />
            <span className="text-sm font-medium text-navy-700">4.9</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{helicopter.description}</p>

        {/* Specifications */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-gold-500" />
            <span className="text-sm text-navy-700">{helicopter.capacity} seats</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gold-500" />
            <span className="text-sm text-navy-700">{helicopter.specifications.maxSpeed}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gold-500" />
            <span className="text-sm text-navy-700">{helicopter.location}</span>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {helicopter.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-navy-50 text-navy-700 text-xs rounded-md"
              >
                {feature}
              </span>
            ))}
            {helicopter.features.length > 3 && (
              <span className="px-2 py-1 bg-gold-50 text-gold-700 text-xs rounded-md">
                +{helicopter.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex">
          <Link to={`/helicopters/${helicopter.id}`} className="flex-1" onClick={() => {
            if (window.fbq) {
              window.fbq('track', 'ViewContent', {
                content_name: helicopter.name,
                content_type: 'helicopter',
                content_ids: [helicopter.id],
              });
            }
          }}>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};