import type { Metadata } from 'next';
import { FONTS } from '@/configurations';
import './globals.css';
import { Header, Footer } from '@/components/layout';
import { NewsletterBanner } from '@/components/popup';
import AuthProvider from '@/providers/authProvider';

export const metadata: Metadata = {
    title: 'Gina Experiences',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthProvider>
            <html lang="en">
                <head>
                    <link rel="icon" href="/images/gina/logo-icon.png" />
                </head>
                <body
                    className={`${FONTS.alpha.className} w-svw bg-ginaWhite text-ginaBlack`}
                >
                    {children}
                </body>
            </html>
        </AuthProvider>
    );
}
