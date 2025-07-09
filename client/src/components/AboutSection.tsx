import heroImage from "@assets/IMG_20250516_183911_634.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-0">
      <div className="container mx-auto px-4">
        <div className="bubble-section">
          <div className="bubble-content">
            <div className="text-center mb-8 md:mb-12">
              <span className="inline-block bg-primary text-white text-sm font-bold px-3 py-1 rounded-full mb-2">ABOUT US</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Your Garden Transformation Experts</h2>
              <p className="text-accent max-w-2xl mx-auto">
                Where passion for nature meets professional landscaping excellence
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="md:w-5/12 lg:w-1/2 order-2 md:order-1">
                <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-primary/10">
                  <h3 className="text-2xl font-semibold mb-4 text-primary">L&M Landscape Maintenance</h3>
                  <p className="mb-4 text-base md:text-lg text-accent">
                    We're dedicated to bringing nature's beauty to your doorstep. Our skilled team transforms ordinary outdoor spaces 
                    into extraordinary natural havens that you'll love sharing on social media.
                  </p>
                  <p className="mb-6 text-base md:text-lg text-accent">
                    Our commitment to quality, attention to detail, and passion for landscaping ensures 
                    that every project we undertake exceeds expectations and creates Instagram-worthy spaces.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center bg-primary/10 p-3 rounded-lg backdrop-blur-sm">
                      <div className="bg-yellow-400 h-8 w-8 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-users text-primary"></i>
                      </div>
                      <span className="font-medium text-primary">Professional Team</span>
                    </div>
                    <div className="flex items-center bg-primary/10 p-3 rounded-lg backdrop-blur-sm">
                      <div className="bg-yellow-400 h-8 w-8 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-gem text-primary"></i>
                      </div>
                      <span className="font-medium text-primary">Quality Materials</span>
                    </div>
                    <div className="flex items-center bg-primary/10 p-3 rounded-lg backdrop-blur-sm">
                      <div className="bg-yellow-400 h-8 w-8 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-clock text-primary"></i>
                      </div>
                      <span className="font-medium text-primary">Timely Completion</span>
                    </div>
                    <div className="flex items-center bg-primary/10 p-3 rounded-lg backdrop-blur-sm">
                      <div className="bg-yellow-400 h-8 w-8 rounded-full flex items-center justify-center mr-3 shrink-0">
                        <i className="fas fa-heart text-primary"></i>
                      </div>
                      <span className="font-medium text-primary">Customer Satisfaction</span>
                    </div>
                  </div>

                  <a 
                    href="#contact" 
                    className="bg-primary hover:bg-accent text-white font-semibold px-6 py-3 rounded-full transition-all duration-300 inline-flex items-center shadow-lg"
                  >
                    <span>Get in Touch</span>
                    <i className="fas fa-arrow-right ml-2"></i>
                  </a>
                </div>
              </div>

              <div className="md:w-7/12 lg:w-1/2 order-1 md:order-2 flex justify-center">
                <div className="relative">
                  <div className="h-64 w-64 md:h-80 md:w-80 rounded-full bg-secondary border-4 border-yellow-400 flex items-center justify-center p-8 animate-float shadow-2xl relative z-10">
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                      <img 
                        src={heroImage} 
                        alt="L&M Landscape Maintenance" 
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-primary/30"></div>
                    </div>
                    <div className="bg-yellow-400 h-24 w-24 rounded-full flex items-center justify-center z-20 shadow-lg">
                      <i className="fas fa-leaf text-primary text-5xl"></i>
                    </div>
                  </div>
                  
                  <div className="absolute -top-4 -right-4 bg-purple-500 text-white p-3 rounded-full shadow-lg z-30 animate-bounce">
                    <i className="fas fa-star"></i>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-primary p-3 rounded-full shadow-lg z-30 animate-bounce" style={{animationDelay: '0.5s'}}>
                    <i className="fas fa-seedling"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;