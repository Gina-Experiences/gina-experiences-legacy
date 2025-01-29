import '../globals.css';
import { Header, Footer } from '@/components/layout';
import { NewsletterBanner } from '@/components/popup';

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full relative">
            <Header />
            {children}
            <NewsletterBanner />
            <Footer />
        </div>
    );
}
