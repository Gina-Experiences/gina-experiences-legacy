import { useState, useEffect } from 'react';

interface BookingProductDetailsProps {
    productType: string;
    nextStep: () => void; // Pass nextStep as a prop
    prevStep: () => void; // Pass prevStep as a prop
    setFormData: (data: any) => void; // Pass setFormData as a prop
}

export default function BookingProductDetails({
    productType,
    nextStep,
    prevStep,
    setFormData,
}: BookingProductDetailsProps) {
    const [formData, setLocalFormData] = useState({
        tourStartDate: '',
        tourEndDate: '',
        time: '',
        numOfParticipants: 1,
        specialRequests: '',
        pickupLocation: '',
        dropoffLocation: '',
    });

    const [isNextDisabled, setIsNextDisabled] = useState(true);

    useEffect(() => {
        const { tourStartDate, tourEndDate, time, numOfParticipants } =
            formData;
        if (tourStartDate && tourEndDate && time && numOfParticipants) {
            setIsNextDisabled(false);
        } else {
            setIsNextDisabled(true);
        }
    }, [formData]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setLocalFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        setFormData(formData);
        nextStep(); // Move to the next step
    };

    const service = { type: '' }; // Define the service object

    return (
        <div className="flex flex-col p-8">
            <div className="py-4">
                <h2 className="text-4xl font-semibold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)22%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text inline-block">
                    {productType} Details
                </h2>
                <p className="font-medium">
                    Please provide the necessary information.
                </p>
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 text-ginaBlack/50">
                {productType === 'Transportation' && (
                    <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-ginaYellow">
                                Pickup Location
                            </label>
                            <input
                                type="text"
                                name="pickupLocation"
                                value={formData.pickupLocation || ''}
                                onChange={handleChange}
                                className="p-2 px-4 uppercase bg-ginaYellow/10 rounded-xl w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-ginaYellow">
                                Dropoff Location
                            </label>
                            <input
                                type="text"
                                name="dropoffLocation"
                                value={formData.dropoffLocation || ''}
                                onChange={handleChange}
                                className="p-2 px-4 uppercase bg-ginaYellow/10 rounded-xl w-full"
                            />
                        </div>
                    </div>
                    
                )}
                <div className="space-y-2">
                  <label className="text-ginaYellow">
                     {productType === 'Hotels'
                        ? 'Check-in Date'
                        : productType === 'Transportation'
                        ? 'Date'
                        : 'Tour Start Date'}
                  </label>
                    <input
                        type="date"
                        name="tourStartDate"
                        value={formData.tourStartDate}
                        onChange={handleChange}
                        className="p-2 px-4 uppercase bg-ginaYellow/10 rounded-xl w-full"
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>
               {productType !== 'Transportation' && (
                  <div className="space-y-2">
                     <label className="text-ginaYellow">
                        {productType === 'Hotels'
                           ? 'Check-out Date'
                           : 'Tour End Date'}
                     </label>
                     <input
                        type="date"
                        name="tourEndDate"
                        value={formData.tourEndDate}
                        onChange={handleChange}
                        required
                        className="p-2 px-4 uppercase bg-ginaYellow/10 rounded-xl w-full"
                        min={formData.tourStartDate}
                     />
                  </div>
               )}
                <div className="space-y-2">
                    <label className="text-ginaYellow">Time</label>
                    <input
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        className="p-2 px-4 uppercase bg-ginaYellow/10 rounded-xl w-full"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-ginaYellow">
                        Number of Participants
                    </label>
                    <input
                        type="number"
                        name="numOfParticipants"
                        value={formData.numOfParticipants}
                        min={1}
                        max={10}
                        onChange={handleChange}
                        className="p-2 px-4 uppercase bg-ginaYellow/10 rounded-xl w-full"
                        onKeyDown={(e) => e.preventDefault()}
                    />
                </div>
                <div className="lg:col-span-2 space-y-2">
                    <label className="text-ginaYellow">
                        Special Requests/Reinforcements
                    </label>
                    <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleChange}
                        placeholder={'Tour Requests/Reinforcements'}
                        className="min-h-40 px-4 py-2 bg-ginaYellow/10 rounded-xl w-full"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-4 space-x-4">
                <button
                    onClick={prevStep}
                    className="px-4 py-2 text-ginaWhite font-medium bg-ginaYellow rounded-xl disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-ginaWhite font-medium bg-ginaYellow rounded-xl disabled:opacity-50"
                    disabled={isNextDisabled}
                >
                    Proceed
                </button>
            </div>
        </div>
    );
}
