import Image from "next/image"

export default function Newsletter() {
   return(
      <div className="flex rounded-3xl max-w-screen-lg lg:bg-ginaWhite lg:shadow-xl m-8">
         <div className="hidden w-2/3 lg:flex flex-col items-center p-12 space-y-2">
            <div className="flex h-2/3 space-x-2">
               <div className="flex flex-col w-1/2 h-full space-y-2">
                  <img src="/images/newsletter/tour.jpg" 
                  alt="Tour"
                  className="object-cover object-center w-full h-full rounded-3xl" 
                  />
                  <div className="w-full h-1/3 rounded-3xl bg-ginaYellow"></div>
               </div>
               <div className="flex flex-col w-1/2 h-full space-y-2">
                  <div className="w-full h-1/2 rounded-3xl bg-ginaOrange shadow-md"></div>
                  <img src="/images/newsletter/church.jpg" 
                  alt="Church"
                  className="object-cover object-center w-full h-full rounded-3xl" 
                  />
               </div>
            </div>
            <div className="flex w-full h-1/3 items-center justify-center space-x-2">
               <div className="w-1/3 h-full rounded-3xl bg-ginaBlue"></div>
               <img src="/images/newsletter/sunflower.jpg" 
                  alt="Sunflower"
                  className="object-cover object-center w-full h-full rounded-3xl" 
                  /> 
               <div className="w-1/3 h-full rounded-3xl bg-ginaGreen"></div>
            </div>
         </div>
         <div className="flex flex-col lg:w-1/2 p-8 text-center items-center justify-center space-y-8">
            <h2 className="text-2xl lg:text-3xl font-bold lg:text-end bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)30%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">Interested to <br />Find Out More?</h2>
            <p className="text-sm font-medium lg:text-start">Sign up for our newsletter to get the latest updates on our experiences and promotions!</p>
            <div className="space-y-5">
               <div className="flex space-x-2 lg:space-x-4">
                  <img src="images/newsletter/yellow-check.svg" 
                     alt=""
                     className="w-6"
                  />
                  <span className="w-full flex text-xs justify-center items-center lg:justify-start">Latest updates on travel experiences.</span>
               </div>
               <div className="flex space-x-2 lg:space-x-4">
                  <img src="images/newsletter/orange-check.svg" 
                     alt=""
                     className="w-6"
                  />
                  <span className="w-full flex text-xs justify-center items-center lg:justify-start">Exclusive promotions and discounts.</span>
               </div>
               <div className="flex space-x-2 lg:space-x-4">
                  <img src="images/newsletter/green-check.svg" 
                     alt=""
                     className="w-6"
                     />
                  <span className="w-full flex text-xs justify-center items-center lg:justify-start">And much more!</span>
               </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-4 space-y-5 lg:space-y-0">
               <div className="flex p-2 px-4 lg:px-8 text-xs items-center border-2 border-ginaYellow rounded-lg text-ginaYellow ">Enter your email</div>
               <button className="flex justify-center items-center rounded-xl bg-ginaYellow px-4 py-2 text-white text-sm font-medium shadow-md">Subscribe</button>
            </div>
         </div>
      </div>
   )
}