
import React, { useEffect, useRef } from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import ServiceAreas from './ServiceAreas';

const Contact: React.FC = () => {
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
        <section id="contact" ref={sectionRef} className="section-padding bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 animate-on-scroll">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-brand-darkBlue">Contact Us</h2>
                    <div className="w-20 h-1 bg-brand-blue mx-auto mb-6"></div>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Have a project in mind? Get in touch with us today for a free consultation and estimate.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <ContactForm />
                    <div className="animate-on-scroll space-y-8">
                        <ContactInfo />
                        <ServiceAreas />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
