'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProfilePage, FavoritesPage } from '@/components/profile';
import { userStore } from '@/stores';
import { CgProfile } from 'react-icons/cg';
import { GrFavorite } from 'react-icons/gr';

export default function Profile() {
    const user = userStore((state) => state.user);
    const [activeTab, setActiveTab] = useState<'profile' | 'favorites'>(
        'profile'
    ); // Default active tab is 'profile'

    const handleTabClick = (tab: 'profile' | 'favorites') => {
        setActiveTab(tab);
    };

    return (
        <div className="flex flex-col items-center w-svw text-ginaBlack">
            <div className="w-full max-w-screen-2xl flex flex-col justify-center items-center p-8">
                <div className="w-full rounded-t-3xl h-32 bg-gradient-to-r from-ginaLightYellow to-ginaOrange"></div>
                <div className="w-full py-12 p-2 flex items-center flex-col space-y-8">
                    <h1 className="mt-6 text-4xl font-semibold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)22%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text lg:self-start px-12">
                        {activeTab === 'profile' ? 'My Profile' : 'Favorites'}
                    </h1>
                    <hr className="w-full border-t-2 border-ginaYellow" />
                    <div className="lg:flex lg:space-x-16">
                        <div className="flex flex-col justify-center items-center lg:justify-start gap-4">
                            <Image
                                src={user?.image || '/images/gina/logo-icon.png'}
                                alt="User Profile"
                                quality={100}
                                width={100}
                                height={100}
                                className="rounded-full"
                            />

                            <div className="flex lg:flex-col gap-4 m-4">
                                <button
                                    onClick={() => handleTabClick('profile')}
                                    className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-ginaBlack ${
                                        activeTab === 'profile'
                                            ? 'bg-ginaBlue text-white font-medium'
                                            : 'bg-ginaGray'
                                    }`}
                                >
                                    <CgProfile />
                                    Profile
                                </button>
                                <button
                                    onClick={() => handleTabClick('favorites')}
                                    className={`flex items-center justify-center gap-2 px-4 py-2 border rounded-lg text-ginaBlack ${
                                        activeTab === 'favorites'
                                            ? 'bg-ginaOrange text-white font-medium'
                                            : 'bg-ginaGray'
                                    }`}
                                >
                                    <GrFavorite />
                                    Favorites
                                </button>
                            </div>
                        </div>

                        <div>
                            {activeTab === 'profile' ? (
                                <ProfilePage />
                            ) : (
                                <FavoritesPage />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
