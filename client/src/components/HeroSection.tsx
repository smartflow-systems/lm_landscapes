import { useEffect, useRef } from 'react';
import LeafAnimation from './LeafAnimation';
import WaveDivider from './WaveDivider';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen bg-cover bg-center parallax hero-overlay flex flex-col">
      <div className="absolute inset-0 overflow-hidden">
        <LeafAnimation />
      </div>
      
      <div className="container mx-auto px-4 flex-1 flex flex-col justify-center items-start">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#F5EFE0] leading-tight mb-4 animate-float">
            Transform Your <span className="text-[#F5EFE0]">Outdoor Space</span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#F5EFE0] mb-6">
            Digger & Driver Hire Available
          </h2>
          <p className="text-[#F5EFE0] text-base sm:text-lg mb-8 max-w-lg">
            We provide a variety of professional landscaping services to keep your garden in perfect shape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact" 
              className="bg-primary hover:bg-accent text-[#F5EFE0] text-lg font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center w-fit"
            >
              <span>Get a Free Quote</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
            <a 
              href="#services" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg font-semibold px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center justify-center"
            >
              <span>Our Services</span>
              <i className="fas fa-leaf ml-2"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg className="wave-divider-custom" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="rgba(245, 239, 224, 0.9)"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
