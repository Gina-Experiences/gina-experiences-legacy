export default function Hero() {
   return (
    <div className="flex flex-col justify-center items-center w-11/12 max-w-screen-2xl h-full lg:h-[400px] text-white rounded-lg p-10 m-24 space-y-5 bg-gradient-to-b from-ginaOrange">
        <div className=""> 
            <span className="">Gina Experiences</span>
        </div>
        <h1 className="text-4xl font-bold">DISCOVER AUTHENTIC LOCAL EXPERIENCES</h1>
        <p className="">
        Immerse yourself in the local culture with unique experiences hosted by knowledgeable locals at <span className="font-bold">Gina Experiences</span>.
        </p>
        <button className="w-36 h-10 rounded-xl bg-white text-ginaOrange font-bold shadow-md">Book Now!</button>
    </div>
   );
}