'use client';

import { AuthProvider } from "@/app/admin/components/authContext"; // Lokasi AuthContext
import { Geist, Geist_Mono } from "next/font/google";
import './custom.css';
import './globals.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <AuthProvider> {/* Tetap digunakan untuk otentikasi global */}
                    {/* <Header /> */}
                    <main>{children}</main>
                </AuthProvider>
            </body>
        </html>
    );
}
