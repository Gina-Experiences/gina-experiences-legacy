'use client';

import { useRouter } from "next/navigation";
import ServiceCard from "./services-section-card";
import { serviceData } from '@/data';

const servicesProps = [
    {
        flexDir: 'flex-row',
        serviceName: 'Activities',
        img: '/images/services/activities/activities.png',
        description: 'Our activities offer travelers an authentic journey into the heart of each destination through curated, hands-on adventures.',
    },
    {
        flexDir: 'flex-row-reverse',
        serviceName: 'Hotels',
        img: '/images/services/hotels/hotels.png',
        description: 'From charming boutique hotels and eco-friendly lodges to luxurious resorts, each property is chosen for its comfort, style, and commitment to quality service.',
    },
    {
        flexDir: 'flex-row',
        serviceName: 'Transport',
        img: '/images/services/transport/transport.png',
        description: 'With flexible choices tailored to your schedule and needs, our transportation ensures a smooth experience, allowing you to focus on exploring and enjoying your adventure without the hassle.',
    },
    {
        flexDir: 'flex-row-reverse',
        serviceName: 'Events',
        img: '/images/services/events/events.png',
        description: 'Our commitment to local partnerships and sustainable practices means that each event not only captivates guests but also supports the community and preserves the environment.',
    },
];

export default function ServicesSection() {
    const router = useRouter();

    const handleViewMore = (serviceName: string) => {
        router.push(`/services/${serviceName.toLowerCase()}`);
    };

    return (
        <div className="max-w-screen-2xl flex flex-col space-y-12 p-8 bg-ginaWhite">
            {servicesProps.map((service, index) => (
                <div
                    key={index}
                    className={`flex flex-col lg:${service.flexDir} justify-center items-center p-8 bg-ginaWhite`}
                >
                    <div className="relative max-w-screen-sm lg:w-1/2 flex flex-col justify-center bg-ginaWhite lg:p-8 overflow-hidden">
                        <img
                            src={service.img}
                            alt={`${service.serviceName} Banner`}
                            className="md:p-8 lg:p-0 rounded-3xl object-cover object-center"
                        />
                        <div className="absolute inset-0 flex flex-col items-start justify-end text-ginaWhite z-10 p-8 md:p-24">
                            <h3 className="text-2xl lg:text-3xl font-semibold my-2">
                                {service.serviceName.toUpperCase()}
                            </h3>
                            <p>{service.description}</p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:w-1/2 items-center text-center lg:text-start mx-12 my-6 space-y-4">
                        <div className="hidden md:flex flex-col">
                            {serviceData.slice(0, 2).map((exp) => (
                                <ServiceCard key={exp.id} service={exp} />
                            ))}
                        </div>
                        <button
                            onClick={() => router.push(`/services/${service.serviceName.toLowerCase()}`)}
                            className="px-8 py-2 rounded-xl bg-ginaOrange text-white font-medium shadow-md"
                        >
                            View More!
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
