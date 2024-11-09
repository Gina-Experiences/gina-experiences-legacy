import Image from 'next/image';
import {
    AboutHero,
    AboutGina,
    AboutMV,
    AboutExperiences,
    AboutTeam,
} from '@/components/about';

export default function About() {
    return (
        <div className="flex flex-col items-center justify-center w-svw text-ginaBlack">
            <AboutHero />
            <AboutGina />
            <AboutMV />
            <AboutExperiences />
            <AboutTeam />
        </div>
    );
}
