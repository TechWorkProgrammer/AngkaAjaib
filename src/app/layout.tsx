import "./styles/globals.css";
import React from "react";
import type {Metadata} from "next";
import {AlertProvider} from "@/context/AlertContext";
import {SoundProvider} from "@/context/SoundContext";

export const metadata: Metadata = {
    title: "Jejak Angka Ajaib | Game Edukasi Matematika",
    description: "Asah fokus dan ketelitianmu dengan Jejak Angka Ajaib! Urutkan bilangan cacah hingga 10.000 dan temukan pola seru di setiap levelnya.",
    openGraph: {
        title: "Jejak Angka Ajaib | Game Edukasi Matematika",
        description: "Mainkan Jejak Angka Ajaib, game seru untuk mengasah kemampuan mengurutkan bilangan dan mengenali pola. Gratis dan cocok untuk anak SD!",
        url: "https://angkaajaib.techwork.store",
        siteName: "Jejak Angka Ajaib",
        type: "website",
        locale: "id_ID",
        images: [
            {
                url: "/assets/icon.png",
                width: 1200,
                height: 630,
                alt: "Jejak Angka Ajaib - Game Edukasi Matematika",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Jejak Angka Ajaib | Game Edukasi Matematika",
        description: "Yuk main Jejak Angka Ajaib! Urutkan bilangan cacah hingga 10.000 dan bentuk pola menarik. Gratis untuk anak-anak!",
        images: ["/assets/icon.png"],
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="id">
        <body>
        <SoundProvider>
            <AlertProvider>
                <div
                    className="min-h-screen bg-[url('/assets/bg.png')] bg-repeat bg-top bg-[length:200px_200px] z-10 flex flex-col">
                    {children}
                </div>
            </AlertProvider>
        </SoundProvider>
        </body>
        </html>
    );
}
