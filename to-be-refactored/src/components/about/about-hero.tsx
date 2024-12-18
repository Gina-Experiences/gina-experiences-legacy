import Image from 'next/image';

export default function AboutHero() {
    return (
        <div className="flex flex-col items-center justify-center w-svw mb-28">
            <div className="relative w-full max-w-screen-2xl h-svh p-8">
                <Image
                    src="/images/about/hero-mission.jpg"
                    alt="Hero"
                    quality={100}
                    width={1500}
                    height={1500}
                    className="rounded-3xl w-full h-full object-cover object-center"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-start justify-end text-ginaWhite space-y-4 lg:space-y-8 p-16 md:p-24">
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
                        heritage, and natural beauty.
                    </span>
                </div>
            </div>
        </div>
    );
}
