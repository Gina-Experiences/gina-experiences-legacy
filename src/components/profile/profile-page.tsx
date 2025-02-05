'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { userStore } from '@/stores';

export default function ProfilePage() {
    const user = userStore((state) => state.user);
    const updateUser = userStore((state) => state.updateUser);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState<any>({});
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setUserData({
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                gender: user.gender,
                birthdate: user.birthdate
                    ? user.birthdate instanceof Date
                        ? user.birthdate.toISOString().split('T')[0]
                        : user.birthdate.split('T')[0]
                    : '',
                phone: user.phone,
                address: user.address,
                image: user.image,
            });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        // Confirmation before checking form fields
        const isConfirmed = window.confirm(
            'Are you sure you want to submit this information?'
        );
        if (!isConfirmed) return;

        // Check if essential fields are populated
        if (
            !userData.firstname.trim() ||
            !userData.lastname.trim() ||
            !userData.phone.trim() ||
            !userData.gender.trim() ||
            !userData.address.trim() ||
            !userData.birthdate.trim()
        ) {
            setError('All fields are required');
            return;
        }

        try {
            console.log('Updating user with data:', userData);

            // Ensure birthdate is passed as a Date object
            const birthdate = new Date(userData.birthdate); // Convert to Date

            await updateUser(user?.id, {
                firstname: userData.firstname,
                lastname: userData.lastname,
                gender: userData.gender,
                birthdate, // Pass as Date
                phone: userData.phone,
                address: userData.address,
            });

            console.log('User information updated successfully!');
            setError(''); // Clear error message if successful
            setIsEditing(false); // Exit editing mode
        } catch (err) {
            console.error('Error updating user:', err);
            setError('Failed to update user information. Please try again.');
        }
    };

    return (
        <div className="flex flex-col py-8 lg:py-0">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <label className="text-ginaOrange">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={userData.email || ''}
                        disabled
                        className="p-2 px-4 uppercase bg-ginaYellow/15 rounded-xl w-full"
                    />
                </div>

                <div>
                    <label className="text-ginaOrange">First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        value={userData.firstname || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="p-2 px-4 uppercase bg-ginaYellow/15 rounded-xl w-full"
                    />
                </div>

                <div>
                    <label className="text-ginaOrange">Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        value={userData.lastname || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="p-2 px-4 uppercase bg-ginaYellow/15 rounded-xl w-full"
                    />
                </div>

                <div>
                    <label className="text-ginaOrange">Gender</label>
                    <input
                        type="text"
                        name="gender"
                        value={userData.gender || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="p-2 px-4 uppercase bg-ginaYellow/15 rounded-xl w-full"
                    />
                </div>

                <div>
                    <label className="text-ginaOrange">Birthdate</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={userData.birthdate || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="p-2 px-4 uppercase bg-ginaYellow/15 rounded-xl w-full"
                    />
                </div>

                <div>
                    <label className="text-ginaOrange">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={userData.phone || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="p-2 px-4 uppercase bg-ginaYellow/15 rounded-xl w-full"
                    />
                </div>

                <div className="lg:col-span-2">
                    <label className="text-ginaOrange">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={userData.address || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="p-2 px-4 uppercase bg-ginaYellow/15 rounded-xl w-full "
                    />
                </div>

            </div>
            <button 
                onClick={() => setIsEditing(!isEditing)}
                className="rounded-xl bg-ginaYellow py-2 px-6 mt-8 text-white text-sm font-medium shadow-md hover:bg-ginaBlue transition-all duration-200 ease-in-out self-center w-auto"
            >
                {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            {isEditing && <button onClick={handleSave} className="rounded-xl border-ginaYellow border-2 py-2 px-6 m-2 text-ginaYellow text-sm font-medium hover:bg-ginaBlue hover:border-ginaBlue hover:text-white transition-all duration-200 ease-in-out self-center">Save</button>}
        </div>
    );
}
