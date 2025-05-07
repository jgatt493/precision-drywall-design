
import React, { useRef, useState, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send, Paperclip, Camera } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { formatPhoneNumber } from '@/utils/formatters';

const EDGE_FUNCTION_ENDPOINT = 'https://oodtywkclflclzeuctgu.supabase.co/functions/v1/super-endpoint';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const ContactForm: React.FC = () => {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [attachment, setAttachment] = useState<File | null>(null);

    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        if (name === 'phone') {
            // Apply formatting to phone number
            setFormData(prev => ({ ...prev, [name]: formatPhoneNumber(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAttachment(e.target.files[0]);
            toast({
                title: "File Attached",
                description: `${e.target.files[0].name} will be sent with your message.`,
            });
        }
    };

    const handleCameraClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = 'image/*';
            fileInputRef.current.capture = 'environment';
            fileInputRef.current.click();
        }
    };

    const handleFileUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = '*/*';
            fileInputRef.current.removeAttribute('capture');
            fileInputRef.current.click();
        }
    };

    const handleRemoveAttachment = () => {
        setAttachment(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Create FormData object to handle file attachments
            const messageFormData = new FormData();
            messageFormData.append('name', formData.name);
            messageFormData.append('email', formData.email);
            if (formData.phone) messageFormData.append('phone', formData.phone);
            messageFormData.append('message', formData.message);
            
            // Add file if present
            if (attachment) {
                messageFormData.append('attachment', attachment);
            }

            console.log('Sending request to:', EDGE_FUNCTION_ENDPOINT);
            
            const response = await fetch(EDGE_FUNCTION_ENDPOINT, {
                method: 'POST',
                body: messageFormData,
                credentials: 'omit',
            });

            console.log('Response status:', response.status);
            
            if (!response.ok) {
                let errorMsg = 'Failed to send message';
                try {
                    const errorData = await response.json();
                    console.log('Error data:', errorData);
                    errorMsg = errorData.error || errorMsg;
                } catch (err) { 
                    console.error('Error parsing error response:', err);
                }
                throw new Error(errorMsg);
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
            setAttachment(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            
        } catch (error) {
            console.error('Error sending message:', error);
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Failed to send message. Please try again later.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card className="border-none shadow-lg animate-on-scroll">
            <CardContent className="p-8">
                <h3 className="text-2xl font-display font-bold mb-6 text-brand-darkBlue">Send Us a Message</h3>

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
                                <Label htmlFor="phone">Phone Number (Optional)</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    placeholder="(123) 456-7890"
                                    value={formData.phone}
                                    onChange={handleChange}
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
                        
                        <div className="space-y-2">
                            <Label>Attachments (Optional)</Label>
                            <div className="flex flex-col space-y-2">
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    onChange={handleFileChange}
                                />
                                
                                <div className="flex space-x-2">
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        className="flex items-center text-brand-blue"
                                        onClick={handleFileUploadClick}
                                    >
                                        <Paperclip className="mr-2 h-4 w-4" />
                                        Upload File
                                    </Button>
                                    
                                    <Button 
                                        type="button" 
                                        variant="outline"
                                        className="flex items-center text-brand-blue"
                                        onClick={handleCameraClick}
                                    >
                                        <Camera className="mr-2 h-4 w-4" />
                                        Take Picture
                                    </Button>
                                </div>
                                
                                {attachment && (
                                    <div className="flex items-center justify-between bg-gray-50 p-2 rounded-md mt-2">
                                        <div className="text-sm text-gray-700 truncate">
                                            {attachment.name}
                                        </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleRemoveAttachment}
                                            className="text-gray-500 hover:text-red-500"
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="btn-primary w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        <Send className="ml-2 h-4 w-4" />
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default ContactForm;
