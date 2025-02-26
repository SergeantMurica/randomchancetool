import React, { useState } from "react";
import { playSound } from "../utils/SoundManager";
import clickSound from "../assets/click.mp3";

const EvensOdds: React.FC = () => {
    const [result, setResult] = useState<string | null>(null);

    const getEvensOrOdds = () => {
        playSound(clickSound);
        setResult(Math.random() > 0.5 ? "Evens" : "Odds");
    };

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-semibold">Evens or Odds</h2>
            <button
                onClick={getEvensOrOdds}
                className={`mt-5 px-3 py-1 rounded-full ${
                    result
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-700"
                }`}
            >
                Pick
            </button>
            {result && <p className="text-2xl font-bold mt-20 mb-4 text-white">{result}</p>}
        </div>
    );
};

export {EvensOdds};
