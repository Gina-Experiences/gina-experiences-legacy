'use client';

import { IdExperience, DiscoverExperiences } from '@/components/experiences';

export default function ExperiencePage() {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <IdExperience />
            <DiscoverExperiences />
        </div>
    );
}
