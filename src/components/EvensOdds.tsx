import React, { useState } from "react";
import { playSound } from "./SoundManager";
import clickSound from "../assets/click.mp3";

const EvensOdds: React.FC = () => {
    const [result, setResult] = useState<string | null>(null);

    const getEvensOrOdds = () => {
        playSound(clickSound);
        setResult(Math.random() > 0.5 ? "Evens" : "Odds");
    };

    return (
        <div className="p-6 bg-white text-black rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-semibold">Evens or Odds</h2>
            <button
                onClick={getEvensOrOdds}
                className="mt-4 px-4 py-2 bg-purple-500 hover:bg-purple-700 transition rounded"
            >
                Pick
            </button>
            {result && <p className="mt-4 text-lg">{result}</p>}
        </div>
    );
};

export default EvensOdds;
