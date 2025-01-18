import { ContactLinks, ContactForm } from "@/components/contact";
import Image from 'next/image';

export default function Contact() {
   return (
      <div className="flex flex-col items-center justify-center w-svw text-ginaBlack">
         <div className="w-full max-w-screen-2xl items-center flex flex-col p-8">
            <div className="w-full rounded-t-3xl h-32 bg-gradient-to-r from-ginaLightYellow to-ginaOrange">
            </div>
            <div className="flex flex-col lg:flex-row-reverse">
               <ContactLinks />
               <ContactForm />
            </div>
         </div>
      </div>
   );
}
