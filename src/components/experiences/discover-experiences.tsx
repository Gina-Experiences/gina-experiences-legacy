'use client';

import { useState, useEffect } from 'react';
import ExperienceCard from '@/components/experiences/experience-card';
import { experienceData } from '@/data';

export default function DiscoverExperiences() {
    const itemsPerLoad = 4;
    const [visibleItems, setVisibleItems] = useState(itemsPerLoad);
    const [randomizedExperiences, setRandomizedExperiences] =
        useState(experienceData);

    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + itemsPerLoad);
    };

    useEffect(() => {
        setRandomizedExperiences(
            [...experienceData].sort(() => Math.random() - 0.5)
        );
    }, []);

    return (
        <div className="w-full max-w-screen-2xl h-auto p-8 flex flex-col justify-center mb-16">
            <div className="px-8 lg:px-32">
                <span
                    className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
                    style={{
                        backgroundImage:
                            'linear-gradient(to right, #FFD100, #00A04B, #1B1464, #F6931D)',
                    }}
                >
                    Discover More Experiences
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 my-16">
                    {randomizedExperiences
                        .slice(0, visibleItems)
                        .map((experience) => (
                            <ExperienceCard
                                key={experience.id}
                                experience={experience}
                            />
                        ))}
                </div>
            </div>
            <div className="w-full flex justify-center">
                {visibleItems < experienceData.length && (
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
