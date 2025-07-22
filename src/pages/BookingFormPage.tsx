import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { Plus, Minus, User, Calendar, Users, Weight, Info, CreditCard } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Button } from '../components/common/Button';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { helicopterService } from '../lib/helicopterService';
import { savePrePaymentBookingData } from '../lib/googleSheets';
import { BookingFormData, Helicopter } from '../types';
import FacebookPixelTracker from '../lib/facebookPixel';

const BookingFormPage: React.FC = () => {
  const { helicopterId } = useParams<{ helicopterId: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [helicopter, setHelicopter] = useState<Helicopter | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const initialDate = searchParams.get('date') ? new Date(searchParams.get('date')!) : new Date();
  const initialPassengers = parseInt(searchParams.get('passengers') || '1');

  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm<BookingFormData>({
    defaultValues: {
      helicopterId: helicopterId || '',
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      flightDate: initialDate,
      passengers: Array.from({ length: initialPassengers }, (_, i) => ({
        id: `passenger-${i + 1}`,
        firstName: '',
        lastName: '',
        weight: 0,
        additionalInfo: '',
        wantsFrontSeat: false
      })),
      basePrice: 0,
      frontSeatFee: 0,
      cancellationProtection: false,
      cancellationProtectionFee: 0,
      totalPrice: 0,
      specialRequests: ''
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'passengers'
  });

  const watchedPassengers = watch('passengers');
  const watchedCancellationProtection = watch('cancellationProtection');

  useEffect(() => {
    if (helicopterId) {
      fetchHelicopter();
    }
  }, [helicopterId]);

  useEffect(() => {
    if (helicopter) {
      calculatePrice();
      
      // Track booking form started
      FacebookPixelTracker.trackBookingStarted({
        helicopter_id: helicopter.id,
        helicopter_name: helicopter.name,
        flight_date: watch('flightDate')?.toISOString().split('T')[0],
        passengers_count: watchedPassengers?.length || 1,
        total_price: helicopter.price
      });
    }
  }, [helicopter, watchedPassengers, watchedCancellationProtection]);

  const fetchHelicopter = async () => {
    try {
      const helicopterData = await helicopterService.getHelicopter(helicopterId!);
      setHelicopter(helicopterData);
    } catch (error) {
      toast.error('Failed to load helicopter details');
      navigate('/helicopters');
    } finally {
      setLoading(false);
    }
  };

  const calculatePrice = () => {
    if (!helicopter) return;

    const basePrice = helicopter.pricePerHour; // Fixed package price, not hourly
    const frontSeatRequests = watchedPassengers.filter(p => p.wantsFrontSeat).length;
    const frontSeatFee = frontSeatRequests * 60; // $60 per front seat request
    const cancellationProtectionFee = watchedCancellationProtection ? Math.round(basePrice * 0.1) : 0; // 10% of base price
    const totalPrice = basePrice + frontSeatFee + cancellationProtectionFee;

    setValue('basePrice', basePrice);
    setValue('frontSeatFee', frontSeatFee);
    setValue('cancellationProtectionFee', cancellationProtectionFee);
    setValue('totalPrice', totalPrice);
  };

  const addPassenger = () => {
    if (fields.length < helicopter?.capacity!) {
      append({
        id: `passenger-${fields.length + 1}`,
        firstName: '',
        lastName: '',
        weight: 0,
        additionalInfo: '',
        wantsFrontSeat: false
      });
    }
  };

  const removePassenger = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    setSubmitting(true);
    try {
      // Validate passenger data
      const hasEmptyFields = data.passengers.some(p => !p.firstName || !p.lastName || !p.weight);
      if (hasEmptyFields) {
        toast.error('Please fill in all passenger information');
        setSubmitting(false);
        return;
      }

      // Generate booking reference
      const bookingRef = `HL${Date.now().toString().slice(-8)}${Math.random().toString(36).substr(2, 2).toUpperCase()}`;

      // Track form completion as lead
      FacebookPixelTracker.trackLead({
        helicopter_id: helicopter?.id,
        helicopter_name: helicopter?.name,
        booking_reference: bookingRef,
        total_price: data.totalPrice,
        passengers_count: data.passengers.length,
        flight_date: data.flightDate.toISOString().split('T')[0]
      });

      // Save booking data to localStorage (no external dependencies)
      const bookingDataWithRef = { ...data, bookingReference: bookingRef };
      
      try {
        // Save to localStorage as primary storage
        sessionStorage.setItem('bookingFormData', JSON.stringify(bookingDataWithRef));
        
        // Also save to localStorage for persistence
        const existingBookings = JSON.parse(localStorage.getItem('helicopter-bookings') || '[]');
        existingBookings.push({
          ...bookingDataWithRef,
          status: 'FORM_COMPLETED',
          timestamp: new Date().toISOString(),
          submittedAt: new Date().toLocaleString()
        });
        localStorage.setItem('helicopter-bookings', JSON.stringify(existingBookings));
        
        toast.success('Booking information saved successfully!');
        
        // Try to save to Google Sheets as backup (non-blocking)
        savePrePaymentBookingData(data, bookingRef).catch(error => {
          console.log('Google Sheets backup failed, but local storage succeeded:', error);
        });
        
      } catch (error) {
        console.error('Failed to save booking data:', error);
        toast.error('Failed to save booking information');
        setSubmitting(false);
        return;
      }

      // Navigate to payment
      navigate('/booking/payment');
    } catch (error) {
      toast.error('Failed to process booking');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!helicopter) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Helicopter not found</h2>
          <Button onClick={() => navigate('/helicopters')}>
            Browse Helicopters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
            <div className="flex items-center space-x-4">
              <img
                src={helicopter.images[0]}
                alt={helicopter.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-white">{helicopter.name}</h1>
                <p className="text-blue-100">{helicopter.model}</p>
                <p className="text-blue-100">${helicopter.pricePerHour}/hour</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('customerName', { required: 'Name is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                  {errors.customerName && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    {...register('customerEmail', { required: 'Email is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                  {errors.customerEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerEmail.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    {...register('customerPhone', { required: 'Phone number is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                  {errors.customerPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.customerPhone.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Flight Details */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Flight Details
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Flight Date *
                  </label>
                  <input
                    type="datetime-local"
                    {...register('flightDate', { required: 'Flight date is required' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.flightDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.flightDate.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Passenger Information */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Passenger Information
                </h2>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPassenger}
                    disabled={fields.length >= helicopter.capacity}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Passenger
                  </Button>
                  <span className="text-sm text-gray-500">
                    {fields.length}/{helicopter.capacity} passengers
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {fields.map((passenger, index) => (
                  <motion.div
                    key={passenger.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-50 rounded-lg p-4 relative"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        Passenger {index + 1}
                      </h3>
                      {fields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removePassenger(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          {...register(`passengers.${index}.firstName`, { required: 'First name is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          {...register(`passengers.${index}.lastName`, { required: 'Last name is required' })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter last name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                          <Weight className="w-4 h-4 mr-1" />
                          Weight (kg) *
                        </label>
                        <input
                          type="number"
                          min="1"
                          {...register(`passengers.${index}.weight`, { required: 'Weight is required', min: 1 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter weight"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                          <Info className="w-4 h-4 mr-1" />
                          Additional Info
                        </label>
                        <input
                          type="text"
                          {...register(`passengers.${index}.additionalInfo`)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Dietary restrictions, medical conditions, etc."
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          {...register(`passengers.${index}.wantsFrontSeat`)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          Request front seat (+$60 if confirmed at check-in)
                        </span>
                      </label>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Additional Options */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Options</h2>
              <div className="space-y-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register('cancellationProtection')}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Cancellation Protection (10% of base price)
                  </span>
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Requests
                  </label>
                  <textarea
                    {...register('specialRequests')}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Any special requests or requirements..."
                  />
                </div>
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Package Price</span>
                  <span className="font-medium">${watch('basePrice')}</span>
                </div>
                {watch('frontSeatFee') > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Front Seat Requests</span>
                    <span className="font-medium">${watch('frontSeatFee')}</span>
                  </div>
                )}
                {watch('cancellationProtectionFee') > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cancellation Protection</span>
                    <span className="font-medium">${watch('cancellationProtectionFee')}</span>
                  </div>
                )}
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>${watch('totalPrice')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={submitting}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {submitting ? (
                  <>
                    <LoadingSpinner size="sm" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Payment
                  </>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingFormPage;
