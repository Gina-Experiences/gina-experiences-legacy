'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
    BookingProcessBar,
    BookingContactInfo,
    BookingProductDetails,
    BookingPaymentInfo,
    BookingConfirmed,
} from '@/components/booking-product/';
import { serviceData } from '@/data';

export default function BookExp() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        tourStartDate: '',
        tourEndDate: '',
        time: '',
        numOfParticipants: 1,
        specialRequests: '',
    });
    const params = useParams();
    const serviceId = params?.id?.toString() || '';
    const service = serviceData.find((service) => service.id.toString() === serviceId);

   const steps = [
     { id: 1, label: 'Customer Information', color: 'ginaYellow' },
     { id: 2, label: 'Product Details', color: 'ginaOrange' },
     { id: 3, label: 'Payment Information', color: 'ginaBlue' },
     { id: 4, label: 'Booking Confirmation', color: 'ginaGreen' },
  ];

    const nextStep = () => {
        setCurrentStep((prevStep) =>
            prevStep < steps.length ? prevStep + 1 : prevStep
        );
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
    };

    return (
        <div className="flex flex-col items-center justify-center w-svw text-ginaBlack">
            <div className="w-full max-w-screen-2xl items-center flex flex-col p-8">
                <div className="w-full rounded-t-3xl h-32 bg-gradient-to-r from-ginaLightYellow to-ginaOrange"></div>
                <BookingProcessBar steps={steps} currentStep={currentStep} />
                <div className="p-8 mt-4">
                    {currentStep === 1 && <BookingContactInfo />}
                    {currentStep === 2 && (
                        <BookingProductDetails
                            productType={service?.type || ''}
                            nextStep={nextStep}
                            prevStep={prevStep}
                            setFormData={setFormData}
                        />
                    )}
                    {currentStep === 3 && service && (
                        <BookingPaymentInfo
                            productId={serviceId}
                            productName={service.title}
                            productLocation={service.location}
                            productPrice={service.price}
                            formData={formData}
                            nextStep={nextStep}
                            prevStep={prevStep}
                        />
                    )}
                    {currentStep === 4 && <BookingConfirmed />}
                    {currentStep !== 4 && (
                        <div className="flex justify-end w-full mt-4 space-x-2">
                            {currentStep === 1 && (
                                <button
                                    onClick={nextStep}
                                    className="px-4 py-2 text-ginaWhite font-medium bg-ginaYellow rounded-xl disabled:opacity-50"
                                    disabled={currentStep === steps.length}
                                >
                                    Proceed
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

