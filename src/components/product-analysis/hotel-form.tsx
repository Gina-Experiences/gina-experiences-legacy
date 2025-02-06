'use client';

import { useState, useEffect } from 'react';
import { hotelStore, productStore } from '@/stores';

interface HotelFormProps {
    hotelId?: string; // Optional ID for editing
    onCancel: () => void; // Callback for cancel action
    onSuccess: () => void; // Callback for successful operation
}

export default function HotelForm({
    hotelId,
    onCancel,
    onSuccess,
}: HotelFormProps) {
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
    const [imageLink, setImageLink] = useState('');

    const { fetchHotel, updateHotel, addHotel } = hotelStore();

    useEffect(() => {
        if (hotelId) {
            fetchHotel(hotelId).then(() => {
                const selectedHotel = hotelStore.getState().selectedHotel;
                if (selectedHotel) {
                    setHotelName(selectedHotel.hotel_name);
                    setRoomType(selectedHotel.room_type);
                    setHighlights(selectedHotel.highlights);
                    setWhatToExpect(selectedHotel.what_to_expect);
                    setAmenities(selectedHotel.amenities);
                    setFaqs(selectedHotel.faqs);
                    setHotelPrice(selectedHotel.hotel_price);
                    setDurationNumber(selectedHotel.duration_number);
                    setDurationUnit(selectedHotel.duration_unit);
                    setImageLink(selectedHotel.image_link);
                }
            });
        }
    }, [hotelId, fetchHotel]);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const confirmed = window.confirm(
            hotelId
                ? 'Are you sure you want to update this hotel?'
                : 'Are you sure you want to create this hotel?'
        );
        if (!confirmed) {
            return;
        }

        try {
            if (hotelId) {
                // Update existing hotel
                await updateHotel(hotelId, {
                    hotel_name: hotelName,
                    room_type: roomType,
                    highlights: highlights,
                    what_to_expect: whatToExpect,
                    amenities: amenities,
                    faqs: faqs,
                    hotel_price: hotelPrice,
                    duration_number: durationNumber,
                    duration_unit: durationUnit as 'H' | 'D',
                    image_link: imageLink,
                });

                console.log('Hotel updated successfully!');
                onSuccess(); // Call onSuccess after successful update
            } else {
                // Create new hotel
                const newProduct: { product_id: string } = await productStore
                    .getState()
                    .addProduct(productType);

                if (newProduct) {
                    await addHotel(
                        newProduct.product_id,
                        hotelName,
                        roomType,
                        whatToExpect,
                        amenities,
                        highlights,
                        faqs,
                        hotelPrice,
                        durationNumber,
                        durationUnit as 'H' | 'D',
                        imageLink
                    );

                    console.log('Hotel created successfully!');
                    onSuccess(); // Call onSuccess after successful creation
                }
            }

            resetForm();
        } catch (error) {
            console.error('Error processing hotel:', error);
        }
    };

    const resetForm = () => {
        setHotelName('');
        setRoomType('');
        setHighlights('');
        setWhatToExpect('');
        setAmenities('');
        setFaqs('');
        setHotelPrice(0);
        setDurationNumber(1);
        setDurationUnit('H');
        setImageLink('');
        onCancel(); // Call the cancel callback to close the form/modal
    };

    return (
        <div className="w-full min-h-[500px]">
            <h2>{hotelId ? 'Edit Hotel' : 'Hotel Form'}</h2>
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
                <div>
                    <label htmlFor="imageLink">Image Link:</label>
                    <input
                        type="text"
                        id="imageLink"
                        name="imageLink"
                        value={imageLink}
                        onChange={(e) => setImageLink(e.target.value)}
                        required
                    />
                </div>
                <div className="flex gap-2 mt-4">
                    <button type="submit">
                        {hotelId ? 'Save Hotel' : 'Create Hotel'}
                    </button>
                    <button type="button" onClick={resetForm}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
