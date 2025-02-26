import React, { useState } from "react";
import { playSound } from "../utils/SoundManager";
import clickSound from "../assets/click.mp3";

const RandomPasswordGenerator: React.FC = () => {
    const [password, setPassword] = useState<string>("");
    const [length, setLength] = useState<number>(12);
    const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
    const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const generatePassword = () => {
        if (!(includeUppercase || includeLowercase || includeNumbers || includeSymbols)) {
            return; // Need at least one character type
        }

        setIsGenerating(true);
        playSound(clickSound);

        setTimeout(() => {
            let charset = "";

            if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
            if (includeNumbers) charset += "0123456789";
            if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

            let newPassword = "";
            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                newPassword += charset[randomIndex];
            }

            setPassword(newPassword);
            setIsGenerating(false);
        }, 600);
    };

    const copyToClipboard = () => {
        if (password) {
            navigator.clipboard.writeText(password);
        }
    };

    // Calculate password strength
    const calculateStrength = (): { score: number; label: string; color: string } => {
        if (!password) return { score: 0, label: "None", color: "bg-gray-300" };

        let score = 0;

        // Length contribution
        score += Math.min(length / 8, 1) * 25;

        // Character type contribution
        if (includeUppercase) score += 15;
        if (includeLowercase) score += 15;
        if (includeNumbers) score += 15;
        if (includeSymbols) score += 30;

        // Cap at 100
        score = Math.min(score, 100);

        let label, color;
        if (score >= 80) { label = "Strong"; color = "bg-green-500"; }
        else if (score >= 60) { label = "Good"; color = "bg-blue-500"; }
        else if (score >= 40) { label = "Fair"; color = "bg-yellow-500"; }
        else { label = "Weak"; color = "bg-red-500"; }

        return { score, label, color };
    };

    const strength = calculateStrength();

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Password Generator</h2>

            <div className="w-full mb-4 relative">
                <input
                    type="text"
                    readOnly
                    value={password}
                    placeholder="Generated password will appear here"
                    className="w-full px-4 py-3 pr-12 rounded-lg text-lg font-mono"
                />
                {password && (
                    <button
                        onClick={copyToClipboard}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        title="Copy to clipboard"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                    </button>
                )}
            </div>

            {password && (
                <div className="w-full mb-4">
                    <div className="flex justify-between text-sm text-white mb-1">
                        <span>Strength: {strength.label}</span>
                        <span>{Math.round(strength.score)}%</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2">
                        <div
                            className={`${strength.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${strength.score}%` }}
                        ></div>
                    </div>
                </div>
            )}

            <div className="w-full mb-4">
                <label className="flex justify-between text-white mb-1">
                    <span>Length: {length}</span>
                </label>
                <input
                    type="range"
                    min="4"
                    max="32"
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full accent-purple-500"
                />
                <div className="flex justify-between text-xs text-white/50">
                    <span>4</span>
                    <span>32</span>
                </div>
            </div>

            <div className="w-full mb-4 grid grid-cols-2 gap-2">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="uppercase"
                        checked={includeUppercase}
                        onChange={() => setIncludeUppercase(!includeUppercase)}
                        className="w-4 h-4 accent-purple-500"
                    />
                    <label htmlFor="uppercase" className="ml-2 text-white">Uppercase (A-Z)</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="lowercase"
                        checked={includeLowercase}
                        onChange={() => setIncludeLowercase(!includeLowercase)}
                        className="w-4 h-4 accent-purple-500"
                    />
                    <label htmlFor="lowercase" className="ml-2 text-white">Lowercase (a-z)</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="numbers"
                        checked={includeNumbers}
                        onChange={() => setIncludeNumbers(!includeNumbers)}
                        className="w-4 h-4 accent-purple-500"
                    />
                    <label htmlFor="numbers" className="ml-2 text-white">Numbers (0-9)</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="symbols"
                        checked={includeSymbols}
                        onChange={() => setIncludeSymbols(!includeSymbols)}
                        className="w-4 h-4 accent-purple-500"
                    />
                    <label htmlFor="symbols" className="ml-2 text-white">Symbols (!@#$)</label>
                </div>
            </div>

            <button
                onClick={generatePassword}
                disabled={isGenerating || !(includeUppercase || includeLowercase || includeNumbers || includeSymbols)}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg
                 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105
                 transition-all disabled:opacity-50 disabled:transform-none"
            >
                {isGenerating ? "Generating..." : "Generate Password"}
            </button>
        </div>
    );
};

export {RandomPasswordGenerator};
