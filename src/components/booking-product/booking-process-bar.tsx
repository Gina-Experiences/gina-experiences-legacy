import { useState } from "react";

interface Step {
   id: number;
   label: string;
   color: string;
}

interface BookingProcessBarProps {
   steps: Step[];
   currentStep: number;
}

export default function BookingProcessBar({ steps, currentStep }: BookingProcessBarProps) {
   return (
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto mt-10">
         <div className="flex items-center justify-between w-full">
            {steps.map((step) => (
               <div key={step.id} className="flex items-center flex-col flex-1 relative">
                  <div
                     className={`absolute top-5 left-0 w-full h-1 bg-ginaYellow/50`}
                  />
                  <div
                     className={`flex items-center justify-center w-10 h-10 rounded-full z-10 text-white font-bold ${
                        currentStep >= step.id ? `bg-${step.color}` : "bg-ginaGray"
                     }`}
                  >
                     {step.id}
                  </div>
                  <p
                     className={`mt-2 text-sm ${
                        currentStep >= step.id ? `text-${step.color} font-medium` : "text-gray-400"
                     }`}
                  >
                     {step.label}
                  </p>
               </div>
            ))}
         </div>
      </div>
   );
}
