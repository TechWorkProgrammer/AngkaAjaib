"use client";
import React from "react";
import Image from "next/image";

interface CharProps {
  message: string;
}

const Char: React.FC<CharProps> = ({ message }) => (
  <>
    <div className="fixed bottom-[45vh] right-14 z-30 max-w-[400px] bg-white/90 text-gray-800
                    rounded-xl p-4 text-4xl shadow-md">
      {message}
    </div>
    <div className="fixed bottom-4 right-4 z-20">
      <Image
        src="/assets/char/normal.png"
        alt="Character"
        width={1024}
        height={1024}
        className="w-[40vh] h-[40vh] scale-x-[-1]"
      />
    </div>
  </>
);

export default Char;
