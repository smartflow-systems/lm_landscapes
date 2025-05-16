import { useState, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  // Close mobile menu when a link is clicked
  const handleNavLinkClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={cn(
        "fixed w-full z-50 transition-all duration-300",
        isScrolled ? "bg-primary shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo Container */}
          <div className="h-14 w-14 rounded-full overflow-hidden">
            <img 
              src="/attached_assets/IMG_20250516_183911_615.jpg" 
              alt="L&M Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-3">
            <h1 className="text-white font-bold text-xl" style={{ fontFamily: 'Montserrat, sans-serif' }}>L&M</h1>
            <p className="text-white text-xs uppercase tracking-wider" style={{ fontFamily: 'Open Sans, sans-serif' }}>Landscape Maintenance</p>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 text-white">
          <a href="#home" className="hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>Home</a>
          <a href="#services" className="hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>Services</a>
          <a href="#about" className="hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>About</a>
          <a href="#gallery" className="hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>Gallery</a>
          <a href="#testimonials" className="hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>Testimonials</a>
          <a href="#contact" className="hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>Contact</a>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <i className="fas fa-bars text-2xl"></i>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={cn("md:hidden bg-primary text-white", isMobileMenuOpen ? "block" : "hidden")}>
        <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
          <a href="#home" className="py-2 hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>Home</a>
          <a href="#services" className="py-2 hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>Services</a>
          <a href="#about" className="py-2 hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>About</a>
          <a href="#gallery" className="py-2 hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>Gallery</a>
          <a href="#testimonials" className="py-2 hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>Testimonials</a>
          <a href="#contact" className="py-2 hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
