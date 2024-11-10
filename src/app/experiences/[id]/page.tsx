'use client';

import { useParams } from 'next/navigation';
import { experienceData } from '@/data';

export default function ExperiencePage() {
    const params = useParams();
    const experienceId = params?.id?.toString();

    const experience = experienceId
        ? experienceData.find((exp) => exp.id === parseInt(experienceId))
        : null;

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">{experience.title}</h1>
            <p>{experience.location}</p>
            <p>{experience.price}</p>
            <img src={experience.image} alt={experience.title} />
        </div>
    );
}
