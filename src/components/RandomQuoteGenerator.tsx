import React, { useState, useEffect } from "react";
import { playSound } from "../utils/SoundManager";
import clickSound from "../assets/click.mp3";

// Sample quotes - in a real app you'd use a larger database or API
const QUOTES = [
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
    { text: "If you tell the truth, you don't have to remember anything.", author: "Mark Twain" },
    { text: "Always forgive your enemies; nothing annoys them so much.", author: "Oscar Wilde" },
    { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
    { text: "Without music, life would be a mistake.", author: "Friedrich Nietzsche" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" },
    { text: "If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.", author: "J.K. Rowling" },
    { text: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
];

const CATEGORIES = ["All", "Inspirational", "Life", "Success", "Wisdom"];

const RandomQuoteGenerator: React.FC = () => {
    const [quote, setQuote] = useState<{ text: string; author: string } | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [category, setCategory] = useState<string>("All");

    const generateQuote = () => {
        setIsGenerating(true);
        playSound(clickSound);

        setTimeout(() => {
            // In a real app, you would filter based on actual category data
            const randomIndex = Math.floor(Math.random() * QUOTES.length);
            setQuote(QUOTES[randomIndex]);
            setIsGenerating(false);
        }, 600);
    };

    const copyToClipboard = () => {
        if (quote) {
            navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
        }
    };

    useEffect(() => {
        generateQuote();
    }, []);

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Random Quote</h2>

            <div className="flex space-x-2 mb-4 overflow-x-auto w-full pb-2">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setCategory(cat)}
                        className={`px-3 py-1 rounded-full whitespace-nowrap ${category === cat ? "bg-white/30 text-white" : "bg-white/10 text-white/70"}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {quote && (
                <div className="w-full mb-6 bg-white/20 rounded-lg p-6 relative">
                    <div className="text-5xl absolute -top-2 left-2 text-white/30">"</div>
                    <p className="text-white text-lg italic mb-4 relative z-10">{quote.text}</p>
                    <p className="text-white/70 text-right">— {quote.author}</p>

                    <button
                        onClick={copyToClipboard}
                        className="absolute top-3 right-3 text-white/50 hover:text-white"
                        title="Copy quote"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                    </button>
                </div>
            )}

            <button
                onClick={generateQuote}
                disabled={isGenerating}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg
                 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105
                 transition-all disabled:opacity-50 disabled:transform-none"
            >
                {isGenerating ? "Generating..." : "New Quote"}
            </button>
        </div>
    );
};

export {RandomQuoteGenerator};
