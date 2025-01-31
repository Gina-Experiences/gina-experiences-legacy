import Image from 'next/image';
import {
    Hero,
    ServicesSection
} from '@/components/services';

export default function Services() {
    return (
        <div className="flex flex-col items-center justify-center w-svw text-ginaBlack">
            <Hero />
            <ServicesSection />
        </div>
    );
}
