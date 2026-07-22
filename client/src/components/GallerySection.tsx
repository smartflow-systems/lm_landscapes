import { galleryItems } from '@/data/gallery';

const GallerySection = () => {
  return (
    <section id="gallery" className="py-0 overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="bubble-section">
          <div className="bubble-content">
            <div className="text-center mb-8 sm:mb-12 md:mb-16">
              <span className="inline-block bg-primary text-white text-sm font-bold px-3 py-1 rounded-full mb-2">RECENT WORK</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Real Landscaping Jobs</h2>
              <p className="text-accent max-w-2xl mx-auto">
                A closer look at the clearance, groundwork, fencing, paving and finishing work carried out by L&amp;M.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {galleryItems.map((item) => (
                <div 
                  key={item.id} 
                  className="group rounded-2xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                >
                  <div className="overflow-hidden aspect-[4/3] relative bg-secondary">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-primary/95 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-5 bg-white flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-700 mb-5">{item.description}</p>
                    <a href="#contact" className="text-primary font-semibold text-sm hover:underline inline-flex items-center mt-auto">
                      Ask about this service <i className="fas fa-chevron-right ml-1 text-xs"></i>
                    </a>
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
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
