
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scrolling effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling for anchor links
  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#home" className="text-2xl font-display font-bold text-brand-blue">
            Precision Drywall
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <button 
              onClick={() => scrollToSection('home')} 
              className={cn(
                'font-medium transition-colors',
                isScrolled ? 'text-brand-darkBlue hover:text-brand-blue' : 'text-white hover:text-gray-300'
              )}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className={cn(
                'font-medium transition-colors',
                isScrolled ? 'text-brand-darkBlue hover:text-brand-blue' : 'text-white hover:text-gray-300'
              )}
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className={cn(
                'font-medium transition-colors',
                isScrolled ? 'text-brand-darkBlue hover:text-brand-blue' : 'text-white hover:text-gray-300'
              )}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className={cn(
                'font-medium transition-colors',
                isScrolled ? 'text-brand-darkBlue hover:text-brand-blue' : 'text-white hover:text-gray-300'
              )}
            >
              Contact
            </button>
          </div>
          <div className="hidden lg:flex items-center space-x-2">
            <Phone size={18} className={isScrolled ? 'text-brand-blue' : 'text-white'} />
            <span className={cn(
              'font-medium',
              isScrolled ? 'text-brand-darkBlue' : 'text-white'
            )}>
              (734) 555-1234
            </span>
          </div>
          <Button 
            onClick={() => scrollToSection('contact')} 
            className="btn-primary"
          >
            Get a Quote
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className={isScrolled ? 'text-brand-darkBlue' : 'text-white'} size={28} />
          ) : (
            <Menu className={isScrolled ? 'text-brand-darkBlue' : 'text-white'} size={28} />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('home')} 
              className="font-medium text-brand-darkBlue hover:text-brand-blue py-2"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="font-medium text-brand-darkBlue hover:text-brand-blue py-2"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="font-medium text-brand-darkBlue hover:text-brand-blue py-2"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="font-medium text-brand-darkBlue hover:text-brand-blue py-2"
            >
              Contact
            </button>
            <div className="flex items-center py-2">
              <Phone size={18} className="text-brand-blue mr-2" />
              <span className="font-medium text-brand-darkBlue">
                (734) 555-1234
              </span>
            </div>
            <Button 
              onClick={() => scrollToSection('contact')} 
              className="btn-primary w-full justify-center"
            >
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
