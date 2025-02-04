'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PublicLinks, ProtectedLinks } from '@/components/layout';
import { Menu } from 'lucide-react';
import { SignUser } from '@/components/popup';
import { userStore } from '@/stores';

const Header = () => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const isAdmin = userStore((state) => state.isAdmin);
    const isSignedIn = userStore((state) => !!state.user);
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

    const renderLinks = () => (
        <div className="flex-col overflow-y-auto xl:flex-row flex items-center justify-between gap-6">
            <div className="flex flex-col xl:flex-row gap-1 xl:gap-4 w-full h-full">
                <PublicLinks />
                {isSignedIn && (
                    <div className="flex flex-col xl:hidden gap-1 xl:gap-4 border-2 rounded-2xl border-ginaYellow/20 p-1">
                        <ProtectedLinks />
                    </div>
                )}
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
                    {renderLinks()}
                    <div className="flex flex-col gap-4">
                        <SignUser variant="dropdown" />
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
                className={`xl:hidden fixed top-0 right-0 w-full sm:w-80 bg-ginaWhite z-30 transform shadow-xl p-8 flex flex-col justify-between h-full gap-6 ${
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

                    <div className="w-full flex items-center justify-center mb-8 sm:hidden">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/images/gina/logo.png"
                                alt="Gina Experiences Logo"
                                quality={100}
                                width={100}
                                height={100}
                                className="w-32 h-auto"
                            />
                        </Link>
                    </div>
                    {renderLinks()}
                </div>

                <div className="xl:w-auto w-full absolute bg-ginaWhite bottom-0 right-0 p-8">
                    <SignUser variant="simple" />
                </div>
            </div>
        </nav>
    );
};

export default Header;
