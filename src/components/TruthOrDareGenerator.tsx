import React, { useState } from "react";
import { playSound } from "../utils/SoundManager";
import clickSound from "../assets/click.mp3";

// Sample questions - in a real app you'd have a larger database
const TRUTH_QUESTIONS = [
    "What's your most embarrassing memory?",
    "What's the biggest lie you've ever told?",
    "What's your biggest fear?",
    "What's the worst thing you've ever done?",
    "What's your biggest regret?",
    "What's the most embarrassing thing in your search history?",
    "What's the most childish thing you still do?",
    "What's a secret you've never told anyone?",
    "What's the worst date you've ever been on?",
    "What's the strangest dream you've had?",
    "If you had to choose someone in this room to be stranded with on a desert island, who would it be?",
    "What's your guilty pleasure?",
    "What's the weirdest thing you've done when you were alone?",
    "What's the most embarrassing thing you've done in front of a crush?",
    "What's a lie you've told that got way out of hand?",
];

const DARE_CHALLENGES = [
    "Do your best impression of a celebrity",
    "Call someone and sing them Happy Birthday",
    "Let someone style your hair however they want",
    "Speak in an accent for the next three rounds",
    "Do 20 jumping jacks",
    "Let the group post something on your social media",
    "Show the most embarrassing photo on your phone",
    "Show the last five people you texted and what the messages said",
    "Keep your eyes closed until it's your turn again",
    "Let someone draw on your face",
    "Do your best dance move",
    "Tell a joke that will make everyone laugh",
    "Eat a mixture of condiments that the group prepares",
    "Do a handstand against the wall (or try to)",
    "Speak in a whisper for the next three rounds",
];

type QuestionLevel = "mild" | "medium" | "spicy";

const TruthOrDareGenerator: React.FC = () => {
    const [type, setType] = useState<"truth" | "dare">("truth");
    const [question, setQuestion] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [level, setLevel] = useState<QuestionLevel>("mild");

    const generateQuestion = () => {
        setIsGenerating(true);
        playSound(clickSound);

        setTimeout(() => {
            // In a real app, you'd filter by level as well
            const questions = type === "truth" ? TRUTH_QUESTIONS : DARE_CHALLENGES;
            const randomIndex = Math.floor(Math.random() * questions.length);
            setQuestion(questions[randomIndex]);
            setIsGenerating(false);
        }, 1000);
    };

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Truth or Dare</h2>

            <div className="w-full flex mb-4">
                <button
                    onClick={() => setType("truth")}
                    className={`flex-1 py-3 rounded-l-lg ${
                        type === "truth"
                            ? "bg-blue-600 text-white font-bold"
                            : "bg-white/20 text-white"
                    }`}
                >
                    Truth
                </button>
                <button
                    onClick={() => setType("dare")}
                    className={`flex-1 py-3 rounded-r-lg ${
                        type === "dare"
                            ? "bg-red-600 text-white font-bold"
                            : "bg-white/20 text-white"
                    }`}
                >
                    Dare
                </button>
            </div>

            <div className="w-full mb-6">
                <label className="block text-white text-sm mb-2">Spice Level</label>
                <div className="flex">
                    <button
                        onClick={() => setLevel("mild")}
                        className={`flex-1 py-2 rounded-l-lg ${
                            level === "mild" ? "bg-green-500 text-white font-bold" : "bg-white/20 text-white"
                        }`}
                    >
                        Mild
                    </button>
                    <button
                        onClick={() => setLevel("medium")}
                        className={`flex-1 py-2 ${
                            level === "medium" ? "bg-yellow-500 text-white font-bold" : "bg-white/20 text-white"
                        }`}
                    >
                        Medium
                    </button>
                    <button
                        onClick={() => setLevel("spicy")}
                        className={`flex-1 py-2 rounded-r-lg ${
                            level === "spicy" ? "bg-red-500 text-white font-bold" : "bg-white/20 text-white"
                        }`}
                    >
                        Spicy
                    </button>
                </div>
            </div>

            <button
                onClick={generateQuestion}
                disabled={isGenerating}
                className={`px-6 py-3 rounded-lg text-white font-bold shadow-lg hover:shadow-xl 
                  transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none
                  ${type === "truth" ? "bg-gradient-to-r from-blue-600 to-blue-800" : "bg-gradient-to-r from-red-600 to-red-800"}`}
            >
                {isGenerating ? "Generating..." : `Generate ${type.charAt(0).toUpperCase() + type.slice(1)}`}
            </button>

            {question && (
                <div className={`mt-6 w-full p-5 rounded-lg text-center
                       ${type === "truth" ? "bg-blue-600/30" : "bg-red-600/30"}`}>
                    <p className="text-white text-lg font-medium">{question}</p>
                </div>
            )}
        </div>
    );
};

export {TruthOrDareGenerator};
