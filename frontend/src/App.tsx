import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { StatsBanner } from './components/sections/StatsBanner';
import { ServicesSection } from './components/sections/ServicesSection';
import { EventSection } from './components/sections/EventSection';
import { AboutHero } from './components/sections/AboutHero';
import { HistoryVisionSection } from './components/sections/HistoryVisionSection';
import { LeadershipSection } from './components/sections/LeadershipSection';
import { JoinCommunitySection } from './components/sections/JoinCommunitySection';
import { ServicesHero } from './components/sections/ServicesHero';
import { ServiceCategories } from './components/sections/ServiceCategories';
import { FeaturedProgramsSection } from './components/sections/FeaturedProgramsSection';
import { ServiceCTASection } from './components/sections/ServiceCTASection';
import { EventHero } from './components/sections/EventHero';
import { FeaturedEventBanner } from './components/sections/FeaturedEventBanner';
import { WeeklyEventsGrid } from './components/sections/WeeklyEventsGrid';
import { EventProposalCTASection } from './components/sections/EventProposalCTASection';
import { TestimonialsHero } from './components/sections/TestimonialsHero';
import { FeaturedTestimonialsSection } from './components/sections/FeaturedTestimonialsSection';
import { PerspectivesGridSection } from './components/sections/PerspectivesGridSection';
import { ShareStoryCTASection } from './components/sections/ShareStoryCTASection';
import { GalleryHero } from './components/sections/GalleryHero';
import { VideoMomentsSection } from './components/sections/VideoMomentsSection';
import { PhotoGalleryGrid } from './components/sections/PhotoGalleryGrid';
import { ShareMomentsCTASection } from './components/sections/ShareMomentsCTASection';
import { ContactHero } from './components/sections/ContactHero';
import { ContactFormSection } from './components/sections/ContactFormSection';
import { ContactInfoCardsSection } from './components/sections/ContactInfoCardsSection';
import { Footer } from './components/layout/Footer';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { apiService } from './services/api';

const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(
    !!localStorage.getItem('admin_token')
  );

  // Dynamic Page Title
  useEffect(() => {
    apiService.getProfileInfo()
      .then((data: any) => {
        if (data && data.name) {
          document.title = `${data.name} — Menemani Ibadahmu, Merajut Kebersamaan`;
        }
      })
      .catch(() => {});
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAdminLoggedIn(false);
    navigate('/');
  };

  // Admin Route Handler
  if (location.pathname === '/admin') {
    if (!isAdminLoggedIn) {
      return (
        <AdminLogin
          onLoginSuccess={() => setIsAdminLoggedIn(true)}
          onBackToWebsite={() => navigate('/')}
        />
      );
    }
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-[#F8F6F3] text-[#1E1E24] selection:bg-[#C49B5E] selection:text-white font-inter">
      {/* Sticky Header Navbar */}
      <Navbar currentPath={location.pathname} />

      {/* Dynamic Main Content Based on Routes */}
      <main id="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <StatsBanner />
                <ServicesSection />
                <EventSection onNavigateToEvent={() => navigate('/event')} />
              </>
            }
          />
          <Route
            path="/tentang"
            element={
              <>
                <AboutHero />
                <HistoryVisionSection />
                <LeadershipSection />
                <JoinCommunitySection />
              </>
            }
          />
          <Route
            path="/layanan"
            element={
              <>
                <ServicesHero />
                <ServiceCategories />
                <FeaturedProgramsSection />
                <ServiceCTASection />
              </>
            }
          />
          <Route
            path="/event"
            element={
              <>
                <EventHero />
                <FeaturedEventBanner />
                <WeeklyEventsGrid />
                <EventProposalCTASection />
              </>
            }
          />
          <Route
            path="/testimoni"
            element={
              <>
                <TestimonialsHero />
                <FeaturedTestimonialsSection />
                <PerspectivesGridSection />
                <ShareStoryCTASection />
              </>
            }
          />
          <Route
            path="/galeri"
            element={
              <>
                <GalleryHero />
                <VideoMomentsSection />
                <PhotoGalleryGrid />
                <ShareMomentsCTASection />
              </>
            }
          />
          <Route
            path="/kontak"
            element={
              <>
                <ContactHero />
                <ContactFormSection />
                <ContactInfoCardsSection />
              </>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
