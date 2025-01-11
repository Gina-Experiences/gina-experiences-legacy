import Image from "next/image"

export default function Offers() {
   return (
      <div className="flex justify-center my-12">
         <Image 
            src="/images/home/offers/boat.png"
            alt="Boat"
            quality={100}
            width={250}
            height={600}
            className="hidden lg:block lg:w-1/4"
         />
         <div className="flex flex-col lg:w-1/2 justify-center items-center mx-12 my-6 space-y-4">
            <h2 className="text-3xl lg:text-4xl text-center font-semibold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)22%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">Best Offers This Month</h2>
            <p className="text-sm text-center lg:text-start lg:text-lg lg:mx-12">Discover the best travel deals and exclusive offers, tailored to make your dream vacation affordable and unforgettable.</p>
            <button className="w-36 h-10 rounded-xl bg-ginaYellow text-white font-bold shadow-md">View More!</button>
         </div>
      </div>
   )
}