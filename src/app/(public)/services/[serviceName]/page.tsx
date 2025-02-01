import { ServicesList } from "@/components/services";
import Image from 'next/image';
ServicesList

export default function ServicesListPage() {
    return (
        <div className="flex flex-col items-center justify-center w-svw text-ginaBlack">
            <ServicesList />
        </div>
    );
}