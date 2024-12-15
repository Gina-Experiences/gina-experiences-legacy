import Image from 'next/image';

export default function Events() {
    return (
        <div className="flex justify-center lg:w-11/12 max-w-screen-xl rounded-2xl lg:p-12 lg:m-12 lg:bg-ginaWhite">
            <Image
                src="/images/home/events/legazpi.png"
                alt="orange-icon"
                quality={100}
                width={400}
                height={400}
                className="hidden lg:block w-1/2"
            />
            <div className="flex flex-col lg:w-1/2 text-center lg:text-start my-6 mx-12 space-y-4">
                <h2 className="">
                    Upcoming Events at <br></br>
                    <span className="text-3xl font-bold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)22%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">
                        Gina Experiences
                    </span>
                </h2>
                <p className="text-sm">
                    Stay in the loop with all the exciting happenings at{' '}
                    <span className="font-bold">Gina Experiences!</span> From
                    cultural festivals to adventure-packed excursions, there's
                    always something exciting on the horizon. Don’t miss out on
                    exclusive opportunities to explore, learn, and create
                    lasting memories. Check back often to catch the latest
                    updates and find your next adventure!{' '}
                    <span className="font-bold">Tara na? G na!</span>
                </p>
            </div>
        </div>
    );
}
