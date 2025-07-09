import LeafAnimation from './LeafAnimation';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen bg-cover bg-center hero-overlay">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <LeafAnimation />
      </div>
      
      <div className="container mx-auto px-4 min-h-screen flex flex-col justify-center items-start py-20 md:py-24 relative z-10">
        <div className="max-w-full sm:max-w-2xl w-full">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 animate-float">
            Transform Your <span className="text-yellow-400">Outdoor Space</span>
          </h1>
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-6">
            Digger & Driver Hire Available
          </h2>
          <p className="text-white text-sm xs:text-base sm:text-lg mb-6 sm:mb-8 max-w-full sm:max-w-lg leading-relaxed">
            We provide a variety of professional landscaping services to keep your garden in perfect shape.
          </p>
          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 w-full xs:w-auto">
            <a 
              href="#contact" 
              className="bg-primary hover:bg-accent text-white text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center whitespace-nowrap"
            >
              <span>Get a Free Quote</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
            <a 
              href="#services" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-base sm:text-lg font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 inline-flex items-center justify-center whitespace-nowrap"
            >
              <span>Our Services</span>
              <i className="fas fa-leaf ml-2"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
