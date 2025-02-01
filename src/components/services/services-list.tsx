'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import ServicesListCard from './services-list-card';
import ServicesFilter from './services-filter';
import { serviceData } from '@/data';

export default function ServicesList() {
    const itemsPerLoad = 12;
    const [visibleItems, setVisibleItems] = useState(itemsPerLoad);
    const [selectedIsland, setSelectedIsland] = useState<string | null>(null);

    const { serviceName } = useParams();

    const handleIslandChange = (island: string | null) => {
        setSelectedIsland(island);
        setVisibleItems(itemsPerLoad);
    };

    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + itemsPerLoad);
    };

    const filteredServices = selectedIsland
        ? serviceData.filter((service) => service.island === selectedIsland)
        : serviceData;

    return (
        <div className="max-w-screen-2xl flex flex-col space-y-12 p-8 my-8 bg-ginaWhite">
            <div className="w-full max-w-screen-2xl bg-ginaWhite h-auto p-12 md:p-24 mb-24 shadow-xl flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-between py-4">
                    <h1 className="text-4xl font-bold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)22%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">
                        Discover {typeof serviceName === 'string'
                            ? serviceName.charAt(0).toUpperCase() + serviceName.slice(1)
                            : ''}
                    </h1>
                    <div className="">
                        <ServicesFilter onIslandChange={handleIslandChange} />
                    </div>
                </div>
                <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                    {filteredServices.slice(0, visibleItems).map((service) => (
                        <ServicesListCard key={service.id} service={service} />
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
        </div>
    );
}
