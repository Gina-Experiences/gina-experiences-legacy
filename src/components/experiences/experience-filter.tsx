'use client';

import React from 'react';
import { DropdownButton } from '@/components/layout';
import { Filter } from 'lucide-react';

interface ExperienceFilterProps {
    onIslandChange: (island: string | null) => void;
}

export default function ExperienceFilter({
    onIslandChange,
}: ExperienceFilterProps) {
    const [position, setPosition] = React.useState<string | null>(null);

    const handlePositionChange = (value: string) => {
        const newPosition = value === position ? null : value;
        setPosition(newPosition);
        onIslandChange(newPosition);
    };

    return (
        <DropdownButton
            buttonContent={<Filter size={24} color="#F6931D" />}
            buttonClassName="opacity-80 hover:opacity-100 transition-all duration-200 ease-in-out"
            marginTop="mt-0"
        >
            <div className="p-8 bg-ginaWhite shadow-xl rounded-xl">
                <h2 className="text-lg text-center font-bold mb-2">FILTER</h2>
                <div className="border-t-2 border-ginaBlue my-3"></div>
                <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="region"
                            value="Luzon"
                            checked={position === 'Luzon'}
                            onClick={() => handlePositionChange('Luzon')}
                            onChange={() => {}}
                            className="w-2 h-2 appearance-none rounded-full bg-gray-200 checked:bg-ginaYellow"
                        />
                        <span>Luzon</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="region"
                            value="Visayas"
                            checked={position === 'Visayas'}
                            onClick={() => handlePositionChange('Visayas')}
                            onChange={() => {}}
                            className="w-2 h-2 appearance-none rounded-full bg-gray-200 checked:bg-ginaYellow"
                        />
                        <span>Visayas</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="region"
                            value="Mindanao"
                            checked={position === 'Mindanao'}
                            onClick={() => handlePositionChange('Mindanao')}
                            onChange={() => {}}
                            className="w-2 h-2 appearance-none rounded-full bg-gray-200 checked:bg-ginaYellow"
                        />
                        <span>Mindanao</span>
                    </label>
                </div>
            </div>
        </DropdownButton>
    );
}
