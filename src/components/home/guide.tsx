import Image from "next/image";

export default function Guide() {
   return (
      <div className="flex max-w-screen-2xl justify-center lg:justify-between my-12">
         <div className="hidden w-8/12 lg:flex items-center text-ginaWhite space-x-1 mr-6">
            <div className="flex flex-col w-1/3 h-full justify-center space-y-2">
               <Image
                  src="/images/home/guide/beach.png"
                  alt="Beach"
                  quality={100}
                  width={400}
                  height={80}
               />
               <div className="flex flex-col w-full h-full p-8 text-start justify-end rounded-r-3xl text-xl bg-ginaBlue"><span className="font-bold">CHOOSE</span><span>YOUR</span><span>EXPERIENCE.</span></div>
            </div>
            <div className="flex flex-col w-1/3 h-full justify-center space-y-1">
               <div className="flex items-center w-full h-full p-8 rounded-3xl text-xl bg-ginaGreen"><span>MAKE <span className="font-bold">A BOOKING.</span></span></div>
               <Image
                  src="/images/home/guide/strawberry.png"
                  alt="Beach"
                  quality={100}
                  width={400}
                  height={200}
               />
            </div>
            <div className="flex flex-col w-1/3 h-full justify-center space-y-0.5">
               <Image
                  src="/images/home/guide/mountains.png"
                  alt="Mountains"
                  quality={100}
                  width={400}
                  height={80}
               />               
               <div className="w-full h-full h-[120px] p-6 rounded-3xl text-xl bg-ginaOrange"><span className="font-bold">ENJOY</span> YOUR ADVENTURE!</div>
            </div>
         </div>
         <div className="flex flex-col w-11/12 lg:w-4/12 p-8 rounded-xl lg:shadow-lg items-center lg:items-end  lg:bg-ginaWhite space-y-5">
            <h2 className="text-xl text-center lg:text-right">Book Your Next Trip in <br></br><span className="text-3xl font-semibold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)22%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">Just 3 Easy Steps!</span></h2>
            <div className="flex flex-col justify-center items-center text-center md:text-start text-xs mx-12 lg:mx-0 space-y-5">
               <div className="flex flex-col items-center justify-center md:flex-row space-y-5">
                  <Image
                     src="/images/home/guide/orange-icon.svg"
                     alt="orange-icon"
                     quality={100}
                     width={60}
                     height={60}
                  /> 
                  <div className="hidden md:table w-2 h-20 rounded bg-ginaOrange mx-4"></div>
                  <p className="">Explore our collection of unique experiences designed to ignite the traveller in you</p>
               </div>
               <div className="flex flex-col items-center justify-center md:flex-row space-y-5">
                  <Image
                     src="/images/home/guide/blue-icon.svg"
                     alt="orange-icon"
                     quality={100}
                     width={60}
                     height={60}
                  /> 
                  <div className="hidden md:table w-2 h-20 rounded bg-ginaBlue mx-4"></div>
                  <p className="">Using our user-friendly booking page, you can instantly secure your spot with just a few clicks.</p>
               </div>
               <div className="flex flex-col items-center justify-center md:flex-row space-y-5">
                  <Image
                     src="/images/home/guide/green-icon.svg"
                     alt="orange-icon"
                     quality={100}
                     width={60}
                     height={60}
                  /> 
                  <div className="hidden md:table w-2 h-20 rounded bg-ginaGreen mx-4"></div>
                  <p className="">You’re all set and ready to go! Get excited as you prepare for an extraordinary adventure that awaits you</p>
               </div>
            </div>
         </div>
      </div>
   );
}