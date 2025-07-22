import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Vanguard Helicopters</title>
        <meta name="description" content="Privacy Policy for Vanguard Helicopters - Your privacy is important to us." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> July 13, 2025
            </p>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
                <p className="mb-3">
                  When you use our helicopter booking services, we collect the following information:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Payment information (processed securely through Stripe)</li>
                  <li>Booking details (flight dates, passenger information, special requests)</li>
                  <li>Communication records (emails, phone calls, chat messages)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
                <p className="mb-3">We use your information to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Process your helicopter booking and payment</li>
                  <li>Communicate with you about your reservation</li>
                  <li>Provide customer support</li>
                  <li>Send booking confirmations and updates</li>
                  <li>Improve our services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Information Sharing</h2>
                <p className="mb-3">
                  We do not sell, trade, or share your personal information with third parties except:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>With payment processors (Stripe) to process transactions</li>
                  <li>With service providers who assist in our operations</li>
                  <li>When required by law or to protect our rights</li>
                  <li>With your explicit consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
                <p>
                  We implement appropriate security measures to protect your personal information against 
                  unauthorized access, alteration, disclosure, or destruction. All payment information is 
                  processed through secure, encrypted connections.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Data Retention</h2>
                <p>
                  We retain your personal information only as long as necessary to provide our services 
                  and comply with legal obligations. Booking records are typically retained for 7 years 
                  for tax and safety compliance purposes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your Rights</h2>
                <p className="mb-3">You have the right to:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of marketing communications</li>
                  <li>File a complaint with supervisory authorities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Cookies</h2>
                <p>
                  We use cookies to improve your experience on our website. For detailed information 
                  about our cookie usage, please see our Cookie Policy.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Contact Us</h2>
                <p className="mb-3">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> vanguardhelicopter@gmail.com</p>
                  <p><strong>Phone:</strong> +44 7939 956301</p>
                  <p><strong>Address:</strong> 123 Aviation Drive, Chicago, IL 60601</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  changes by posting the new policy on this page with an updated effective date.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;
