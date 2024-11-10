'use client';

import { useState } from 'react';
import ExperienceCard from '@/components/experiences/experience-card';
import ExperienceFilter from '@/components/experiences/experience-filter';
import { experienceData } from '@/data';

export default function ExperiencesList() {
    const itemsPerLoad = 12;
    const [visibleItems, setVisibleItems] = useState(itemsPerLoad);
    const [selectedIsland, setSelectedIsland] = useState<string | null>(null);

    const handleIslandChange = (island: string | null) => {
        setSelectedIsland(island);
        setVisibleItems(itemsPerLoad);
    };

    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + itemsPerLoad);
    };

    const filteredExperiences = selectedIsland
        ? experienceData.filter(
              (experience) => experience.island === selectedIsland
          )
        : experienceData;

    return (
        <div className="w-full max-w-screen-2xl bg-ginaWhite h-auto p-12 md:p-24 mb-24 shadow-xl flex flex-col items-center justify-center">
            <div className="w-full mb-8 flex items-center justify-end">
                <ExperienceFilter onIslandChange={handleIslandChange} />
            </div>
            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                {filteredExperiences
                    .slice(0, visibleItems)
                    .map((experience) => (
                        <ExperienceCard
                            key={experience.id}
                            experience={experience}
                        />
                    ))}
            </div>
            {visibleItems < filteredExperiences.length && (
                <button
                    onClick={handleLoadMore}
                    className="bg-ginaOrange text-ginaWhite py-3 px-8 rounded-xl hover:bg-ginaBlue duration-200"
                >
                    Load More
                </button>
            )}
        </div>
    );
}
