
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import { Helmet } from 'react-helmet';

const Index = () => {
  // Animation handler for scroll animations
  useEffect(() => {
    // Add placeholder image URLs as global variables
    const images = {
      heroBg: '/hero-bg.jpg',
      aboutImg: '/about-img.jpg'
    };

    // Create intersection observer for animation on scroll
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, { 
      threshold: 0.1 
    });
    
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
    
    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Structured data for local business
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": "Precision Drywall",
    "image": [
      "https://precisiondrywall.com/hero-bg.jpg",
      "https://precisiondrywall.com/about-img.jpg"
    ],
    "@id": "https://precisiondrywall.com",
    "url": "https://precisiondrywall.com",
    "telephone": "(734) 555-1234",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main Street",
      "addressLocality": "Livonia",
      "addressRegion": "MI",
      "postalCode": "48150",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.3680,
      "longitude": -83.3732
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/precisiondrywall",
      "https://www.instagram.com/precisiondrywall",
      "https://twitter.com/precision_drywall"
    ],
    "priceRange": "$$",
    "servesCuisine": "Drywall Installation and Repair",
    "areaServed": [
      {
        "@type": "City",
        "name": "Livonia"
      },
      {
        "@type": "City",
        "name": "Dearborn"
      },
      {
        "@type": "City",
        "name": "Farmington Hills"
      },
      {
        "@type": "City",
        "name": "Redford"
      },
      {
        "@type": "City",
        "name": "Northville"
      },
      {
        "@type": "City",
        "name": "Plymouth"
      },
      {
        "@type": "City",
        "name": "Canton"
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Precision Drywall Services | Professional Drywall Installation & Repair in Livonia, MI</title>
        <meta name="description" content="Top-rated drywall contractor serving Livonia, Dearborn, Farmington Hills, Plymouth, Canton, and surrounding areas. Professional installation, repairs, and finishing." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
