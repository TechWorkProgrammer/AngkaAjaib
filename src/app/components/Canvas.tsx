"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import Tile from "@/types/Tile";

interface LevelData {
    min_number: number;
    max_number: number;
    target_count: number;
    target_tiles: { x: number; y: number }[];
}

interface CanvasProps {
    data: LevelData;
    onCorrect: () => void;
    onWrong: () => void;
}

const Canvas: React.FC<CanvasProps> = ({data, onCorrect, onWrong}) => {
    const [grid, setGrid] = useState<Tile[][]>([]);
    const [sequence, setSequence] = useState<number[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        generateGrid();
    }, [data]);

    const generateGrid = () => {
        const {min_number, max_number, target_count, target_tiles} = data;

        const seq: number[] = [];
        let cur = min_number;
        while (seq.length < target_count && cur <= max_number) {
            seq.push(cur);
            cur += Math.floor(Math.random() * 100) + 1;
        }
        setSequence(seq);

        const base: Tile[][] = Array.from({length: 10}, () =>
            Array.from({length: 10}, () => ({
                number: makeNoise(min_number, max_number),
                isTarget: false,
                isStart: false,
                isChosen: false,
                isWrong: false,
            }))
        );

        target_tiles.forEach((t, idx) => {
            const x = t.x - 1, y = t.y - 1;
            base[y][x] = {
                number: seq[idx],
                isTarget: true,
                isStart: idx === 0,
                isChosen: idx === 0,
                isWrong: false,
            };
        });

        setGrid(base);
        setCurrentIndex(0);
    };

    const makeNoise = (min: number, max: number) => {
        while (true) {
            const n = Math.floor(Math.random() * 90000) + 1000;
            if (n < min || n > max) return n;
        }
    };

    const handleClick = (r: number, c: number) => {
        const selectedCell = grid[r][c];

        if (selectedCell.isChosen || selectedCell.isWrong) return;

        const expected = sequence[currentIndex + 1];

        if (selectedCell.number === expected) {
            setGrid((prev) =>
                prev.map((row, ri) =>
                    row.map((cell, ci) =>
                        ri === r && ci === c ? {...cell, isChosen: true} : cell
                    )
                )
            );
            onCorrect();
            setCurrentIndex((i) => i + 1);
        } else {
            setGrid((prev) =>
                prev.map((row, ri) =>
                    row.map((cell, ci) => {
                        if (ri === r && ci === c) {
                            return {...cell, isWrong: true};
                        }
                        return cell;
                    })
                )
            );
            onWrong();

            setTimeout(() => {
                setGrid((prev) =>
                    prev.map((row, ri) =>
                        row.map((cell, ci) =>
                            ri === r && ci === c ? {...cell, isWrong: false} : cell
                        )
                    )
                );
            }, 800);
        }
    };

    return (
        <div className="w-full max-w-[900px] aspect-square bg-[#FFFDD0] border-2 border-gray-400
                    grid grid-cols-10 grid-rows-10 mx-auto mt-8">
            {grid.map((row, ri) =>
                row.map((cell, ci) => (
                    <div
                        key={`${ri}-${ci}`}
                        className={`relative border border-gray-300 flex items-center justify-center
                        text-2xl font-bold cursor-pointer
                        ${cell.isStart ? "rounded-full border-4 border-green-400" : ""}
                        ${cell.isChosen && !cell.isStart ? "rounded-full border-4 border-sky-400" : ""}
                        ${cell.isWrong ? "bg-red-300" : ""}`}
                        onClick={() => handleClick(ri, ci)}
                    >
                        {cell.number}
                        {cell.isWrong && (
                            <Image
                                src="/assets/icon/x.png"
                                alt="Wrong"
                                width={1024}
                                height={1024}
                                className="absolute top-0 right-0 w-24 h-24"
                            />
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default Canvas;
