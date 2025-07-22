import React from 'react';
import { Helmet } from 'react-helmet';

const TermsOfServicePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Vanguard Helicopters</title>
        <meta name="description" content="Terms of Service for Vanguard Helicopters - Professional helicopter rental services." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> July 13, 2025
            </p>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                <p>
                  By using Vanguard Helicopters' services, you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Service Description</h2>
                <p className="mb-3">
                  Vanguard Helicopters provides luxury helicopter rental services including:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Scenic helicopter tours</li>
                  <li>Business and executive transportation</li>
                  <li>Special event transportation</li>
                  <li>Charter flights</li>
                  <li>Photography and filming flights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Booking and Payment</h2>
                <div className="space-y-3">
                  <h3 className="font-semibold">3.1 Reservations</h3>
                  <p>All bookings must be made through our online platform or by contacting us directly.</p>
                  
                  <h3 className="font-semibold">3.2 Payment</h3>
                  <p>Full payment is required at the time of booking. We accept major credit cards through our secure payment processor.</p>
                  
                  <h3 className="font-semibold">3.3 Pricing</h3>
                  <p>Prices are subject to change without notice. The price confirmed at booking is final.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Cancellation Policy</h2>
                <div className="space-y-3">
                  <h3 className="font-semibold">4.1 Customer Cancellations</h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Cancellations made 48+ hours before flight: Full refund</li>
                    <li>Cancellations made 24-48 hours before flight: 50% refund</li>
                    <li>Cancellations made less than 24 hours before flight: No refund</li>
                  </ul>
                  
                  <h3 className="font-semibold">4.2 Weather Cancellations</h3>
                  <p>Flights canceled due to weather conditions receive a full refund or can be rescheduled at no additional cost.</p>
                  
                  <h3 className="font-semibold">4.3 Mechanical Issues</h3>
                  <p>Flights canceled due to mechanical or safety issues receive a full refund.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Safety Requirements</h2>
                <div className="space-y-3">
                  <h3 className="font-semibold">5.1 Passenger Requirements</h3>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>All passengers must be at least 2 years old</li>
                    <li>Weight restrictions apply (maximum 300 lbs per passenger)</li>
                    <li>Valid photo ID required for all passengers</li>
                    <li>Passengers must arrive sober and drug-free</li>
                  </ul>
                  
                  <h3 className="font-semibold">5.2 Safety Briefing</h3>
                  <p>All passengers must attend a mandatory safety briefing before flight.</p>
                  
                  <h3 className="font-semibold">5.3 Pilot Authority</h3>
                  <p>The pilot has final authority on all safety matters and flight decisions.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Liability and Insurance</h2>
                <div className="space-y-3">
                  <h3 className="font-semibold">6.1 Limitation of Liability</h3>
                  <p>
                    Vanguard Helicopters' liability is limited to the amount paid for the service. 
                    We are not liable for indirect, incidental, or consequential damages.
                  </p>
                  
                  <h3 className="font-semibold">6.2 Insurance</h3>
                  <p>All aircraft are fully insured in accordance with aviation regulations.</p>
                  
                  <h3 className="font-semibold">6.3 Passenger Responsibility</h3>
                  <p>Passengers participate at their own risk and must follow all safety instructions.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Prohibited Items</h2>
                <p className="mb-3">The following items are prohibited on all flights:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Weapons of any kind</li>
                  <li>Illegal drugs or substances</li>
                  <li>Alcohol (unless pre-approved for special events)</li>
                  <li>Hazardous materials</li>
                  <li>Large bags or luggage (small personal items only)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Photography and Privacy</h2>
                <div className="space-y-3">
                  <h3 className="font-semibold">8.1 Personal Photography</h3>
                  <p>Passengers may take photos and videos for personal use during the flight.</p>
                  
                  <h3 className="font-semibold">8.2 Commercial Use</h3>
                  <p>Commercial photography or filming requires prior written approval and may incur additional fees.</p>
                  
                  <h3 className="font-semibold">8.3 Privacy</h3>
                  <p>We respect passenger privacy and do not share personal information without consent.</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Force Majeure</h2>
                <p>
                  We are not liable for delays or cancellations due to circumstances beyond our control, 
                  including but not limited to weather, natural disasters, government actions, or other 
                  acts of God.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Governing Law</h2>
                <p>
                  These terms are governed by the laws of Illinois, United States. Any disputes shall be 
                  resolved in the courts of Chicago, Illinois.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Contact Information</h2>
                <p className="mb-3">
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> vanguardhelicopter@gmail.com</p>
                  <p><strong>Phone:</strong> +44 7939 956301</p>
                  <p><strong>Address:</strong> 123 Aviation Drive, Chicago, IL 60601</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms of Service at any time. Changes will be 
                  effective immediately upon posting. Continued use of our services constitutes acceptance 
                  of the modified terms.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfServicePage;
