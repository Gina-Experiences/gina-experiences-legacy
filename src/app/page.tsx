import Image from 'next/image';
import { Hero, Guide, Services, Offers, Events } from '@/components/home';
import Newsletter from '@/components/newsletter';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Hero />
            <Guide />
            <Services />
            <Offers />
            <Events />
            {/* <Newsletter /> */}
        </div>
    );
}
