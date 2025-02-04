import type React from "react"

interface confirmationProps {
   messageTitle: string;
   messageContent: string;
}

export default function ConfirmationPopup({ messageTitle, messageContent }: confirmationProps) {
   return(
      <div className="w-full max-w-screen-lg flex flex-col bg-ginaWhite p-8 rounded-xl">
         <span className="text-xl font-semibold p-2">{messageTitle}</span>
         <p className="p-4">{messageContent}</p>
         <div className="flex justify-end space-x-2">
            <button className="flex justify-center items-center rounded-xl border-2 border-ginaOrange bg-ginaWhite px-4 py-2 text-ginaOrange text-sm font-medium hover:bg-ginaOrange-200 transition-all duration-200 ease-in-out">
               Cancel
            </button>
            <button className="flex justify-center items-center rounded-xl border-2 border-ginaOrange bg-ginaOrange px-4 py-2 text-white text-sm font-medium hover:bg-ginaOrange-200 transition-all duration-200 ease-in-out">
               Confirm
            </button>
         </div>
      </div>
   )
}

