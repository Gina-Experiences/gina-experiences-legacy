import type { Metadata } from 'next';
import { FONTS } from '@/configurations';
import './globals.css';
import { Header, Footer } from '@/components/layout';

export const metadata: Metadata = {
    title: 'Gina Experiences',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${FONTS.alpha.className} w-svw bg-ginaGray`}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
