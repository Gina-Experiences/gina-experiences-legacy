'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const SignupPopup = () => {
    const { data: session, status } = useSession();
    const { user, expires } = session || {};
    const { email, name, image } = user || {};
    console.log('Session:', session);
    console.log('Status:', status);
    console.log('pictuer', image);

    if (session) {
        return (
            <div className="flex items-center gap-2">
                <Image
                    src={image}
                    alt="user profile"
                    className="gap-2 rounded-full"
                    width={50}
                    height={50}
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
