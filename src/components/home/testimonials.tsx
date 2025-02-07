import Image from 'next/image';

const TestimonialsData = [
    {
        userImage: '/images/home/testimonials/user1.jpg',
        userName: 'Zeke Andrei David',
        userOccupation: 'Travel Vlogger',
        rating: 5,
        testimonial:
            'Every moment was memorable in Gina Experiences, and it felt like more than just a vacation – it was an immersive and enriching experience.',
        datePosted: 'January 1, 2024 | 11:59PM',
    },
    {
        userImage: '/images/home/testimonials/user2.jpg',
        userName: 'Sarah Thompson',
        userOccupation: 'Adventure Enthusiast',
        rating: 4,
        testimonial:
            'I had an incredible time with Gina Experiences, and I’m already planning my next adventure with them. Highly recommended for anyone seeking excitement!',
        datePosted: 'February 12, 2024 | 2:30PM',
    },
    {
        userImage: '/images/home/testimonials/user3.jpg',
        userName: 'Carlos Rivera',
        userOccupation: 'Photographer',
        rating: 5,
        testimonial:
            'The entire journey exceeded my expectations. Every location was stunning, and the personal touch made it feel like a customized adventure.',
        datePosted: 'December 22, 2023 | 5:45PM',
    },
];

const renderStars = (rating: number) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
};

export default function Testimonials() {
    return (
        <div className="flex flex-col items-center text-center w-full max-w-screen-2xl px-12 my-12 space-y-8">
            <h2 className="text-3xl font-bold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)22%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">
                What Our Clients Say
            </h2>
            <p className="text-sm">
                Discover why our clients love Gina Experiences. Read firsthand
                accounts of memorable journeys, exceptional service, and
                unforgettable adventures that have inspired travelers around the
                world.
            </p>
            <div className="pt-8 flex flex-col lg:flex-row space-y-16 lg:space-y-0 lg:space-x-8">
                {TestimonialsData.map((testimonial, index) => (
                    <div
                        key={index}
                        className="relative flex flex-col space-y-1 p-8 bg-ginaWhite rounded-3xl items-center shadow-xl"
                    >
                        <div className="absolute -top-12">
                            <Image
                                src={testimonial.userImage}
                                alt={testimonial.userName}
                                width={110}
                                height={110}
                                className="rounded-full object-cover object-center border-8 border-white shadow-md h-28 w-28"
                            />
                        </div>
                        <div className="pt-8"></div>
                        <p className="font-semibold">{testimonial.userName}</p>
                        <p className="text-sm text-gray">
                            {testimonial.userOccupation}
                        </p>
                        <div className="text-lg text-yellow-500 py-2">
                            {renderStars(testimonial.rating)}
                        </div>
                        <p className="italic text-sm text-start">
                            "{testimonial.testimonial}"
                        </p>
                        <span className="pt-4 text-xs self-start">
                            Date posted: {testimonial.datePosted}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
