import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HelicopterListPage } from './pages/HelicopterListPage';
import { HelicopterDetailPage } from './pages/HelicopterDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <AuthProvider>
      <>
        <Helmet>
          {/* Meta Pixel Code */}
          <script>
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '4121542431426679');
              fbq('track', 'PageView');
            `}
          </script>
          <noscript>{
            '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=4121542431426679&ev=PageView&noscript=1" alt="fb-pixel" />'
          }</noscript>
        </Helmet>
        <Router>
          <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HelicopterListPage />} />
                <Route path="/helicopters" element={<HelicopterListPage />} />
                <Route path="/helicopters/:id" element={<HelicopterDetailPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                {/* Additional routes will be added as we build more pages */}
              </Routes>
            </main>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </Router>
      </>
    </AuthProvider>
  );
}

export default App;