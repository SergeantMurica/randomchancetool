import React, { useState } from "react";
import { playSound } from "../utils/SoundManager";
import rollSound from "../assets/click.mp3";

const DiceRoll: React.FC = () => {
    const [result, setResult] = useState<number | null>(null);
    const [isRolling, setIsRolling] = useState(false);
    const [diceCount, setDiceCount] = useState(1);
    const [results, setResults] = useState<number[]>([]);

    const rollDice = () => {
        setIsRolling(true);
        playSound(rollSound);

        // Generate random animations
        const diceElements = document.querySelectorAll('.dice');
        diceElements.forEach(die => {
            die.classList.remove('roll-animation');
            void (die as HTMLElement).offsetWidth; // Trigger reflow
            die.classList.add('roll-animation');
        });

        setTimeout(() => {
            const newResults = Array(diceCount).fill(0).map(() =>
                Math.floor(Math.random() * 6) + 1
            );
            setResults(newResults);
            setResult(newResults.reduce((a, b) => a + b, 0));
            setIsRolling(false);
        }, 2000);
    };

    const renderDiceFace = (value: number) => {
        const dotPositions = {
            1: ["center"],
            2: ["top-right", "bottom-left"],
            3: ["top-right", "center", "bottom-left"],
            4: ["top-left", "top-right", "bottom-left", "bottom-right"],
            5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
            6: ["top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right"]
        };

        const positions = dotPositions[value as keyof typeof dotPositions];

        return (
            <div className="dice-face absolute inset-0 bg-white rounded-lg flex flex-wrap p-2">
                {positions.map((pos, i) => (
                    <div
                        key={i}
                        className={`dice-dot ${pos} absolute w-3 h-3 bg-black rounded-full`}
                    ></div>
                ))}
            </div>
        );
    };

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Dice Roll</h2>

            <div className="flex space-x-2 mb-4">
                {[1, 2, 3].map(num => (
                    <button
                        key={num}
                        onClick={() => setDiceCount(num)}
                        className={`px-3 py-1 rounded-full ${
                            diceCount === num
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-700"
                        }`}
                    >
                        {num} {num === 1 ? "Die" : "Dice"}
                    </button>
                ))}
            </div>

            <div className="flex justify-center space-x-4 my-6 h-24">
                {Array(diceCount).fill(0).map((_, i) => (
                    <div key={i} className="dice relative w-20 h-20 preserve-3d">
                        {results[i] ? renderDiceFace(results[i]) : renderDiceFace(6)}
                    </div>
                ))}
            </div>

            <button
                onClick={rollDice}
                disabled={isRolling}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full
                 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105
                 transition-all disabled:opacity-50 disabled:transform-none"
            >
                {isRolling ? "Rolling..." : "Roll Dice"}
            </button>

            {result !== null && !isRolling && (
                <p className="mt-4 text-xl font-bold text-white">
                    Total: {result}
                </p>
            )}
        </div>
    );
};

export {DiceRoll};
