import React, { useState } from "react";
import { playSound } from "../utils/SoundManager";
import clickSound from "../assets/click.mp3";

const RandomDateGenerator: React.FC = () => {
    const [startDate, setStartDate] = useState<string>("1970-01-01");
    const [endDate, setEndDate] = useState<string>("2030-12-31");
    const [randomDate, setRandomDate] = useState<Date | null>(null);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);

    const generateDate = () => {
        setIsGenerating(true);
        playSound(clickSound);

        setTimeout(() => {
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime();

            if (start > end) {
                alert("Start date must be before end date");
                setIsGenerating(false);
                return;
            }

            const randomTimestamp = start + Math.random() * (end - start);
            setRandomDate(new Date(randomTimestamp));
            setIsGenerating(false);
        }, 800);
    };

    const formatDate = (date: Date): string => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Random Date</h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-white text-sm mb-1">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-white text-sm mb-1">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg"
                    />
                </div>
            </div>

            <button
                onClick={generateDate}
                disabled={isGenerating}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg
                 text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105
                 transition-all disabled:opacity-50 disabled:transform-none"
            >
                {isGenerating ? "Generating..." : "Generate Random Date"}
            </button>

            {randomDate && (
                <div className="mt-6 bg-white/20 rounded-lg p-4 w-full text-center">
                    <p className="text-white text-lg">{formatDate(randomDate)}</p>
                    <p className="text-white/70 text-sm">Day of the year: {Math.floor((randomDate.getTime() - new Date(randomDate.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))}</p>
                </div>
            )}
        </div>
    );
};

export {RandomDateGenerator};
