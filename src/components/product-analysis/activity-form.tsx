'use client';

import { useState } from 'react';
import { activityStore, productStore } from '@/stores';

export default function ActivityForm() {
    const productType = 'Activities';
    const [activityName, setActivityName] = useState('');
    const [highlights, setHighlights] = useState('');
    const [whatToExpect, setWhatToExpect] = useState('');
    const [bestTimeToVisit, setBestTimeToVisit] = useState('');
    const [durationNumber, setDurationNumber] = useState(1);
    const [durationUnit, setDurationUnit] = useState('H');
    const [faqs, setFaqs] = useState('');
    const [activityPrice, setActivityPrice] = useState(0);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const confirmed = window.confirm(
            'Are you sure you want to create this activity?'
        );
        if (!confirmed) {
            return;
        }

        try {
            const newProduct: { product_id: string } = await productStore
                .getState()
                .addProduct(productType);

            if (newProduct) {
                await activityStore
                    .getState()
                    .addActivity(
                        newProduct.product_id,
                        activityName,
                        highlights,
                        whatToExpect,
                        bestTimeToVisit,
                        durationNumber,
                        durationUnit as 'H' | 'D',
                        faqs,
                        activityPrice
                    );

                console.log('Activity created successfully!');

                setActivityName('');
                setHighlights('');
                setWhatToExpect('');
                setBestTimeToVisit('');
                setDurationNumber(1);
                setDurationUnit('H');
                setFaqs('');
                setActivityPrice(0);
            }
        } catch (error) {
            console.error('Error creating activity:', error);
        }
    };

    return (
        <div className="w-full min-h-[500px]">
            <h2>Activity Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="activityName">Activity Name:</label>
                    <input
                        type="text"
                        id="activityName"
                        name="activityName"
                        value={activityName}
                        onChange={(e) => setActivityName(e.target.value)}
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
                    <label htmlFor="activityPrice">Activity Price:</label>
                    <input
                        type="number"
                        id="activityPrice"
                        name="activityPrice"
                        value={activityPrice}
                        onChange={(e) =>
                            setActivityPrice(Number(e.target.value))
                        }
                        required
                    />
                </div>
                <button type="submit">Create Activity</button>
            </form>
        </div>
    );
}
