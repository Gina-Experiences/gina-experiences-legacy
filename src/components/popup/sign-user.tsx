'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { CompleteInfoForm } from '@/components/popup';
import { userStore } from '@/stores';
import { useEffect, useState, useCallback } from 'react';
import { LogIn, LogOut } from 'lucide-react';

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
            signOut({ callbackUrl: '/' });
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
                <div className="w-full flex items-center gap-2">
                    {/* <Image
                        src={session.user.image || '/gina/logo-icon.png'}
                        alt="user profile"
                        className="gap-2 rounded-full"
                        width={50}
                        height={50}
                    /> */}
                    <div className="w-full">
                        <button
                            onClick={handleSignOut}
                            className="w-full bg-ginaOrange/15 rounded-xl p-4 flex items-center gap-3 text-ginaOrange font-medium hover:bg-ginaOrange/25 duration-200"
                        >
                            <span>
                                <LogOut />
                            </span>
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            )}

            {!session && (
                <button
                    className="w-full bg-ginaBlue/15 rounded-xl p-4 flex items-center gap-3 text-ginaBlue font-medium hover:bg-ginaBlue/25 duration-200 xl:py-2 xl:px-4 xl:rounded-full"
                    onClick={() => signIn('google')}
                >
                    <span>
                        <LogIn />
                    </span>
                    <span>Sign In</span>
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
