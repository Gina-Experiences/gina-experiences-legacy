import Image from 'next/image';
import {
    ServicesHero,
    ServicesSection
} from '@/components/services';

export default function Services() {
    return (
        <div className="flex flex-col items-center justify-center w-svw text-ginaBlack">
            <ServicesHero />
            <ServicesSection />
        </div>
    );
}
