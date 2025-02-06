'use client';

import { useEffect, useState } from 'react';
import {
    packageStore,
    transportationStore,
    hotelStore,
    eventStore,
    activityStore,
} from '@/stores';

export default function ProductList() {
    const {
        packages,
        fetchAllPackages,
        isLoading: isLoadingPackages,
        error: errorPackages,
    } = packageStore();
    const {
        transportations,
        fetchAllTransportations,
        isLoading: isLoadingTransportations,
        error: errorTransportations,
    } = transportationStore();
    const {
        hotels,
        fetchAllHotels,
        isLoading: isLoadingHotels,
        error: errorHotels,
    } = hotelStore();
    const {
        events,
        fetchAllEvents,
        isLoading: isLoadingEvents,
        error: errorEvents,
    } = eventStore();
    const {
        activities,
        fetchAllActivities,
        isLoading: isLoadingActivities,
        error: errorActivities,
    } = activityStore();

    // Active tab state
    const [activeTab, setActiveTab] = useState<
        'packages' | 'transportations' | 'hotels' | 'events' | 'activities'
    >('packages');

    // Status Filter State
    const [statusFilter, setStatusFilter] = useState<
        'all' | 'active' | 'inactive'
    >('all');

    useEffect(() => {
        fetchAllPackages();
        fetchAllTransportations();
        fetchAllHotels();
        fetchAllEvents();
        fetchAllActivities();
    }, []);

    // Determine which data to display based on active tab
    let dataToDisplay: any[] | null = null;
    let isLoading = false;
    let error: string | null = null;

    switch (activeTab) {
        case 'packages':
            dataToDisplay = packages;
            isLoading = isLoadingPackages;
            error = errorPackages;
            break;
        case 'transportations':
            dataToDisplay = transportations;
            isLoading = isLoadingTransportations;
            error = errorTransportations;
            break;
        case 'hotels':
            dataToDisplay = hotels;
            isLoading = isLoadingHotels;
            error = errorHotels;
            break;
        case 'events':
            dataToDisplay = events;
            isLoading = isLoadingEvents;
            error = errorEvents;
            break;
        case 'activities':
            dataToDisplay = activities;
            isLoading = isLoadingActivities;
            error = errorActivities;
            break;
    }

    // Apply status filter
    const filteredData = dataToDisplay?.filter((item) =>
        statusFilter === 'all'
            ? true
            : statusFilter === 'active'
              ? item.is_active
              : !item.is_active
    );

    return (
        <div>
            {/* Tabs Navigation */}
            <div className="flex border-b">
                {[
                    'packages',
                    'transportations',
                    'hotels',
                    'events',
                    'activities',
                ].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`py-2 px-4 text-sm font-semibold border-b-2 ${
                            activeTab === tab
                                ? 'border-blue-500 text-blue-500'
                                : 'border-transparent text-gray-600'
                        }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {/* Filter Dropdown */}
            <div className="mt-4 flex items-center gap-2">
                <label className="text-sm font-medium">Filter by Status:</label>
                <select
                    className="border rounded px-2 py-1"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                </select>
            </div>

            {/* Content */}
            <div className="mt-4">
                {/* Loading state */}
                {isLoading && <p>Loading...</p>}

                {/* Error state */}
                {error && <p className="text-red-500">{error}</p>}

                {/* Render data list */}
                <ul className="space-y-4">
                    {filteredData?.map((item) => (
                        <li
                            key={
                                item.package_id ||
                                item.transportation_id ||
                                item.hotel_id ||
                                item.event_id ||
                                item.activity_id
                            }
                            className="border p-4 rounded-md shadow"
                        >
                            <h3 className="text-lg font-semibold">
                                {item.package_name || item.name}
                            </h3>
                            <p className="text-gray-600">{item.highlights}</p>
                            <p>
                                <strong>Duration:</strong>{' '}
                                {item.duration_number}{' '}
                                {item.duration_unit === 'H' ? 'Hours' : 'Days'}
                            </p>
                            <p>
                                <strong>Price:</strong> $
                                {item.package_price?.toFixed(2) ||
                                    item.price?.toFixed(2)}
                            </p>
                            <p>
                                <strong>Status:</strong>{' '}
                                {item.is_active ? (
                                    <span className="text-green-600 font-semibold">
                                        🟢 Active
                                    </span>
                                ) : (
                                    <span className="text-red-600 font-semibold">
                                        🔴 Inactive
                                    </span>
                                )}
                            </p>

                            {/* Action Buttons */}
                            <div className="mt-2 flex gap-2">
                                {item.is_active ? (
                                    <button className="px-4 py-2 text-white bg-red-500 rounded-md">
                                        Deactivate
                                    </button>
                                ) : (
                                    <button className="px-4 py-2 text-white bg-green-500 rounded-md">
                                        Reactivate
                                    </button>
                                )}
                                <button className="px-4 py-2 text-white bg-yellow-500 rounded-md">
                                    Edit
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Message if no items */}
                {!isLoading && !error && filteredData?.length === 0 && (
                    <p>No items found.</p>
                )}
            </div>
        </div>
    );
}
