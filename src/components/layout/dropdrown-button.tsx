'use client';

import React, { useState, ReactNode, useRef, useEffect } from 'react';

interface DropdownMenuProps {
    buttonContent: ReactNode;
    children: ReactNode;
    buttonClassName?: string;
    dropdownClassName?: string;
    position?: 'left' | 'middle' | 'right';
    marginTop?: string;
}

const DropdownButton: React.FC<DropdownMenuProps> = ({
    buttonContent,
    children,
    buttonClassName = '',
    dropdownClassName = '',
    position = 'middle',
    marginTop = 'mt-2',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = () => setIsOpen((prev) => !prev);
    const closeDropdown = () => setIsOpen(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const positionClasses = {
        left: 'left-0',
        middle: 'left-1/2 transform -translate-x-1/2',
        right: 'right-0',
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <button
                onClick={toggleDropdown}
                className={`cursor-pointer ${buttonClassName}`}
            >
                {buttonContent}
            </button>

            {isOpen && (
                <div
                    className={`absolute ${marginTop} ${positionClasses[position]} ${dropdownClassName}`}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default DropdownButton;
