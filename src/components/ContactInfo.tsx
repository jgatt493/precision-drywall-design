
import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';

const ContactInfo: React.FC = () => {
    return (
        <div>
            <h3 className="text-2xl font-display font-bold mb-6 text-brand-darkBlue">Contact Information</h3>
            <p className="text-lg text-gray-600 mb-8">
                Feel free to reach out to us with any questions or to schedule a consultation.
            </p>

            <div className="space-y-6">
                <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-3 rounded-full mr-4">
                        <Phone className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-brand-darkBlue mb-1">Phone Number</h4>
                        <p className="text-gray-600">(734) 555-1234</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-3 rounded-full mr-4">
                        <Mail className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-brand-darkBlue mb-1">Email Address</h4>
                        <p className="text-gray-600">support@precisiondrywall.com</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <div className="bg-brand-blue/10 p-3 rounded-full mr-4">
                        <Clock className="h-6 w-6 text-brand-blue" />
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
    );
};

export default ContactInfo;
