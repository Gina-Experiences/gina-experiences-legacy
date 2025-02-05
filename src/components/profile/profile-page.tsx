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
        <div className="w-full min-h-svh flex items-center justify-center flex-col gap-4">
            <h1>Profile Page</h1>

            <div>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    value={userData.email || ''}
                    disabled
                    className="uppercase"
                />
            </div>

            <div>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstname"
                    value={userData.firstname || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="uppercase"
                />
            </div>

            <div>
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastname"
                    value={userData.lastname || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="uppercase"
                />
            </div>

            <div>
                <label>Gender</label>
                <input
                    type="text"
                    name="gender"
                    value={userData.gender || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="uppercase"
                />
            </div>

            <div>
                <label>Birthdate</label>
                <input
                    type="date"
                    name="birthdate"
                    value={userData.birthdate || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="uppercase"
                />
            </div>

            <div>
                <label>Phone</label>
                <input
                    type="text"
                    name="phone"
                    value={userData.phone || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="uppercase"
                />
            </div>

            <div>
                <label>Address</label>
                <input
                    type="text"
                    name="address"
                    value={userData.address || ''}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="uppercase"
                />
            </div>

            <button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            {isEditing && <button onClick={handleSave}>Save</button>}
        </div>
    );
}
