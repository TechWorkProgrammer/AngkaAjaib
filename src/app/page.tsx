"use client";
import React, {useEffect, useState} from "react";
import Layout from "@/components/Layout";
import Modal from "@/components/common/Modal";
import { useSound } from "@/context/SoundContext";
import Char from "@/components/Char";
import Image from "next/image";
import TutorialContent from "@/components/TutorialContent";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
    const { playSfx } = useSound();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [level, setLevel] = useState(1);
    const router = useRouter();

    useEffect(() => {
        const storedLevel = localStorage.getItem("level");
        if (storedLevel) {
            setLevel(parseInt(storedLevel, 10));
        }
    }, []);

    const handleStart = () => {
        playSfx();
        localStorage.setItem("level", level.toString());
        router.push("/play");
    };

    const toggleModal = () => {
        playSfx();
        setIsModalOpen(!isModalOpen);
    };

    const levelImageSrc = `/assets/icon/level${level}.png`;

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center mt-16 relative text-[#FFFDD0]">
                <h1 className="text-5xl font-extrabold mb-10 text-center">Jejak Angka Ajaib</h1>

                <div className="relative mb-8">
                    <button onClick={handleStart} className="relative">
                        <Image
                            src="/assets/icon/play.png"
                            alt="Play Button"
                            width={1024}
                            height={1024}
                            className="hover:scale-110 transition-transform w-48 h-48"
                        />
                    </button>
                </div>

                <div className="flex items-center justify-center gap-6">
                    <div className="relative">
                        <Image
                            src={levelImageSrc}
                            alt={`Level ${level}`}
                            width={1024}
                            height={1024}
                            className="hover:scale-105 transition-transform cursor-pointer h-36 w-48"
                        />
                    </div>

                    <div className="relative">
                        <button onClick={toggleModal}>
                            <Image
                                src="/assets/icon/petunjuk.png"
                                alt="Petunjuk Button"
                                width={1024}
                                height={1024}
                                className="hover:scale-110 transition-transform h-32 w-48"
                            />
                        </button>
                    </div>
                </div>

                <Modal isOpen={isModalOpen} onClose={toggleModal} title="📘 Petunjuk Permainan">
                    <TutorialContent />
                </Modal>

                <Char message={""} />
            </div>
        </Layout>
    );
};

export default Home;
