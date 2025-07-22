import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Phone, Mail } from 'lucide-react';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

const SimpleBookingConfirmationPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Booking Request Submitted!
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your booking request. We've received your information and will contact you within 24 hours to confirm your helicopter flight.
          </p>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">What happens next?</h3>
            <div className="space-y-3 text-left">
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900">1. Confirmation Call</p>
                  <p className="text-blue-700 text-sm">We'll call you within 24 hours to confirm your flight details and availability</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900">2. Payment Information</p>
                  <p className="text-blue-700 text-sm">We'll provide secure payment options and pricing details</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium text-blue-900">3. Final Confirmation</p>
                  <p className="text-blue-700 text-sm">You'll receive email confirmation with all flight details and instructions</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-4 mb-8">
            <p className="text-yellow-800 text-sm">
              <strong>Note:</strong> Your booking is not confirmed until you receive a confirmation call from our team. 
              If you don't hear from us within 24 hours, please contact us directly.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => navigate('/helicopters')}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Browse More Helicopters
            </Button>
            
            <Button
              onClick={() => navigate('/contact')}
              variant="outline"
              className="w-full"
            >
              Contact Us Directly
            </Button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need immediate assistance? Call us at <strong>(702) 815-8697</strong> or email <strong>info@helicopterluxury.com</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SimpleBookingConfirmationPage;
