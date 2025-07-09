

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-primary text-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block bg-secondary text-primary text-sm font-bold px-3 py-1 rounded-full mb-2">ABOUT US</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Garden Transformation Experts</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Where passion for nature meets professional landscaping excellence
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="md:w-5/12 lg:w-1/2 order-2 md:order-1">
            <div className="bg-secondary/20 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-white/10">
              <h3 className="text-2xl font-semibold mb-4 text-yellow-400">L&M Landscape Maintenance</h3>
              <p className="mb-4 text-base md:text-lg text-white/90">
                We're dedicated to bringing nature's beauty to your doorstep. Our skilled team transforms ordinary outdoor spaces 
                into extraordinary natural havens that you'll love sharing on social media.
              </p>
              <p className="mb-6 text-base md:text-lg text-white/90">
                Our commitment to quality, attention to detail, and passion for landscaping ensures 
                that every project we undertake exceeds expectations and creates Instagram-worthy spaces.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center bg-primary/10 p-3 rounded-lg backdrop-blur-sm">
                  <div className="bg-yellow-400 h-8 w-8 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <i className="fas fa-users text-primary"></i>
                  </div>
                  <span className="font-medium">Professional Team</span>
                </div>
                <div className="flex items-center bg-primary/10 p-3 rounded-lg backdrop-blur-sm">
                  <div className="bg-yellow-400 h-8 w-8 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <i className="fas fa-gem text-primary"></i>
                  </div>
                  <span className="font-medium">Quality Materials</span>
                </div>
                <div className="flex items-center bg-primary/10 p-3 rounded-lg backdrop-blur-sm">
                  <div className="bg-yellow-400 h-8 w-8 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <i className="fas fa-clock text-primary"></i>
                  </div>
                  <span className="font-medium">Timely Completion</span>
                </div>
                <div className="flex items-center bg-primary/10 p-3 rounded-lg backdrop-blur-sm">
                  <div className="bg-yellow-400 h-8 w-8 rounded-full flex items-center justify-center mr-3 shrink-0">
                    <i className="fas fa-heart text-primary"></i>
                  </div>
                  <span className="font-medium">Customer Satisfaction</span>
                </div>
              </div>

              <a 
                href="#contact" 
                className="bg-yellow-400 hover:bg-white text-primary font-semibold px-6 py-3 rounded-full transition-all duration-300 inline-flex items-center shadow-lg"
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
                    src="@assets/IMG_20250516_183911_634.jpg" 
                    alt="L&M Landscape Maintenance" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-primary/30"></div>
                </div>
                <div className="bg-yellow-400 h-24 w-24 rounded-full flex items-center justify-center z-20 shadow-lg">
                  <i className="fas fa-leaf text-primary text-5xl"></i>
                </div>
              </div>

              {/* Experience badge */}
              <div className="absolute -bottom-4 -right-4 bg-primary text-white px-4 py-2 rounded-lg shadow-lg border-2 border-yellow-400 z-20">
                <span className="block text-xs font-semibold">TRUSTED BY</span>
                <span className="text-xl font-bold">100+ Customers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default AboutSection;