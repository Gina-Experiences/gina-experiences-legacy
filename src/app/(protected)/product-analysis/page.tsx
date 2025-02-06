'use client';

import { useState } from 'react';
import {
    HotelForm,
    EventForm,
    TransportationForm,
    ActivityForm,
    PackageForm,
    ProductList,
} from '@/components/product-analysis';
import { ModalButton } from '@/components/layout';

export default function ProductAnalysis() {
    const [selectedTab, setSelectedTab] = useState<string>('hotel'); // State to track the selected tab

    return (
        <div className="w-full flex flex-col min-h-svh p-4">
            <div className="text-2xl font-bold mb-4">Product Analysis</div>

            <ProductList />

            <ModalButton
                buttonContent="Add"
                buttonClassName="py-2 px-4 bg-ginaOrange text-ginaWhite rounded-xl self-center mt-8"
            >
                <div className="flex flex-col p-12 bg-ginaWhite rounded-xl shadow-lg">
                    <div className="text-lg font-semibold mb-4">
                        What type of product do you want to add?
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex space-x-4 mb-4">
                        <button
                            className={`px-4 py-2 rounded-xl ${selectedTab === 'hotel' ? 'bg-ginaYellow text-white font-medium' : 'bg-gray-200'}`}
                            onClick={() => setSelectedTab('hotel')}
                        >
                            Hotel
                        </button>
                        <button
                            className={`px-4 py-2 rounded-xl ${selectedTab === 'event' ? 'bg-ginaYellow text-white font-medium' : 'bg-gray-200'}`}
                            onClick={() => setSelectedTab('event')}
                        >
                            Event
                        </button>
                        <button
                            className={`px-4 py-2 rounded-xl ${selectedTab === 'transportation' ? 'bg-ginaYellow text-white font-medium' : 'bg-gray-200'}`}
                            onClick={() => setSelectedTab('transportation')}
                        >
                            Transportation
                        </button>
                        <button
                            className={`px-4 py-2 rounded-xl ${selectedTab === 'activity' ? 'bg-ginaYellow text-white font-medium' : 'bg-gray-200'}`}
                            onClick={() => setSelectedTab('activity')}
                        >
                            Activity
                        </button>
                        <button
                            className={`px-4 py-2 rounded-xl ${selectedTab === 'package' ? 'bg-ginaYellow text-white font-medium' : 'bg-gray-200'}`}
                            onClick={() => setSelectedTab('package')}
                        >
                            Package
                        </button>
                    </div>

                    {/* Conditional Form Rendering based on the selected tab */}
                    <div>
                        {selectedTab === 'hotel' && (
                            <HotelForm
                                onCancel={() => {}}
                                onSuccess={() => {}}
                            />
                        )}
                        {selectedTab === 'event' && (
                            <EventForm
                                onCancel={() => {}}
                                onSuccess={() => {}}
                            />
                        )}
                        {selectedTab === 'transportation' && (
                            <TransportationForm
                                onCancel={() => {}}
                                onSuccess={() => {}}
                            />
                        )}
                        {selectedTab === 'activity' && (
                            <ActivityForm
                                onCancel={() => {}}
                                onSuccess={() => {}}
                            />
                        )}
                        {selectedTab === 'package' && (
                            <PackageForm
                                onCancel={() => {}}
                                onSuccess={() => {}}
                            />
                        )}
                    </div>
                </div>
            </ModalButton>
        </div>
    );
}
