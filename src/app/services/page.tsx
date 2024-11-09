import Image from 'next/image';
import Hero from "@/components/services/hero";

export default function Services() {
    return (
        <div className="flex flex-col items-center justify-center w-svw h-svh">
            <div className="w-full max-w-screen-2xl h-svh">
                <Hero />
            </div>
        </div>
    );
}
