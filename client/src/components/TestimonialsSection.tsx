import { useState } from 'react';
import { testimonials } from '@/data/testimonials';
import heroImage from "@assets/IMG_20250516_183911_634.jpg";

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
    <section id="testimonials" className="py-0">
      <div className="container mx-auto px-4">
        <div className="bubble-section">
          <div className="bubble-content">
            <div className="text-center mb-10 md:mb-16">
              <span className="inline-block bg-primary text-white text-sm font-bold px-3 py-1 rounded-full mb-2">TESTIMONIALS</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">What Our Clients Say</h2>
              <p className="max-w-2xl mx-auto text-accent">
                Hear from our satisfied customers about their experience with L&M Landscape Maintenance.
              </p>
            </div>
            
            {/* Mobile testimonial carousel (visible on small screens) */}
            <div className="md:hidden mb-8 relative">
              <div className="overflow-hidden">
                <div 
                  className="bg-gradient-to-b from-primary to-primary/80 rounded-2xl p-6 shadow-lg relative mx-auto max-w-sm"
                  style={{
                    backgroundImage: `linear-gradient(rgba(26, 71, 42, 0.95), rgba(26, 71, 42, 0.9)), url(${heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
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
                        <h4 className="font-semibold text-white">{testimonials[activeIndex].name}</h4>
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
                </div>
              </div>
            </div>
            
            {/* Desktop testimonial grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id} 
                  className="relative rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="absolute -top-4 -left-4 bg-yellow-400 h-10 w-10 rounded-full flex items-center justify-center shadow-xl z-10">
                    <i className="fas fa-quote-left text-primary text-lg"></i>
                  </div>
                  
                  <div className="p-6 pt-8">
                    <p className="italic text-lg font-medium pb-4 text-primary leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {testimonial.initial}
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-primary">{testimonial.name}</h4>
                        <p className="text-sm text-yellow-600">{testimonial.type}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a 
                href="#contact" 
                className="bg-primary hover:bg-accent text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <span>Join Our Happy Customers</span>
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
              <p className="text-accent mt-4 text-sm">Ready to transform your outdoor space? Let's get started!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;