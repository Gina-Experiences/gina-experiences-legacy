'use client';

import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        message: '',
    });

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        console.log(formData);
    };

    const formatLabel = (key: string) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str: string) => str.toUpperCase());
    };

    return (
        <div className="flex flex-col my-8 items-center lg:w-1/2">
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-8"
            >
                {Object.entries(formData).map(([key, value]) =>
                    key !== 'message' ? (
                        <input
                            key={key} // Add key here
                            type={
                                key === 'email'
                                    ? 'email'
                                    : key === 'contactNumber'
                                      ? 'tel'
                                      : 'text'
                            }
                            id={key}
                            name={key}
                            value={value}
                            onChange={handleChange}
                            placeholder={formatLabel(key)}
                            className="px-4 py-2 border-2 border-ginaBlue rounded-lg placeholder:text-ginaBlue placeholder:text-sm lg:placeholder:text-md"
                            required
                        />
                    ) : (
                        <textarea
                            key={key} // Add key here
                            id={key}
                            name={key}
                            value={value}
                            onChange={handleChange}
                            placeholder={
                                'Tell us about your concern, thoughts, suggestions.'
                            }
                            className="min-h-40 md:col-span-2 px-4 py-2 border-ginaBlue border-2 rounded-lg placeholder:text-ginaBlue placeholder:text-sm lg:placeholder:text-md"
                            required
                        />
                    )
                )}
                <div className="flex gap-4 font-medium text-xs md:col-span-2 justify-center lg:justify-end">
                    <button
                        type="submit"
                        className="border-2 border-ginaBlue bg-ginaWhite p-2 px-4 rounded-lg text-ginaBlue"
                    >
                        Partner With Us!
                    </button>
                    <button
                        type="submit"
                        className="bg-ginaBlue p-2 px-8 lg:px-5 rounded-lg text-ginaWhite"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
