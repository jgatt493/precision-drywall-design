
import React from 'react';

const ServiceAreas: React.FC = () => {
    const areas = [
        "Livonia", 
        "Plymouth", 
        "Northville", 
        "Westland", 
        "Canton", 
        "Farmington Hills"
    ];

    return (
        <div className="mt-8">
            <h3 className="text-2xl font-display font-bold mb-6 text-brand-darkBlue">Service Areas</h3>
            <p className="text-lg text-gray-600 mb-4">
                We proudly serve Livonia and the following areas:
            </p>

            <div className="grid grid-cols-2 gap-2">
                {areas.map((area) => (
                    <div key={area} className="bg-brand-blue/5 py-2 px-4 rounded">
                        <p className="text-brand-darkBlue">{area}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceAreas;
