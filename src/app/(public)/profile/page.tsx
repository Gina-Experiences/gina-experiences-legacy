'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProfilePage, FavoritesPage } from '@/components/profile';
import { userStore } from '@/stores';

export default function Profile() {
    const user = userStore((state) => state.user);
    const [activeTab, setActiveTab] = useState<'profile' | 'favorites'>(
        'profile'
    ); // Default active tab is 'profile'

    const handleTabClick = (tab: 'profile' | 'favorites') => {
        setActiveTab(tab);
    };

    return (
        <div className="w-full min-h-svh p-4 flex items-center justify-center flex-col">
            <h1 className="mt-6 text-2xl">
                {activeTab === 'profile' ? 'Profile' : 'Favorites'}
            </h1>

            <Image
                src={user.image || '/images/gina/logo-icon.png'}
                alt="User Profile"
                quality={100}
                width={100}
                height={100}
            />

            <div className="flex space-x-4 mb-4">
                <button
                    onClick={() => handleTabClick('profile')}
                    className={`px-4 py-2 border rounded-lg text-ginaBlack ${
                        activeTab === 'profile' ? 'bg-ginaBlue' : 'bg-ginaHray'
                    }`}
                >
                    Profile
                </button>
                <button
                    onClick={() => handleTabClick('favorites')}
                    className={`px-4 py-2 border rounded-lg text-ginaBlack ${
                        activeTab === 'favorites'
                            ? 'bg-ginaOrange'
                            : 'bg-ginaGray'
                    }`}
                >
                    Favorites
                </button>
            </div>

            <div>
                {activeTab === 'profile' ? <ProfilePage /> : <FavoritesPage />}
            </div>
        </div>
    );
}
