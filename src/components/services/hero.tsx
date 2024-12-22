import Image from 'next/image';

export default function Hero() {
    return (
        <div className="flex flex-col items-center justify-center w-svw mb-28">
            <div className="w-full max-w-screen-2xl h-svh p-8">
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                    <img
                        src="/images/services/hero/hero-banner.jpg"
                        alt="Services Hero Banner"
                        className="rounded-3xl w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ginaGreen w-full h-full rounded-3xl"></div>
                    <div className="absolute inset-0 w-full h-full flex flex-col items-start justify-end text-ginaWhite space-y-4 lg:space-y-8 p-8 md:p-24 ">
                        <span className="text-3xl lg:text-6xl font-bold">
                            Services
                        </span>
                        <span className="text-sm lg:text-xl">
                            Gina Experiences offers a unique blend of local
                            adventures and cultural immersion activities
                            designed to connect travelers with the authentic
                            pulse of each destination. Our services include
                            personalized tours, workshops, and exclusive
                            experiences that showcase the local heritage,
                            artistry, and natural wonders. From guided cultural
                            walks and hands-on craft workshops to culinary
                            experiences and eco-friendly nature excursions, Gina
                            Experiences provides thoughtfully curated adventures
                            led by passionate, knowledgeable locals.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
