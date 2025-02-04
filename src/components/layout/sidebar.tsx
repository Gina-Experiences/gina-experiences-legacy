'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SignUser } from '@/components/popup';
import {
    House,
    ArrowDownUp,
    ChartNoAxesCombined,
    BriefcaseBusiness,
    Package2,
    Wallet,
    Menu,
    Minus,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const sidebarRef = useRef<HTMLDivElement>(null);

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

    const toggleDesktopSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    const toggleMobileSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                isSidebarOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(target)
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
        <div className="flex flex-col items-center justify-between h-full gap-6 w-full">
            <div className="flex flex-col gap-1 w-full">
                {Links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        target={link.target}
                        onClick={() => setIsSidebarOpen(false)} // Close sidebar on link click for mobile
                        className={`${
                            pathname === link.href
                                ? 'text-ginaWhite bg-ginaOrange'
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
        <>
            <nav
                className={`hidden lg:flex relative flex-col items-center justify-between h-full bg-ginaWhite rounded-[32px] p-8 ${
                    isCollapsed ? 'w-auto' : 'min-w-80'
                }`}
            >
                <div className="flex flex-col items-center justify-start w-full h-full pb-24">
                    <div className="flex items-center justify-end w-full">
                        <button
                            onClick={toggleDesktopSidebar}
                            className="text-ginaGreen hover:text-ginaOrange duration-300"
                        >
                            {isCollapsed ? (
                                <Menu size={26} />
                            ) : (
                                <Minus size={26} />
                            )}
                        </button>
                    </div>
                    {!isCollapsed && (
                        <>
                            <Link href="/" className="flex items-center mb-10">
                                <Image
                                    src="/images/gina/logo.png"
                                    alt="Gina Experiences Logo"
                                    quality={100}
                                    width={100}
                                    height={100}
                                    className="w-auto h-full"
                                />
                            </Link>
                            <div className="h-full w-full overflow-y-auto">
                                {renderLinks()}
                            </div>
                        </>
                    )}
                </div>
                {!isCollapsed && (
                    <div className="w-full absolute bottom-0 right-0 p-8">
                        <SignUser variant="simple" />
                    </div>
                )}
            </nav>

            <button
                className="lg:hidden fixed top-12 left-12 z-20 text-ginaOrange hover:text-ginaBlue duration-300"
                onClick={toggleMobileSidebar}
            >
                <Menu size={26} />
            </button>

            <div
                ref={sidebarRef}
                className={`lg:hidden fixed top-0 left-0 w-full sm:w-80 bg-ginaWhite z-30 transform shadow-xl p-8 flex flex-col justify-between h-full gap-6 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } transition-transform duration-200`}
            >
                <div className="h-full flex flex-col gap-6 pb-24">
                    <div className="flex items-center justify-end">
                        <button
                            className="text-ginaGreen/75 hover:text-ginaGreen text-3xl duration-200"
                            onClick={toggleMobileSidebar}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="w-full flex items-center justify-center mb-8">
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

                <div className="w-full absolute bottom-0 right-0 p-8">
                    <SignUser variant="simple" />
                </div>
            </div>
        </>
    );
};

export default Sidebar;
