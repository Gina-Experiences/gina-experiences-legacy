import Image from 'next/image';
import { FaCheck } from 'react-icons/fa6';

export default function AboutMV() {
    return (
        <div className="w-full h-auto min-h-svh flex items-center justify-center py-40">
            <div className="w-full max-w-screen-2xl grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-ginaWhite w-full h-full shadow-xl flex flex-col items-start justify-center space-y-4 rounded-r-0 lg:rounded-r-3xl p-12 md:p-24">
                    <span
                        className="text-5xl font-bold bg-clip-text text-transparent pb-4"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, #FFD100, #00A04B, #1B1464, #F6931D)',
                        }}
                    >
                        Our Mission
                    </span>
                    <span className="font-bold text-xl">
                        To enable a collaborative travel and tourism economy in
                        the Philippines
                    </span>
                    <span className="text-lg pb-4">
                        We aim to connect travelers with local communities
                        through authentic, meaningful experiences, fostering
                        economic growth and cultural appreciation in countryside
                        tourism
                    </span>
                    <Image
                        src="/images/about/hero-mission.jpg"
                        alt="Mission"
                        quality={100}
                        width={600}
                        height={600}
                        className="w-full h-auto rounded-2xl"
                    />
                </div>
                <div className="bg-ginaWhite w-full h-full shadow-xl flex flex-col items-start justify-center space-y-4 rounded-l-0 lg:rounded-l-3xl p-12 md:p-24">
                    <Image
                        src="/images/about/corevalues.jpg"
                        alt="Gina Experiences Logo"
                        quality={100}
                        width={600}
                        height={600}
                        className="w-full h-auto rounded-2xl"
                    />
                    <span
                        className="text-5xl font-bold bg-clip-text text-transparent py-4"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, #FFD100, #00A04B, #1B1464, #F6931D)',
                        }}
                    >
                        Our Core Values
                    </span>
                    <span className="font-bold text-xl">
                        At Gina Experiences, our foundation is built on values
                        that drive everything we do:
                    </span>
                    <div className="text-lg text-ginaBlack flex space-x-2">
                        <div className="bg-ginaYellow rounded-full p-2 text-white">
                            <FaCheck size={12} />
                        </div>
                        <span>Collaboration</span>
                    </div>
                    <div className="text-lg text-ginaBlack flex space-x-2">
                        <div className="bg-ginaOrange rounded-full p-2 text-white">
                            <FaCheck size={12} />
                        </div>
                        <span>Diversity</span>
                    </div>
                    <div className="text-lg text-ginaBlack flex space-x-2">
                        <div className="bg-ginaGreen rounded-full p-2 text-white">
                            <FaCheck size={12} />
                        </div>
                        <span>Innovation</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
