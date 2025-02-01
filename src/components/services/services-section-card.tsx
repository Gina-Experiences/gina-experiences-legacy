'use client';

import { useRouter } from 'next/navigation';
import { Service } from '@/types/service';
import Image from "next/image";

interface ServiceCardProps {
    service: Service;
}

export default function ServiceSectionCard({ service }: ServiceCardProps) {
    const router = useRouter();

    const handleBookNowClick = () => {
        router.push(`/experiences/${service.id}`);
    };

    return (
        <div className="flex flex-col items-center lg:flex-row bg-white rounded-3xl shadow-xl overflow-hidden my-4">
            <Image
            src={service.image}
            alt={service.title}
            quality={100}
            width={500}
            height={500}
            className="rounded-3xl h-auto lg:w-1/2 p-4"
            />
            <div className="w-full p-4">
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="text-gray-600">{service.location}</p>
                <span className="text-ginaOrange font-medium flex flex-col justify-center">
                    {service.price}
                </span>
                <div className="flex items-center justify-end mt-4">
                    <button
                        className="bg-ginaYellow text-ginaWhite rounded-xl py-2 px-6 hover:bg-ginaGreen duration-200"
                        onClick={handleBookNowClick}
                    >
                        Book now
                    </button>
                </div>
            </div>
        </div>
    );
}
