
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Check, Phone } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
    
    return () => elements.forEach(el => observer.unobserve(el));
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" ref={sectionRef} className="section-padding">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-brand-darkBlue">About Precision Drywall</h2>
            <div className="w-20 h-1 bg-brand-blue mb-6"></div>
            <p className="text-lg text-gray-600 mb-6">
              Precision Drywall is a professional drywall company serving Livonia, Michigan and surrounding communities. With years of experience in the industry, we specialize in providing high-quality drywall installation, repair, and finishing services for both residential and commercial clients.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our team of skilled professionals is committed to delivering exceptional results on every project, big or small. We take pride in our attention to detail, timely service, and competitive pricing.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start">
                <Check className="h-6 w-6 text-brand-blue mr-2 mt-0.5" />
                <span className="text-gray-700">Licensed & Insured</span>
              </div>
              <div className="flex items-start">
                <Check className="h-6 w-6 text-brand-blue mr-2 mt-0.5" />
                <span className="text-gray-700">Experienced Team</span>
              </div>
              <div className="flex items-start">
                <Check className="h-6 w-6 text-brand-blue mr-2 mt-0.5" />
                <span className="text-gray-700">Quality Materials</span>
              </div>
              <div className="flex items-start">
                <Check className="h-6 w-6 text-brand-blue mr-2 mt-0.5" />
                <span className="text-gray-700">Competitive Pricing</span>
              </div>
              <div className="flex items-start">
                <Check className="h-6 w-6 text-brand-blue mr-2 mt-0.5" />
                <span className="text-gray-700">Timely Completion</span>
              </div>
              <div className="flex items-start">
                <Check className="h-6 w-6 text-brand-blue mr-2 mt-0.5" />
                <span className="text-gray-700">Client Satisfaction</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={scrollToContact} 
                className="btn-primary"
              >
                Contact Us
              </Button>
              <div className="flex items-center">
                <div className="bg-brand-blue/10 p-3 rounded-full mr-3">
                  <Phone className="h-6 w-6 text-brand-blue" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Call us anytime</p>
                  <p className="text-lg font-semibold text-brand-darkBlue">(734) 555-1234</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-on-scroll">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/about-img.jpg" 
                alt="Precision Drywall team at work" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-brand-blue/10 rounded-lg -z-10"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-blue/10 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
