"use client";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Layout from "@/components/Layout";
import Canvas from "@/components/Canvas";
import Char from "@/components/Char";
import BarHP from "@/components/BarHP";
import PetunjukButton from "@/components/PetunjukButton";
import Modal from "@/components/common/Modal";
import TutorialContent from "@/components/TutorialContent";
import {useSound} from "@/context/SoundContext";
import Image from "next/image";

interface LevelData {
    min_number: number;
    max_number: number;
    target_count: number;
    target_tiles: { x: number; y: number }[];
}

const PlayPage: React.FC = () => {
    const {playSfx} = useSound();
    const router = useRouter();

    const [level, setLevel] = useState(1);
    const [hp, setHp] = useState(4);
    const [selected, setSelected] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const [msg, setMsg] = useState("Semangat, Kamu pasti bisa");
    const [showTut, setShowTut] = useState(false);
    const [win, setWin] = useState(false);
    const [lose, setLose] = useState(false);
    const [data, setData] = useState<LevelData | null>(null);

    useEffect(() => {
        const lv = parseInt(localStorage.getItem("level") || "1", 10);
        setLevel(lv);
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const levelData = require(`@/data/levels/level${lv}.json`);
        setData(levelData);
    }, []);

    const need = data ? data.target_count - 1 : 0;

    useEffect(() => {
        if (selected >= need && need > 0) setWin(true);
    }, [selected, need]);

    useEffect(() => {
        if (hp <= 0) setLose(true);
    }, [hp]);

    const correct = () => {
        playSfx();
        setSelected((n) => n + 1);
        setMsg(
            selected + 1 >= need
                ? "Keren! Semua angka ketemu!"
                : `Bagus! Sisa ${need - (selected + 1)} angka lagi!`
        );
    };

    const wrong = () => {
        playSfx();
        setHp((h) => Math.max(h - 1, 0));
        setMsg("Angka tidak besar dari sebelumnya, coba lagi ya !!!");
    };

    const handleSeeResult = () => {
        setWin(false);
        setShowResult(true);
    };

    const handleNextLevel = () => {
        const next = Math.min(level + 1, 3);
        localStorage.setItem("level", next.toString());
        router.push("/play");
    };

    const retry = () => router.push("/play");
    const score = hp * 25;

    if (!data) return null;

    return (
        <Layout>
            <div className="relative w-full h-full flex flex-col items-center pt-4">
                <Canvas data={data} onCorrect={correct} onWrong={wrong}/>

                <div className="flex flex-col items-center">
                    <Image
                        src={`/assets/icon/level${level}.png`}
                        alt={`Level ${level}`}
                        width={96}
                        height={96}
                        className="w-24 h-24"
                    />
                </div>
                <PetunjukButton onClick={() => setShowTut(true)}/>
                <BarHP hp={hp}/>
                <Char message={msg}/>

                <Modal isOpen={showTut} onClose={() => setShowTut(false)} title="📘 Petunjuk">
                    <TutorialContent/>
                </Modal>

                <Modal isOpen={win} onClose={handleSeeResult} title="">
                    <h1 className="text-center text-4xl font-bold mb-2">✅ Yeay Kamu Berhasil ✅</h1>
                    <p className="mb-4 text-center">Selamat kamu berhasil menemukan angka ajaibnya!</p>

                    <div className="flex justify-center w-full">
                        <button
                            onClick={handleSeeResult}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-5 py-2 rounded-lg"
                        >
                            Lihat Hasil
                        </button>
                    </div>
                </Modal>

                <Modal isOpen={showResult} onClose={handleNextLevel} title="">
                    <h1 className="text-center text-4xl font-bold mb-4">Hasil Permainan</h1>
                    <h1 className="text-center text-2xl font-bold mb-4">Selamat !!!</h1>
                    <p className="text-center mb-2">Kamu menemukan pola rahasianya!</p>
                    <p className="text-center mb-6 font-semibold text-lg">Skor = {score}</p>

                    <div className="flex justify-center w-full">
                        <button
                            onClick={handleNextLevel}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold px-5 py-2 rounded-lg"
                        >
                            Lanjut Level
                        </button>
                    </div>
                </Modal>

                <Modal isOpen={lose} onClose={retry} title="">
                    <h1 className="text-center text-4xl font-bold mb-2">❌ Ooops ❌</h1>
                    <p className="mb-4 text-center">Wahhh kesempatanmu udah abis nih, Coba lagi yuk !</p>

                    <div className="flex justify-center w-full">
                        <button
                            onClick={retry}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2 rounded-lg"
                        >
                            Coba Lagi
                        </button>
                    </div>
                </Modal>

            </div>
        </Layout>
    );
};

export default PlayPage;
