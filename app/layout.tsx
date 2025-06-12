import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Hero } from "components/Hero";
import { Footer } from "components/Footer";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Anime Vault",
    description: "Your favorite anime, all in one place."
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
    <html lang="en">
        <body className={dmSans.className}>
            <main className="mx-auto max-w-screen-2xl bg-[#0F1117]">
                <Hero />
                {children}
                <Footer />
            </main>
        </body>
    </html>
);

export default RootLayout;
