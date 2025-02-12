import React, { useState } from "react";
import { playSound } from "./SoundManager";
import clickSound from "../assets/click.mp3";

const DiceRoll: React.FC = () => {
    const [result, setResult] = useState<number | null>(null);

    const rollDice = () => {
        playSound(clickSound);
        setResult(Math.floor(Math.random() * 6) + 1);
    };

    return (
        <div className="p-6 bg-white text-black rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-xl font-semibold">Dice Roll</h2>
            <button
                onClick={rollDice}
                className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-700 transition rounded"
            >
                Roll Dice
            </button>
            {result && <p className="mt-4 text-lg">{result}</p>}
        </div>
    );
};

export default DiceRoll;
