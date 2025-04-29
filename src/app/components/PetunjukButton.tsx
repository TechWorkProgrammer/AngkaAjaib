"use client";
import React from "react";
import Image from "next/image";

interface PetunjukButtonProps {
    onClick: () => void;
}

const PetunjukButton: React.FC<PetunjukButtonProps> = ({onClick}) => {
    return (
        <div className="fixed bottom-4 left-4 z-20">
            <button onClick={onClick}>
                <Image
                    src="/assets/icon/petunjuk.png"
                    alt="Petunjuk Button"
                    width={1024}
                    height={1024}
                    className="hover:scale-110 transition-transform h-32 w-48"
                />
            </button>
        </div>
    );
};

export default PetunjukButton;
