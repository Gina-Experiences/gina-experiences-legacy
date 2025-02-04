import { ServicesHero, ServicesList } from "@/components/services";
import Image from 'next/image';

export default function ServicesListPage() {
    return (
        <div className="flex flex-col items-center justify-center w-svw text-ginaBlack">
            <ServicesHero />
            <ServicesList />
        </div>
    );
}