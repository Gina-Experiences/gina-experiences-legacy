'use client';

import { useState } from 'react';
import ServicesListCard from '@/components/services/services-list-card';
import ServicesFilter from '@/components/services/services-filter';
import { serviceData } from '@/data';

export default function ServicesList() {
    const itemsPerLoad = 12;
    const [visibleItems, setVisibleItems] = useState(itemsPerLoad);
    const [selectedIsland, setSelectedIsland] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const handleIslandChange = (island: string | null) => {
        setSelectedIsland(island);
        setVisibleItems(itemsPerLoad);
    };

    const handleTypeChange = (type: string | null) => {
        setSelectedType(type);
        setVisibleItems(itemsPerLoad);
    };

    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + itemsPerLoad);
    };

    const filteredServices = serviceData.filter((service) => {
        return (
            (!selectedIsland || service.island === selectedIsland) &&
            (!selectedType || service.type === selectedType)
        );
    });

    return (
        <div className="w-full max-w-screen-2xl bg-ginaWhite h-auto p-12 md:p-24 mb-24 shadow-xl flex flex-col items-center justify-center">
            <div className="w-full mb-8 flex items-center justify-end">
                <ServicesFilter
                    onTypeChange={handleTypeChange}
                    onIslandChange={handleIslandChange}
                />
            </div>
            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                {filteredServices
                    .slice(0, visibleItems)
                    .map((service) => (
                        <ServicesListCard
                            key={service.id}
                            service={service}
                        />
                    ))}
            </div>
            {visibleItems < filteredServices.length && (
                <button
                    onClick={handleLoadMore}
                    className="bg-ginaOrange text-ginaWhite py-3 px-8 rounded-xl hover:bg-ginaBlue duration-200"
                >
                    View More
                </button>
            )}
        </div>
    );
}
