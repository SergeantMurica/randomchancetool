import React, { useState } from "react";
import { playSound } from "./SoundManager";
import flipSound from "../assets/flip.wav";

const CoinFlip: React.FC = () => {
    const [result, setResult] = useState<string | null>(null);

    const flipCoin = () => {
        playSound(flipSound);
        setResult(Math.random() > 0.5 ? "Heads" : "Tails");
    };

    return (
        <div className="p-6 bg-white text-black rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-semibold">Coin Flip</h2>
            <button
                onClick={flipCoin}
                className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 transition rounded"
            >
                Flip Coin
            </button>
            {result && <p className="mt-4 text-lg">{result}</p>}
        </div>
    );
};

export default CoinFlip;
