import React, { useState, useEffect } from "react";
import { playSound } from "../utils/SoundManager";
import decideSound from "../assets/click.mp3";

const RandomDecisionMaker: React.FC = () => {
    const [question, setQuestion] = useState<string>("");
    const [options, setOptions] = useState<string[]>(["Yes", "No"]);
    const [newOption, setNewOption] = useState<string>("");
    const [decision, setDecision] = useState<string | null>(null);
    const [isDeciding, setIsDeciding] = useState<boolean>(false);
    const [decisionMessages, setDecisionMessages] = useState<string[]>([]);

    useEffect(() => {
        setDecisionMessages([
            "Analyzing possibilities...",
            "Consulting the universe...",
            "Rolling the cosmic dice...",
            "Checking alternate timelines...",
            "Asking the magic algorithms...",
            "Calculating quantum probabilities..."
        ]);
    }, []);

    const makeDecision = () => {
        if (options.length === 0) return;

        setIsDeciding(true);
        playSound(decideSound);
        setDecision(null);

        // Show a sequence of "deciding" messages
        let count = 0;
        const interval = setInterval(() => {
            setDecision(decisionMessages[count % decisionMessages.length]);
            count++;

            if (count >= 4) { // Show 4 messages before result
                clearInterval(interval);

                // Show final decision
                setTimeout(() => {
                    const randomIndex = Math.floor(Math.random() * options.length);
                    setDecision(options[randomIndex]);
                    setIsDeciding(false);
                }, 600);
            }
        }, 600);
    };

    const addOption = () => {
        if (newOption.trim() && !options.includes(newOption.trim())) {
            setOptions([...options, newOption.trim()]);
            setNewOption("");
        }
    };

    const removeOption = (index: number) => {
        if (options.length > 1) {
            setOptions(options.filter((_, i) => i !== index));
        }
    };

    const clearAll = () => {
        setOptions([]);
        setDecision(null);
    };

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Decision Maker</h2>

            <div className="w-full mb-4">
                <label className="block text-white text-sm mb-1">
                    Your Question
                </label>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="What should I do?"
                    className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-violet-500"
                />
            </div>

            <div className="w-full mb-4">
                <div className="flex justify-between items-center mb-2">
                    <label className="text-white text-sm">Options</label>
                    {options.length > 0 && (
                        <button
                            onClick={clearAll}
                            className="text-xs text-red-300 hover:text-red-200"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                <div className="flex mb-2">
                    <input
                        type="text"
                        value={newOption}
                        onChange={(e) => setNewOption(e.target.value)}
                        placeholder="Add an option..."
                        className="flex-1 px-3 py-2 rounded-l-lg focus:ring-2 focus:ring-violet-500"
                    />
                    <button
                        onClick={addOption}
                        disabled={!newOption.trim()}
                        className="px-4 py-2 bg-violet-600 text-white rounded-r-lg hover:bg-violet-700 disabled:opacity-50"
                    >
                        Add
                    </button>
                </div>

                {options.length > 0 ? (
                    <div className="max-h-32 overflow-y-auto bg-white/20 rounded-lg p-2 mb-2">
                        {options.map((option, index) => (
                            <div key={index} className="flex justify-between items-center py-1">
                                <span className="text-white truncate">{option}</span>
                                <button
                                    onClick={() => removeOption(index)}
                                    className="text-red-400 hover:text-red-600"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-white/70 text-center py-2">
                        Add some options to decide between
                    </div>
                )}
            </div>

            <button
                onClick={makeDecision}
                disabled={isDeciding || options.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg
                 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105
                 transition-all disabled:opacity-50 disabled:transform-none"
            >
                {isDeciding ? "Deciding..." : "Make a Decision"}
            </button>

            {decision && (
                <div className="mt-6 w-full text-center">
                    {question && <p className="text-white/70 mb-2">{question}</p>}
                    <div className={`text-2xl font-bold p-4 rounded-lg ${
                        isDeciding ? "text-white/70 bg-white/10" : "text-white bg-violet-600/50"
                    }`}>
                        {decision}
                    </div>
                </div>
            )}
        </div>
    );
};

export {RandomDecisionMaker};
