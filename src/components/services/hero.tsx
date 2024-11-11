import Image from "next/image";

export default function Hero() {
   return (
      <div className="flex flex-col w-svw  md:mb-0">
         <div className="flex flex-col justify-end w-full h-svh bg-[url('/images/services/hero/hero-img.svg')] bg-cover bg-center text-ginaWhite space-y-4 lg:space-y-8 p-10 md:p-24">
            <span className="text-3xl lg:text-6xl font-bold">
               Services
            </span>
            <span className="text-sm lg:text-xl">Gina Experiences offers a unique blend of local adventures and cultural immersion activities designed to connect travelers with the authentic pulse of each destination. Our services include personalized tours, workshops, and exclusive experiences that showcase the local heritage, artistry, and natural wonders. From guided cultural walks and hands-on craft workshops to culinary experiences and eco-friendly nature excursions, Gina Experiences provides thoughtfully curated adventures led by passionate, knowledgeable locals. </span>
         </div>
      </div>
   )
}