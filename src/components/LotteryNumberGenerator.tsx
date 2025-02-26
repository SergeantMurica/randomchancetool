import React, { useState } from "react";
import { playSound } from "../utils/SoundManager";
import lotterySound from "../assets/click.mp3";

type LotteryType = {
  name: string;
  count: number;
  min: number;
  max: number;
};

const LOTTERY_TYPES: LotteryType[] = [
  { name: "Custom", count: 6, min: 1, max: 49 },
  { name: "Powerball", count: 5, min: 1, max: 69 },
  { name: "Mega Millions", count: 5, min: 1, max: 70 },
  { name: "EuroMillions", count: 5, min: 1, max: 50 },
];

const LotteryNumberGenerator: React.FC = () => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [powerball, setPowerball] = useState<number | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<LotteryType>(LOTTERY_TYPES[0]);
  const [customCount, setCustomCount] = useState<number>(6);
  const [customMin, setCustomMin] = useState<number>(1);
  const [customMax, setCustomMax] = useState<number>(49);

  const generateNumbers = () => {
    setIsGenerating(true);
    playSound(lotterySound);

    let currentType = selectedType;
    if (selectedType.name === "Custom") {
      currentType = {
        name: "Custom",
        count: customCount,
        min: customMin,
        max: customMax,
      };
    }

    setTimeout(() => {
      // Generate main numbers (no duplicates)
      const range = currentType.max - currentType.min + 1;
      if (range < currentType.count) {
        alert("Range is too small for the number of balls");
        setIsGenerating(false);
        return;
      }

      const result: number[] = [];
      while (result.length < currentType.count) {
        const num = Math.floor(Math.random() * range) + currentType.min;
        if (!result.includes(num)) {
          result.push(num);
        }
      }

      // Sort numbers
      result.sort((a, b) => a - b);
      setNumbers(result);

      // Generate powerball/bonus if needed
      if (currentType.name === "Powerball") {
        setPowerball(Math.floor(Math.random() * 26) + 1);
      } else if (currentType.name === "Mega Millions") {
        setPowerball(Math.floor(Math.random() * 25) + 1);
      } else if (currentType.name === "EuroMillions") {
        setPowerball(Math.floor(Math.random() * 12) + 1);
      } else {
        setPowerball(null);
      }

      setIsGenerating(false);
    }, 1500);
  };

  const selectLotteryType = (type: LotteryType) => {
    setSelectedType(type);
    if (type.name === "Custom") {
      setCustomCount(6);
      setCustomMin(1);
      setCustomMax(49);
    }
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-white">Lottery Numbers</h2>

      <div className="w-full mb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {LOTTERY_TYPES.map((type) => (
            <button
              key={type.name}
              onClick={() => selectLotteryType(type)}
              className={`py-2 px-3 rounded-lg text-sm ${
                selectedType.name === type.name
                  ? "bg-yellow-500 text-black font-bold"
                  : "bg-white/20 text-white"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        {selectedType.name === "Custom" && (
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div>
              <label className="block text-white text-xs mb-1">Balls</label>
              <input
                type="number"
                min="1"
                max="15"
                value={customCount}
                onChange={(e) => setCustomCount(Math.min(15, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-white text-xs mb-1">Min</label>
              <input
                type="number"
                min="1"
                max="customMax-1"
                value={customMin}
                onChange={(e) => setCustomMin(Math.min(customMax-1, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-white text-xs mb-1">Max</label>
              <input
                type="number"
                min="customMin+1"
                max="99"
                value={customMax}
                onChange={(e) => setCustomMax(Math.min(99, Math.max(customMin+1, parseInt(e.target.value) || 2)))}
                className="w-full px-3 py-2 rounded-lg"
              />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={generateNumbers}
        disabled={isGenerating}
        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg
                 text-black font-bold shadow-lg hover:shadow-xl transform hover:scale-105
                 transition-all disabled:opacity-50 disabled:transform-none mb-6"
      >
        {isGenerating ? "Generating..." : "Generate Numbers"}
      </button>

      {numbers.length > 0 && (
        <div className="flex flex-col items-center animate-fade-in">
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {numbers.map((num, index) => (
              <div
                key={index}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-300
                         flex items-center justify-center font-bold text-xl shadow-lg"
              >
                {num}
              </div>
            ))}

            {powerball !== null && (
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-400
                           flex items-center justify-center font-bold text-xl text-white shadow-lg ml-2">
                {powerball}
              </div>
            )}
          </div>

          <p className="text-white text-center">
            {selectedType.name === "Custom"
              ? `${customCount} numbers between ${customMin} and ${customMax}`
              : `${selectedType.name}`}
          </p>
        </div>
      )}
    </div>
  );
};

export {LotteryNumberGenerator};
