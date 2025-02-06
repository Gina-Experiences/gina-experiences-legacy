'use client';

import { useState } from 'react';
import { hotelStore, productStore } from '@/stores';

export default function HotelForm() {
    const productType = 'Hotels';
    const [hotelName, setHotelName] = useState('');
    const [roomType, setRoomType] = useState('');
    const [highlights, setHighlights] = useState('');
    const [whatToExpect, setWhatToExpect] = useState('');
    const [amenities, setAmenities] = useState('');
    const [faqs, setFaqs] = useState('');
    const [hotelPrice, setHotelPrice] = useState(0);
    const [durationNumber, setDurationNumber] = useState(1);
    const [durationUnit, setDurationUnit] = useState('H');

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const confirmed = window.confirm(
            'Are you sure you want to create this hotel?'
        );
        if (!confirmed) {
            return;
        }

        try {
            const newProduct: { product_id: string } = await productStore
                .getState()
                .addProduct(productType);

            if (newProduct) {
                await hotelStore
                    .getState()
                    .addHotel(
                        newProduct.product_id,
                        hotelName,
                        roomType,
                        whatToExpect,
                        amenities,
                        highlights,
                        faqs,
                        hotelPrice,
                        durationNumber,
                        durationUnit as 'H' | 'D'
                    );

                console.log('Hotel created successfully!');

                // Reset form fields
                setHotelName('');
                setRoomType('');
                setHighlights('');
                setWhatToExpect('');
                setAmenities('');
                setFaqs('');
                setHotelPrice(0);
                setDurationNumber(1);
                setDurationUnit('H');
            }
        } catch (error) {
            console.error('Error creating hotel:', error);
        }
    };

    return (
        <div className="w-full min-h-[500px]">
            <h2>Hotel Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="hotelName">Hotel Name:</label>
                    <input
                        type="text"
                        id="hotelName"
                        name="hotelName"
                        value={hotelName}
                        onChange={(e) => setHotelName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="roomType">Room Type:</label>
                    <input
                        type="text"
                        id="roomType"
                        name="roomType"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="highlights">Highlights:</label>
                    <textarea
                        id="highlights"
                        name="highlights"
                        value={highlights}
                        onChange={(e) => setHighlights(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="whatToExpect">What to Expect:</label>
                    <textarea
                        id="whatToExpect"
                        name="whatToExpect"
                        value={whatToExpect}
                        onChange={(e) => setWhatToExpect(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="amenities">Amenities:</label>
                    <input
                        type="text"
                        id="amenities"
                        name="amenities"
                        value={amenities}
                        onChange={(e) => setAmenities(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="faqs">FAQs:</label>
                    <textarea
                        id="faqs"
                        name="faqs"
                        value={faqs}
                        onChange={(e) => setFaqs(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="hotelPrice">Hotel Price:</label>
                    <input
                        type="number"
                        id="hotelPrice"
                        name="hotelPrice"
                        value={hotelPrice}
                        onChange={(e) => setHotelPrice(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="durationNumber">Duration Number:</label>
                    <input
                        type="number"
                        id="durationNumber"
                        name="durationNumber"
                        value={durationNumber}
                        onChange={(e) =>
                            setDurationNumber(Number(e.target.value))
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor="durationUnit">Duration Unit:</label>
                    <select
                        id="durationUnit"
                        name="durationUnit"
                        value={durationUnit}
                        onChange={(e) => setDurationUnit(e.target.value)}
                        required
                    >
                        <option value="H">Hours</option>
                        <option value="D">Days</option>
                    </select>
                </div>
                <button type="submit">Create Hotel</button>
            </form>
        </div>
    );
}
