import React, { useState, useEffect } from "react";
import { playSound } from "../utils/SoundManager";
import gameSound from "../assets/spin.wav";

type Choice = "rock" | "paper" | "scissors" | null;

const RockPaperScissors: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [computerChoice, setComputerChoice] = useState<Choice>(null);
  const [result, setResult] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const choices: Choice[] = ["rock", "paper", "scissors"];

  const playGame = (choice: Choice) => {
    setPlayerChoice(choice);
    setCountdown(3);
    playSound(gameSound);
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      // Get computer choice
      const compChoice = choices[Math.floor(Math.random() * 3)];
      setComputerChoice(compChoice);

      // Determine winner
      if (playerChoice === compChoice) {
        setResult("It's a tie!");
      } else if (
        (playerChoice === "rock" && compChoice === "scissors") ||
        (playerChoice === "paper" && compChoice === "rock") ||
        (playerChoice === "scissors" && compChoice === "paper")
      ) {
        setResult("You win!");
        setScore(prev => ({ ...prev, player: prev.player + 1 }));
      } else {
        setResult("Computer wins!");
        setScore(prev => ({ ...prev, computer: prev.computer + 1 }));
      }
    }
  }, [countdown, playerChoice]);

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult(null);
    setCountdown(null);
  };

  const getEmoji = (choice: Choice) => {
    switch (choice) {
      case "rock": return "👊";
      case "paper": return "✋";
      case "scissors": return "✌️";
      default: return "❓";
    }
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-white">Rock Paper Scissors</h2>

      <div className="flex justify-between items-center w-full mb-6">
        <div className="text-center">
          <p className="text-white text-sm">You</p>
          <p className="text-white text-xl font-bold">{score.player}</p>
        </div>
        <div className="text-white text-xl font-bold">vs</div>
        <div className="text-center">
          <p className="text-white text-sm">Computer</p>
          <p className="text-white text-xl font-bold">{score.computer}</p>
        </div>
      </div>

      <div className="flex justify-between items-center w-full mb-8">
        <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl">
          {playerChoice ? getEmoji(playerChoice) : "❓"}
        </div>

        <div className="text-center">
          {countdown !== null ? (
            <div className="text-white text-2xl font-bold animate-pulse">
              {countdown > 0 ? countdown : "Go!"}
            </div>
          ) : result ? (
            <div className="text-white text-xl font-bold">{result}</div>
          ) : (
            <div className="text-white text-xl">Choose!</div>
          )}
        </div>

        <div className="w-24 h-24 rounded-full bg-red-600 flex items-center justify-center text-4xl">
          {computerChoice ? getEmoji(computerChoice) : "❓"}
        </div>
      </div>

      <div className="flex space-x-4">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => playGame(choice)}
            disabled={countdown !== null}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600
                       flex items-center justify-center text-3xl shadow-lg hover:shadow-xl
                       transform hover:scale-110 transition-all disabled:opacity-50
                       disabled:transform-none"
          >
            {getEmoji(choice)}
          </button>
        ))}
      </div>

      {result && (
        <button
          onClick={resetGame}
          className="mt-6 px-4 py-2 bg-white/30 rounded-lg text-white hover:bg-white/40"
        >
          Play Again
        </button>
      )}
    </div>
  );
};

export {RockPaperScissors};
