import Image from "next/image"

const services = [
    {
       src: '/images/home/services/farm.png',
       alt: 'Farm',
       bgColor: 'bg-ginaYellow',
       label: 'ACTIVITIES'
    },
    {
       src: '/images/home/services/hotel.png',
       alt: 'Hotel',
       bgColor: 'bg-ginaGreen',
       label: 'HOTELS'
    },
    {
       src: '/images/home/services/kalesa.png',
       alt: 'Kalesa',
       bgColor: 'bg-ginaBlue',
       label: 'TRANSPORT'
    },
    {
       src: '/images/home/services/arch.png',
       alt: 'Arch',
       bgColor: 'bg-ginaOrange',
       label: 'EVENTS'
    }
 ];

export default function Services() {
    return (
        <div className="flex flex-col lg:flex-row justify-center items-center text-center w-full max-w-screen-2xl lg:bg-ginaWhite lg:px-8 my-12 lg:py-24 2xl:rounded-3xl lg:shadow-xl space-y-10">
            <div className="w-1/2 lg:px-8 space-y-12 justify-center items-center text-sm">
                <h2 className="text-4xl font-semibold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)22%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">BEST SERVICES FOR YOU!</h2>
                <div className="hidden lg:flex flex-col text-start space-y-6 tracking-wide">
                    <div className="flex">
                        <div className="hidden md:block w-3 rounded bg-ginaOrange mx-4"></div>
                        <p>Experience the best with us! From exciting outdoor adventures to cultural activities like art tours, we have something for everyone. </p>
                    </div>
                    <div className="flex">
                        <div className="hidden md:block w-2 rounded bg-ginaBlue mx-4"></div>
                        <p>Stay in style at our handpicked hotels, from cozy boutiques to luxurious resorts. </p>
                    </div>
                    <div className="flex">
                        <div className="hidden md:block w-4 rounded bg-ginaGreen mx-4"></div>
                        <p>Travel effortlessly with private cars, buses, boats, and horseback rides, and enjoy exclusive access to top local events like concerts, festivals, and art exhibitions. <span className="font-semibold">Let us make your trip unforgettable!</span> </p>
                    </div>
                </div>
                <button className="hidden lg:inline px-6 py-2 h-10 rounded-xl bg-ginaYellow text-white font-medium shadow-md">View Services!</button>
            </div>
            <div className="grid space-y-4 md:space-y-0 md:grid-rows-2 md:grid-cols-2 ">
            {services.map((service, index) => (
                <div key={index} className="relative flex justify-center">
                    <Image 
                        src={service.src}
                        alt={service.alt}
                        quality={100}
                        width={200}
                        height={100}
                        className="lg:w-[200px]"
                    />
                    <div className={`absolute flex items-center justify-center w-11/12 h-14 rounded-b-[1.5rem] bottom-0 ${service.bgColor} text-white font-bold`}>
                        {service.label}
                    </div>
                </div>
            ))}
        </div>
        <button className="lg:hidden px-6 py-2 h-10 justify-center items-center rounded-xl bg-ginaYellow text-white font-bold shadow-md">View Services!</button>
        </div>
    )
}