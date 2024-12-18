'use client';

import * as React from 'react';

import { FaFilter } from 'react-icons/fa6';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="px-8 py-4 bg-ginaWhite shadow-xl rounded-full text-ginaOrange">
                    <FaFilter size={20} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto">
                <DropdownMenuLabel>FILTER</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                    value={position || ''}
                    onValueChange={handlePositionChange}
                >
                    <DropdownMenuRadioItem value="Luzon">
                        Luzon
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Visayas">
                        Visayas
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Mindanao">
                        Mindanao
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
