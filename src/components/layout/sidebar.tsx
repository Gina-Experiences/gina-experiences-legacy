'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa6';
import { SignupPopup } from '@/components/popup';
import {
    House,
    ArrowDownUp,
    ChartNoAxesCombined,
    BriefcaseBusiness,
    Package2,
    Wallet,
} from 'lucide-react';

const Sidebar = () => {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const Links = [
        {
            name: 'Dashboard',
            href: '/dashboard',
            target: '_self',
            icon: <House />,
        },
        {
            name: 'Transactions',
            href: '/transactions',
            target: '_self',
            icon: <ArrowDownUp />,
        },
        {
            name: 'Users Analytics',
            href: '/users-analytics',
            target: '_self',
            icon: <ChartNoAxesCombined />,
        },
        {
            name: 'Sales & Transactions',
            href: '/sales-transactions',
            target: '_self',
            icon: <BriefcaseBusiness />,
        },
        {
            name: 'Product Analysis',
            href: '/product-analysis',
            target: '_self',
            icon: <Package2 />,
        },
        {
            name: 'Financial Overview',
            href: '/financial-overview',
            target: '_self',
            icon: <Wallet />,
        },
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
        <div className="flex flex-col items-center justify-between xl:h-auto h-full gap-6 w-full">
            <div className="flex flex-col gap-1 w-full">
                {Links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        target={link.target}
                        onClick={isMobile ? toggleSidebar : undefined}
                        className={`${
                            pathname === link.href
                                ? ' text-ginaWhite bg-ginaOrange'
                                : 'text-ginaBlack'
                        } rounded-xl p-4 hover:bg-ginaYellow/50 hover:text-ginaBlack transition duration-200 flex items-center gap-3 cursor-pointer font-medium`}
                    >
                        <span>{link.icon}</span>
                        <span>{link.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );

    return (
        <nav className="w-1/4 flex flex-col items-center justify-between h-full bg-ginaWhite rounded-[32px] p-8">
            <div className="flex flex-col items-center gap-10 w-full">
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
                <div className="w-full">{renderLinks(false)}</div>
            </div>
            <div className="w-full">
                <SignupPopup />
            </div>
            {/* <button
                className=" text-ginaOrange hover:text-ginaBlue transition-all duration-200 ease-in-out"
                onClick={toggleSidebar}
            >
                <FaBars size={20} />
            </button> */}

            {/* <div
                ref={sidebarRef}
                className={`xl:hidden fixed top-0 left-0 h-screen w-64 rounded-l-3xl bg-ginaWhite z-30 transform shadow-xl ${
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
            </div> */}
        </nav>
    );
};

export default Sidebar;
