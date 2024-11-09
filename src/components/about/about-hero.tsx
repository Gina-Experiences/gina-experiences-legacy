import Image from 'next/image';

export default function AboutHero() {
    return (
        <div className="flex flex-col items-center justify-center w-svw mb-36 md:mb-0">
            <div className="w-full max-w-screen-2xl h-svh p-8">
                <div className="w-full h-full md:h-5/6 bg-[url('/images/about/hero-mission.jpg')] bg-cover bg-center rounded-3xl flex flex-col items-start justify-end text-ginaWhite space-y-4 lg:space-y-8 p-10 md:p-24">
                    <span className="text-3xl lg:text-6xl font-bold">
                        Who We Are
                    </span>
                    <span className="text-base lg:text-xl">
                        Gina Experiences is a passionate team of travel
                        enthusiasts and local experts dedicated to creating
                        authentic, immersive journeys that connect travelers
                        with the heart of each destination. We believe in the
                        power of travel to inspire, educate, and transform, so
                        our experiences go beyond sightseeing. By partnering
                        with local artisans, guides, and communities, we offer
                        meaningful adventures that celebrate regional culture,
                        heritage, and natural beauty. Whether through hands-on
                        activities, curated events, or personalized tours, we
                        strive to make each experience a memorable story that
                        travelers carry with them long after their journey ends.
                        Our commitment to sustainability and community support
                        ensures that each adventure leaves a positive impact on
                        the people and places we visit.
                    </span>
                </div>
            </div>
        </div>
    );
}
