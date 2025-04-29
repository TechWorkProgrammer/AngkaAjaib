"use client";
import React from "react";
import { RiHeart3Fill } from "react-icons/ri";

interface BarHPProps {
    hp: number;
}

const BarHP: React.FC<BarHPProps> = ({ hp }) => {
    return (
        <div className="absolute bottom-[900px] right-4 flex gap-1 z-30">
            {Array.from({ length: 4 }).map((_, idx) => (
                <RiHeart3Fill
                    key={idx}
                    className={`text-red-500 ${idx < hp ? "opacity-100" : "opacity-30"} transition-opacity duration-300`}
                    size={72}
                />
            ))}
        </div>
    );
};

export default BarHP;
