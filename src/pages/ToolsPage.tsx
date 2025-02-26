import React from "react";
import {
    CoinFlip,
    DiceRoll,
    RandomCardDraw,
    RandomColorGenerator,
    RandomNameGenerator,
    RandomDateGenerator,
    LotteryNumberGenerator,
    RandomQuoteGenerator,
    RandomPasswordGenerator,
    Magic8Ball,
    RandomDecisionMaker,
    TruthOrDareGenerator,
    EvensOdds,
    WheelSpin,
    RockPaperScissors
} from "../components";



const ToolsPage: React.FC = () => {
    return (
        <div className="min-h-screen py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-10 text-center text-white">
                    Fortuna <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">Tools</span>
                </h1>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <CoinFlip />
                    <DiceRoll />
                    <WheelSpin />
                    <Magic8Ball />
                    <EvensOdds/>
                    <RockPaperScissors />
                    <RandomPasswordGenerator/>
                    <RandomColorGenerator/>
                    <RandomCardDraw/>
                    <LotteryNumberGenerator/>
                    <RandomQuoteGenerator/>
                    <RandomNameGenerator/>
                    <RandomDateGenerator/>
                    <RandomDecisionMaker/>
                    <TruthOrDareGenerator/>
                </div>
            </div>
        </div>
    );
};

export default ToolsPage;
