'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin } from 'lucide-react';


export default function Hero() {
    const App = () => {
        return (
            <MapPin />
        );
    };

    const router = useRouter();

    return (
    <div className="flex flex-col items-center justify-center w-svw mb-28">
            <div className="relative w-full max-w-screen-2xl h-svh p-8">
                <div className="relative w-full h-full rounded-3xl overflow-hidden">
                    <Image
                        src="/images/home/gina-hero.png"
                        alt="Hero"
                        quality={100}
                        width={1500}
                        height={1500}
                        className="rounded-3xl w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-ginaOrange via-transparent w-full h-full rounded-3xl"></div>
                    <div className="absolute inset-0 w-full h-full flex flex-col items-start justify-center text-ginaWhite space-y-4 lg:space-y-16 p-8 md:p-24 ">
                        <div className="flex flex-col space-y-3">
                            <div className="flex space-x-2">
                                <MapPin />
                                <span className="font-normal text-base">Gina Experiences</span>
                            </div>
                            <h1 className="text-3xl lg:text-6xl font-bold">
                                DISCOVER AUTHENTIC LOCAL EXPERIENCES
                            </h1>
                        </div>
                        <span className="text-base lg:text-xl w-1/4">
                        Immerse yourself in the local culture with unique experiences hosted by knowledgeable locals at <span className="font-bold">Gina Experiences.</span>
                        </span>

                        <button className="px-8 py-2 text-ginaOrange text-base font-bold bg-ginaWhite rounded-lg" onClick={() => router.push('/experiences')}>BOOK NOW!</button>
                    </div>
                </div>
            </div>
        </div>
   );
}