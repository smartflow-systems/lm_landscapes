import WaveDivider from './WaveDivider';

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-primary text-white relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <div className="flex justify-center md:justify-start">
              <div className="h-48 w-48 rounded-full bg-secondary border-4 border-yellow-400 flex items-center justify-center p-8 animate-float">
                <i className="fas fa-leaf text-primary text-7xl"></i>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About L&M Landscape Maintenance</h2>
            <p className="mb-4 text-lg">
              L&M Landscape Maintenance is dedicated to bringing nature's beauty to your doorstep. 
              With our skilled team of landscaping professionals, we transform ordinary outdoor spaces 
              into extraordinary natural havens.
            </p>
            <p className="mb-6 text-lg">
              Our commitment to quality, attention to detail, and passion for landscaping ensures 
              that every project we undertake exceeds expectations. From simple garden maintenance 
              to complex landscape designs, we approach each job with the same level of dedication.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center">
                <i className="fas fa-check-circle text-yellow-400 mr-2"></i>
                <span>Professional Team</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-yellow-400 mr-2"></i>
                <span>Quality Materials</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-yellow-400 mr-2"></i>
                <span>Timely Completion</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-check-circle text-yellow-400 mr-2"></i>
                <span>Customer Satisfaction</span>
              </div>
            </div>
            
            <a 
              href="#contact" 
              className="bg-yellow-400 hover:bg-white text-primary text-lg font-semibold px-8 py-4 rounded-full transition-all duration-300 inline-flex items-center"
            >
              <span>Get in Touch</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <WaveDivider position="bottom" color="secondary" />
      </div>
    </section>
  );
};

export default AboutSection;
