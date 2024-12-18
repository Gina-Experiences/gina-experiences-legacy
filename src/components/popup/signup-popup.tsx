'use client';

import Form from 'next/form';
import { X, EyeOff, Eye } from 'lucide-react';
import React, { useState } from 'react';

const SignupPopup = () => {
    const [firstName, setFirstName] = useState('First Name');
    const [lastName, setLastName] = useState('Last Name');
    const [Birthdate, setBirthdate] = useState('Date of Birth');
    const [gender, setGender] = useState('');
    const [contactNum, setContactNum] = useState('Contact Number');
    const [address, setAddress] = useState('Address');
    const [email, setEmail] = useState('Email');
    const [password, setPassword] = useState('Password');
    const [confirmPassword, setConfirmPassword] = useState('Confirm Password');
    const [error, setError] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    const toggleConfirmPasswordVisibility = () =>
        setConfirmPasswordVisible(!confirmPasswordVisible);
    const [isAgreed, setIsAgreed] = useState(false);

    const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(e.target.value);
        console.log('Selected Gender:', e.target.value);
    };

    const handleCheckboxChange = () => {
        setIsAgreed(!isAgreed);
    };

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
        <div className="flex lg:rounded-3xl w-screen max-w-screen-lg bg-ginaWhite lg:shadow-xl">
            <div className="hidden w-2/3 lg:flex flex-col items-center p-12 space-y-2">
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
            <div className="flex flex-col w-screen lg:w-1/2 p-8 text-center items-center text-ginaBlack justify-center space-y-8">
                <h2 className="text-4xl font-bold lg:text-end bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)30%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text">
                    Start Your Next <br />
                    Adventure!
                </h2>
                <p className="text-sm text-ginaBlack font-medium">
                    Begin planning your dream getaway with ease.
                </p>

                <Form
                    action="/"
                    className="flex flex-col items-center justify-center w-5/6 space-y-2 lg:space-x-0"
                >
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            onFocus={() =>
                                handleFocus(
                                    firstName,
                                    setFirstName,
                                    'First Name'
                                )
                            }
                            onBlur={() =>
                                handleBlur(
                                    firstName,
                                    setFirstName,
                                    'First Name'
                                )
                            }
                            className="flex w-full p-2 px-4 text-xs items-center text-ginaBlue border border-2 border-ginaBlue rounded-lg"
                            required
                        />
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            onFocus={() =>
                                handleFocus(lastName, setLastName, 'Last Name')
                            }
                            onBlur={() =>
                                handleBlur(lastName, setLastName, 'Last Name')
                            }
                            className="flex w-full p-2 px-4 text-xs items-center text-ginaBlue border border-2 border-ginaBlue rounded-lg"
                            required
                        />
                    </div>

                    <div className="flex space-x-2">
                        <input
                            type="text"
                            value={Birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            onFocus={() =>
                                handleFocus(
                                    Birthdate,
                                    setBirthdate,
                                    'Date of Birth'
                                )
                            }
                            onBlur={() =>
                                handleBlur(
                                    Birthdate,
                                    setBirthdate,
                                    'Date of Birth'
                                )
                            }
                            className="flex w-1/2 p-2 px-4 text-xs items-center text-ginaBlue border border-2 border-ginaBlue rounded-lg"
                            required
                        />
                        <select
                            id="gender"
                            value={gender}
                            onChange={handleGenderChange}
                            className="w-1/2 p-2 px-4 text-xs items-center text-ginaBlue border border-2 border-ginaBlue rounded-lg"
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

                    <input
                        type="text"
                        value={contactNum}
                        onChange={(e) => setContactNum(e.target.value)}
                        onFocus={() =>
                            handleFocus(
                                contactNum,
                                setContactNum,
                                'Contact Number'
                            )
                        }
                        onBlur={() =>
                            handleBlur(
                                contactNum,
                                setContactNum,
                                'Contact Number'
                            )
                        }
                        className="flex w-full p-2 px-4 text-xs items-center text-ginaBlue border border-2 border-ginaBlue rounded-lg"
                        required
                    />
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onFocus={() =>
                            handleFocus(address, setAddress, 'Address')
                        }
                        onBlur={() =>
                            handleBlur(address, setAddress, 'Address')
                        }
                        className="flex w-full p-2 px-4 text-xs items-center text-ginaBlue border border-2 border-ginaBlue rounded-lg"
                        required
                    />
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => handleFocus(email, setEmail, 'Email')}
                        onBlur={() => handleBlur(email, setEmail, 'Email')}
                        className="flex w-full p-2 px-4 text-xs items-center text-ginaBlue border border-2 border-ginaBlue rounded-lg"
                        required
                    />

                    <div className="relative w-full max-w-md">
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() =>
                                handleFocus(password, setPassword, 'Password')
                            }
                            onBlur={() =>
                                handleBlur(password, setPassword, 'Password')
                            }
                            className="flex w-full p-2 px-4 text-xs items-center text-ginaBlue border border-2 border-ginaBlue rounded-lg"
                            required
                        />
                        <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? (
                                <Eye size={20} />
                            ) : (
                                <EyeOff size={20} />
                            )}
                        </div>
                    </div>

                    <div className="relative w-full max-w-md">
                        <input
                            type={confirmPasswordVisible ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onFocus={() =>
                                handleFocus(
                                    confirmPassword,
                                    setConfirmPassword,
                                    'Confirm Password'
                                )
                            }
                            onBlur={() =>
                                handleBlur(
                                    confirmPassword,
                                    setConfirmPassword,
                                    'Confirm Password'
                                )
                            }
                            className="flex w-full p-2 px-4 text-xs items-center text-ginaBlue border border-2 border-ginaBlue rounded-lg"
                            required
                        />
                        <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={toggleConfirmPasswordVisibility}
                        >
                            {confirmPasswordVisible ? (
                                <Eye size={20} />
                            ) : (
                                <EyeOff size={20} />
                            )}
                        </div>
                    </div>
                </Form>

                <div className="flex gap-4">
                    <input
                        type="checkbox"
                        checked={isAgreed}
                        onChange={handleCheckboxChange}
                        required
                    />
                    <span className="text-xs">
                        Agree to the terms and conditions
                    </span>
                </div>

                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

                <button
                    type="submit"
                    className="flex justify-center items-center rounded-xl px-8 py-2 text-sm text-ginaWhite bg-ginaBlue font-medium border border-2 border-ginaBlue hover:bg-ginaWhite hover:text-ginaBlue focus:ring focus:ring-ginaBlue/50 shadow-md"
                >
                    Sign Up
                </button>

                <p className="text-ginaBlue text-sm cursor-pointer">
                    Already have an account? Login here!
                </p>
            </div>
        </div>
    );
};

export default SignupPopup;
