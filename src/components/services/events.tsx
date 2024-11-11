import Image from "next/image"

export default function Events() {
   return (
      <div className="flex flex-col lg:flex-row-reverse justify-center items-center py-16 bg-ginaWhite">
         <Image 
            src="/images/services/events/events.png"
            alt="Events"
            quality={100}
            width={250}
            height={600}
            className="lg:block lg:w-1/4"
         />
         <div className="flex flex-col lg:w-1/2 justify-center items-center text-center lg:text-start mx-12 my-6 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-semibold">EVENTS</h2>
            <p className="text-sm lg:text-lg lg:mx-12">Our commitment to local partnerships and sustainable practices means that each event not only captivates guests but also supports the community and preserves the environment.</p>
            <button className="w-36 h-10 rounded-xl bg-ginaOrange text-white font-bold shadow-md">View More!</button>
         </div>
      </div>
   )
}