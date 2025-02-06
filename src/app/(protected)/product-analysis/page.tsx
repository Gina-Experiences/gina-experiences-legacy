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
        <div className="w-full min-h-svh">
            <div>Product Analysis</div>

            <ProductList />

            <ModalButton buttonContent="Add">
                <div className="flex flex-col p-12 bg-ginaWhite">
                    <div>What type of product do you want to add?</div>

                    {/* Tab Navigation */}
                    <div>
                        <button onClick={() => setSelectedTab('hotel')}>
                            Hotel
                        </button>
                        <button onClick={() => setSelectedTab('event')}>
                            Event
                        </button>
                        <button
                            onClick={() => setSelectedTab('transportation')}
                        >
                            Transportation
                        </button>
                        <button onClick={() => setSelectedTab('activity')}>
                            Activity
                        </button>
                        <button onClick={() => setSelectedTab('package')}>
                            Package
                        </button>
                    </div>

                    {/* Conditional Form Rendering based on the selected tab */}
                    <div>
                        {selectedTab === 'hotel' && (
                            <HotelForm onCancel={() => {}} onSuccess={() => {}} />
                        )}
                        {selectedTab === 'event' && (
                            <EventForm onCancel={() => {}} onSuccess={() => {}} />
                        )}
                        {selectedTab === 'transportation' && (
                            <TransportationForm onCancel={() => {}} onSuccess={() => {}} />
                        )}
                        {selectedTab === 'activity' && (
                            <ActivityForm onCancel={() => {}} onSuccess={() => {}} />
                        )}
                        {selectedTab === 'package' && (
                            <PackageForm onCancel={() => {}} onSuccess={() => {}} />
                        )}
                    </div>
                </div>
            </ModalButton>
        </div>
    );
}
