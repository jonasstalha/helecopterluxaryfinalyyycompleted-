import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Shield, 
  Users, 
  Clock, 
  Star, 
  CheckCircle,
  Play,
  Phone,
  Mail
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { HelicopterCard } from '../components/helicopters/HelicopterCard';
import { Helicopter } from '../types';

// Mock data - will be replaced with Firebase data
const mockHelicopters: Helicopter[] = [
  {
    id: '1',
    name: 'Elite Sky Cruiser',
    model: 'R44 Raven II',
    manufacturer: 'Robinson',
    capacity: 3,
    pricePerHour: 1200,
    images: [
      'https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Leather Interior', 'Noise Cancelling', 'Premium Sound System', '360° Views'],
    specifications: {
      maxSpeed: '130 mph',
      range: '350 miles',
      ceiling: '14,000 ft',
      engines: 'Single Turbine'
    },
    availability: true,
    location: 'Manhattan Heliport',
    description: 'Perfect for city tours and short-distance luxury travel with premium comfort.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Executive Twin',
    model: 'Bell 429',
    manufacturer: 'Bell',
    capacity: 7,
    pricePerHour: 2500,
    images: [
      'https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Executive Seating', 'WiFi', 'Refreshment Bar', 'Climate Control'],
    specifications: {
      maxSpeed: '165 mph',
      range: '450 miles',
      ceiling: '20,000 ft',
      engines: 'Twin Turbine'
    },
    availability: true,
    location: 'VIP Terminal',
    description: 'Spacious executive helicopter perfect for business travel and special events.',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, Tech Innovations',
    content: 'Absolutely incredible experience! The pilot was professional, the helicopter was pristine, and the views were breathtaking.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    name: 'Michael Chen',
    role: 'Wedding Planner',
    content: 'SkyLux made our clients wedding unforgettable. The helicopter arrival was the highlight of the day!',
    rating: 5,
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Travel Blogger',
    content: 'From booking to landing, everything was seamless. This is luxury travel at its finest.',
    rating: 5,
    image: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150'
  }
];

const features = [
  {
    icon: Shield,
    title: 'Safety First',
    description: 'All our pilots are certified professionals with thousands of flight hours and impeccable safety records.'
  },
  {
    icon: Users,
    title: 'Luxury Experience',
    description: 'Premium aircraft with leather interiors, climate control, and personalized service for every flight.'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Book flights anytime with our flexible scheduling system and round-the-clock customer support.'
  }
];

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer: 'We recommend booking at least 48 hours in advance to ensure availability, though we can often accommodate same-day requests.'
  },
  {
    question: 'What is included in the rental price?',
    answer: 'The price includes the aircraft, certified pilot, fuel, and basic insurance. Special services like catering can be arranged for an additional fee.'
  },
  {
    question: 'What happens if weather conditions are poor?',
    answer: 'Safety is our top priority. If weather conditions are unsafe, we will reschedule your flight at no additional cost.'
  },
  {
    question: 'Can I bring luggage on the helicopter?',
    answer: 'Yes, we have limited luggage space. Please inform us of your luggage requirements when booking so we can ensure adequate space.'
  }
];

export const HomePage: React.FC = () => {
  const [featuredHelicopters, setFeaturedHelicopters] = useState<Helicopter[]>([]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from Firebase
    setFeaturedHelicopters(mockHelicopters);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Luxury helicopter in flight"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            Elevate Your
            <span className="text-gold-400 block">Experience</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 font-light max-w-2xl mx-auto"
          >
            Discover the ultimate in luxury helicopter rentals with professional pilots, 
            premium aircraft, and unforgettable aerial experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/helicopters">
              <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-lg px-8 py-4">
                Explore Fleet
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <button className="flex items-center space-x-2 text-white hover:text-gold-400 transition-colors duration-200">
              <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center hover:border-gold-400 transition-colors duration-200">
                <Play className="w-5 h-5 ml-1" />
              </div>
              <span className="font-medium">Watch Our Story</span>
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 mb-4">
              Why Choose SkyLux
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference that comes with premium service, 
              safety excellence, and luxury comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-navy-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fleet */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 mb-4">
              Our Premium Fleet
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully curated selection of luxury helicopters, 
              each maintained to the highest standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {featuredHelicopters.map((helicopter, index) => (
              <HelicopterCard key={helicopter.id} helicopter={helicopter} index={index} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/helicopters">
              <Button size="lg" variant="outline">
                View All Aircraft
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied customers 
              have to say about their SkyLux experience.
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
                    <Star key={i} className="w-5 h-5 text-gold-400 fill-current" />
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

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-navy-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our helicopter rental services.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-semibold text-navy-900">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CheckCircle className="w-5 h-5 text-gold-500" />
                  </motion.div>
                </button>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: openFaq === index ? 'auto' : 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-navy-900 to-navy-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Take Flight?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the luxury and convenience of helicopter travel. 
              Book your flight today and see the world from a new perspective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/helicopters">
                <Button size="lg" className="bg-gold-500 hover:bg-gold-600">
                  Book Your Flight
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href="tel:+1234567890" className="flex items-center space-x-2 text-white hover:text-gold-400 transition-colors duration-200">
                <Phone className="w-5 h-5" />
                <span className="font-medium">Call: (234) 567-8900</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};