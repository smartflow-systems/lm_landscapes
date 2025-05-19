import { galleryItems } from '@/data/gallery';
import BeforeAfterSlider from './BeforeAfterSlider';
import WaveDivider from './WaveDivider';

const GallerySection = () => {
  return (
    <section id="gallery" className="bg-background">
      <div className="container grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block bg-primary text-white text-sm font-bold px-3 py-1 rounded-full mb-2">BEFORE & AFTER</span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Garden Transformations</h2>
          <p className="text-accent max-w-2xl mx-auto">
            Slide to see the dramatic difference our landscaping services can make to your outdoor space.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
          {galleryItems.map((item) => (
            <div 
              key={item.id} 
              className="rounded-xl shadow-lg overflow-hidden bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="overflow-hidden h-[300px] sm:h-[320px] xl:h-[280px] relative">
                <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-md z-10">
                  Before & After
                </div>
                <BeforeAfterSlider
                  beforeImage={item.beforeImage}
                  afterImage={item.afterImage}
                  beforeAlt={`${item.title} Before`}
                  afterAlt={`${item.title} After`}
                />
              </div>
              <div className="p-5 bg-white">
                <h3 className="text-xl font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-darkgray mb-4">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-secondary text-accent px-3 py-1 rounded-full">Garden Makeover</span>
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