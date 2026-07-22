import teamAtWorkImage from "@assets/Screenshot_2026-07-22_185427_1784753102191.png";

const AboutSection = () => {
  return (
    <section id="about" className="py-0 overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="bubble-section">
          <div className="bubble-content">
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <span className="inline-block bg-primary text-white text-sm font-bold px-3 py-1 rounded-full mb-2">ABOUT US</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Your Garden Transformation Experts</h2>
              <p className="text-accent max-w-2xl mx-auto">
                Local, hands-on landscaping for gardens across Greater Manchester
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12">
              <div className="w-full md:w-5/12 lg:w-1/2 order-2 md:order-1">
                <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-primary/10">
                  <h3 className="text-2xl font-semibold mb-4 text-primary">L&M Landscape Maintenance</h3>
                  <p className="mb-4 text-base md:text-lg text-accent">
                    L&amp;M handles the practical work behind a successful garden project, from clearance and digger excavation through to fencing, paving and final finishes.
                  </p>
                  <p className="mb-6 text-base md:text-lg text-accent">
                    Every job starts with the site in front of us. We focus on sound preparation, tidy workmanship and a finished space that suits how the customer wants to use it.
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
                <div className="relative w-full max-w-xl overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
                  <img
                    src={teamAtWorkImage}
                    alt="L&M team member surveying a completed garden lawn"
                    loading="lazy"
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary via-primary/85 to-transparent px-6 pt-14 pb-5 text-white">
                    <p className="font-semibold text-lg">The right groundwork makes the finish last.</p>
                    <p className="text-sm text-white/85">Checking every detail before handover to the customer.</p>
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
