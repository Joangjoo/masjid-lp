import React, { useState, useEffect } from 'react';
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

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('#beranda');

  // Handle hash change or initial load
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#beranda';
      if (hash === '#tentang') {
        setCurrentTab('#tentang');
      } else if (hash === '#layanan') {
        setCurrentTab('#layanan');
      } else if (hash === '#event') {
        setCurrentTab('#event');
      } else if (hash === '#testimoni') {
        setCurrentTab('#testimoni');
      } else if (hash === '#galeri') {
        setCurrentTab('#galeri');
      } else if (hash === '#kontak') {
        setCurrentTab('#kontak');
      } else {
        setCurrentTab('#beranda');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tabHref: string) => {
    setCurrentTab(tabHref);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F8F6F3] text-[#1E1E24] selection:bg-[#C49B5E] selection:text-white font-inter">
      {/* Sticky Header Navbar */}
      <Navbar currentTab={currentTab} onSelectTab={handleSelectTab} />

      {/* Dynamic Main Content Based on Selected Tab */}
      <main id="main-content">
        {currentTab === '#tentang' ? (
          <>
            <AboutHero />
            <HistoryVisionSection />
            <LeadershipSection />
            <JoinCommunitySection />
          </>
        ) : currentTab === '#layanan' ? (
          <>
            <ServicesHero />
            <ServiceCategories />
            <FeaturedProgramsSection />
            <ServiceCTASection />
          </>
        ) : currentTab === '#event' ? (
          <>
            <EventHero />
            <FeaturedEventBanner />
            <WeeklyEventsGrid />
            <EventProposalCTASection />
          </>
        ) : currentTab === '#testimoni' ? (
          <>
            <TestimonialsHero />
            <FeaturedTestimonialsSection />
            <PerspectivesGridSection />
            <ShareStoryCTASection />
          </>
        ) : currentTab === '#galeri' ? (
          <>
            <GalleryHero />
            <VideoMomentsSection />
            <PhotoGalleryGrid />
            <ShareMomentsCTASection />
          </>
        ) : currentTab === '#kontak' ? (
          <>
            <ContactHero />
            <ContactFormSection />
            <ContactInfoCardsSection />
          </>
        ) : (
          <>
            <HeroSection />
            <StatsBanner />
            <ServicesSection />
            <EventSection onNavigateToEvent={() => handleSelectTab('#event')} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
