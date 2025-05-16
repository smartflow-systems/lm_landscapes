import { services } from '@/data/services';
import WaveDivider from './WaveDivider';

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 bg-secondary relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Professional Services</h2>
          <p className="text-accent max-w-2xl mx-auto">
            We offer a comprehensive range of landscaping services to transform and maintain your outdoor spaces.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={`${service.title} Service`} 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-primary bg-opacity-30 flex items-center justify-center">
                  <i className={`fas ${service.icon} text-white text-5xl`}></i>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3">{service.title}</h3>
                <p className="text-darkgray mb-4">{service.description}</p>
                <a href="#contact" className="text-primary font-semibold inline-flex items-center group">
                  <span>Learn More</span>
                  <i className="fas fa-arrow-right ml-2 transition-transform duration-300 group-hover:translate-x-1"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider position="bottom" color="primary" />
      </div>
    </section>
  );
};

export default ServicesSection;
