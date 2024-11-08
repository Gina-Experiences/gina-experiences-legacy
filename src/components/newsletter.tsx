export default function Newsletter() {
   return(
      <div className="flex flex-col text-center mx-12 space-y-5">
         <h2 className="text-2xl font-bold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)30%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">Interested to Find Out More?</h2>
         <p className="text-sm font-medium">Sign up for our newsletter to get the latest updates on our experiences and promotions!</p>
         <div className="flex space-x-5">
            <div className="w-8 h-8 rounded-full bg-ginaYellow"></div>
            <span className="flex text-sm items-center">Latest updates on travel experiences.</span>
         </div>
         <div className="flex space-x-5">
            <div className="w-8 h-8 rounded-full bg-ginaOrange"></div>
            <span className="flex text-sm items-center">Exclusive promotions and discounts.</span>
         </div>
         <div className="flex space-x-5">
            <div className="w-8 h-8 rounded-full bg-ginaGreen"></div>
            <span className="flex text-sm items-center">And much more!</span>
         </div>
         <div className="flex flex-col items-center space-y-5">
            <div className="flex w-11/12 h-8 p-4 items-center border-2 border-ginaYellow rounded-lg text-ginaYellow shadow-lg">Enter your email</div>
            <button className="flex justify-center items-center rounded-xl bg-ginaYellow w-1/3 h-8 px-20 text-white font-medium">Subscribe</button>
         </div>
      </div>
   )
}