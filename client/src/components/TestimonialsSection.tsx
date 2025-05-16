import { testimonials } from '@/data/testimonials';
import WaveDivider from './WaveDivider';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 bg-primary text-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="max-w-2xl mx-auto">
            Hear from our satisfied customers about their experience with L&M Landscape Maintenance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-accent rounded-lg p-8 shadow-lg relative"
            >
              <div className="mb-6">
                <i className="fas fa-quote-left text-yellow-400 text-4xl opacity-50 absolute top-4 left-4"></i>
                <p className="relative z-10 italic text-lg font-['Playfair_Display']">{testimonial.text}</p>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                  {testimonial.initial}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-yellow-400">{testimonial.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider position="bottom" color="secondary" />
      </div>
    </section>
  );
};

export default TestimonialsSection;
