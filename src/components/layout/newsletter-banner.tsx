'use client'

import NewsletterPopup from "./newsletter-popup";
import * as Dialog from "@radix-ui/react-dialog";

const NewsletterBanner = () => {
   return (
   <div className="flex items-center justify-center w-screen bg-ginaWhite">
      <div className="flex flex-col lg:flex-row text-center items-center justify-center lg:space-x-4 space-y-4 lg:space-y-0 p-8">
         <h2 className="flex text-3xl font-bold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)30%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text lg:whitespace-nowrap">Interested to Find Out More?</h2>
         <p className="text-sm text-ginaBlack font-medium">Sign up for our newsletter to get the latest updates on our experiences and promotions!</p>
         <Dialog.Root>
            <Dialog.Trigger className="flex justify-center items-center rounded-xl bg-ginaYellow px-4 py-2 text-white text-sm font-medium shadow-md">
            Subscribe
            </Dialog.Trigger>
            <Dialog.Title></Dialog.Title>
            <Dialog.Portal>
               <Dialog.Overlay className="fixed inset-0 backdrop-blur-md" />
               <Dialog.Content className="fixed
               top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <NewsletterPopup />
               </Dialog.Content>
            </Dialog.Portal>
         </Dialog.Root> 
      </div>
   </div>
   )
}

export default NewsletterBanner;