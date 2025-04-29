"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {useSound} from "@/context/SoundContext";
import PortraitWarning from "@/components/PortraitWarning";

const Layout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const {isBgmOn, isSfxOn, toggleBgm, toggleSfx, playSfx} = useSound();
    const [isPortrait, setIsPortrait] = useState(false);

    const handleResize = () => {
        setIsPortrait(window.innerHeight > window.innerWidth);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleToggleBgm = () => {
        playSfx();
        toggleBgm();
    };

    const handleToggleSfx = () => {
        playSfx();
        toggleSfx();
    };

    if (isPortrait) {
        return <PortraitWarning/>;
    }

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
            <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={handleToggleBgm} className="relative w-12 h-12 md:w-20 md:h-20">
                    <Image src="/assets/icon/music.png" alt="BGM Icon" fill/>
                    {!isBgmOn && (
                        <Image
                            src="/assets/icon/x.png"
                            alt="Off"
                            fill
                            className="absolute top-0 left-1"
                        />
                    )}
                </button>

                <button onClick={handleToggleSfx} className="relative w-12 h-12 md:w-20 md:h-20">
                    <Image src="/assets/icon/sfx.png" alt="SFX Icon" fill/>
                    {!isSfxOn && (
                        <Image
                            src="/assets/icon/x.png"
                            alt="Off"
                            fill
                            className="absolute top-0 left-1"
                        />
                    )}
                </button>
            </div>

            {children}
        </div>
    );
};

export default Layout;
