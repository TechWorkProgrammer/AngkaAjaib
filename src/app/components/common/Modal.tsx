"use client";
import React from "react";
import Image from "next/image";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative w-auto h-[90vh] aspect-[4/3] flex items-center justify-center">
                <Image
                    src="/assets/card.png"
                    alt="Card Background"
                    fill
                    className="object-contain"
                    priority
                />
                <div className="absolute inset-0 flex flex-col justify-start items-start p-[15%]">
                    <button
                        onClick={onClose}
                        className="absolute -top-2 -left-24 z-20"
                    >
                        <Image
                            src="/assets/icon/back.png"
                            alt="Back Button"
                            width={1024}
                            height={1024}
                            className="hover:opacity-80 transition w-24 h-24"
                        />
                    </button>

                    <div className="relative z-10 flex flex-col space-y-4 w-full text-[#333]">
                        <h2 className="text-4xl font-bold ms-6">{title}</h2>
                        <div className="text-2xl">{children}</div>
                    </div>

                    <div className="absolute bottom-[-10px] right-[-10px] z-10">
                        <Image
                            src="/assets/char/half_normal.png"
                            alt="Character"
                            width={1024}
                            height={1024}
                            className="w-[40vh] h-[40vh]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
