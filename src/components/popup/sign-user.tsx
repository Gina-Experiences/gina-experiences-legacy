'use client';

import Image from 'next/image';
import Link from 'next/link';
import { DropdownButton, ProtectedLinks } from '@/components/layout';
import { signIn, signOut, useSession } from 'next-auth/react';
import { CompleteInfoForm } from '@/components/popup';
import { useCallback, useEffect, useState } from 'react';
import { LogIn, LogOut, ChevronDown } from 'lucide-react';
import { userStore } from '@/stores';
import ReactDOM from 'react-dom';

interface SignUserProps {
    variant?: 'dropdown' | 'simple';
}

const SignUser = ({ variant = 'dropdown' }: SignUserProps) => {
    const { data: session, status } = useSession();
    const setSession = userStore((state) => state.setSession);
    const fetchUser = userStore((state) => state.fetchUser);
    const user = userStore((state) => state.user);
    const clearCache = userStore((state) => state.clearCache);
    const [showModal, setShowModal] = useState(false);

    const handleSignOut = useCallback(async () => {
        const confirmSignOut = window.confirm(
            'Are you sure you want to sign out?'
        );
        if (confirmSignOut) {
            await signOut({ callbackUrl: '/' });
            clearCache();
            setShowModal(false);
        }
    }, [clearCache]);

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.id) {
            clearCache();
            setSession(session);
            fetchUser(session.user.id);
        }
    }, [status, session, setSession, fetchUser, clearCache]);

    useEffect(() => {
        setShowModal(user ? !user.is_complete_information : false);
    }, [user]);

    if (status === 'loading') return <p>Loading...</p>;

    if (session && variant === 'dropdown') {
        return (
            <div className="w-full">
                <DropdownButton
                    buttonContent={
                        <div className="border-2 border-ginaYellow rounded-3xl p-1 flex items-center justify-center">
                            <Image
                                src={
                                    session.user.image || '/gina/logo-icon.png'
                                }
                                alt="user profile"
                                className="gap-2 rounded-full w-8 h-8 cursor-pointer"
                                width={100}
                                height={100}
                            />
                            <ChevronDown size={22} color="#F6931D" />
                        </div>
                    }
                    buttonClassName="opacity-90 hover:opacity-100 duration-300 ease-in-out flex items-center"
                    marginTop="mt-4"
                >
                    <div className="flex flex-col gap-1 bg-ginaWhite rounded-2xl p-2 h-auto w-auto">
                        <ProtectedLinks />
                        <button
                            onClick={handleSignOut}
                            className="w-full bg-ginaOrange/15 rounded-xl p-3 flex items-center gap-3 text-ginaOrange font-medium hover:bg-ginaOrange/25 duration-200"
                        >
                            <span>Sign Out</span>
                        </button>
                    </div>
                </DropdownButton>
            </div>
        );
    }

    return (
        <>
            {session ? (
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
            ) : (
                <button
                    className="w-full bg-ginaOrange/15 rounded-xl p-4 flex items-center gap-3 text-ginaOrange font-medium hover:bg-ginaOrange/25 duration-200 xl:py-3 xl:px-12 xl:rounded-full"
                    onClick={() => signIn('google')}
                >
                    <span className="block xl:hidden">
                        <LogIn />
                    </span>
                    <span>Sign In</span>
                </button>
            )}

            {showModal &&
                ReactDOM.createPortal(
                    <div>
                        {/* Modal overlay */}
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-50"
                            aria-hidden="true"
                        />
                        {/* Modal content */}
                        <div
                            className="fixed inset-0 flex items-center justify-center z-50 p-0 sm:p-20"
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="relative flex flex-col items-center justify-center w-auto px-6 py-4 bg-ginaWhite rounded-lg h-full sm:h-auto shadow-lg">
                                <CompleteInfoForm
                                    onComplete={() => {
                                        console.log(
                                            'User completed information.'
                                        );
                                        setShowModal(false);
                                    }}
                                />
                            </div>
                        </div>
                        {/* Optional close button */}
                        <div className="fixed bottom-8 right-8 z-50">
                            <button
                                className="flex justify-center border-2 text-ginaOrange sm:text-ginaWhite border-ginaOrange sm:border-ginaWhite hover:border-ginaOrange hover:bg-ginaOrange hover:text-ginaWhite duration-200 rounded-lg p-2 font-medium gap-2 items-center text-sm"
                                onClick={handleSignOut}
                            >
                                <span>
                                    <LogOut size={18} />
                                </span>
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
};

export default SignUser;
