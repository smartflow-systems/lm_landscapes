import { services } from '@/data/services';

const ServicesSection = () => {
  return (
    <section id="services" className="py-0">
      <div className="container mx-auto px-4">
        <div className="bubble-section">
          <div className="bubble-content">
            <div className="text-center mb-12 md:mb-16">
              <span className="inline-block bg-primary text-white text-sm font-bold px-3 py-1 rounded-full mb-2">WHAT WE DO</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Professional Services</h2>
              <p className="text-accent max-w-2xl mx-auto">
                We offer a comprehensive range of landscaping services to transform and maintain your outdoor spaces.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service) => (
                <div 
                  key={service.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 flex flex-col h-full"
                >
                  <div className="h-56 sm:h-48 md:h-56 overflow-hidden relative">
                    <img 
                      src={service.image} 
                      alt={`${service.title} Service`} 
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent flex items-center justify-center">
                      <div className="absolute bottom-4 left-4 bg-white/90 p-3 rounded-full shadow-lg">
                        <i className={`fas ${service.icon} text-primary text-2xl`}></i>
                      </div>
                    </div>
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
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;