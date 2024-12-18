'use client';

import { NewsletterPopup } from '@/components/popup';
import { ModalButton } from '@/components/layout';

const NewsletterBanner = () => {
    return (
        <div className="flex items-center justify-center w-screen bg-ginaWhite">
            <div className="flex flex-col lg:flex-row text-center items-center justify-center gap-4 p-8">
                <h2 className="flex text-3xl font-bold bg-[linear-gradient(90deg,rgba(255,209,0,1)0%,rgba(246,147,29,1)30%,rgba(0,160,75,1)78%,rgba(27,20,100,1)100%)] text-transparent bg-clip-text lg:whitespace-nowrap">
                    Interested to Find Out More?
                </h2>
                <p className="text-sm text-ginaBlack font-medium text-center lg:text-start">
                    Sign up for our newsletter to get the latest updates on our
                    experiences and promotions!
                </p>
                <ModalButton
                    buttonContent="Subscribe"
                    buttonClassName="flex justify-center items-center rounded-xl bg-ginaYellow px-4 py-2 text-white text-sm font-medium shadow-md hover:bg-ginaBlue transition-all duration-200 ease-in-out"
                >
                    <NewsletterPopup />
                </ModalButton>
            </div>
        </div>
    );
};

export default NewsletterBanner;
