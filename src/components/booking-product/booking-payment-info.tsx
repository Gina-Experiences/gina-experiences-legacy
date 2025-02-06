import { userStore } from '@/stores';
import { FaMapLocation } from 'react-icons/fa6';
import { useState } from 'react';

interface BookingPaymentInfoProps {
    productId: string;
    productName: string;
    productLocation: string;
    productPrice: string;
    formData: {
        tourStartDate: string;
        tourEndDate: string;
        time: string;
        numOfParticipants: number;
        specialRequests: string;
    };
    nextStep: () => void; // Pass nextStep as a prop
    prevStep: () => void; // Pass prevStep as a prop
}

export default function BookingPaymentInfo({
    productId,
    productName,
    productLocation,
    productPrice,
    formData,
    nextStep,
    prevStep,
}: BookingPaymentInfoProps) {
    const user = userStore((state) => state.user);
    const [fileUploaded, setFileUploaded] = useState(false);

    const totalPrice =
        parseFloat(productPrice.replace(/[^\d.-]/g, '')) *
        formData.numOfParticipants;

    const handleSubmit = () => {
        nextStep(); // Move to the next step
    };

    return (
        <div className="w-full flex flex-col p-8">
            <div className="py-4">
                <h2 className="text-4xl font-semibold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)22%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text inline-block">
                    Payment Information
                </h2>
                <p className="font-medium">
                    Please provide your information. This is where your
                    confirmation will be sent.
                </p>
                <div className="p-4">
                    <div className="space-y-2">
                        <label className="text-ginaYellow">
                            Product Summary
                        </label>
                        <div className="flex bg-ginaOrange/10 p-8 gap-8 rounded-xl">
                            <div className="flex flex-col justify-between">
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold">
                                        {productName}
                                    </span>
                                    <div className="flex gap-2">
                                        <FaMapLocation className="text-ginaOrange text-3xl" />
                                        <span className="">
                                            {productLocation}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="">
                                        Special Requests/Requirements:
                                    </label>
                                    <span className="">
                                        {formData.specialRequests
                                            ? formData.specialRequests
                                            : 'None'}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-1/2">
                                <span>
                                    Start Date: {formData.tourStartDate}
                                </span>
                                <span>End Date: {formData.tourEndDate}</span>
                                <span>Time: {formData.time}</span>
                                <span>
                                    Participants: {formData.numOfParticipants}
                                </span>
                                <span>Status: To Pay</span>
                                <span className="text-lg font-semibold text-ginaOrange">
                                    Order Total: {totalPrice}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-ginaOrange/10 rounded-xl space-y-2 p-8 items-center">
                    <p className="font-medium self-center">Scan here and pay the requested amount: </p>
                    <img
                        src="\images\booking\gcash-qr.jpg"
                        alt=""
                        className="w-64 h-64 "
                    />
                </div>
                <div className="space-y-2 p-4">
                    <label className="text-ginaYellow">
                        Upload your payment receipt here
                    </label>
                    <input
                        type="file"
                        onChange={(e) =>
                            setFileUploaded(
                                !!(e.target.files && e.target.files.length > 0)
                            )
                        }
                        className="px-8 py-4 bg-ginaOrange/10 rounded-xl w-full"
                    />
                </div>
                <p className="font-medium">
                    We’ll send confirmation at your booking to {user.email}
                </p>
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
                        disabled={!fileUploaded}
                    >
                        Proceed
                    </button>
                </div>
            </div>
        </div>
    );
}
