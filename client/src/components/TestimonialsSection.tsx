import { useState } from 'react';
import { testimonials } from '@/data/testimonials';
import WaveDivider from './WaveDivider';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // For mobile scrolling - show 1 testimonial at a time
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  
  return (
    <section id="testimonials" className="py-16 bg-primary text-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <span className="inline-block bg-secondary text-primary text-sm font-bold px-3 py-1 rounded-full mb-2">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="max-w-2xl mx-auto text-white/80">
            Hear from our satisfied customers about their experience with L&M Landscape Maintenance.
          </p>
        </div>
        
        {/* Mobile testimonial carousel (visible on small screens) */}
        <div className="md:hidden mb-8 relative">
          <div className="overflow-hidden">
            <div 
              className="bg-gradient-to-b from-accent to-accent/80 rounded-2xl p-6 shadow-lg relative mx-auto max-w-sm"
              style={{
                backgroundImage: `linear-gradient(rgba(26, 71, 42, 0.95), rgba(26, 71, 42, 0.9)), url('@assets/IMG_20250516_183911_634.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Social media style quote mark */}
              <div className="absolute -top-4 -left-4 bg-yellow-400 h-10 w-10 rounded-full flex items-center justify-center shadow-xl">
                <i className="fas fa-quote-left text-primary text-lg"></i>
              </div>
              
              <div className="mb-6 pt-4">
                <p className="relative z-10 italic text-lg font-medium pb-4 text-white leading-relaxed">
                  "{testimonials[activeIndex].text}"
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-primary font-bold text-xl shadow-lg">
                    {testimonials[activeIndex].initial}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">{testimonials[activeIndex].name}</h4>
                    <p className="text-sm text-yellow-400">{testimonials[activeIndex].type}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={prevTestimonial}
                    className="bg-primary/40 hover:bg-primary w-8 h-8 rounded-full flex items-center justify-center text-white backdrop-blur-sm"
                    aria-label="Previous testimonial"
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button 
                    onClick={nextTestimonial}
                    className="bg-primary/40 hover:bg-primary w-8 h-8 rounded-full flex items-center justify-center text-white backdrop-blur-sm"
                    aria-label="Next testimonial"
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </div>
              </div>
              
              {/* Page indicators */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      activeIndex === index ? "w-6 bg-yellow-400" : "w-2 bg-white/30"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Desktop grid layout (hidden on mobile) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-gradient-to-b from-accent to-accent/80 rounded-2xl p-6 shadow-lg relative overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              style={{
                backgroundImage: `linear-gradient(rgba(26, 71, 42, 0.95), rgba(26, 71, 42, 0.9)), url('@assets/IMG_20250516_183911_634.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Social media style quote mark */}
              <div className="absolute -top-4 -left-4 bg-yellow-400 h-10 w-10 rounded-full flex items-center justify-center shadow-xl z-10">
                <i className="fas fa-quote-left text-primary text-lg"></i>
              </div>
              
              {/* Instagram style share button */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-primary/40 backdrop-blur-sm p-2 rounded-full">
                  <i className="fas fa-share-alt text-white"></i>
                </div>
              </div>
              
              <div className="mb-6 pt-4">
                <p className="relative z-10 italic text-lg font-medium pb-4 text-white leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-primary font-bold text-xl shadow-lg">
                  {testimonial.initial}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <div className="flex items-center">
                    <p className="text-sm text-yellow-400">{testimonial.type}</p>
                    <div className="ml-2 flex">
                      <i className="fas fa-star text-yellow-400 text-xs"></i>
                      <i className="fas fa-star text-yellow-400 text-xs"></i>
                      <i className="fas fa-star text-yellow-400 text-xs"></i>
                      <i className="fas fa-star text-yellow-400 text-xs"></i>
                      <i className="fas fa-star text-yellow-400 text-xs"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10 md:mt-12">
          <a 
            href="#contact" 
            className="bg-secondary hover:bg-white text-primary font-semibold px-6 py-3 rounded-full transition-all duration-300 inline-flex items-center shadow-lg"
          >
            <span>Become Our Next Happy Client</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider position="bottom" color="secondary" />
      </div>
    </section>
  );
};

export default TestimonialsSection;
