import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import AboutSection from '@/components/AboutSection';
import GallerySection from '@/components/GallerySection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Home: React.FC = () => {
  // Set page title and metadata
  useEffect(() => {
    document.title = "L&M Landscape Maintenance | Landscaping in Failsworth";
  }, []);

  return (
    <div className="overflow-x-hidden w-full max-w-full main-background">
      <Navbar />
      <HeroSection />
      <div className="py-4 sm:py-8 overflow-hidden">
        <ServicesSection />
      </div>
      <div className="py-4 sm:py-8 overflow-hidden">
        <AboutSection />
      </div>
      <div className="py-4 sm:py-8 overflow-hidden">
        <GallerySection />
      </div>
      <div className="py-4 sm:py-8 overflow-hidden">
        <TestimonialsSection />
      </div>
      <div className="py-4 sm:py-8 overflow-hidden">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
