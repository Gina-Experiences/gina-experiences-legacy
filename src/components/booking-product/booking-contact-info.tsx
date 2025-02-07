import { useState, useEffect } from 'react';
import { userStore } from '@/stores';

export default function BookingContactInfo() {
    const user = userStore((state) => state.user);
    const updateUser = userStore((state) => state.updateUser);
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

    return (
        <div className="flex flex-col p-8">
            <div className="py-4">
                <h2 className="text-4xl font-semibold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)22%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text inline-block">
                    Contact Information
                </h2>
                <p className="font-medium">
                    Please provide your information. This is where your
                    confirmation will be sent.
                </p>
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 text-ginaBlack/50">
                <div className="space-y-2">
                    <label className="text-ginaYellow">First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        value={userData.firstname || ''}
                        disabled
                        className="p-2 px-4 uppercase bg-ginaYellow/10 rounded-xl w-full"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-ginaYellow">Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        value={userData.lastname || ''}
                        disabled
                        className="p-2 px-4 uppercase bg-ginaYellow/10 rounded-xl w-full"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-ginaYellow">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={userData.email || ''}
                        disabled
                        className="p-2 px-4 uppercase bg-ginaYellow/10 rounded-xl w-full"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-ginaYellow">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={userData.phone || ''}
                        disabled
                        className="p-2 px-4 uppercase bg-ginaYellow/10 rounded-xl w-full"
                    />
                </div>

                <div className="lg:col-span-2 space-y-2">
                    <label className="text-ginaYellow">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={userData.address || ''}
                        disabled
                        className="p-2 px-4 uppercase bg-ginaYellow/10 rounded-xl w-full "
                    />
                </div>
            </div>
        </div>
    );
}
