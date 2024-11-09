import Image from 'next/image';

export default function AboutGina() {
    return (
        <div className="w-full max-w-screen-2xl flex justify-center">
            <div className="w-5/6 bg-ginaWhite rounded-3xl shadow-xl grid grid-colds-1 lg:grid-cols-2 p-0 sm:p-12">
                <div className="flex flex-col items-center justify-center p-8 lg:p-0">
                    <Image
                        src="/images/gina/logo.png"
                        alt="Gina Experiences Logo"
                        quality={100}
                        width={500}
                        height={500}
                    />
                </div>
                <div className="flex flex-col p-8">
                    <span className="text-2xl sm:text-3xl">Who is</span>
                    <span
                        className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, #FFD100, #00A04B, #1B1464, #F6931D)',
                        }}
                    >
                        Gina Experiences
                    </span>

                    <span className="mt-8 text-justify text-lg">
                        Gina helps travelers achieve authentic local experiences
                        that support local communities and promote experiential
                        tourism.{' '}
                        <b>
                            Our mission is to create a holistic tourism economy
                            in the Philippines, one community at a time.
                        </b>
                    </span>
                </div>
            </div>
        </div>
    );
}
