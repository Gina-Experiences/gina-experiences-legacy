'use client';

import { useState, useEffect } from 'react';
import { eventStore, productStore } from '@/stores';

interface EventFormProps {
    eventId?: string; // Optional ID for editing
    onCancel: () => void; // Callback for cancel action
    onSuccess: () => void; // Callback for successful operation
}

export default function EventForm({
    eventId,
    onCancel,
    onSuccess,
}: EventFormProps) {
    const productType = 'Events';
    const [eventName, setEventName] = useState('');
    const [highlights, setHighlights] = useState('');
    const [location, setLocation] = useState('');
    const [whatToExpect, setWhatToExpect] = useState('');
    const [bestTimeToVisit, setBestTimeToVisit] = useState('');
    const [durationNumber, setDurationNumber] = useState(1);
    const [durationUnit, setDurationUnit] = useState('H');
    const [faqs, setFaqs] = useState('');
    const [eventPrice, setEventPrice] = useState(0);
    const [imageLink, setImageLink] = useState('');

    const { fetchEvent, updateEvent, addEvent } = eventStore();

    useEffect(() => {
        if (eventId) {
            fetchEvent(eventId).then(() => {
                const selectedEvent = eventStore.getState().selectedEvent;
                if (selectedEvent) {
                    setEventName(selectedEvent.event_name);
                    setHighlights(selectedEvent.highlights);
                    setLocation(selectedEvent.location);
                    setWhatToExpect(selectedEvent.what_to_expect);
                    setBestTimeToVisit(selectedEvent.best_time_to_visit);
                    setDurationNumber(selectedEvent.duration_number);
                    setDurationUnit(selectedEvent.duration_unit);
                    setFaqs(selectedEvent.faqs);
                    setEventPrice(selectedEvent.event_price);
                    setImageLink(selectedEvent.image_link);
                }
            });
        }
    }, [eventId, fetchEvent]);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const confirmed = window.confirm(
            eventId
                ? 'Are you sure you want to update this event?'
                : 'Are you sure you want to create this event?'
        );
        if (!confirmed) {
            return;
        }

        // DITO MYRONE PATULOY
        try {
            const newProduct: { product_id: string } = await productStore
                .getState()
                .addProduct(productType);

            if (newProduct) {
                await eventStore
                    .getState()
                    .addEvent(
                        newProduct.product_id,
                        eventName,
                        highlights,
                        location,
                        whatToExpect,
                        bestTimeToVisit,
                        durationNumber,
                        durationUnit as 'H' | 'D',
                        faqs,
                        eventPrice,
                        imageLink
                    );

                console.log('Event created successfully!');

                // Reset form fields
                setEventName('');
                setHighlights('');
                setLocation('');
                setWhatToExpect('');
                setBestTimeToVisit('');
                setDurationNumber(1);
                setDurationUnit('H');
                setFaqs('');
                setEventPrice(0);
                setImageLink('');
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <div className="w-full min-h-[500px]">
            <h2>Event Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="eventName">Event Name:</label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
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
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
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
                    <label htmlFor="bestTimeToVisit">Best Time to Visit:</label>
                    <input
                        type="text"
                        id="bestTimeToVisit"
                        name="bestTimeToVisit"
                        value={bestTimeToVisit}
                        onChange={(e) => setBestTimeToVisit(e.target.value)}
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
                    <label htmlFor="eventPrice">Event Price:</label>
                    <input
                        type="number"
                        id="eventPrice"
                        name="eventPrice"
                        value={eventPrice}
                        onChange={(e) => setEventPrice(Number(e.target.value))}
                        required
                    />
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
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
}
