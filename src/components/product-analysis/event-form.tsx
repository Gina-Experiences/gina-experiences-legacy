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

        try {
            if (eventId) {
                // Update existing event
                await updateEvent(eventId, {
                    event_name: eventName,
                    highlights: highlights,
                    location: location,
                    what_to_expect: whatToExpect,
                    best_time_to_visit: bestTimeToVisit,
                    duration_number: durationNumber,
                    duration_unit: durationUnit as 'H' | 'D',
                    faqs: faqs,
                    event_price: eventPrice,
                    image_link: imageLink,
                });

                console.log('Event updated successfully!');
                onSuccess(); // Call onSuccess after successful update
            } else {
                // Create new event
                const newProduct: { product_id: string } = await productStore
                    .getState()
                    .addProduct(productType);

                if (newProduct) {
                    await addEvent(
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
                    onSuccess(); // Call onSuccess after successful creation
                }
            }

            resetForm();
        } catch (error) {
            console.error('Error processing event:', error);
        }
    };
    // Reset function
    const resetForm = () => {
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
        onCancel(); // Call the cancel callback to close the form/modal
    };

    return (
        <div className="w-full min-h-[500px] max-h-screen p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">
                {eventId ? 'Edit Event' : 'Transportation Event'}
            </h2>
            <form onSubmit={handleSubmit} className="gap-4 grid grid-cols-2">
                <div>
                    <label
                        htmlFor="eventName"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        Event Name:
                    </label>
                    <input
                        type="text"
                        id="eventName"
                        name="eventName"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                        required
                        className="mt-1 block w-full border border-ginaBlack/60 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label
                        htmlFor="highlights"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        Highlights:
                    </label>
                    <textarea
                        id="highlights"
                        name="highlights"
                        value={highlights}
                        onChange={(e) => setHighlights(e.target.value)}
                        required
                        className="mt-1 block w-full border border-ginaBlack/60 rounded-md shadow-sm p-2"
                    ></textarea>
                </div>
                <div>
                    <label
                        htmlFor="location"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        Location:
                    </label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="mt-1 block w-full border border-ginaBlack/60 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label
                        htmlFor="whatToExpect"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        What to Expect:
                    </label>
                    <textarea
                        id="whatToExpect"
                        name="whatToExpect"
                        value={whatToExpect}
                        onChange={(e) => setWhatToExpect(e.target.value)}
                        required
                        className="mt-1 block w-full border border-ginaBlack/60 rounded-md shadow-sm p-2"
                    ></textarea>
                </div>
                <div>
                    <label
                        htmlFor="bestTimeToVisit"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        Best Time to Visit:
                    </label>
                    <input
                        type="text"
                        id="bestTimeToVisit"
                        name="bestTimeToVisit"
                        value={bestTimeToVisit}
                        onChange={(e) => setBestTimeToVisit(e.target.value)}
                        required
                        className="mt-1 block w-full border border-ginaBlack/60 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label
                        htmlFor="durationNumber"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        Duration Number:
                    </label>
                    <input
                        type="number"
                        id="durationNumber"
                        name="durationNumber"
                        value={durationNumber}
                        onChange={(e) =>
                            setDurationNumber(Number(e.target.value))
                        }
                        required
                        className="mt-1 block w-full border border-ginaBlack/60 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label
                        htmlFor="durationUnit"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        Duration Unit:
                    </label>
                    <select
                        id="durationUnit"
                        name="durationUnit"
                        value={durationUnit}
                        onChange={(e) => setDurationUnit(e.target.value)}
                        required
                        className="mt-1 block w-full border border-ginaBlack/60 rounded-md shadow-sm p-2"
                    >
                        <option value="H">Hours</option>
                        <option value="D">Days</option>
                    </select>
                </div>
                <div>
                    <label
                        htmlFor="faqs"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        FAQs:
                    </label>
                    <textarea
                        id="faqs"
                        name="faqs"
                        value={faqs}
                        onChange={(e) => setFaqs(e.target.value)}
                        required
                        className="mt-1 block w-full border border-ginaBlack/60 rounded-md shadow-sm p-2"
                    ></textarea>
                </div>
                <div>
                    <label
                        htmlFor="eventPrice"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        Event Price:
                    </label>
                    <input
                        type="number"
                        id="eventPrice"
                        name="eventPrice"
                        value={eventPrice}
                        onChange={(e) => setEventPrice(Number(e.target.value))}
                        required
                        className="mt-1 block w-full border border-ginaBlack/60 rounded-md shadow-sm p-2"
                    />
                </div>
                <div className="">
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
                        onClick={onCancel}
                        className="px-4 py-2 bg-ginaGray text-ginaBlack rounded-xl"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-ginaOrange text-white rounded-xl"
                    >
                        {eventId ? 'Update Event' : 'Create Event'}
                    </button>
                </div>
            </form>
        </div>
    );
}
