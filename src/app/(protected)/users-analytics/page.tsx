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
        setSession,
    } = userStore();

    const [activeTab, setActiveTab] = useState<'admin' | 'customer'>('admin');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedUser, setSelectedUser] = useState<any | null>(null);

    useEffect(() => {
        fetchAllUsers();
    }, [fetchAllUsers]);

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
    };

    const filteredUsers = users?.filter(
        (user) =>
            user.role === activeTab &&
            (user.firstname
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase()) ||
                user.lastname
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()))
    );

    return (
        <div>
            <div className="w-full text-center font-bold text-3xl">
                User Directory
            </div>

            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            <div>
                <button onClick={() => setActiveTab('admin')}>Admins</button>
                <button onClick={() => setActiveTab('customer')}>
                    Customers
                </button>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Search User"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* List of Users */}
            <h2>{activeTab === 'admin' ? 'Admins' : 'Customers'}</h2>
            <ul>
                {filteredUsers?.map((user) => (
                    <li key={user.id}>
                        {user.firstname} {user.lastname} ({user.role})
                        <button onClick={() => handleViewDetails(user.id)}>
                            View Details
                        </button>
                        <button
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
                        <button onClick={() => handleDeactivateUser(user.id)}>
                            Deactivate User
                        </button>
                    </li>
                ))}
            </ul>

            {/* User Details Container */}
            {selectedUser && (
                <div>
                    <h3>User Details</h3>
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
    );
}
