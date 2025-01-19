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
            className={`${isMobile ? 'flex-col p-16' : 'flex-row'} flex items-center justify-between xl:h-auto h-full gap-6`}
        >
            <div className="flex flex-col xl:flex-row gap-4">
                {Links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        target={link.target}
                        onClick={isMobile ? toggleSidebar : undefined}
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

            <div className="flex flex-col xl:flex-row gap-4 xl:w-auto w-full">
                {/* <ModalButton
                    buttonContent="Login"
                    buttonClassName="border border-ginaLightYellow text-ginaLightYellow hover:border-ginaBlue hover:text-ginaBlue duration-200 bg-ginaWhite rounded-lg w-full xl:w-24 p-1"
                >
                    <div ref={modalRef}>
                        <LoginPopup />
                    </div>
                </ModalButton> */}
                {/* <ModalButton
                    buttonContent="Start Now"
                    buttonClassName="border border-ginaLightYellow text-ginaWhite bg-ginaLightYellow hover:border-ginaBlue hover:bg-ginaBlue duration-200 rounded-lg w-full xl:w-24 p-1"
                >
                    <div ref={modalRef}>
                        
                    </div>
                </ModalButton> */}
                <SignupPopup />
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

                <div className="hidden xl:flex items-center justify-between rounded-l-full w-auto h-full px-12 gap-12 bg-ginaWhite">
                    {renderLinks(false)}
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
                className={`xl:hidden fixed top-0 right-0 h-screen w-64 rounded-l-3xl bg-ginaWhite z-30 transform shadow-xl ${
                    isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                } transition-transform duration-200`}
            >
                <button
                    className="absolute top-4 right-6 text-ginaBlue opacity-50 hover:opacity-100 text-3xl transition-all duration-200 ease-in-out"
                    onClick={toggleSidebar}
                >
                    &times;
                </button>

                {renderLinks(true)}
            </div>
        </nav>
    );
};

export default Header;
