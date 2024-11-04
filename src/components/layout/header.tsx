'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

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
    ];

    return (
        <nav className="p-10 flex items-center justify-center space-x-6">
            <span>Header Links:</span>
            {Links.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className={`${
                        pathname === link.href
                            ? 'font-bold text-ginaOrange'
                            : 'text-ginaYellow'
                    } hover:text-ginaGreen transition duration-200`}
                >
                    {link.name}
                </Link>
            ))}
        </nav>
    );
};

export default Header;
