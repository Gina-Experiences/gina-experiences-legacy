'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { CompleteInfoForm } from '@/components/popup';
import { userStore } from '@/stores';
import { useEffect, useState, useCallback } from 'react';

const SignUser = () => {
    const { data: session, status } = useSession();
    const setSession = userStore((state) => state.setSession);
    const fetchUser = userStore((state) => state.fetchUser);
    const user = userStore((state) => state.user);
    const clearCache = userStore((state) => state.clearCache);
    const [showModal, setShowModal] = useState(false);

    const handleSignOut = useCallback(() => {
        const confirmSignOut = window.confirm(
            'Are you sure you want to sign out?'
        );
        if (confirmSignOut) {
            signOut();
            console.log('Clearing cache in Zustand and resetting modal state');
            clearCache();
            setShowModal(false);
        }
    }, [clearCache]);

    // Handle session updates and fetch user data
    useEffect(() => {
        if (status === 'authenticated' && session?.user?.id) {
            console.log('New session detected:', session);
            clearCache();
            setSession(session);
            fetchUser(session.user.id);
        }
    }, [status, session, setSession, fetchUser, clearCache]);

    // Update modal visibility when user changes
    useEffect(() => {
        if (user) {
            if (user.is_complete_information) {
                console.log('User information complete...');
                setShowModal(false);
            } else {
                console.log('User information incomplete...');
                setShowModal(true);
            }
        }
    }, [user]);

    if (status === 'loading') return <p>...</p>;

    return (
        <>
            {session && (
                <div className="flex items-center gap-2">
                    <Image
                        src={session.user.image}
                        alt="user profile"
                        className="gap-2 rounded-full"
                        width={50}
                        height={50}
                    />
                    <div
                        className="flex justify-center cursor-pointer border border-ginaLightYellow text-ginaWhite bg-ginaLightYellow hover:border-ginaBlue hover:bg-ginaBlue duration-200 rounded-lg w-full xl:w-24 p-1"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </div>
                </div>
            )}

            {!session && (
                <button
                    className="flex justify-center cursor-pointer border border-ginaLightYellow text-ginaWhite bg-ginaLightYellow hover:border-ginaBlue hover:bg-ginaBlue duration-200 rounded-lg w-full xl:w-24 p-1"
                    onClick={() => signIn('google')}
                >
                    Start Now
                </button>
            )}

            {showModal && (
                <div>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        aria-hidden="true"
                    ></div>
                    <div
                        className="fixed inset-0 flex items-center justify-center z-50"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="relative w-auto px-6 py-4 bg-white rounded-lg shadow-lg">
                            <CompleteInfoForm
                                onComplete={() => {
                                    console.log(
                                        'User completed their information!'
                                    );
                                    setShowModal(false);
                                }}
                            />
                        </div>
                    </div>
                    <div className="fixed bottom-4 right-4 z-50">
                        <button
                            className="flex justify-center cursor-pointer border text-ginaWhite hover:border-red-500 hover:bg-red-500 duration-200 rounded-lg w-full xl:w-24 p-1"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SignUser;
