import React from "react";
import CoinFlip from "./components/CoinFlip";
import DiceRoll from "./components/DiceRoll";
import EvensOdds from "./components/EvensOdds";
import WheelSpin from "./components/WheelSpin";

const App: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 to-blue-500 text-white">
            <h1 className="text-4xl font-bold mb-6">Randomizer App</h1>
            <div className="grid gap-6 md:grid-cols-2">
                <CoinFlip />
                <DiceRoll />
                <EvensOdds />
                <WheelSpin />
            </div>
        </div>
    );
};

export default App;
