'use client';

import { useState, useEffect } from 'react';
import { activityStore, productStore } from '@/stores';

interface ActivityFormProps {
    activityId?: string; // Optional ID for editing
    onCancel: () => void; // Callback for cancel action
    onSuccess: () => void; // Callback for successful operation
}

export default function ActivityForm({
    activityId,
    onCancel,
    onSuccess,
}: ActivityFormProps) {
    const productType = 'Activities';
    const [activityName, setActivityName] = useState('');
    const [highlights, setHighlights] = useState('');
    const [whatToExpect, setWhatToExpect] = useState('');
    const [bestTimeToVisit, setBestTimeToVisit] = useState('');
    const [durationNumber, setDurationNumber] = useState(1);
    const [durationUnit, setDurationUnit] = useState('H');
    const [faqs, setFaqs] = useState('');
    const [activityPrice, setActivityPrice] = useState(0);
    const [imageLink, setImageLink] = useState('');

    const { fetchActivity, updateActivity, addActivity } = activityStore();

    useEffect(() => {
        if (activityId) {
            fetchActivity(activityId).then(() => {
                const selectedActivity =
                    activityStore.getState().selectedActivity;
                if (selectedActivity) {
                    setActivityName(selectedActivity.activity_name);
                    setHighlights(selectedActivity.highlights);
                    setWhatToExpect(selectedActivity.what_to_expect);
                    setBestTimeToVisit(selectedActivity.best_time_to_visit);
                    setDurationNumber(selectedActivity.duration_number);
                    setDurationUnit(selectedActivity.duration_unit);
                    setFaqs(selectedActivity.faqs);
                    setActivityPrice(selectedActivity.activity_price);
                    setImageLink(selectedActivity.image_link);
                }
            });
        }
    }, [activityId, fetchActivity]);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const confirmed = window.confirm(
            activityId
                ? 'Are you sure you want to update this activity?'
                : 'Are you sure you want to create this activity?'
        );
        if (!confirmed) {
            return;
        }

        try {
            if (activityId) {
                // Update existing activity
                await updateActivity(activityId, {
                    activity_name: activityName,
                    highlights: highlights,
                    what_to_expect: whatToExpect,
                    best_time_to_visit: bestTimeToVisit,
                    duration_number: durationNumber,
                    duration_unit: durationUnit as 'H' | 'D',
                    faqs: faqs,
                    activity_price: activityPrice,
                    image_link: imageLink,
                });

                console.log('Activity updated successfully!');
                onSuccess(); // Call onSuccess after successful update
            } else {
                // Create new activity
                const newProduct: { product_id: string } = await productStore
                    .getState()
                    .addProduct(productType);

                if (newProduct) {
                    await addActivity(
                        newProduct.product_id,
                        activityName,
                        highlights,
                        whatToExpect,
                        bestTimeToVisit,
                        durationNumber,
                        durationUnit as 'H' | 'D',
                        faqs,
                        activityPrice,
                        imageLink
                    );

                    console.log('Activity created successfully!');
                    onSuccess(); // Call onSuccess after successful creation
                }
            }

            resetForm();
        } catch (error) {
            console.error('Error processing activity:', error);
        }
    };

    const resetForm = () => {
        setActivityName('');
        setHighlights('');
        setWhatToExpect('');
        setBestTimeToVisit('');
        setDurationNumber(1);
        setDurationUnit('H');
        setFaqs('');
        setActivityPrice(0);
        setImageLink('');
        onCancel(); // Call the cancel callback to close the form/modal
    };

    return (
        <div className="w-full min-h-[500px] max-h-screen p-4 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-4">
                {activityId ? 'Edit Activity' : 'Activity Form'}
            </h2>
            <form onSubmit={handleSubmit} className="gap-4 grid grid-cols-2">
                <div>
                    <label
                        htmlFor="activityName"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        Activity Name:
                    </label>
                    <input
                        type="text"
                        id="activityName"
                        name="activityName"
                        value={activityName}
                        onChange={(e) => setActivityName(e.target.value)}
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
                        htmlFor="activityPrice"
                        className="block text-sm font-medium text-ginaBlack/80"
                    >
                        Activity Price:
                    </label>
                    <input
                        type="number"
                        id="activityPrice"
                        name="activityPrice"
                        value={activityPrice}
                        onChange={(e) =>
                            setActivityPrice(Number(e.target.value))
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
                        onClick={onCancel}
                        className="px-4 py-2 bg-ginaGray text-ginaBlack rounded-xl"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-ginaOrange text-white rounded-xl"
                    >
                        {activityId ? 'Update Activity' : 'Create Activity'}
                    </button>
                </div>
            </form>
        </div>
    );
}
