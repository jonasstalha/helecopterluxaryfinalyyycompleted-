import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Instagram } from 'lucide-react';
import logo from '../../assets/logo.jpg';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src={logo} 
                alt="Vanguard Helicopters" 
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <span className="text-2xl font-display font-bold">Vanguard</span>
                <p className="text-xs text-gray-400 -mt-1">HELICOPTERS</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Experience the ultimate in luxury helicopter rentals. Professional pilots, 
              premium aircraft, and unforgettable aerial experiences across the city.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61578237294172" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold-400 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/vanguardhelicopters?igsh=NXRtbnlqdWg5bzF5&utm_source=qr" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gold-400 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/helicopters" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
                  Our Fleet
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a href="tel:+17028158697" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
                  +1 (702) 815-8697
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <a href="mailto:vanguardhelicopter@gmail.com" className="text-gray-300 hover:text-gold-400 transition-colors duration-200">
                  vanguardhelicopter@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Vanguard Helicopters. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-400 hover:text-gold-400 text-sm transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-gold-400 text-sm transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-gold-400 text-sm transition-colors duration-200">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};