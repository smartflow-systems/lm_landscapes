const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-8 sm:pt-16 pb-8 overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center border-2 border-yellow-400">
                <i className="fas fa-leaf text-primary text-xl"></i>
              </div>
              <div className="ml-3">
                <h3 className="font-bold text-xl">L&M</h3>
                <p className="text-xs uppercase tracking-wider">Landscape Maintenance</p>
              </div>
            </div>
            <p className="mb-4">Professional landscaping services to transform and maintain your outdoor spaces.</p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61565799111726" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400 transition-colors text-xl" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/l_m__landscape_maintenance_/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400 transition-colors text-xl" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.tiktok.com/@l_m_landscape_maintenance" target="_blank" rel="noopener noreferrer" className="text-white hover:text-yellow-400 transition-colors text-xl" aria-label="TikTok">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#home" className="hover:text-yellow-400 transition-colors duration-300">Home</a></li>
              <li><a href="#services" className="hover:text-yellow-400 transition-colors duration-300">Services</a></li>
              <li><a href="#about" className="hover:text-yellow-400 transition-colors duration-300">About Us</a></li>
              <li><a href="#gallery" className="hover:text-yellow-400 transition-colors duration-300">Gallery</a></li>
              <li><a href="#testimonials" className="hover:text-yellow-400 transition-colors duration-300">Testimonials</a></li>
              <li><a href="#contact" className="hover:text-yellow-400 transition-colors duration-300">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="https://www.instagram.com/p/DJtp5FvMksn/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors duration-300">Digger & Driver Hire</a></li>
              <li><a href="https://www.instagram.com/stories/highlights/18006545084768921/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors duration-300">Fencing & Decking</a></li>
              <li><a href="#services" className="hover:text-yellow-400 transition-colors duration-300">Outdoor Lighting</a></li>
              <li><a href="https://www.instagram.com/stories/highlights/18033943826658480/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors duration-300">Garden Maintenance</a></li>
              <li><a href="https://www.instagram.com/stories/highlights/18012124910744438/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors duration-300">Landscape Design</a></li>
              <li><a href="https://www.instagram.com/stories/highlights/18042049373557435/" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400 transition-colors duration-300">Driveways & Patios</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-xl mb-6">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <i className="fas fa-phone mr-3 text-yellow-400"></i>
                <span>07542 331 653</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-yellow-400"></i>
                <span>info@landmlandscapes.co.uk</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-map-marker-alt mr-3 text-yellow-400"></i>
                <span>Manchester Failsworth</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-clock mr-3 text-yellow-400"></i>
                <span>Mon-Sat: 8am-6pm</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-accent pt-8 text-center">
          <p>&copy; {currentYear} L&M Landscape Maintenance. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
