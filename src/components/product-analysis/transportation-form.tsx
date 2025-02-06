'use client';

import { useEffect, useState } from 'react';
import { transportationStore, productStore } from '@/stores';

interface TransportationFormProps {
    transportationId?: string; // Optional ID for editing
    onCancel: () => void;
    onSuccess: () => void;
}

export default function TransportationForm({
    transportationId,
    onCancel,
    onSuccess,
}: TransportationFormProps) {
    const productType = 'Transportation';
    const [transportationName, setTransportationName] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleInfo, setVehicleInfo] = useState('');
    const [capacity, setCapacity] = useState(1);
    const [vehiclePrice, setVehiclePrice] = useState(0);
    const [imageLink, setImageLink] = useState('');

    const { fetchTransportation, updateTransportation, addTransportation } =
        transportationStore();

    // Fetch existing transportation details if editing
    useEffect(() => {
        if (transportationId) {
            fetchTransportation(transportationId).then(() => {
                const selectedTransportation =
                    transportationStore.getState().selectedTransportation;
                if (selectedTransportation) {
                    setTransportationName(
                        selectedTransportation.transportation_name
                    );
                    setVehicleType(selectedTransportation.vehicle_type);
                    setVehicleInfo(selectedTransportation.vehicle_info);
                    setCapacity(selectedTransportation.capacity);
                    setVehiclePrice(selectedTransportation.vehicle_price);
                    setImageLink(selectedTransportation.image_link);
                }
            });
        }
    }, [transportationId, fetchTransportation]);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const confirmed = window.confirm(
            transportationId
                ? 'Are you sure you want to update this transportation?'
                : 'Are you sure you want to create this transportation?'
        );
        if (!confirmed) {
            return;
        }

        try {
            if (transportationId) {
                // Update existing transportation
                await updateTransportation(transportationId, {
                    transportation_name: transportationName,
                    vehicle_type: vehicleType,
                    vehicle_info: vehicleInfo,
                    capacity,
                    vehicle_price: vehiclePrice,
                    image_link: imageLink,
                });

                console.log('Transportation updated successfully!');
                onSuccess(); // Call onSuccess after successful update
            } else {
                // Create new transportation
                const newProduct: { product_id: string } = await productStore
                    .getState()
                    .addProduct(productType);

                if (newProduct) {
                    await addTransportation(
                        newProduct.product_id,
                        transportationName,
                        vehicleType,
                        vehicleInfo,
                        capacity,
                        vehiclePrice,
                        imageLink
                    );

                    console.log('Transportation created successfully!');
                    onSuccess(); // Call onSuccess after successful creation
                }
            }

            resetForm();
        } catch (error) {
            console.error('Error processing transportation:', error);
        }
    };

    const resetForm = () => {
        setTransportationName('');
        setVehicleType('');
        setVehicleInfo('');
        setCapacity(1);
        setVehiclePrice(0);
        setImageLink('');
        onCancel(); // Call the cancel callback to close the form/modal
    };

    return (
        <div className="w-full min-h-[500px] max-h-screen p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">
                {transportationId
                    ? 'Edit Transportation'
                    : 'Transportation Form'}
            </h2>
            <form onSubmit={handleSubmit} className="gap-4 grid grid-cols-2">
                <div>
                    <label
                        htmlFor="transportationName"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        Transportation Name:
                    </label>
                    <input
                        type="text"
                        id="transportationName"
                        name="transportationName"
                        value={transportationName}
                        onChange={(e) => setTransportationName(e.target.value)}
                        required
                        className="mt-1 block w-full border border-ginaBlack/60 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label
                        htmlFor="vehicleType"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        Vehicle Type:
                    </label>
                    <input
                        type="text"
                        id="vehicleType"
                        name="vehicleType"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        required
                        className="mt-1 block w-full border border-ginaBlack/60 rounded-md shadow-sm p-2"
                    />
                </div>
                <div className="col-span-2">
                    <label
                        htmlFor="vehicleInfo"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        Vehicle Info:
                    </label>
                    <textarea
                        id="vehicleInfo"
                        name="vehicleInfo"
                        value={vehicleInfo}
                        onChange={(e) => setVehicleInfo(e.target.value)}
                        required
                        className="mt-1 block w-full border border-ginaBlack/60 rounded-md shadow-sm p-2"
                    ></textarea>
                </div>
                <div>
                    <label
                        htmlFor="capacity"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        Capacity:
                    </label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(Number(e.target.value))}
                        required
                        className="mt-1 block w-full border border-ginaBlack/60 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label
                        htmlFor="vehiclePrice"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        Vehicle Price:
                    </label>
                    <input
                        type="number"
                        id="vehiclePrice"
                        name="vehiclePrice"
                        value={vehiclePrice}
                        onChange={(e) =>
                            setVehiclePrice(Number(e.target.value))
                        }
                        required
                        className="mt-1 block w-full border border-ginaBlack/60 rounded-md shadow-sm p-2"
                    />
                </div>
                <div className="col-span-2">
                    <label
                        htmlFor="imageLink"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        Image Link:
                    </label>
                    <input
                        type="text"
                        id="imageLink"
                        name="imageLink"
                        value={imageLink}
                        onChange={(e) => setImageLink(e.target.value)}
                        required
                        className="mt-1 block w-full border border-ginaBlack/60 rounded-md shadow-sm p-2"
                    />
                </div>
                <div className="col-start-2 space-x-4 p-4">
                    <button
                        type="button"
                        onClick={resetForm}
                        className="px-4 py-2 bg-ginaGray text-ginaBlack rounded-xl"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-ginaOrange text-white rounded-xl"
                    >
                        {transportationId
                            ? 'Save Transportation'
                            : 'Create Transportation'}
                    </button>
                </div>
            </form>
        </div>
    );
}
