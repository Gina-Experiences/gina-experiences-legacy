import {
    FaSuitcase,
    FaSeedling,
    FaImages,
    FaPeopleGroup,
} from 'react-icons/fa6';

const experiencesData = [
    {
        icon: <FaSuitcase size={75} />,
        label: 'Authentic',
        bgColor: 'bg-ginaYellow',
        content:
            'Experience the unique culture of each destination with immersive local experiences.',
    },
    {
        icon: <FaSeedling size={75} />,
        label: 'Sustainable',
        bgColor: 'bg-ginaGreen',
        content:
            'Travel responsibly and contribute to local economies and the environment with Gina.',
    },
    {
        icon: <FaImages size={75} />,
        label: 'Memorable',
        bgColor: 'bg-ginaBlue',
        content:
            'Create unforgettable memories with meaningful and transformative experiences.',
    },
    {
        icon: <FaPeopleGroup size={75} />,
        label: 'Inclusive',
        bgColor: 'bg-ginaOrange',
        content:
            'Connect, support, and showcase local communities with our socially responsible travel platform.',
    },
];

export default function AboutExperiences() {
    return (
        <div className="w-full max-w-screen-2xl min-h-svh h-auto flex flex-col items-center justify-center bg-ginaWhite shadow-xl p-12 lg:p-24">
            <span
                className="text-center text-5xl font-bold bg-clip-text text-transparent pb-12"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, #FFD100, #00A04B, #1B1464, #F6931D)',
                }}
            >
                We Bring You Experiences That Are:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {experiencesData.map((experience, index) => (
                    <div
                        key={index}
                        className="flex flex-col p-4 shadow-xl rounded-3xl"
                    >
                        <div
                            className={`${experience.bgColor} flex flex-col items-center justify-center rounded-2xl py-12 text-ginaWhite space-y-2 font-bold`}
                        >
                            {experience.icon}
                            <span>{experience.label}</span>
                        </div>
                        <div className="flex flex-col items-center justify-center py-4 text-center h-full">
                            {experience.content}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
