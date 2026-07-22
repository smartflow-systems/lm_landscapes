import { useState, useEffect, useCallback } from 'react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';
import logoImage from '@assets/Screenshot_2026-07-22_185747_1784753102193.png';
import { SiWhatsapp, SiInstagram, SiFacebook } from 'react-icons/si';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

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
      <div className="container mx-auto px-3 sm:px-4 py-2 sm:py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-14 w-14 rounded-full overflow-hidden">
            <img
              src={logoImage}
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
        <div className="hidden md:flex items-center space-x-6 text-white">
          <a href="#home" className="hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>Home</a>
          <a href="#services" className="hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>Services</a>
          <a href="#about" className="hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>About</a>
          <a href="#gallery" className="hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>Gallery</a>
          <a href="#testimonials" className="hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>Testimonials</a>
          <a href="#contact" className="hover:text-yellow-400 transition-colors duration-300" onClick={handleNavLinkClick}>Contact</a>

          {/* Social icons */}
          <div className="flex items-center space-x-2 border-l border-white/30 pl-4">
            <a
              href="https://wa.me/447542331653"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-white hover:text-green-400 transition-colors duration-300"
            >
              <SiWhatsapp size={22} />
            </a>
            <a
              href="https://www.instagram.com/landmlandscapes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white hover:text-pink-400 transition-colors duration-300"
            >
              <SiInstagram size={22} />
            </a>
            <a
              href="https://www.facebook.com/landmlandscapes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white hover:text-blue-400 transition-colors duration-300"
            >
              <SiFacebook size={22} />
            </a>
          </div>

          <div className="flex space-x-3">
            <Link href="/booking">
              <button className="bg-yellow-500 text-green-800 px-4 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-all duration-300 shadow-md">
                Book Now
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-white text-green-600 px-4 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:text-green-800 transition-all duration-300 shadow-md">
                Client Portal
              </button>
            </Link>
          </div>
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
      <div className={cn("md:hidden bg-primary text-white shadow-lg transition-all duration-300", isMobileMenuOpen ? "block" : "hidden")}>
        <div className="container mx-auto px-4 py-4 flex flex-col">
          <a href="#home" className="py-4 text-center text-lg border-b border-green-800 hover:text-yellow-400 hover:bg-green-800/30 transition-all duration-300 touch-manipulation" onClick={handleNavLinkClick}>Home</a>
          <a href="#services" className="py-4 text-center text-lg border-b border-green-800 hover:text-yellow-400 hover:bg-green-800/30 transition-all duration-300 touch-manipulation" onClick={handleNavLinkClick}>Services</a>
          <a href="#about" className="py-4 text-center text-lg border-b border-green-800 hover:text-yellow-400 hover:bg-green-800/30 transition-all duration-300 touch-manipulation" onClick={handleNavLinkClick}>About</a>
          <a href="#gallery" className="py-4 text-center text-lg border-b border-green-800 hover:text-yellow-400 hover:bg-green-800/30 transition-all duration-300 touch-manipulation" onClick={handleNavLinkClick}>Gallery</a>
          <a href="#testimonials" className="py-4 text-center text-lg border-b border-green-800 hover:text-yellow-400 hover:bg-green-800/30 transition-all duration-300 touch-manipulation" onClick={handleNavLinkClick}>Testimonials</a>
          <a href="#contact" className="py-4 text-center text-lg border-b border-green-800 hover:text-yellow-400 hover:bg-green-800/30 transition-all duration-300 touch-manipulation" onClick={handleNavLinkClick}>Contact</a>

          {/* Mobile social icons */}
          <div className="flex justify-center space-x-6 py-4 border-b border-green-800">
            <a
              href="https://wa.me/447542331653"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-white hover:text-green-400 transition-colors duration-300"
            >
              <SiWhatsapp size={28} />
            </a>
            <a
              href="https://www.instagram.com/landmlandscapes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white hover:text-pink-400 transition-colors duration-300"
            >
              <SiInstagram size={28} />
            </a>
            <a
              href="https://www.facebook.com/landmlandscapes"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-white hover:text-blue-400 transition-colors duration-300"
            >
              <SiFacebook size={28} />
            </a>
          </div>

          <div className="flex flex-col space-y-3 mt-4">
            <Link href="/booking">
              <button className="bg-yellow-500 text-green-800 px-4 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-all duration-300 shadow-md w-full touch-manipulation" onClick={handleNavLinkClick}>
                Book Now
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-white text-green-600 px-4 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:text-green-800 transition-all duration-300 shadow-md w-full touch-manipulation" onClick={handleNavLinkClick}>
                Client Portal
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
