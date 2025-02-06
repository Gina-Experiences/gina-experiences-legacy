'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
    packageStore,
    transportationStore,
    hotelStore,
    eventStore,
    activityStore,
} from '@/stores';
import {
    TransportationForm,
    HotelForm,
    EventForm,
    ActivityForm,
    PackageForm,
} from '@/components/product-analysis';
import { ModalButton } from '@/components/layout';

export default function ProductList() {
    const {
        packages,
        fetchAllPackages,
        removePackage,
        recoverPackage,
        isLoading: isLoadingPackages,
        error: errorPackages,
    } = packageStore();
    const {
        transportations,
        fetchAllTransportations,
        removeTransportation,
        recoverTransportation,
        isLoading: isLoadingTransportations,
        error: errorTransportations,
    } = transportationStore();
    const {
        hotels,
        fetchAllHotels,
        removeHotel,
        recoverHotel,
        isLoading: isLoadingHotels,
        error: errorHotels,
    } = hotelStore();
    const {
        events,
        fetchAllEvents,
        removeEvent,
        recoverEvent,
        isLoading: isLoadingEvents,
        error: errorEvents,
    } = eventStore();
    const {
        activities,
        fetchAllActivities,
        removeActivity,
        recoverActivity,
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

    // State for managing the edit forms
    const [editingTransportationId, setEditingTransportationId] = useState<
        string | null
    >(null);
    const [editingHotelId, setEditingHotelId] = useState<string | null>(null);
    const [editingEventId, setEditingEventId] = useState<string | null>(null);
    const [editingActivityId, setEditingActivityId] = useState<string | null>(
        null
    );
    const [editingPackageId, setEditingPackageId] = useState<string | null>(
        null
    );

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

    const getItemName = (item: any) => {
        switch (activeTab) {
            case 'packages':
                return item.package_name;
            case 'transportations':
                return item.transportation_name;
            case 'hotels':
                return item.hotel_name;
            case 'events':
                return item.event_name;
            case 'activities':
                return item.activity_name;
            default:
                return item.name; // fallback
        }
    };

    const handleAction = (item: any) => {
        const action = item.is_active ? 'deactivate' : 'reactivate';
        const confirmMessage = `Are you sure you want to ${action} this ${activeTab.slice(0, -1)}?`;

        if (window.confirm(confirmMessage)) {
            const actionsMap: any = {
                packages: item.is_active ? removePackage : recoverPackage,
                transportations: item.is_active
                    ? removeTransportation
                    : recoverTransportation,
                hotels: item.is_active ? removeHotel : recoverHotel,
                events: item.is_active ? removeEvent : recoverEvent,
                activities: item.is_active ? removeActivity : recoverActivity,
            };

            // Perform the action
            actionsMap[activeTab](item[`${activeTab.slice(0, -1)}_id`]).then(
                () => {
                    // Fetch only the affected data
                    switch (activeTab) {
                        case 'packages':
                            fetchAllPackages();
                            break;
                        case 'transportations':
                            fetchAllTransportations();
                            break;
                        case 'hotels':
                            fetchAllHotels();
                            break;
                        case 'events':
                            fetchAllEvents();
                            break;
                        case 'activities':
                            fetchAllActivities();
                            break;
                    }
                }
            );
        }
    };

    const handleEditTransportation = (item: any) => {
        setEditingTransportationId(item.transportation_id);
    };

    const handleEditHotel = (item: any) => {
        setEditingHotelId(item.hotel_id);
    };

    const handleEditEvent = (item: any) => {
        setEditingEventId(item.event_id);
    };

    const handleEditActivity = (item: any) => {
        setEditingActivityId(item.activity_id);
    };

    const handleEditPackage = (item: any) => {
        setEditingPackageId(item.package_id);
    };

    const handleCancelEdit = () => {
        setEditingTransportationId(null);
        setEditingHotelId(null);
        setEditingEventId(null);
        setEditingActivityId(null);
        setEditingPackageId(null);
    };

    const handleSuccessfulEdit = () => {
        handleCancelEdit(); // Reset editing states
        switch (activeTab) {
            case 'transportations':
                fetchAllTransportations();
                break;
            case 'hotels':
                fetchAllHotels();
                break;
            case 'events':
                fetchAllEvents();
                break;
            case 'activities':
                fetchAllActivities();
                break;
            case 'packages':
                fetchAllPackages();
                break;
        }
    };

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
                            <Image
                                src={
                                    item?.image_link ||
                                    '/images/gina/logo-icon.png'
                                }
                                alt={item?.name || 'Item Name'}
                                width={100}
                                height={100}
                                className="object-cover object-center w-52 h-52 rounded-md"
                            />

                            <h3 className="text-lg font-semibold">
                                {getItemName(item)}
                            </h3>
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
                                <button
                                    className={`px-4 py-2 text-white ${
                                        item.is_active
                                            ? 'bg-red-500'
                                            : 'bg-green-500'
                                    } rounded-md`}
                                    onClick={() => handleAction(item)}
                                >
                                    {item.is_active
                                        ? 'Deactivate'
                                        : 'Reactivate'}
                                </button>
                                <ModalButton buttonContent="Edit">
                                    <div className="bg-ginaWhite p-8">
                                        {activeTab === 'transportations' && (
                                            <TransportationForm
                                                transportationId={
                                                    item.transportation_id
                                                }
                                                onCancel={handleCancelEdit}
                                                onSuccess={handleSuccessfulEdit}
                                            />
                                        )}
                                        {activeTab === 'hotels' && (
                                            <HotelForm
                                                hotelId={item.hotel_id}
                                                onCancel={handleCancelEdit}
                                                onSuccess={handleSuccessfulEdit}
                                            />
                                        )}
                                        {activeTab === 'events' && (
                                            <EventForm
                                                eventId={item.event_id}
                                                onCancel={handleCancelEdit}
                                                onSuccess={handleSuccessfulEdit}
                                            />
                                        )}
                                        {activeTab === 'activities' && (
                                            <ActivityForm
                                                activityId={item.activity_id}
                                                onCancel={handleCancelEdit}
                                                onSuccess={handleSuccessfulEdit}
                                            />
                                        )}
                                        {activeTab === 'packages' && (
                                            <PackageForm
                                                packageId={item.package_id}
                                                onCancel={handleCancelEdit}
                                                onSuccess={handleSuccessfulEdit}
                                            />
                                        )}
                                    </div>
                                </ModalButton>
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
