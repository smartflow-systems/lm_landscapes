import { useEffect, useRef } from 'react';
import LeafAnimation from './LeafAnimation';
import WaveDivider from './WaveDivider';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen bg-cover bg-center parallax hero-overlay">
      <div className="absolute inset-0 overflow-hidden">
        <LeafAnimation />
      </div>
      
      <div className="container mx-auto px-4 h-screen flex flex-col justify-center items-start">
        <div className="max-w-2xl mt-20 md:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight mb-4 animate-float">
            Transform Your <span className="text-yellow-400">Outdoor Space</span>
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6">
            Digger & Driver Hire Available
          </h2>
          <p className="text-white text-base sm:text-lg mb-8 max-w-lg">
            We provide a variety of professional landscaping services to keep your garden in perfect shape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact" 
              className="bg-primary hover:bg-accent text-white text-lg font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center w-fit"
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
      
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider position="bottom" color="secondary" />
      </div>
    </section>
  );
};

export default HeroSection;
