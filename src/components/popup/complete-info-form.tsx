'use client';

import Link from 'next/link';
import { X, EyeOff, Eye } from 'lucide-react';
import { userStore } from '@/stores';
import React, { useState } from 'react';

interface CompleteInfoFormProps {
    onComplete: () => void;
}

const CompleteInfoForm: React.FC<CompleteInfoFormProps> = ({ onComplete }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [gender, setGender] = useState('');
    const [contactNum, setContactNum] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const updateUser = userStore((state) => state.updateUser);
    const user = userStore((state) => state.user);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !firstName ||
            !lastName ||
            !birthdate ||
            !gender ||
            !contactNum ||
            !address
        ) {
            setError('All fields are required');
            return;
        }

        const isConfirmed = window.confirm(
            'Are you sure you want to submit this information?'
        );
        if (!isConfirmed) return;

        try {
            console.log('Submitting for User ID:', user?.id);
            console.log('Data:', {
                firstname: firstName,
                lastname: lastName,
                gender,
                birthdate: new Date(birthdate),
                phone: contactNum,
                address,
            });

            await updateUser(user?.id, {
                firstname: firstName,
                lastname: lastName,
                gender,
                birthdate: new Date(birthdate),
                phone: contactNum,
                address,
            });

            console.log('User information updated successfully!');
            setError('');
            onComplete();
        } catch (err) {
            console.error('Error updating user:', err);
            setError('Failed to update user information. Please try again.');
        }
    };

    const [isAgreed, setIsAgreed] = useState(false);

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
        console.log('Selected Gender:', e.target.value);
    };

    const handleCheckboxChange = () => {
        setIsAgreed(!isAgreed);
    };

    return (
        <div className="flex flex-col lg:flex-row rounded-3xl w-full max-w-screen-lg bg-ginaWhite lg:p-0 sm:p-8 p-2">
            <div className="hidden w-full lg:flex flex-col items-center p-12 space-y-2">
                <div className="flex w-full h-1/3 items-center justify-center space-x-2">
                    <div className="w-1/3 h-full rounded-3xl bg-ginaBlue"></div>
                    <img
                        src="/images/newsletter/sunflower.jpg"
                        alt="Sunflower"
                        className="object-cover object-center w-full h-full rounded-3xl"
                    />
                    <div className="w-1/3 h-full rounded-3xl bg-ginaGreen"></div>
                </div>
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
            </div>
            <div className="flex flex-col w-full p-6 lg:p-12 items-center text-ginaBlack justify-end gap-6">
                <h2 className="text-center text-4xl font-bold lg:text-end bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)30%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">
                    Let's complete your profile first!
                </h2>
                <p className="text-sm text-center lg:text-start w-full text-ginaBlack font-medium">
                    Begin planning your dream getaway with ease...
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center justify-center w-full gap-2"
                >
                    <div className="flex gap-2 w-full">
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className="flex w-full p-2 px-4 text-xs items-center text-ginaBlue border-2 border-ginaBlue rounded-lg"
                            required
                        />
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className="flex w-full p-2 px-4 text-xs items-center text-ginaBlue border-2 border-ginaBlue rounded-lg"
                            required
                        />
                    </div>

                    <div className="flex gap-2 w-full">
                        <div className="w-full flex gap-2 items-center p-2 px-4 text-xs text-ginaBlue border-2 border-ginaBlue rounded-lg">
                            <span className="text-xs text-ginaBlue">
                                Birthdate
                            </span>
                            <input
                                type="date"
                                value={birthdate}
                                onChange={(e) => setBirthdate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-full flex items-center justify-center p-2 px-4 text-xs text-ginaBlue border-2 border-ginaBlue rounded-lg">
                            <select
                                id="gender"
                                value={gender}
                                onChange={handleGenderChange}
                                className="w-full"
                                required
                            >
                                <option value="" disabled>
                                    Gender
                                </option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="preferNotToSay">
                                    Prefer Not to Say
                                </option>
                            </select>
                        </div>
                    </div>

                    <input
                        type="text"
                        value={contactNum}
                        onChange={(e) => setContactNum(e.target.value)}
                        placeholder="Contact Number"
                        className="flex w-full p-2 px-4 text-xs items-center text-ginaBlue border-2 border-ginaBlue rounded-lg"
                        required
                    />
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        className="flex w-full p-2 px-4 text-xs items-center text-ginaBlue border-2 border-ginaBlue rounded-lg"
                        required
                    />

                    <div className="flex flex-col items-center gap-2 w-full mt-4">
                        <div className="flex gap-4">
                            <input
                                type="checkbox"
                                checked={isAgreed}
                                onChange={handleCheckboxChange}
                                className="cursor-pointer"
                                required
                            />

                            <span className="text-xs text-ginaBlue/60 uppercase cursor-alias">
                                Agree to the{' '}
                                <Link
                                    href={'/terms-and-cons'}
                                    className="cursor-pointer font-medium hover:text-ginaGreen duration-300"
                                >
                                    terms and conditions
                                </Link>
                            </span>
                        </div>
                        <button
                            type="submit"
                            className="flex justify-center items-center rounded-xl px-8 py-2 text-sm text-ginaWhite bg-ginaBlue font-medium border-2 border-ginaBlue hover:bg-ginaWhite hover:text-ginaBlue focus:ring focus:ring-ginaBlue/50 shadow-md transition-all duration-200 ease-in-out"
                        >
                            Finish
                        </button>
                    </div>
                </form>

                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
        </div>
    );
};

export default CompleteInfoForm;
