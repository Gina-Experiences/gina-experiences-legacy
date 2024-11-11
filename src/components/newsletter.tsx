import Image from "next/image"

export default function Newsletter() {
   return(
      <div className="flex rounded-3xl max-w-screen-lg lg:bg-ginaWhite lg:shadow-xl m-8">
         <div className="hidden w-8/12 lg:flex flex-col items-center p-12">
            <div className="flex h-4/6">
               <div className="flex flex-col items-center w-1/2 h-full">
                  <Image 
                     src="/images/newsletter/beach.png"
                     alt="Beach"
                     quality={100}
                     width={400}
                     height={500}
                  />
                  <div className="w-[95%] h-[90px] rounded-[30px] bg-ginaYellow"></div>
               </div>
               <div className="flex flex-col w-1/2 h-full ">
                  <div className="w-full h-1/2 rounded-[30px] bg-ginaOrange shadow-md"></div>
                  <Image 
                     src="/images/newsletter/farm.png"
                     alt="Farm"
                     quality={100}
                     width={500}
                     height={400}
                  />
               </div>
            </div>
            <div className="flex w-full h-2/6 items-center justify-center ">
               <div className="w-1/3 h-[150px] rounded-3xl bg-ginaBlue"></div>
               <Image 
                  src="/images/newsletter/sunflower.png"
                  alt="Gina Experiences Logo"
                  quality={100}
                  width={500}
                  height={600}
               />
               <div className="w-1/3 h-[150px] rounded-3xl bg-ginaGreen"></div>
            </div>
         </div>
         <div className="flex flex-col lg:w-1/2 p-12 text-center items-center justify-center space-y-8">
            <h2 className="text-2xl lg:text-3xl font-bold lg:text-end bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)30%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">Interested to <br />Find Out More?</h2>
            <p className="text-sm font-medium lg:text-start">Sign up for our newsletter to get the latest updates on our experiences and promotions!</p>
            <div className="space-y-5">
               <div className="flex space-x-5">
                  <div className="w-8 h-8 rounded-full bg-ginaYellow"></div>
                  <span className="flex text-xs items-center">Latest updates on travel experiences.</span>
               </div>
               <div className="flex space-x-5">
                  <div className="w-8 h-8 rounded-full bg-ginaOrange"></div>
                  <span className="flex text-xs items-center">Exclusive promotions and discounts.</span>
               </div>
               <div className="flex space-x-5">
                  <div className="w-8 h-8 rounded-full bg-ginaGreen"></div>
                  <span className="flex text-xs items-center">And much more!</span>
               </div>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-center space-x-4 space-y-5 lg:space-y-0">
               <div className="flex w-full h-8 p-4 text-xs items-center border-2 border-ginaYellow rounded-lg text-ginaYellow ">Enter your email</div>
               <button className="flex justify-center items-center rounded-xl bg-ginaYellow w-1/3 px-16 h-8  text-white font-medium">Subscribe</button>
            </div>
         </div>
      </div>
   )
}