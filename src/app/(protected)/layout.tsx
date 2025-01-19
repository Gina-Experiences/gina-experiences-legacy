import '../globals.css';
import { Sidebar } from '@/components/layout';

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-full max-w-screen-2xl h-svh p-0 lg:p-8">
                <div className="w-full h-full rounded-none lg:rounded-[50px] bg-gradient-to-r from-ginaYellow to-ginaOrange flex p-4 lg:p-8 gap-4 lg:gap-8">
                    <Sidebar />
                    <div className="w-full h-full border-2 bg-ginaWhite rounded-3xl lg:rounded-[34px]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
