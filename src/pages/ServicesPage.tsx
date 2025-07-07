import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart,
  Shield,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'vegas-ride-dinner',
    icon: Heart,
    title: 'Helicopter Ride & Dinner Package (Las Vegas)',
    description: 'A luxury helicopter flight over the Las Vegas Strip followed by a gourmet dinner at a top-rated restaurant. Includes limo transfers, VIP seating, and optional champagne.',
    features: [
      'Luxury limousine transfers',
      '10–12 minute Strip helicopter tour',
      'Four-course dinner at Italian restaurant (The Venetian)',
      'VIP check-in & lounge access',
      'Reserved table & gourmet dinner',
      'Optional champagne',
    ],
    duration: '12-15 minutes (flight) + dinner',
    capacity: '2 people',
    startingPrice: 829,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=compress&w=800',
    popular: true,
    details: {
      map: 'Flight Route: Harry Reid International Airport → Las Vegas Strip → Downtown → Return',
      highlights: [
        'Departure/Arrival: Harry Reid International Airport',
        'Route: Up and down the entire Las Vegas Strip and Downtown',
        'Landmarks: Bellagio Fountains, Caesars Palace, The Venetian, Paris Las Vegas, Wynn, The Mirage, Fremont Street, and more',
        'Duration: Approx. 12-15 minutes',
      ],
      why: 'This signature route is designed to showcase the very best of Las Vegas, making it ideal for first-time visitors, special occasions, and anyone seeking unforgettable aerial views of the Entertainment Capital of the World.'
    }
  }
];

const safetyFeatures = [
  {
    icon: Shield,
    title: 'Certified Pilots',
    description: 'All our pilots are FAA certified with thousands of flight hours and regular training updates.'
  },
  {
    icon: CheckCircle,
    title: 'Maintenance Excellence',
    description: 'Our aircraft undergo rigorous maintenance schedules exceeding industry standards.'
  },
  {
    icon: CheckCircle,
    title: 'Weather Monitoring',
    description: 'Advanced weather tracking systems ensure optimal flight conditions for every journey.'
  },
  {
    icon: CheckCircle,
    title: 'Insurance Coverage',
    description: 'Comprehensive insurance coverage for all passengers and aircraft operations.'
  }
];

const testimonials = [
  {
    name: 'Jennifer Walsh',
    role: 'Event Planner',
    content: 'SkyLux made our client\'s wedding absolutely magical. The helicopter entrance was the highlight of the entire celebration!',
    rating: 5,
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    name: 'Robert Kim',
    role: 'Business Executive',
    content: 'The efficiency and professionalism of their business travel service is unmatched. It\'s transformed how I handle my schedule.',
    rating: 5,
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    name: 'Lisa Martinez',
    role: 'Photographer',
    content: 'Their aerial photography service helped us capture stunning shots for our commercial project. Highly professional crew!',
    rating: 5,
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

export const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-navy-900 text-white py-20">
        <div className="absolute inset-0 opacity-30">
          <img
            src="https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Helicopter services"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-display font-bold mb-6"
          >
            Premium Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          >
            Discover our comprehensive range of luxury helicopter services designed to exceed your expectations
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From scenic tours to business travel, we offer tailored helicopter experiences for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group relative"
              >
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </span>
                  </div>
                )}

                <div className="relative overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center mr-4">
                      <service.icon className="w-6 h-6 text-gold-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-navy-900">{service.title}</h3>
                      <p className="text-sm text-navy-600">Starting from ${service.startingPrice}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-navy-600 font-medium">Duration:</span>
                      <p className="text-gray-600">{service.duration}</p>
                    </div>
                    <div>
                      <span className="text-navy-600 font-medium">Capacity:</span>
                      <p className="text-gray-600">{service.capacity}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-navy-900 mb-2">Features:</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex space-x-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      Learn More
                    </Button>
                    <Link to="/helicopters" className="flex-1">
                      <Button variant="primary" size="sm" className="w-full">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 mb-4">
              Safety & Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your safety is our top priority. We maintain the highest standards in aviation safety and service excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {safetyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Client Testimonials
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Hear what our satisfied clients have to say about their SkyLux experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="w-5 h-5 text-gold-400 fill-current inline-block">★</span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gold-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact our team to discuss your requirements and book your premium helicopter experience today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/helicopters">
                <Button size="lg" className="bg-white text-gold-600 hover:bg-gray-100">
                  View Our Fleet
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gold-600">
                  Contact Us
                </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 text-sm">
              <a href="tel:+1234567890" className="flex items-center hover:text-gold-200 transition-colors duration-200">
                <Phone className="w-4 h-4 mr-2" />
                (234) 567-8900
              </a>
              <a href="mailto:info@skyluxhelicopters.com" className="flex items-center hover:text-gold-200 transition-colors duration-200">
                <Mail className="w-4 h-4 mr-2" />
                info@skyluxhelicopters.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};