import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function GuestLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <Navbar />
            <main className="w-screen flex items-center justify-center">
                <section className="max-w-[90vw]">
                    {children}
                </section>
            </main>
        <Footer />
        </>
    )
}
