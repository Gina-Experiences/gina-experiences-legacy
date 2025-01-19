'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SignupPopup } from '@/components/popup';
import {
    House,
    Lightbulb,
    Map,
    BriefcaseBusiness,
    Phone,
    Sparkles,
    Menu,
} from 'lucide-react';
import { userStore } from '@/stores';

const Header = () => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const isAdmin = userStore((state) => state.isAdmin);

    const Links = [
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
    ];

    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(target) &&
                (!modalRef.current || !modalRef.current.contains(target))
            ) {
                setIsSidebarOpen(false);
            }
        };

        if (isSidebarOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);

    const renderLinks = (isMobile: boolean) => (
        <div
            className={`${isMobile ? 'flex-col overflow-y-auto' : 'flex-row'} flex items-center justify-between gap-6`}
        >
            <div className="flex flex-col xl:flex-row gap-1 xl:gap-4 w-full h-full">
                {Links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        target={link.target}
                        onClick={isMobile ? toggleSidebar : undefined}
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
            </div>
        </div>
    );

    return (
        <nav className="w-full flex justify-center items-center absolute z-20">
            <div className="w-full max-w-screen-2xl h-16 mt-16 items-center flex justify-between px-8">
                <div className="flex justify-end rounded-r-full bg-ginaWhite h-full px-12 py-3 lg:w-1/5 w-auto">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/images/gina/logo.png"
                            alt="Gina Experiences Logo"
                            quality={100}
                            width={100}
                            height={100}
                            className="w-auto h-full"
                        />
                    </Link>
                </div>

                <div className="hidden xl:flex items-center justify-between rounded-l-full w-auto h-full px-12 gap-6 bg-ginaWhite">
                    {renderLinks(false)}
                    <div className="flex flex-col gap-4">
                        <SignupPopup />
                    </div>
                </div>

                <div className="xl:hidden px-12 gap-12 bg-ginaWhite rounded-l-full h-full flex items-center">
                    <button
                        className=" text-ginaOrange hover:text-ginaBlue duration-300"
                        onClick={toggleSidebar}
                    >
                        <Menu size={26} />
                    </button>
                </div>
            </div>

            <div
                ref={sidebarRef}
                className={`xl:hidden fixed top-0 right-0 w-full sm:w-80 sm:rounded-l-3xl bg-ginaWhite z-30 transform shadow-xl p-8 flex flex-col justify-between h-full gap-6 ${
                    isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-200`}
            >
                <div className="h-full flex flex-col gap-6 pb-24">
                    <div className="flex items-center justify-end">
                        <button
                            className="text-ginaGreen/75 hover:text-ginaGreen text-3xl duration-200"
                            onClick={toggleSidebar}
                        >
                            &times;
                        </button>
                    </div>

                    {renderLinks(true)}
                </div>

                <div className="xl:w-auto w-full absolute bg-ginaWhite bottom-0 right-0 p-8">
                    <SignupPopup />
                </div>
            </div>
        </nav>
    );
};

export default Header;
