import { galleryItems } from '@/data/gallery';
import BeforeAfterSlider from './BeforeAfterSlider';
import WaveDivider from './WaveDivider';

const GallerySection = () => {
  return (
    <section id="gallery" className="py-16 bg-secondary relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Transformations</h2>
          <p className="text-accent max-w-2xl mx-auto">
            See the difference our landscaping services can make with these before and after showcases.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {galleryItems.map((item) => (
            <div key={item.id} className="rounded-lg shadow-lg relative max-w-sm mx-auto w-full">
              <div className="overflow-hidden h-[250px] sm:h-[200px] lg:h-[250px]">
              <BeforeAfterSlider
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                beforeAlt={`${item.title} Before`}
                afterAlt={`${item.title} After`}
              />
              </div>
              <div className="p-3 sm:p-4 bg-white">
                <h3 className="text-base sm:text-lg font-semibold text-primary">{item.title}</h3>
                <p className="text-xs sm:text-sm text-darkgray">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="#contact" 
            className="bg-primary hover:bg-accent text-white text-lg font-semibold px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center"
          >
            <span>Start Your Transformation</span>
            <i className="fas fa-leaf ml-2"></i>
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider position="bottom" color="primary" />
      </div>
    </section>
  );
};

export default GallerySection;
