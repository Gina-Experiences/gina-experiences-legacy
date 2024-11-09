import Image from 'next/image';
import { ExperiencesHero, ExperiencesList } from '@/components/experiences';

export default function About() {
    return (
        <div className="flex flex-col items-center justify-center w-svw text-ginaBlack">
            <ExperiencesHero />
            <ExperiencesList />
        </div>
    );
}
