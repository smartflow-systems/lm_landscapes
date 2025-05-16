import BeforeAfterSlider from './BeforeAfterSlider';
import WaveDivider from './WaveDivider';

const GallerySection = () => {
  const galleryProjects = [
    {
      id: "1",
      title: "Beautiful Garden Transformation",
      description: "Complete garden renovation with new lawn and landscaping features",
      category: "Garden Makeover"
    },
    {
      id: "2",
      title: "Patio Installation",
      description: "Custom patio design with matching pathways and garden borders",
      category: "Hardscaping"
    },
    {
      id: "3",
      title: "Complete Yard Redesign",
      description: "Full redesign of outdoor space with new plantings and features",
      category: "Landscape Design"
    },
    {
      id: "4",
      title: "Garden Maintenance",
      description: "Professional garden maintenance and seasonal plantings",
      category: "Maintenance"
    },
    {
      id: "5",
      title: "Fence & Sleeper Installation",
      description: "High-quality fencing and sleeper installations for garden borders",
      category: "Construction"
    },
    {
      id: "6",
      title: "Outdoor Living Space",
      description: "Creation of beautiful outdoor living areas for relaxation and entertainment",
      category: "Lifestyle"
    }
  ];

  return (
    <section id="gallery" className="py-16 bg-secondary relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-primary text-white text-sm font-bold px-3 py-1 rounded-full mb-2">OUR WORK</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Recent Projects</h2>
          <p className="text-accent max-w-2xl mx-auto">
            Take a look at some of our recent landscaping projects and transformations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
          {galleryProjects.map((item) => (
            <div 
              key={item.id} 
              className="rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="overflow-hidden h-[240px] relative bg-primary/20 flex items-center justify-center">
                <div className="p-10 rounded-full bg-primary/10 border-4 border-primary/30">
                  <i className="fas fa-leaf text-primary text-5xl"></i>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
              </div>
              <div className="p-5 bg-white">
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-darkgray mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-secondary text-accent px-3 py-1 rounded-full">{item.category}</span>
                  <a href="#contact" className="text-primary font-medium text-sm hover:underline flex items-center">
                    Get a similar look <i className="fas fa-chevron-right ml-1 text-xs"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-14 text-center">
          <a 
            href="#contact" 
            className="bg-primary hover:bg-accent text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl"
          >
            <span>Transform Your Garden Today</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
          <p className="text-accent mt-4 text-sm">No obligation free consultations and quotes available</p>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider position="bottom" color="primary" />
      </div>
    </section>
  );
};

export default GallerySection;
