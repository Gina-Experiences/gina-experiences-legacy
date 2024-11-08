export default function Guide() {
   return (
      <div className="flex flex-col items-center w-11/12 h-full my-12 space-y-5">
      <h2 className="text-center">Book Your Next Trip in <br></br><span className="text-2xl font-semibold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)22%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">Just 3 Easy Steps!</span></h2>
         <div className="flex flex-col items-center text-center space-y-5 px-10">
            <div className="flex flex-col items-center justify-center space-y-5">
               <div className="w-12 h-12 rounded-full bg-ginaOrange"></div>
               <p className="">Explore our collection of unique experiences designed to ignite the traveller in you</p>
            </div>
            <div className="flex flex-col items-center justify-center space-y-5">
               <div className="w-12 h-12 rounded-full  bg-ginaBlue"></div>
               <p className="">Using our user-friendly booking page, you can instantly secure your spot with just a few clicks.</p>
               </div>
            <div className="flex flex-col items-center justify-center space-y-5">
               <div className="w-12 h-12 rounded-full  bg-ginaGreen"></div>
               <p className="">You’re all set and ready to go! Get excited as you prepare for an extraordinary adventure that awaits you</p>
            </div>
         </div>
      </div>
   );
}