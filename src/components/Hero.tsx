
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="bg-hero h-screen flex items-center justify-center text-white">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in">
          Precision Drywall Services
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Professional drywall installation and repair serving Livonia, Michigan and surrounding areas
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button 
            onClick={scrollToContact} 
            className="btn-primary text-lg group"
          >
            Get a Free Quote
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Button>
          <Button 
            variant="outline" 
            onClick={() => {
              const element = document.getElementById('services');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-brand-darkBlue transition-all text-lg"
          >
            Our Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
