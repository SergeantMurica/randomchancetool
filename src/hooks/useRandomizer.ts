// src/hooks/useRandomizer.ts
import { useState, useEffect } from 'react';
import { playSound } from '../utils/SoundManager';

// Coin Flip Hook
export function useCoinFlip(sound: string) {
    const [result, setResult] = useState<string | null>(null);
    const [isFlipping, setIsFlipping] = useState(false);

    const flip = () => {
        setIsFlipping(true);
        playSound(sound);

        setTimeout(() => {
            setResult(Math.random() > 0.5 ? "Heads" : "Tails");
            setIsFlipping(false);
        }, 1000);
    };

    return { result, isFlipping, flip };
}

// Dice Roll Hook
export function useDiceRoll(sound: string) {
    const [results, setResults] = useState<number[]>([]);
    const [isRolling, setIsRolling] = useState(false);
    const [diceCount, setDiceCount] = useState(1);
    const [total, setTotal] = useState<number | null>(null);

    const roll = () => {
        setIsRolling(true);
        playSound(sound);

        setTimeout(() => {
            const newResults = Array(diceCount).fill(0).map(() =>
                Math.floor(Math.random() * 6) + 1
            );
            setResults(newResults);
            setTotal(newResults.reduce((a, b) => a + b, 0));
            setIsRolling(false);
        }, 2000);
    };

    return {
        results,
        isRolling,
        diceCount,
        total,
        setDiceCount,
        roll
    };
}

// Wheel Spin Hook
export function useWheelSpin(sound: string) {
    const [choices, setChoices] = useState<string[]>(() => {
        const saved = localStorage.getItem('wheelChoices');
        return saved ? JSON.parse(saved) : ["Option 1", "Option 2"];
    });
    const [result, setResult] = useState<string | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [newChoice, setNewChoice] = useState("");

    // Save choices to localStorage when they change
    useEffect(() => {
        localStorage.setItem('wheelChoices', JSON.stringify(choices));
    }, [choices]);

    const spin = () => {
        if (choices.length < 2) return;

        setIsSpinning(true);
        playSound(sound);
        setResult(null);

        // Calculate a random spin (5-10 full rotations + random segment)
        const spins = 5 + Math.floor(Math.random() * 5);
        const segmentAngle = 360 / choices.length;
        const randomSpin = Math.floor(Math.random() * choices.length);
        const extraAngle = randomSpin * segmentAngle;
        const finalRotation = rotation + (spins * 360) + extraAngle;

        setRotation(finalRotation);

        // Calculate which segment is selected (opposite to the pointer at top)
        setTimeout(() => {
            const selectedIndex = choices.length - 1 - randomSpin;
            setResult(choices[selectedIndex % choices.length]);
            setIsSpinning(false);
        }, 5000);
    };

    const addChoice = () => {
        if (newChoice.trim() && choices.length < 35) {
            setChoices([...choices, newChoice.trim()]);
            setNewChoice("");
        }
    };

    const removeChoice = (index: number) => {
        if (choices.length > 2) {
            setChoices(choices.filter((_, i) => i !== index));
        }
    };

    return {
        choices,
        result,
        isSpinning,
        rotation,
        newChoice,
        setNewChoice,
        spin,
        addChoice,
        removeChoice
    };
}

// Magic 8-Ball Hook
export function useMagic8Ball(sound: string) {
    const [isShaking, setIsShaking] = useState(false);
    const [response, setResponse] = useState<string | null>(null);
    const [question, setQuestion] = useState("");

    const RESPONSES = [
        "It is certain",
        "It is decidedly so",
        "Without a doubt",
        "Yes definitely",
        "You may rely on it",
        "As I see it, yes",
        "Most likely",
        "Outlook good",
        "Yes",
        "Signs point to yes",
        "Reply hazy, try again",
        "Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",
        "Don't count on it",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful"
    ];

    const shake = () => {
        if (isShaking || !question.trim()) return;

        setIsShaking(true);
        playSound(sound);
        setResponse(null);

        setTimeout(() => {
            // Get random answer
            const randomResponse = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
            setResponse(randomResponse);
            setIsShaking(false);
        }, 2000);
    };

    return {
        isShaking,
        response,
        question,
        setQuestion,
        shake
    };
}

// Rock Paper Scissors Hook
export function useRockPaperScissors(sound: string) {
    type Choice = "rock" | "paper" | "scissors" | null;

    const [playerChoice, setPlayerChoice] = useState<Choice>(null);
    const [computerChoice, setComputerChoice] = useState<Choice>(null);
    const [result, setResult] = useState<string | null>(null);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [score, setScore] = useState({ player: 0, computer: 0 });

    const choices: Choice[] = ["rock", "paper", "scissors"];

    const play = (choice: Choice) => {
        setPlayerChoice(choice);
        setCountdown(3);
        playSound(sound);
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

    const reset = () => {
        setPlayerChoice(null);
        setComputerChoice(null);
        setResult(null);
        setCountdown(null);
    };

    const resetScore = () => {
        setScore({ player: 0, computer: 0 });
    };

    const getEmoji = (choice: Choice) => {
        switch (choice) {
            case "rock": return "👊";
            case "paper": return "✋";
            case "scissors": return "✌️";
            default: return "❓";
        }
    };

    return {
        playerChoice,
        computerChoice,
        result,
        countdown,
        score,
        play,
        reset,
        resetScore,
        getEmoji
    };
}

// Even or Odds Hook
export function useEvenOdds(sound: string) {
    const [result, setResult] = useState<string | null>(null);
    const [number, setNumber] = useState<number | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const calculate = () => {
        setIsCalculating(true);
        playSound(sound);

        setTimeout(() => {
            const randomNum = Math.floor(Math.random() * 100) + 1;
            setNumber(randomNum);
            setResult(randomNum % 2 === 0 ? "Even" : "Odd");
            setIsCalculating(false);
        }, 1000);
    };

    return { result, number, isCalculating, calculate };
}

// Random Number Generator Hook
export function useRandomNumber(sound: string) {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [result, setResult] = useState<number | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const generate = () => {
        if (min >= max) return;

        setIsGenerating(true);
        playSound(sound);

        setTimeout(() => {
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            setResult(randomNum);
            setIsGenerating(false);
        }, 1000);
    };

    return {
        min,
        max,
        result,
        isGenerating,
        setMin,
        setMax,
        generate
    };
}
