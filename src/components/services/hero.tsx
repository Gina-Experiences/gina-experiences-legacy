import Image from "next/image";

export default function Hero() {
   return (
      <div className="flex flex-col items-center justify-center w-svw mb-36 md:mb-0">
         <div className="w-full max-w-screen-2xl h-svh p-8">
            <div className="w-full h-full md:h-5/6 bg-[url('/images/services/hero/hero-img.svg')] bg-cover bg-center rounded-3xl flex flex-col items-start justify-end text-ginaWhite space-y-4 lg:space-y-8 p-10 md:p-24">
               <span className="text-3xl lg:text-6xl font-bold">
                  Services
               </span>
               <span className="text-base lg:text-xl">
                  Gina Experiences offers a unique blend of local adventures and cultural immersion activities designed to connect travelers with the authentic pulse of each destination. Our services include personalized tours, workshops, and exclusive experiences that showcase the local heritage, artistry, and natural wonders. From guided cultural walks and hands-on craft workshops to culinary experiences and eco-friendly nature excursions, Gina Experiences provides thoughtfully curated adventures led by passionate, knowledgeable locals. 
               </span>
            </div>
         </div>
      </div>
   )
}