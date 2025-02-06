'use client';

import { useState } from 'react';
import { transportationStore, productStore } from '@/stores';

export default function TransportationForm() {
    const productType = 'Transportation';
    const [transportationName, setTransportationName] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const [vehicleInfo, setVehicleInfo] = useState('');
    const [capacity, setCapacity] = useState(1);
    const [vehiclePrice, setVehiclePrice] = useState(0);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const confirmed = window.confirm(
            'Are you sure you want to create this transportation?'
        );
        if (!confirmed) {
            return;
        }

        try {
            const newProduct: { product_id: string } = await productStore
                .getState()
                .addProduct(productType);

            if (newProduct) {
                await transportationStore
                    .getState()
                    .addTransportation(
                        newProduct.product_id,
                        transportationName,
                        vehicleType,
                        vehicleInfo,
                        capacity,
                        vehiclePrice
                    );

                console.log('Transportation created successfully!');

                // Reset form fields
                setTransportationName('');
                setVehicleType('');
                setVehicleInfo('');
                setCapacity(1);
                setVehiclePrice(0);
            }
        } catch (error) {
            console.error('Error creating transportation:', error);
        }
    };

    return (
        <div className="w-full min-h-[500px]">
            <h2>Transportation Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="transportationName">
                        Transportation Name:
                    </label>
                    <input
                        type="text"
                        id="transportationName"
                        name="transportationName"
                        value={transportationName}
                        onChange={(e) => setTransportationName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="vehicleType">Vehicle Type:</label>
                    <input
                        type="text"
                        id="vehicleType"
                        name="vehicleType"
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="vehicleInfo">Vehicle Info:</label>
                    <textarea
                        id="vehicleInfo"
                        name="vehicleInfo"
                        value={vehicleInfo}
                        onChange={(e) => setVehicleInfo(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="capacity">Capacity:</label>
                    <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={capacity}
                        onChange={(e) => setCapacity(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="vehiclePrice">Vehicle Price:</label>
                    <input
                        type="number"
                        id="vehiclePrice"
                        name="vehiclePrice"
                        value={vehiclePrice}
                        onChange={(e) =>
                            setVehiclePrice(Number(e.target.value))
                        }
                        required
                    />
                </div>
                <button type="submit">Create Transportation</button>
            </form>
        </div>
    );
}
