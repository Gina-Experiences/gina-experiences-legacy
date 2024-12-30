'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

const SignupPopup = () => {
    const { data: session } = useSession();
    const { user, expires } = session || {};
    const { email, name, image } = user || {};

    if (session) {
        return (
            <div className="flex items-center gap-2">
                <img
                    src={image}
                    alt={name}
                    className="w-12 h-12 rounded-full"
                />
                {/* <div className="text-ginaWhite text-sm">{name}</div>
                    <div className="text-ginaWhite text-sm">{email}</div> */}
                <div
                    className="flex justify-center cursor-pointer border border-ginaLightYellow text-ginaWhite bg-ginaLightYellow hover:border-ginaBlue hover:bg-ginaBlue duration-200 rounded-lg w-full xl:w-24 p-1"
                    onClick={() => signOut()}
                >
                    Sign Out
                </div>
            </div>
        );
    }

    return (
        <button
            className="flex justify-center cursor-pointer border border-ginaLightYellow text-ginaWhite bg-ginaLightYellow hover:border-ginaBlue hover:bg-ginaBlue duration-200 rounded-lg w-full xl:w-24 p-1"
            onClick={() => signIn('google')}
        >
            Start Now
        </button>
    );
};

export default SignupPopup;
