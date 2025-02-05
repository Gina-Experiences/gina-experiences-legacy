'use client';

import Link from 'next/link';
import {
    House,
    Lightbulb,
    Map,
    BriefcaseBusiness,
    Phone,
    Sparkles,
    Menu,
    User,
    Heart,
    Luggage,
} from 'lucide-react';
import { userStore } from '@/stores';
import { usePathname } from 'next/navigation';

export const PublicLinks = () => {
    const pathname = usePathname();

    const links = [
        { name: 'Home', href: '/', target: '_self', icon: <House /> },
        { name: 'About', href: '/about', target: '_self', icon: <Lightbulb /> },
        {
            name: 'Experiences',
            href: '/experiences',
            target: '_self',
            icon: <Map />,
        },
        {
            name: 'Services',
            href: '/services',
            target: '_self',
            icon: <BriefcaseBusiness />,
        },
        {
            name: 'Contact',
            href: '/contact-us',
            target: '_self',
            icon: <Phone />,
        },
    ];

    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    target={link.target}
                    className={`${
                        pathname === link.href
                            ? 'xl:font-medium xl:bg-transparent xl:text-ginaOrange text-ginaWhite bg-ginaOrange'
                            : 'text-ginaBlack'
                    } duration-200 p-4 rounded-xl flex items-center justify-start gap-3 hover:bg-ginaYellow/50 hover:text-ginaBlack xl:hover:bg-transparent xl:hover:text-ginaYellow xl:rounded-none xl:gap-0 xl:p-0`}
                >
                    <span className="block xl:hidden">{link.icon}</span>
                    <span>{link.name}</span>
                </Link>
            ))}
        </>
    );
};

export const ProtectedLinks = () => {
    const pathname = usePathname();
    const isAdmin = userStore((state) => state.isAdmin);
    const isSignedIn = userStore((state) => !!state.user);

    const links = [
        ...(isAdmin
            ? [
                  {
                      name: 'Dashboard',
                      href: '/dashboard',
                      target: '_self',
                      icon: <Sparkles />,
                  },
              ]
            : []),
        ...(isSignedIn
            ? [
                  {
                      name: 'Profile',
                      href: '/profile',
                      target: '_self',
                      icon: <User />,
                  },
                  {
                      name: 'Bookings',
                      href: '/bookings',
                      target: '_self',
                      icon: <Luggage />,
                  },
              ]
            : []),
    ];

    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    target={link.target}
                    className={`${
                        pathname === link.href
                            ? 'text-ginaWhite bg-ginaOrange'
                            : 'text-ginaBlack'
                    } duration-200 xl:p-3 p-4 rounded-xl flex items-center justify-start gap-3 hover:bg-ginaGreen/25 hover:text-ginaBlack`}
                >
                    <span className="xl:hidden block">{link.icon}</span>
                    <span>{link.name}</span>
                </Link>
            ))}
        </>
    );
};
