import React from 'react';
import { Helmet } from 'react-helmet';

const CookiePolicyPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Vanguard Helicopters</title>
        <meta name="description" content="Cookie Policy for Vanguard Helicopters - How we use cookies on our website." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
            <p className="text-gray-600 mb-6">
              <strong>Effective Date:</strong> July 13, 2025
            </p>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">1. What Are Cookies?</h2>
                <p>
                  Cookies are small text files that are placed on your device when you visit our website. 
                  They help us provide you with a better browsing experience by remembering your preferences 
                  and analyzing how you use our site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Cookies</h2>
                <p className="mb-3">We use cookies for the following purposes:</p>
                <ul className="list-disc ml-6 space-y-2">
                  <li>To remember your preferences and settings</li>
                  <li>To analyze website traffic and usage patterns</li>
                  <li>To improve our website functionality</li>
                  <li>To provide personalized content and advertisements</li>
                  <li>To process payments securely</li>
                  <li>To ensure website security</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Types of Cookies We Use</h2>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-gray-900">Essential Cookies</h3>
                    <p className="text-sm text-gray-600">
                      These cookies are necessary for the website to function properly. They enable core 
                      functionality such as security, network management, and accessibility.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-gray-900">Performance Cookies</h3>
                    <p className="text-sm text-gray-600">
                      These cookies collect information about how you use our website, such as which pages 
                      you visit most often. This data helps us improve our website performance.
                    </p>
                  </div>

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="font-semibold text-gray-900">Functionality Cookies</h3>
                    <p className="text-sm text-gray-600">
                      These cookies remember choices you make (such as language preferences) and provide 
                      enhanced, more personalized features.
                    </p>
                  </div>

                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-gray-900">Marketing Cookies</h3>
                    <p className="text-sm text-gray-600">
                      These cookies track your online activity to help advertisers deliver more relevant 
                      advertising or to limit how many times you see an ad.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Third-Party Cookies</h2>
                <p className="mb-3">
                  We may use third-party services that set cookies on our website, including:
                </p>
                <ul className="list-disc ml-6 space-y-2">
                  <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
                  <li><strong>Stripe:</strong> For secure payment processing</li>
                  <li><strong>Social Media Platforms:</strong> For social media integration and sharing</li>
                  <li><strong>Customer Support:</strong> For live chat and customer service features</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Cookie Duration</h2>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">Session Cookies</h3>
                    <p className="text-sm text-gray-600">
                      These cookies are temporary and are deleted when you close your browser.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold">Persistent Cookies</h3>
                    <p className="text-sm text-gray-600">
                      These cookies remain on your device for a specified period or until you delete them.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Managing Your Cookie Preferences</h2>
                <div className="space-y-3">
                  <h3 className="font-semibold">Browser Settings</h3>
                  <p className="mb-3">
                    You can control and manage cookies through your browser settings. Most browsers allow you to:
                  </p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>View what cookies are stored on your device</li>
                    <li>Delete cookies</li>
                    <li>Block cookies from specific sites</li>
                    <li>Block all cookies</li>
                    <li>Delete all cookies when you close your browser</li>
                  </ul>
                  
                  <h3 className="font-semibold mt-4">Cookie Consent</h3>
                  <p>
                    When you first visit our website, we may ask for your consent to use cookies. 
                    You can withdraw your consent at any time by adjusting your browser settings.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Impact of Disabling Cookies</h2>
                <p className="mb-3">
                  If you disable cookies, some features of our website may not work properly, including:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li>Booking and payment processes</li>
                  <li>Personalized content and recommendations</li>
                  <li>Login functionality</li>
                  <li>Shopping cart features</li>
                  <li>Website analytics and improvements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Mobile Devices</h2>
                <p>
                  For mobile devices, you can manage cookies through your device settings or through 
                  the browser you use to access our website.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Updates to This Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in our practices 
                  or for other operational, legal, or regulatory reasons. Please check this page regularly 
                  for updates.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact Us</h2>
                <p className="mb-3">
                  If you have any questions about our use of cookies, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Email:</strong> vanguardhelicopter@gmail.com</p>
                  <p><strong>Phone:</strong> +44 7939 956301</p>
                  <p><strong>Address:</strong> 123 Aviation Drive, Chicago, IL 60601</p>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Useful Links</h2>
                <p className="mb-3">
                  For more information about cookies and how to manage them, visit:
                </p>
                <ul className="list-disc ml-6 space-y-1">
                  <li><a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">AllAboutCookies.org</a></li>
                  <li><a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Your Online Choices</a></li>
                  <li><a href="https://cookiesandyou.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Cookies & You</a></li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicyPage;
