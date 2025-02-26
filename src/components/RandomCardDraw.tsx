import React, { useState } from "react";
import { playSound } from "../utils/SoundManager";
import cardSound from "../assets/click.mp3";

const suits = ["♠️", "♥️", "♦️", "♣️"];
const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

type Card = {
    suit: string;
    value: string;
    isRed: boolean;
    id: string;
};

const RandomCardDraw: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [isDeckShuffled, setIsDeckShuffled] = useState(true);
    const [remainingCards, setRemainingCards] = useState<Card[]>([]);

    const createDeck = (): Card[] => {
        const deck: Card[] = [];
        suits.forEach(suit => {
            values.forEach(value => {
                deck.push({
                    suit,
                    value,
                    isRed: suit === "♥️" || suit === "♦️",
                    id: `${value}-${suit}`,
                });
            });
        });
        return deck;
    };

    const shuffleDeck = () => {
        setIsDrawing(true);
        playSound(cardSound);

        setTimeout(() => {
            const newDeck = createDeck();
            // Fisher-Yates shuffle
            for (let i = newDeck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
            }
            setRemainingCards(newDeck);
            setCards([]);
            setIsDeckShuffled(true);
            setIsDrawing(false);
        }, 800);
    };

    const drawCard = () => {
        if (remainingCards.length === 0) {
            shuffleDeck();
            return;
        }

        setIsDrawing(true);
        playSound(cardSound);

        setTimeout(() => {
            const updatedRemaining = [...remainingCards];
            const drawnCard = updatedRemaining.pop()!;

            setRemainingCards(updatedRemaining);
            setCards(prev => [drawnCard, ...prev]);
            setIsDrawing(false);
        }, 300);
    };

    const drawMultiple = (count: number) => {
        if (remainingCards.length < count) {
            shuffleDeck();
            return;
        }

        setIsDrawing(true);
        playSound(cardSound);

        setTimeout(() => {
            const updatedRemaining = [...remainingCards];
            const drawnCards: Card[] = [];

            for (let i = 0; i < count; i++) {
                drawnCards.push(updatedRemaining.pop()!);
            }

            setRemainingCards(updatedRemaining);
            setCards(prev => [...drawnCards, ...prev]);
            setIsDrawing(false);
        }, 800);
    };

    // Initialize deck if needed
    if (remainingCards.length === 0 && !isDrawing && !isDeckShuffled) {
        shuffleDeck();
    }

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Card Dealer</h2>

            <div className="flex justify-between items-center w-full mb-4">
                <div className="text-white">
                    <span className="text-lg font-bold">{remainingCards.length}</span> cards left
                </div>
                <button
                    onClick={shuffleDeck}
                    disabled={isDrawing}
                    className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 disabled:opacity-50"
                >
                    Shuffle Deck
                </button>
            </div>

            <div className="flex space-x-2 mb-6">
                <button
                    onClick={drawCard}
                    disabled={isDrawing || remainingCards.length === 0}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg
                   text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105
                   transition-all disabled:opacity-50 disabled:transform-none"
                >
                    Draw 1 Card
                </button>
                <button
                    onClick={() => drawMultiple(5)}
                    disabled={isDrawing || remainingCards.length < 5}
                    className="px-6 py-3 bg-gradient-to-r from-red-700 to-pink-700 rounded-lg
                   text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105
                   transition-all disabled:opacity-50 disabled:transform-none"
                >
                    Draw 5 Cards
                </button>
            </div>

            {cards.length > 0 && (
                <div className="w-full">
                    <h3 className="text-white font-bold mb-2">Your Cards:</h3>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {cards.map((card, index) => (
                            <div
                                key={`${card.id}-${index}`}
                                className={`w-16 h-24 rounded-lg flex flex-col items-center justify-center border-2 border-white
                          ${card.isRed ? 'bg-white text-red-600' : 'bg-white text-black'}`}
                            >
                                <div className="text-lg">{card.value}</div>
                                <div className="text-2xl">{card.suit}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export {RandomCardDraw};
