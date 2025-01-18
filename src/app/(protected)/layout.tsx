import '../globals.css';
import { Sidebar } from '@/components/layout';

export default function ProtectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full flex items-center justify-center">
            <div className="w-full max-w-screen-2xl h-svh p-8">
                <div className="w-full h-full rounded-[50px] bg-gradient-to-r from-ginaYellow to-ginaOrange flex p-8 gap-8">
                    <Sidebar />
                    <div className="w-3/4 h-full border-2 bg-ginaWhite rounded-[34px]">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
