'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import HeaderButton from '@/components/layout/header-button';

const Header = () => {
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
        // Main navigation container, centered and full width
        <nav className="w-full flex justify-center items-center absolute z-20">
            {/* Inner container with maximum width and height for the navigation bar */}
            <div className="w-full max-w-screen-2xl h-16 mt-16 items-center flex justify-between px-8">
                {/* Two sections separating logo and the navigation links */}

                {/* Logo */}
                <div className="flex justify-end rounded-r-full bg-ginaWhite h-full px-12 lg:w-1/5 w-3/6">
                    <div className="flex items-center">
                        <Image
                            src="/images/gina/logo.png"
                            alt="Gina Experiences Logo"
                            quality={100}
                            width={80}
                            height={80}
                        />
                    </div>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center justify-between rounded-l-full bg-ginaWhite w-auto h-full px-12 space-x-0 xl:space-x-12">
                    <div className="space-x-6 hidden xl:flex">
                        {Links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`${
                                    pathname === link.href
                                        ? 'font-bold text-ginaOrange'
                                        : 'text-ginaBlack'
                                } hover:text-ginaYellow transition duration-200`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="space-x-2 hidden xl:flex">
                        <button className="border border-ginaLightYellow text-ginaLightYellow hover:border-ginaOrange hover:text-ginaOrange duration-200 bg-ginaWhite rounded-lg w-24 p-1">
                            Login
                        </button>
                        <button className="border border-ginaLightYellow text-ginaWhite bg-ginaLightYellow hover:border-ginaOrange hover:bg-ginaOrange duration-200 rounded-lg w-24 p-1">
                            Sign Up
                        </button>
                    </div>
                    <div className="block xl:hidden text-ginaOrange">
                        <HeaderButton />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
