'use client';

import { useState, useEffect } from 'react';
import { userStore } from '@/stores';

export default function UsersAnalytics() {
    const {
        users,
        isLoading,
        error,
        fetchAllUsers,
        fetchUser,
        changeUserRole,
        deactivateUser,
        reactivateUser,
        setSession,
    } = userStore();

    const [activeTab, setActiveTab] = useState<
        'admin' | 'customer' | 'deactivated'
    >('admin');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<any | null>(null);

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

    useEffect(() => {
        setSelectedUser(null);
    }, [activeTab]);

    const handleViewDetails = (userId: string) => {
        fetchUser(userId);
        const user = users?.find((user) => user.id === userId);
        setSelectedUser(user);
    };

    const handleChangeRole = (
        userId: string,
        newRole: 'admin' | 'customer'
    ) => {
        if (
            window.confirm(
                `Are you sure you want to make this user a ${newRole}?`
            )
        ) {
            changeUserRole(userId, newRole).then(() => {
                const updatedUser = users?.find((user) => user.id === userId);
                if (updatedUser) {
                    setSession({
                        user: updatedUser,
                        expires: new Date().toISOString(),
                    });
                }

                fetchAllUsers();
            });
        }
    };

    const handleDeactivateUser = (userId: string) => {
        if (window.confirm('Are you sure you want to deactivate this user?')) {
            deactivateUser(userId);
        }

        fetchAllUsers();
    };

    const handleReactivateUser = (userId: string) => {
        if (window.confirm('Are you sure you want to reactivate this user?')) {
            reactivateUser(userId);
        }

        fetchAllUsers();
    };

    const filteredUsers = users
        ?.filter((user) => {
            if (activeTab === 'deactivated') {
                return user.is_active === false;
            } else {
                return user.is_active === true && user.role === activeTab;
            }
        })
        .filter(
            (user) =>
                user.firstname
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                user.lastname?.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <div className="flex flex-col p-4">
            <div className="font-semibold text-2xl mb-4 self-center lg:self-start">User Directory</div>

            <div className="mb-4">
                <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-2 lg:space-y-0">
                    <button
                        className={`px-4 py-2 rounded-xl ${
                            activeTab === 'admin' ? 'bg-ginaYellow text-white font-medium' : 'bg-gray-200'
                        }`}
                        onClick={() => setActiveTab('admin')}
                    >
                        Admins
                    </button>
                    <button
                        className={`px-4 py-2 rounded-xl ${
                            activeTab === 'customer' ? 'bg-ginaYellow text-white font-medium' : 'bg-gray-200'
                        }`}
                        onClick={() => setActiveTab('customer')}
                    >
                        Customers
                    </button>
                    <button
                        className={`px-4 py-2 rounded-xl ${
                            activeTab === 'deactivated' ? 'bg-ginaYellow text-white font-medium' : 'bg-gray-200'
                        }`}
                        onClick={() => setActiveTab('deactivated')}
                    >
                        Deactivated
                    </button>
                </div>
            </div>

            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search User"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-ginaYellow rounded-xl placeholder:text-ginaYellow/50 placeholder:font-medium"
                />
            </div>

            <div className="flex border-2 border-ginaYellow rounded-l-xl flex-col">
                <h2 className="text-xl text-white font-semibold p-4 bg-ginaYellow">
                    {activeTab === 'admin'
                        ? 'Admins'
                        : activeTab === 'customer'
                        ? 'Customers'
                        : 'Deactivated Users'}
                </h2>
                <ul className="space-y-2 ">
                    {filteredUsers?.map((user) => (
                        <li key={user.id} className="p-4 flex flex-col lg:flex-row  justify-between items-center">
                            <div className="flex flex-col lg:flex-row items-center  space-x-4">
                                <img
                                    src={user.image}
                                    alt={`${user.firstname} ${user.lastname}`}
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    {user.firstname} {user.lastname} ({user.role})
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row space-x-0 space-y-2 lg:space-x-2 lg:space-y-0 p-2">
                                <button
                                    className="px-4 py-2 bg-ginaBlue text-ginaWhite rounded-xl"
                                    onClick={() => {
                                        if (selectedUser?.id === user.id) {
                                            setSelectedUser(null);
                                        } else {
                                            handleViewDetails(user.id);
                                        }
                                    }}
                                >
                                    {selectedUser?.id === user.id ? 'Hide Details' : 'View Details'}
                                </button>
                                <button
                                    className="px-4 py-2 bg-ginaGreen text-ginaWhite rounded-xl"
                                    onClick={() =>
                                        handleChangeRole(
                                            user.id,
                                            user.role === 'admin' ? 'customer' : 'admin'
                                        )
                                    }
                                >
                                    {user.role === 'admin'
                                        ? 'Turn into Customer'
                                        : 'Turn into Admin'}
                                </button>
                                {activeTab !== 'deactivated' && (
                                    <button
                                        className="px-4 py-2 bg-red-600 text-ginaWhite rounded-xl"
                                        onClick={() => handleDeactivateUser(user.id)}
                                    >
                                        Deactivate User
                                    </button>
                                )}
                                {activeTab === 'deactivated' && (
                                    <button
                                        className="px-4 py-2 bg-ginaYellow text-ginaWhite rounded-xl"
                                        onClick={() => handleReactivateUser(user.id)}
                                    >
                                        Reactivate User
                                    </button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                {selectedUser && (
                    <div className="p-4 border-t border-ginaYellow">
                        <h3 className="text-lg font-semibold mb-2">User Details</h3>
                        <p>
                            <strong>First Name:</strong> {selectedUser.firstname}
                        </p>
                        <p>
                            <strong>Last Name:</strong> {selectedUser.lastname}
                        </p>
                        <p>
                            <strong>Role:</strong> {selectedUser.role}
                        </p>
                        <p>
                            <strong>Email:</strong> {selectedUser.email}
                        </p>
                        <p>
                            <strong>Phone:</strong> {selectedUser.phone}
                        </p>
                        <p>
                            <strong>Address:</strong> {selectedUser.address}
                        </p>
                    </div>
                )}
            </div>
            </div>
    );
}
