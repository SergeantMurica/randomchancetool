import React, { useState, useRef } from "react";
import { playSound } from "../utils/SoundManager";
import shakeSound from "../assets/click.mp3";

const RESPONSES = [
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    "Reply hazy, try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
];

const Magic8Ball: React.FC = () => {
    const [isShaking, setIsShaking] = useState(false);
    const [response, setResponse] = useState<string | null>(null);
    const [question, setQuestion] = useState("");
    const ballRef = useRef<HTMLDivElement>(null);

    const shakeBall = () => {
        if (isShaking || !question.trim()) return;

        setIsShaking(true);
        playSound(shakeSound);
        setResponse(null);

        // Add shake animation
        if (ballRef.current) {
            ballRef.current.classList.add("shake-animation");
        }

        setTimeout(() => {
            // Get random answer
            const randomResponse = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
            setResponse(randomResponse);
            setIsShaking(false);

            if (ballRef.current) {
                ballRef.current.classList.remove("shake-animation");
            }
        }, 2000);
    };

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Magic 8-Ball</h2>

            <div
                ref={ballRef}
                className="relative w-64 h-64 rounded-full bg-gradient-to-b from-black to-gray-900 shadow-xl mb-6 flex items-center justify-center"
            >
                <div className="absolute w-28 h-28 rounded-full bg-blue-800 flex items-center justify-center">
                    <div className="relative w-24 h-24 rounded-full bg-blue-950 flex items-center justify-center">
                        {response && !isShaking ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center shadow-inner reveal-animation">
                  <span className="text-xs text-white font-bold text-center px-1">
                    {response}
                  </span>
                                </div>
                            </div>
                        ) : (
                            <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-xl font-bold text-white">8</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full mb-4">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask a yes/no question..."
                    className="w-full px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                onClick={shakeBall}
                disabled={isShaking || !question.trim()}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full
                 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105
                 transition-all disabled:opacity-50 disabled:transform-none"
            >
                {isShaking ? "Shaking..." : "Shake Ball"}
            </button>
        </div>
    );
};

export {Magic8Ball};
