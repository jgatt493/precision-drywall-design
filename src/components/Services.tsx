
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Icons for services
import { 
  PanelTop, 
  Home, 
  PaintRoller, 
  Hammer, 
  LayoutGrid, 
  Construction 
} from 'lucide-react';

const servicesList = [
  {
    icon: <PanelTop className="h-10 w-10 text-brand-blue" />,
    title: 'Drywall Installation',
    description: 'Professional installation of drywall for new construction, renovations, and additions.'
  },
  {
    icon: <Hammer className="h-10 w-10 text-brand-blue" />,
    title: 'Drywall Repair',
    description: 'Expert repairs for holes, water damage, and cracks in existing drywall surfaces.'
  },
  {
    icon: <LayoutGrid className="h-10 w-10 text-brand-blue" />,
    title: 'Ceiling Textures',
    description: 'Custom ceiling textures including popcorn, knockdown, and orange peel finishes.'
  },
  {
    icon: <PaintRoller className="h-10 w-10 text-brand-blue" />,
    title: 'Taping & Finishing',
    description: 'Professional taping, mudding, and finishing services for seamless walls and ceilings.'
  },
  {
    icon: <Home className="h-10 w-10 text-brand-blue" />,
    title: 'Basement Finishing',
    description: 'Complete basement finishing services including framing, drywall, and finishing.'
  },
  {
    icon: <Construction className="h-10 w-10 text-brand-blue" />,
    title: 'Commercial Services',
    description: 'Commercial drywall installation and repairs for offices, retail spaces, and more.'
  }
];

const Services = () => {
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

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-brand-darkBlue">Our Services</h2>
          <div className="w-20 h-1 bg-brand-blue mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide professional drywall installation, repair, and finishing services for both residential and commercial clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <Card 
              key={index}
              className={cn(
                "border-none shadow-lg animate-on-scroll hover-scale",
              )}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CardHeader className="pb-2">
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl font-display text-brand-darkBlue">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
