"use client";
import React from "react";
import Image from "next/image";

const PortraitWarning: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#FFFDD0] text-center">
            <Image
                src="/assets/icon/rotate.png"
                alt="Rotate Device"
                width={150}
                height={150}
                className="mb-8"
            />
            <h1 className="text-2xl font-bold text-[#333] mb-4">Putar Layar Anda</h1>
            <p className="text-lg text-[#555]">Untuk pengalaman terbaik, silakan gunakan mode landscape.</p>
        </div>
    );
};

export default PortraitWarning;
