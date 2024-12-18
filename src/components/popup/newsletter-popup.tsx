'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Form from 'next/form';

export default function NewsletterPopup() {
    const [email, setEmail] = useState('Email');

    const handleFocus = (
        field: string,
        setValue: React.Dispatch<React.SetStateAction<string>>,
        defaultValue: string
    ) => {
        if (field === defaultValue) {
            setValue('');
        }
    };

    const handleBlur = (
        field: string,
        setValue: React.Dispatch<React.SetStateAction<string>>,
        defaultValue: string
    ) => {
        if (field.trim() === '') {
            setValue(defaultValue);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row rounded-3xl w-full max-w-screen-lg bg-ginaWhite lg:p-0 sm:p-8 p-2">
            <div className="hidden w-full lg:flex flex-col items-center p-12 space-y-2">
                <div className="flex h-2/3 space-x-2">
                    <div className="flex flex-col w-1/2 h-full space-y-2">
                        <img
                            src="/images/newsletter/tour.jpg"
                            alt="Tour"
                            className="object-cover object-center w-full h-full rounded-3xl"
                        />
                        <div className="w-full h-1/3 rounded-3xl bg-ginaYellow"></div>
                    </div>
                    <div className="flex flex-col w-1/2 h-full space-y-2">
                        <div className="w-full h-1/2 rounded-3xl bg-ginaOrange shadow-md"></div>
                        <img
                            src="/images/newsletter/church.jpg"
                            alt="Church"
                            className="object-cover object-center w-full h-full rounded-3xl"
                        />
                    </div>
                </div>
                <div className="flex w-full h-1/3 items-center justify-center space-x-2">
                    <div className="w-1/3 h-full rounded-3xl bg-ginaBlue"></div>
                    <img
                        src="/images/newsletter/sunflower.jpg"
                        alt="Sunflower"
                        className="object-cover object-center w-full h-full rounded-3xl"
                    />
                    <div className="w-1/3 h-full rounded-3xl bg-ginaGreen"></div>
                </div>
            </div>
            <div className="flex flex-col w-full p-8 text-center items-center text-ginaBlack justify-center gap-6 lg:gap-8">
                <div className="w-full text-3xl sm:text-4xl font-bold lg:text-end px-4 text-center bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)30%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">
                    <span className=" lg:block inline">Interested to</span>{' '}
                    <span className="lg:block inline">Find Out More?</span>
                </div>

                <div className="flex flex-col items-center lg:gap-6 gap-4">
                    <p className="text-base font-medium lg:text-start">
                        Sign up for our newsletter to get the latest updates on
                        our experiences and promotions!
                    </p>
                    <div className="flex flex-col gap-2 lg:gap-4 lg:pl-0 pl-4">
                        <div className="flex gap-4 text-sm">
                            <img
                                src="images/newsletter/yellow-check.svg"
                                alt=""
                                className="w-6"
                            />
                            <span className="w-full text-left">
                                Latest updates on travel experiences.
                            </span>
                        </div>
                        <div className="flex gap-4 text-sm">
                            <img
                                src="images/newsletter/orange-check.svg"
                                alt=""
                                className="w-6"
                            />
                            <span className="w-full text-left">
                                Exclusive promotions and discounts.
                            </span>
                        </div>
                        <div className="flex gap-4 text-sm">
                            <img
                                src="images/newsletter/green-check.svg"
                                alt=""
                                className="w-6"
                            />
                            <span className="w-full text-left">
                                And much more!
                            </span>
                        </div>
                    </div>
                </div>
                <Form
                    action="/"
                    className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full"
                >
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => handleFocus(email, setEmail, 'Email')}
                        onBlur={() => handleBlur(email, setEmail, 'Email')}
                        className="flex w-full p-2 px-4 text-sm items-center text-ginaBlue border-2 border-ginaBlue rounded-xl"
                    />
                    <button className="flex justify-center items-center rounded-xl border-2  border-ginaBlue bg-ginaBlue px-4 py-2 text-white text-sm font-medium hover:bg-ginaGreen hover:border-ginaGreen transition-all duration-200 ease-in-out">
                        Subscribe
                    </button>
                </Form>
            </div>
        </div>
    );
}
