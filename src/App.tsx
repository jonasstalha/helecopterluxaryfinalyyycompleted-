import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { testGoogleSheetsIntegration } from './lib/testGoogleSheets';

// Make test function available in development
if (import.meta.env.DEV) {
  (window as any).testGoogleSheets = testGoogleSheetsIntegration;
}
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { HelicopterListPage } from './pages/HelicopterListPage';
import { HelicopterDetailPage } from './pages/HelicopterDetailPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ContactPage } from './pages/ContactPage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BookingFormPage from './pages/BookingFormPage';
import PaymentSetupPage from './pages/PaymentSetupPage';
import BookingConfirmationPage from './pages/BookingConfirmationPage';
import TestGoogleSheetsPage from './pages/TestGoogleSheetsPage';
import SimpleBookingFormPage from './pages/SimpleBookingFormPage';
import SimpleBookingConfirmationPage from './pages/SimpleBookingConfirmationPage';
import { AdminDashboard } from './pages/AdminDashboard';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import CookiePolicyPage from './pages/CookiePolicyPage';

function App() {
  return (
    <AuthProvider>
      <>
        <Helmet>
          <title>Helicopter Luxury Rentals - Premium Flight Experiences</title>
          <meta name="description" content="Book luxury helicopter flights and experiences with the finest fleet and professional pilots." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true
          }}
        >
          <div className="min-h-screen flex flex-col bg-white">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HelicopterListPage />} />
                <Route path="/helicopters" element={<HelicopterListPage />} />
                <Route path="/helicopters/:id" element={<HelicopterDetailPage />} />
                <Route path="/booking/:helicopterId" element={<BookingFormPage />} />
                <Route path="/simple-booking/:helicopterId" element={<SimpleBookingFormPage />} />
                <Route path="/simple-booking/confirmation" element={<SimpleBookingConfirmationPage />} />
                <Route path="/booking/payment" element={<PaymentSetupPage />} />
                <Route path="/booking/confirmation" element={<BookingConfirmationPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/test-google-sheets" element={<TestGoogleSheetsPage />} />
                <Route path="/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsOfServicePage />} />
                <Route path="/cookies" element={<CookiePolicyPage />} />
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