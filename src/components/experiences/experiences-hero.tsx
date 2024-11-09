import Image from 'next/image';

export default function ExperiencesHero() {
    return (
        <div className="flex flex-col items-center justify-center w-svw mb-28">
            <div className="relative w-full max-w-screen-2xl h-svh p-8">
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                    <Image
                        src="/images/experiences/hero.jpg"
                        alt="Gina Experiences Logo"
                        quality={100}
                        width={1500}
                        height={1500}
                        className="rounded-3xl w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ginaLightYellow w-full h-full rounded-3xl"></div>

                    <div className="absolute inset-0 w-full h-full flex flex-col items-start justify-end text-ginaWhite space-y-4 lg:space-y-8 p-8 md:p-24 ">
                        <span className="text-3xl lg:text-6xl font-bold">
                            Gina Experiences
                        </span>
                        <span className="text-base lg:text-xl">
                            Your Next Adventure Awaits! Dive into unforgettable
                            travel experiences with our handpicked tour
                            packages! Whether you’re craving adventure, culture,
                            or relaxation, we’ve got the perfect getaway. Enjoy
                            seamless itineraries, guided tours, comfy stays, and
                            unique activities that let you truly explore your
                            dream destination. Pack your bags—memories are
                            waiting to be made. Tara na? G na!
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
