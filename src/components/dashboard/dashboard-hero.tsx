import Image from 'next/image';

export default function DashboardHero() {
    return (
        <div className="flex flex-col items-center justify-center w-svw">
            <div className="relative w-full max-w-screen-2xl h-svh p-8 border-2">
                <Image
                    src="/images/about/hero-mission.jpg"
                    alt="Hero"
                    quality={100}
                    width={1500}
                    height={1500}
                    className="rounded-3xl w-full h-full object-cover object-center"
                />
            </div>
        </div>
    );
}
