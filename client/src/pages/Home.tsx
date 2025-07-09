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
    document.title = "L&M Landscape Maintenance - Professional Landscaping Services";
  }, []);

  return (
    <div className="overflow-x-hidden main-background">
      <Navbar />
      <HeroSection />
      <div className="py-8">
        <ServicesSection />
      </div>
      <div className="py-8">
        <AboutSection />
      </div>
      <div className="py-8">
        <GallerySection />
      </div>
      <div className="py-8">
        <TestimonialsSection />
      </div>
      <div className="py-8">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
