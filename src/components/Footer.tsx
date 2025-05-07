
import React from 'react';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-brand-darkBlue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Precision Drywall</h3>
            <p className="mb-6 text-gray-300">
              Professional drywall installation and repair services in Livonia, Michigan and surrounding areas.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('home')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">Drywall Installation</li>
              <li className="text-gray-300">Drywall Repair</li>
              <li className="text-gray-300">Ceiling Textures</li>
              <li className="text-gray-300">Taping & Finishing</li>
              <li className="text-gray-300">Basement Finishing</li>
              <li className="text-gray-300">Commercial Services</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-6">Contact Information</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-blue mr-3 mt-0.5" />
                <span className="text-gray-300">123 Main Street, Livonia, MI 48150</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-brand-blue mr-3" />
                <span className="text-gray-300">(248) 802-6533</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-brand-blue mr-3" />
                <span className="text-gray-300">info@precisiondrywall.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Precision Drywall. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
