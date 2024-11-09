import Image from "next/image"

export default function Services() {
   return (
      <div className="flex flex-col items-center text-center w-full max-w-screen-2xl lg:bg-ginaWhite px-12 lg:py-32 my-8 lg:my-12 2xl:rounded-3xl lg:shadow-xl space-y-5">
         <h2 className="text-3xl mx-2 font-bold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)22%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">BEST SERVICES FOR YOU!</h2>
         <h3 className="mx-10">Try a Variety of Benefits When Using Our Services</h3>
         <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6">
            <div className="relative flex justify-center">
               <Image 
                  src="/images/home/services/farm.png"
                  alt="Farm"
                  quality={100}
                  width={220}
                  height={100}
                  className="lg:w-[280px]"
               />
               <div className="absolute flex items-center justify-center w-11/12 h-14 rounded-b-[1.5rem] bottom-0 bg-ginaYellow text-white font-bold ">ACTIVITIES</div>
            </div>
            <div className="relative flex justify-center">
               <Image 
                  src="/images/home/services/hotel.png"
                  alt="Hotel"
                  quality={100}
                  width={220}
                  height={100}
                  className="lg:w-[280px]"
               />
               <div className="absolute flex items-center justify-center w-11/12 h-14 rounded-b-[1.5rem] bottom-0 bg-ginaGreen text-white font-bold ">HOTELS</div>
            </div>
            <div className="relative flex justify-center">
               <Image 
                  src="/images/home/services/kalesa.png"
                  alt="Kalesa"
                  quality={100}
                  width={220}
                  height={100}
                  className="lg:w-[280px]"
               />
               <div className="absolute flex items-center justify-center w-11/12 h-14 rounded-b-[1.5rem] bottom-0 bg-ginaBlue text-white font-bold ">TRANSPORT</div>
            </div>
            <div className="relative flex justify-center">
               <Image 
                  src="/images/home/services/arch.png"
                  alt="arch"
                  quality={100}
                  width={220}
                  height={100}
                  className="lg:w-[280px]"
               />
               <div className="absolute flex items-center justify-center w-11/12 h-14 rounded-b-[1.5rem] bottom-0 bg-ginaOrange text-white font-bold ">EVENTS</div>
            </div>
         </div>
         <button className=" flex w-1/6 py-6 h-10 justify-center items-center rounded-xl bg-ginaYellow text-white font-bold shadow-md">View Services!</button>
      </div>
   )
}