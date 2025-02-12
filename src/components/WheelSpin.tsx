import React, { useState } from "react";
import { playSound } from "./SoundManager";
import spinSound from "../assets/spin.wav";

const WheelSpin: React.FC = () => {
    const [choices, setChoices] = useState<string[]>(["Option 1", "Option 2", "Option 3"]);
    const [result, setResult] = useState<string | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);

    const spinWheel = () => {
        playSound(spinSound);
        setIsSpinning(true);

        setTimeout(() => {
            const randomChoice = choices[Math.floor(Math.random() * choices.length)];
            setResult(randomChoice);
            setIsSpinning(false);
        }, 3000);
    };

    return (
        <div className="p-6 bg-white text-black rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-semibold">Wheel Spin</h2>
            <button
                onClick={spinWheel}
                className={`mt-4 px-4 py-2 bg-red-500 hover:bg-red-700 transition rounded ${isSpinning ? "animate-spin" : ""}`}
                disabled={isSpinning}
            >
                Spin
            </button>
            {result && <p className="mt-4 text-lg">{result}</p>}
        </div>
    );
};

export default WheelSpin;
