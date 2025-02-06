'use client';

import { useState, useEffect } from 'react';
import { packageStore, productStore } from '@/stores';

interface PackageFormProps {
    packageId?: string; // Optional ID for editing
    onCancel: () => void; // Callback for cancel action
    onSuccess: () => void; // Callback for successful operation
}

export default function PackageForm({
    packageId,
    onCancel,
    onSuccess,
}: PackageFormProps) {
    const productType = 'Packages';
    const [packageName, setPackageName] = useState('');
    const [highlights, setHighlights] = useState('');
    const [whatToExpect, setWhatToExpect] = useState('');
    const [bestTimeToVisit, setBestTimeToVisit] = useState('');
    const [durationNumber, setDurationNumber] = useState(1);
    const [durationUnit, setDurationUnit] = useState('H');
    const [faqs, setFaqs] = useState('');
    const [packagePrice, setPackagePrice] = useState(0);
    const [imageLink, setImageLink] = useState('');

    const { fetchPackage, updatePackage, addPackage } = packageStore();

    useEffect(() => {
        if (packageId) {
            fetchPackage(packageId).then(() => {
                const selectedPackage = packageStore.getState().selectedPackage;
                if (selectedPackage) {
                    setPackageName(selectedPackage.package_name);
                    setHighlights(selectedPackage.highlights);
                    setWhatToExpect(selectedPackage.what_to_expect);
                    setBestTimeToVisit(selectedPackage.best_time_to_visit);
                    setDurationNumber(selectedPackage.duration_number);
                    setDurationUnit(selectedPackage.duration_unit);
                    setFaqs(selectedPackage.faqs);
                    setPackagePrice(selectedPackage.package_price);
                    setImageLink(selectedPackage.image_link);
                }
            });
        }
    }, [packageId, fetchPackage]);

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        const confirmed = window.confirm(
            packageId
                ? 'Are you sure you want to update this package?'
                : 'Are you sure you want to create this package?'
        );
        if (!confirmed) {
            return;
        }

        try {
            if (packageId) {
                // Update existing package
                await updatePackage(packageId, {
                    package_name: packageName,
                    highlights: highlights,
                    what_to_expect: whatToExpect,
                    best_time_to_visit: bestTimeToVisit,
                    duration_number: durationNumber,
                    duration_unit: durationUnit as 'H' | 'D',
                    faqs: faqs,
                    package_price: packagePrice,
                    image_link: imageLink,
                });

                console.log('Package updated successfully!');
                onSuccess(); // Call onSuccess after successful update
            } else {
                // Create new package
                const newProduct: { product_id: string } = await productStore
                    .getState()
                    .addProduct(productType);

                if (newProduct) {
                    await packageStore
                        .getState()
                        .addPackage(
                            newProduct.product_id,
                            packageName,
                            highlights,
                            whatToExpect,
                            bestTimeToVisit,
                            durationNumber,
                            durationUnit as 'H' | 'D',
                            faqs,
                            packagePrice,
                            imageLink
                        );

                    console.log('Package created successfully!');
                    onSuccess(); // Call onSuccess after successful creation
                }
            }

            resetForm();
        } catch (error) {
            console.error('Error processing package:', error);
        }
    };

    const resetForm = () => {
        setPackageName('');
        setHighlights('');
        setWhatToExpect('');
        setBestTimeToVisit('');
        setDurationNumber(1);
        setDurationUnit('H');
        setFaqs('');
        setPackagePrice(0);
        setImageLink('');
        onCancel(); // Call the cancel callback to close the form/modal
    };

    return (
        <div className="w-full min-h-[500px]">
            <h2>{packageId ? 'Edit Package' : 'Package Form'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="packageName">Package Name:</label>
                    <input
                        type="text"
                        id="packageName"
                        name="packageName"
                        value={packageName}
                        onChange={(e) => setPackageName(e.target.value)}
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
                    <label htmlFor="packagePrice">Package Price:</label>
                    <input
                        type="number"
                        id="packagePrice"
                        name="packagePrice"
                        value={packagePrice}
                        onChange={(e) =>
                            setPackagePrice(Number(e.target.value))
                        }
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
                <div className="flex gap-2 mt-4">
                    <button type="submit">
                        {packageId ? 'Save Package' : 'Create Package'}
                    </button>
                    <button type="button" onClick={resetForm}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
