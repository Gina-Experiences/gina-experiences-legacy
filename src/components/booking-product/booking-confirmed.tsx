import { BiSolidCheckCircle } from 'react-icons/bi';
import { MdPending } from "react-icons/md";
import { userStore } from '@/stores';

export default function BookingConfirmed() {
    const user = userStore((state) => state.user);

    return (
        <div className="flex flex-col items-center">
         <MdPending />
            <BiSolidCheckCircle className="text-ginaGreen text-5xl" />
            <h2 className="text-3xl font-semibold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)22%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text p-6">
                Your Booking is now Pending!
            </h2>

            <p className="font-medium text-lg">
                Hi {user.firstname} {user.lastname}!
            </p>

            <p className="p-4">
                For reference, your booking ID is 1234-5678. To view, cancel, or
                modify your booking, use our easy self service options.
            </p>

            <button className="px-4 py-2 text-ginaWhite font-medium bg-ginaYellow rounded-xl">
                My Bookings
            </button>
        </div>
    );
}
