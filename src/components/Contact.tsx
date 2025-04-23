
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact = () => {
    const { toast } = useToast();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {threshold: 0.1});

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.observe(el));

        return () => elements.forEach(el => observer.unobserve(el));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // NEW: Call Supabase Edge Function (instead of /api/contact)
            const response = await fetch('/functions/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            toast({
                title: "Message Sent!",
                description: "We'll get back to you as soon as possible.",
            });

            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            });
        } catch (error) {
            console.error('Error sending message:', error);
            toast({
                title: "Error",
                description: "Failed to send message. Please try again later.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                    <Card className="border-none shadow-lg animate-on-scroll">
                        <CardContent className="p-8">
                            <h3 className="text-2xl font-display font-bold mb-6 text-brand-darkBlue">Send Us a
                                Message</h3>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Your Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                placeholder="(123) 456-7890"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Your Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Tell us about your project..."
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="btn-primary w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                    <Send className="ml-2 h-4 w-4"/>
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <div className="animate-on-scroll space-y-8">
                        <div>
                            <h3 className="text-2xl font-display font-bold mb-6 text-brand-darkBlue">Contact
                                Information</h3>
                            <p className="text-lg text-gray-600 mb-8">
                                Feel free to reach out to us with any questions or to schedule a consultation.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <div className="bg-brand-blue/10 p-3 rounded-full mr-4">
                                        <Phone className="h-6 w-6 text-brand-blue"/>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-brand-darkBlue mb-1">Phone Number</h4>
                                        <p className="text-gray-600">(734) 555-1234</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-brand-blue/10 p-3 rounded-full mr-4">
                                        <Mail className="h-6 w-6 text-brand-blue"/>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-brand-darkBlue mb-1">Email Address</h4>
                                        <p className="text-gray-600">info@precisiondrywall.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="bg-brand-blue/10 p-3 rounded-full mr-4">
                                        <Clock className="h-6 w-6 text-brand-blue"/>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-brand-darkBlue mb-1">Response Time</h4>
                                        <p className="text-gray-600">If we are unable to take your call, we will respond
                                            as soon as possible.</p>
                                        <p className="text-gray-600">Email response within 24 hours.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-2xl font-display font-bold mb-6 text-brand-darkBlue">Service Areas</h3>
                            <p className="text-lg text-gray-600 mb-4">
                                We proudly serve Livonia and the following areas:
                            </p>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-brand-blue/5 py-2 px-4 rounded">
                                    <p className="text-brand-darkBlue">Livonia</p>
                                </div>
                                <div className="bg-brand-blue/5 py-2 px-4 rounded">
                                    <p className="text-brand-darkBlue">Plymouth</p>
                                </div>
                                <div className="bg-brand-blue/5 py-2 px-4 rounded">
                                    <p className="text-brand-darkBlue">Northville</p>
                                </div>
                                <div className="bg-brand-blue/5 py-2 px-4 rounded">
                                    <p className="text-brand-darkBlue">Westland</p>
                                </div>
                                <div className="bg-brand-blue/5 py-2 px-4 rounded">
                                    <p className="text-brand-darkBlue">Canton</p>
                                </div>
                                <div className="bg-brand-blue/5 py-2 px-4 rounded">
                                    <p className="text-brand-darkBlue">Farmington Hills</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
