import { Hero, Guide, Services, Offers, Events } from '@/components/home';

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Hero />
            <Guide />
            <Services />
            <Offers />
            <Events />
        </div>
    );
}
