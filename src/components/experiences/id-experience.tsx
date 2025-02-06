'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { experienceData } from '@/data';
import Image from 'next/image';
import {
    FaHeart,
    FaRegHeart,
    FaLocationDot,
    FaClock,
    FaHourglassStart,
} from 'react-icons/fa6';
import exp from 'constants';
import AccordionFAQ from '../faq-accordion';

export default function ExperiencePage() {
    const params = useParams();
    const router = useRouter()
    const experienceId = params?.id?.toString();

    const experience = experienceId
        ? experienceData.find((exp) => exp.id === parseInt(experienceId))
        : null;

    if (!experience) {
        return (
            <div className="w-svw h-svh flex flex-col items-center justify-center">
                Experience not found.
            </div>
        );
    }

    const [isLiked, setIsLiked] = useState(false);

    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    const handleBookNowClick = () => {
        router.push(`/experiences/${experience.id}/book-experience`);
    };

    return (
        <nav className="w-full flex justify-center text-ginaBlack">
            <div className="w-full max-w-screen-2xl items-center flex flex-col p-8">
                <div className="w-full h-full flex flex-col rounded-3xl bg-ginaWhite">
                    <div className="w-full rounded-t-3xl h-32 bg-gradient-to-r from-ginaLightYellow to-ginaOrange"></div>
                    <div className="h-5/6 py-16 px-8 md:py-20 md:px-32">
                        <div className="h-auto grid grid-rows-[auto_auto] grid-cols-1 lg:grid-cols-2 gap-12">
                            <div>
                                <Image
                                    src={experience.image}
                                    alt={experience.title}
                                    quality={100}
                                    width={500}
                                    height={500}
                                    className="rounded-3xl w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col justify-between">
                                <div className="flex flex-col xl:flex-row justify-between items-start ">
                                    <div className="flex flex-col space-y-4 w-full xl:w-[65%] pb-0 xl:pb-8">
                                        <span className="font-bold text-2xl">
                                            {experience.title}
                                        </span>
                                        <span className="text-lg text-ginaDarkGray flex items-center leading-tight w-9/12">
                                            <FaLocationDot
                                                size={20}
                                                className="mr-4 text-ginaLightYellow"
                                            />{' '}
                                            {experience.location}
                                        </span>
                                        <span className="font-medium text-xl text-ginaOrange">
                                            {experience.price}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-start xl:justify-end space-x-2 w-full xl:w-[35%] py-8 xl:py-0">
                                        <div
                                            onClick={handleLikeClick}
                                            className="cursor-pointer text-ginaOrange"
                                        >
                                            {isLiked ? (
                                                <FaHeart size={25} />
                                            ) : (
                                                <FaRegHeart size={25} />
                                            )}
                                        </div>
                                        <button className="bg-ginaYellow text-ginaWhite rounded-xl py-2 px-6 hover:bg-ginaGreen duration-200"
                                        onClick={handleBookNowClick}>
                                            Book now
                                        </button>
                                    </div>
                                </div>
                                <span className="flex flex-col space-y-2 text-justify">
                                    <span className="font-bold">
                                        Highlights
                                    </span>
                                    <span>{experience.highlights}</span>
                                </span>
                            </div>
                            <div className="flex flex-col space-y-2 px-8">
                                <div className="flex flex-col space-y-2">
                                    <span className="flex items-center text-ginaOrange font-medium text-lg">
                                        <FaClock size={16} className="mr-4" />
                                        Duration
                                    </span>
                                    <li className="pl-8">
                                        {experience.duration}
                                    </li>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <span className="flex items-center text-ginaOrange font-medium text-lg">
                                        <FaHourglassStart
                                            size={16}
                                            className="mr-4"
                                        />
                                        Best Time to Visit:
                                    </span>
                                    <span className="flex flex-col">
                                        {experience.bestTime.map(
                                            (time, index) => (
                                                <span
                                                    key={index}
                                                    className="flex items-center"
                                                >
                                                    <li className="pl-8">
                                                        {time}
                                                    </li>
                                                </span>
                                            )
                                        )}
                                    </span>
                                </div>
                            </div>
                            {experience.get && experience.get.length > 0 && (
                                <div className="bg-ginaWhite rounded-3xl shadow-xl flex flex-col">
                                    <div className="rounded-t-3xl bg-ginaLightYellow flex flex-col items-center justify-center text-ginaWhite text-xl py-4 font-medium">
                                        What You'll Get
                                    </div>
                                    <span className="flex flex-col p-8">
                                        {experience.get.map((get, index) => (
                                            <span
                                                key={index}
                                                className="flex items-center"
                                            >
                                                <li className="pl-4">{get}</li>
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="bg-ginaWhite rounded-3xl shadow-xl flex flex-col mt-8">
                            <div className="rounded-t-3xl bg-ginaOrange flex flex-col items-center justify-center text-ginaWhite text-xl py-4 font-medium">
                                What to Expect
                            </div>
                            <span className="h-full flex flex-col p-8">
                                {experience.expect.map((expect, index) => (
                                    <span
                                        key={index}
                                        className="flex items-center"
                                    >
                                        <li className="pl-2">{expect}</li>
                                    </span>
                                ))}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full h-5/6 py-16 px-8 md:px-32">
                    <div className="bg-ginaWhite rounded-3xl shadow-xl flex flex-col mt-8">
                        <div className="rounded-t-3xl bg-ginaGreen flex flex-col items-center justify-center text-ginaWhite text-xl p-4 text-center font-medium">
                            Frequently Asked Questions
                        </div>
                        <AccordionFAQ
                            id={experience.id.toString()}
                            data={experienceData.map(({ id, faq }) => ({
                                id,
                                faq,
                            }))}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
}
