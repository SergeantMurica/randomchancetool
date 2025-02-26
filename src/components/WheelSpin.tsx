import React, { useState, useRef } from "react";
import { playSound } from "../utils/SoundManager";
import spinSound from "../assets/spin.wav";

const COLORS = [
    "#e74c3c", "#3498db", "#2ecc71", "#f39c12",
    "#9b59b6", "#1abc9c", "#d35400", "#34495e",
    "#e84393", "#6c5ce7", "#00cec9", "#fdcb6e"
];

const WheelSpin: React.FC = () => {
    const [choices, setChoices] = useState<string[]>(["Option 1", "Option 2"]);
    const [result, setResult] = useState<string | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [newChoice, setNewChoice] = useState("");
    const [rotation, setRotation] = useState(0);
    const wheelRef = useRef<HTMLDivElement>(null);

    const spinWheel = () => {
        if (isSpinning || choices.length < 2) return;

        setIsSpinning(true);
        playSound(spinSound);

        // Calculate a random spin (5-10 full rotations + random segment)
        const spins = 5 + Math.floor(Math.random() * 5);
        const segmentAngle = 360 / choices.length;
        const randomSpin = Math.floor(Math.random() * choices.length);
        const extraAngle = randomSpin * segmentAngle;
        const finalRotation = rotation + (spins * 360) + extraAngle;

        setRotation(finalRotation);

        // Calculate which segment is selected (opposite to the pointer at top)
        setTimeout(() => {
            const selectedIndex = choices.length - 1 - randomSpin;
            setResult(choices[selectedIndex % choices.length]);
            setIsSpinning(false);
        }, 5000);
    };

    const addChoice = () => {
        if (newChoice.trim() && choices.length < 35) {
            setChoices([...choices, newChoice.trim()]);
            setNewChoice("");
        }
    };

    const removeChoice = (index: number) => {
        if (choices.length > 2) {
            setChoices(choices.filter((_, i) => i !== index));
        }
    };

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-white">Prize Wheel</h2>

            <div className="relative w-64 h-64 mb-8">
                {/* Wheel */}
                <div
                    ref={wheelRef}
                    className="wheel absolute inset-0 rounded-full overflow-hidden transform transition-transform duration-5000 ease-out"
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    {choices.map((choice, index) => {
                        const startAngle = (index * 360) / choices.length;
                        const endAngle = ((index + 1) * 360) / choices.length;
                        const color = COLORS[index % COLORS.length];

                        // Create SVG path for a perfect pie segment
                        const startRad = (startAngle * Math.PI) / 180;
                        const endRad = (endAngle * Math.PI) / 180;

                        const x1 = 50 + 50 * Math.cos(startRad);
                        const y1 = 50 + 50 * Math.sin(startRad);
                        const x2 = 50 + 50 * Math.cos(endRad);
                        const y2 = 50 + 50 * Math.sin(endRad);

                        const largeArc = endAngle - startAngle > 180 ? 1 : 0;

                        const pathData = `
              M 50 50
              L ${x1} ${y1}
              A 50 50 0 ${largeArc} 1 ${x2} ${y2}
              Z
            `;

                        // Calculate position for the text (at the middle angle and 70% outward)
                        const midAngle = (startAngle + endAngle) / 2;
                        const midRad = (midAngle * Math.PI) / 180;
                        const textX = 50 + 35 * Math.cos(midRad);
                        const textY = 50 + 35 * Math.sin(midRad);

                        return (
                            <div key={index} className="absolute inset-0">
                                <svg width="100%" height="100%" viewBox="0 0 100 100">
                                    <path
                                        d={pathData}
                                        fill={color}
                                    />
                                    <text
                                        x={textX}
                                        y={textY}
                                        fill="white"
                                        fontWeight="bold"
                                        fontSize="6"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        transform={`rotate(${midAngle}, ${textX}, ${textY})`}
                                    >
                                        {choice.length > 10 ? choice.substring(0, 10) + "..." : choice}
                                    </text>
                                </svg>
                            </div>
                        );
                    })}
                </div>

                {/* Pointer */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8">
                    <div className="w-4 h-8 bg-white mx-auto clip-triangle"></div>
                </div>
            </div>

            {/* Controls */}
            <div className="w-full mb-4">
                <div className="flex mb-2">
                    <input
                        type="text"
                        value={newChoice}
                        onChange={(e) => setNewChoice(e.target.value)}
                        placeholder="Add option..."
                        className="flex-1 px-3 py-2 rounded-l-lg border-0 focus:ring-2 focus:ring-purple-500"
                        maxLength={20}
                    />
                    <button
                        onClick={addChoice}
                        disabled={choices.length >= 35 || !newChoice.trim()}
                        className="px-4 py-2 bg-purple-600 text-white rounded-r-lg hover:bg-purple-700 disabled:opacity-50"
                    >
                        Add
                    </button>
                </div>

                <div className="max-h-32 overflow-y-auto bg-white/20 rounded-lg p-2">
                    {choices.map((choice, index) => (
                        <div key={index} className="flex justify-between items-center py-1">
                            <span className="text-white truncate">{choice}</span>
                            <button
                                onClick={() => removeChoice(index)}
                                disabled={choices.length <= 2}
                                className="text-red-400 hover:text-red-600 disabled:opacity-50"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={spinWheel}
                disabled={isSpinning || choices.length < 2}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full
                 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105
                 transition-all disabled:opacity-50 disabled:transform-none"
            >
                {isSpinning ? "Spinning..." : "Spin Wheel"}
            </button>

            {result && !isSpinning && (
                <div className="mt-4 px-6 py-3 bg-white/20 rounded-lg text-center">
                    <p className="text-lg text-white">Result:</p>
                    <p className="text-xl font-bold text-white">{result}</p>
                </div>
            )}
        </div>
    );
};

export {WheelSpin};
