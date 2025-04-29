"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface SoundContextProps {
    isBgmOn: boolean;
    isSfxOn: boolean;
    toggleBgm: () => void;
    toggleSfx: () => void;
    playSfx: () => void;
}

const SoundContext = createContext<SoundContextProps | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isBgmOn, setIsBgmOn] = useState(true);
    const [isSfxOn, setIsSfxOn] = useState(true);
    const [bgmAudio, setBgmAudio] = useState<HTMLAudioElement | null>(null);
    const [sfxAudio, setSfxAudio] = useState<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const bgm = new Audio("/assets/sounds/bgm.mp3");
            bgm.loop = true;
            bgm.volume = 0.3;
            setBgmAudio(bgm);

            const sfx = new Audio("/assets/sounds/click.mp3");
            setSfxAudio(sfx);
        }
    }, []);

    useEffect(() => {
        if (bgmAudio) {
            if (isBgmOn) {
                bgmAudio.play().catch(() => {
                });
            } else {
                bgmAudio.pause();
            }
        }
    }, [isBgmOn, bgmAudio]);

    const toggleBgm = () => {
        setIsBgmOn(prev => !prev);
    };

    const toggleSfx = () => {
        setIsSfxOn(prev => !prev);
    };

    const playSfx = () => {
        if (isSfxOn && sfxAudio) {
            const click = sfxAudio.cloneNode() as HTMLAudioElement;
            click.play();
        }
    };

    return (
        <SoundContext.Provider value={{ isBgmOn, isSfxOn, toggleBgm, toggleSfx, playSfx }}>
            {children}
        </SoundContext.Provider>
    );
};

export const useSound = (): SoundContextProps => {
    const context = useContext(SoundContext);
    if (!context) {
        throw new Error("useSound must be used within a SoundProvider");
    }
    return context;
};
