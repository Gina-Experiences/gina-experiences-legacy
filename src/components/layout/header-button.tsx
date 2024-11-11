'use client';

import * as React from 'react';
import { FaBars } from 'react-icons/fa6';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HeaderButton() {
    const pathname = usePathname();

    const Links = [
        {
            name: 'Home',
            href: '/',
        },
        {
            name: 'About',
            href: '/about',
        },
        {
            name: 'Experiences',
            href: '/experiences',
        },
        {
            name: 'Services',
            href: '/services',
        },
        {
            name: 'Contact Us',
            href: '/contact-us',
        },
        {
            name: 'Testimonials',
            href: '/testimonials',
        },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button>
                    <FaBars size={20} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-auto mt-8 p-2">
                {Links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`block px-4 py-2 text-sm ${
                            pathname === link.href
                                ? 'font-bold text-ginaOrange'
                                : 'text-ginaBlack'
                        } hover:text-ginaYellow transition duration-200`}
                    >
                        {link.name}
                    </Link>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
