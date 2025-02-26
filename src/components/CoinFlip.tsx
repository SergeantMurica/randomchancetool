import React, { useState } from "react";
import { playSound } from "../utils/SoundManager";
import flipSound from "../assets/flip.wav";

const CoinFlip: React.FC = () => {
    const [isFlipping, setIsFlipping] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [flipCount, setFlipCount] = useState(0);

    const flipCoin = () => {
        setIsFlipping(true);
        playSound(flipSound);
        setFlipCount(prev => prev + 1);

        setTimeout(() => {
            const newResult = Math.random() > 0.5 ? "heads" : "tails";
            setResult(newResult);
            setIsFlipping(false);
        }, 1500);
    };

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 text-white">Coin Flip</h2>

            <div className="relative h-52 w-52 mb-6">
                <div
                    className={`coin-container absolute inset-0 rounded-full w-full h-full preserve-3d 
                     ${isFlipping ? `flip-it-${flipCount % 2}` : ""}`}
                >
                    <div className="coin-side absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-300
                        rounded-full flex items-center justify-center backface-hidden">
                        <span className="text-4xl font-bold text-yellow-800">H</span>
                    </div>
                    <div className="coin-side absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-200
                        rounded-full flex items-center justify-center backface-hidden rotate-y-180">
                        <span className="text-4xl font-bold text-yellow-800">T</span>
                    </div>
                </div>
            </div>

            <button
                onClick={flipCoin}
                disabled={isFlipping}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full
                 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105
                 transition-all disabled:opacity-50 disabled:transform-none"
            >
                {isFlipping ? "Flipping..." : "Flip Coin"}
            </button>

            {result && !isFlipping && (
                <p className="mt-4 text-lg font-medium text-white">
                    Result: <span className="font-bold">{result.toUpperCase()}</span>
                </p>
            )}
        </div>
    );
};

export {CoinFlip};
