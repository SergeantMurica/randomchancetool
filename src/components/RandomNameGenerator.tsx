import React, { useState } from "react";
import { playSound } from "../utils/SoundManager";
import clickSound from "../assets/click.mp3";

const firstNames = [
    "James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda",
    "William", "Elizabeth", "David", "Susan", "Richard", "Jessica", "Joseph", "Sarah",
    "Thomas", "Karen", "Charles", "Nancy", "Christopher", "Lisa", "Daniel", "Margaret",
    "Matthew", "Betty", "Anthony", "Sandra", "Mark", "Ashley", "Donald", "Kimberly",
    "Steven", "Emily", "Paul", "Donna", "Andrew", "Michelle", "Joshua", "Carol"
];

const lastNames = [
    "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson",
    "Moore", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin",
    "Thompson", "Garcia", "Martinez", "Robinson", "Clark", "Rodriguez", "Lewis", "Lee",
    "Walker", "Hall", "Allen", "Young", "Hernandez", "King", "Wright", "Lopez",
    "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter"
];

const RandomNameGenerator: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [nameCount, setNameCount] = useState<number>(1);
    const [generatedNames, setGeneratedNames] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const generateNames = () => {
        setIsGenerating(true);
        playSound(clickSound);

        setTimeout(() => {
            const newNames: string[] = [];

            for (let i = 0; i < nameCount; i++) {
                const randomFirstName = firstName || firstNames[Math.floor(Math.random() * firstNames.length)];
                const randomLastName = lastName || lastNames[Math.floor(Math.random() * lastNames.length)];
                newNames.push(`${randomFirstName} ${randomLastName}`);
            }

            setGeneratedNames(newNames);
            setIsGenerating(false);
        }, 800);
    };

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Random Name Generator</h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-white text-sm mb-1">First Name (Optional)</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Random first name"
                        className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-white text-sm mb-1">Last Name (Optional)</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Random last name"
                        className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="w-full mb-4">
                <label className="block text-white text-sm mb-1">Number of Names</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={nameCount}
                    onChange={(e) => setNameCount(parseInt(e.target.value))}
                    className="w-full accent-blue-500"
                />
                <div className="text-white text-center">{nameCount}</div>
            </div>

            <button
                onClick={generateNames}
                disabled={isGenerating}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full
                 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105
                 transition-all disabled:opacity-50 disabled:transform-none"
            >
                {isGenerating ? "Generating..." : "Generate Names"}
            </button>

            {generatedNames.length > 0 && (
                <div className="w-full mt-4 bg-white/20 rounded-lg p-4">
                    <h3 className="text-white font-bold mb-2">Generated Names:</h3>
                    <ul className="space-y-1">
                        {generatedNames.map((name, index) => (
                            <li key={index} className="text-white">{name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export {RandomNameGenerator};
