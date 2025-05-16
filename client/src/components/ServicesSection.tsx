import WaveDivider from './WaveDivider';

const ServicesSection = () => {
  // Hardcoded services with image paths
  const servicesList = [
    {
      id: 'digger',
      title: 'Digger & Driver Hire',
      description: 'Professional excavation services for landscaping projects of any size. Our skilled operators can handle all your digging needs.',
      icon: 'fa-truck-monster',
    },
    {
      id: 'fencing',
      title: 'Fencing, Sleepers, Decking & Lighting',
      description: 'Create beautiful boundaries and outdoor living spaces with our quality fencing, sleepers, decking, and atmospheric lighting solutions.',
      icon: 'fa-fence',
    },
    {
      id: 'painting',
      title: 'External Painting & Garden Maintenance',
      description: 'Keep your outdoor structures looking fresh with our external painting services, along with comprehensive garden maintenance.',
      icon: 'fa-paint-roller',
    },
    {
      id: 'design',
      title: 'Full Landscape Design',
      description: 'Transform your outdoor space with our comprehensive landscape design services, creating harmony between aesthetics and functionality.',
      icon: 'fa-drafting-compass',
    },
    {
      id: 'driveways',
      title: 'Driveways & Patios',
      description: 'Enhance your property with our custom driveway and patio solutions, using quality materials for durability and aesthetic appeal.',
      icon: 'fa-road',
    },
    {
      id: 'maintenance',
      title: 'Lawn & Garden Maintenance',
      description: 'Keep your outdoor space looking its best with our professional lawn care and garden maintenance services all year round.',
      icon: 'fa-leaf',
    }
  ];
  
  return (
    <section id="services" className="py-16 bg-secondary relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-primary text-white text-sm font-bold px-3 py-1 rounded-full mb-2">WHAT WE DO</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Professional Services</h2>
          <p className="text-accent max-w-2xl mx-auto">
            We offer a comprehensive range of landscaping services to transform and maintain your outdoor spaces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesList.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 flex flex-col h-full"
            >
              <div className="h-56 sm:h-48 md:h-56 overflow-hidden relative bg-primary/20 flex items-center justify-center">
                <div className="p-6 rounded-full bg-primary/10 border-4 border-primary/30">
                  <i className={`fas ${service.icon} text-primary text-5xl`}></i>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
                <p className="text-darkgray mb-4">{service.description}</p>
              </div>
              <div className="px-6 pb-6 mt-auto">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center w-full bg-primary hover:bg-accent text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
                >
                  <span>Request a Quote</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
          >
            <span>Schedule a Free Consultation</span>
            <i className="fas fa-calendar-check ml-2"></i>
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider position="bottom" color="primary" />
      </div>
    </section>
  );
};

export default ServicesSection;
