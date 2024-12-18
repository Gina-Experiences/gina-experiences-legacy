import Image from 'next/image';

export default function Activities() {
    return (
        <div className="max-w-screen-2xl flex flex-col lg:flex-row justify-center items-center p-8 bg-ginaWhite shadow-xl">
            <Image
                src="/images/services/activities/activities.png"
                alt="Boat"
                quality={100}
                width={250}
                height={600}
                className="lg:block lg:w-1/4"
            />
            <div className="flex flex-col lg:w-1/2 justify-center items-center text-center lg:text-start mx-12 my-6 space-y-4">
                <h2 className="text-3xl lg:text-4xl font-semibold">
                    ACTIVITIES
                </h2>
                <p className="text-sm lg:text-lg lg:mx-12">
                    Our activities offer travelers an authentic journey into the
                    heart of each destination through curated, hands-on
                    adventures.
                </p>
                <button className="px-8 py-2 rounded-xl bg-ginaYellow text-white font-bold shadow-md">
                    View More!
                </button>
            </div>
        </div>
    );
}
