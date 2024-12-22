'use client';

import { useState, ReactNode, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ModalButtonProps {
    buttonContent: ReactNode;
    children: ReactNode;
    buttonClassName?: string;
    modalContentClassName?: string;
}

const ModalButton: React.FC<ModalButtonProps> = ({
    buttonContent,
    children,
    buttonClassName = '',
    modalContentClassName = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const modalContent = isOpen && (
        <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            role="dialog"
            aria-modal="true"
        >
            <div
                ref={modalRef}
                className={`relative w-auto px-6 ${modalContentClassName}`}
            >
                <button
                    onClick={closeModal}
                    className="absolute top-4 right-12 text-ginaBlue opacity-50 hover:opacity-100 text-2xl transition-all duration-200 ease-in-out"
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    );

    return (
        <>
            <button
                onClick={openModal}
                className={`cursor-pointer ${buttonClassName}`}
            >
                {buttonContent}
            </button>

            {typeof window !== 'undefined' &&
                ReactDOM.createPortal(modalContent, document.body)}
        </>
    );
};

export default ModalButton;
