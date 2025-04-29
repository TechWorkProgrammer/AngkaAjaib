"use client";
import React from "react";

const TutorialContent: React.FC = () => {
    return (
        <div className="space-y-4 text-left">
            <p>Cara Bermain:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>Cari angka awal yang diberi lingkaran hijau.</li>
                <li>Klik angka selanjutnya (misalnya: 8.731 → 8.732 → 8.733).</li>
                <li>Klik terus sampai semua angka benar dan membuat suatu pola!</li>
            </ul>
            <p>Ingat ya:</p>
            <ul className="list-disc list-inside space-y-2">
                <li>✅ Kalau benar, akan muncul lingkaran hijau.</li>
                <li>❌ Kalau salah, akan muncul notifikasi salah coba lagi ya!</li>
                <li>✨ Kalau semua benar, akan muncul pola unik!</li>
            </ul>
            <p className="font-bold">Ayo mulai dan temukan pola ajaibnya! ⭐</p>
        </div>
    );
};

export default TutorialContent;
