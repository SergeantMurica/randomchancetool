import React, { useState } from "react";
import { playSound } from "../utils/SoundManager";
import clickSound from "../assets/click.mp3";

const RandomColorGenerator: React.FC = () => {
    const [color, setColor] = useState<string>("#3498db");
    const [colorHistory, setColorHistory] = useState<string[]>([]);
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [colorFormat, setColorFormat] = useState<"hex" | "rgb" | "hsl">("hex");

    const generateRandomColor = () => {
        setIsGenerating(true);
        playSound(clickSound);

        setTimeout(() => {
            // Generate random hex color
            const randomColor = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')}`;
            setColor(randomColor);
            setColorHistory(prev => [randomColor, ...prev].slice(0, 10));
            setIsGenerating(false);
        }, 300);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {});
    };

    const hexToRgb = (hex: string): string => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${r}, ${g}, ${b})`;
    };

    const hexToHsl = (hex: string): string => {
        // Convert hex to rgb
        const r = parseInt(hex.slice(1, 3), 16) / 255;
        const g = parseInt(hex.slice(3, 5), 16) / 255;
        const b = parseInt(hex.slice(5, 7), 16) / 255;

        // Find greatest and smallest channel values
        const cmin = Math.min(r, g, b);
        const cmax = Math.max(r, g, b);
        const delta = cmax - cmin;
        let h: number, s: number, l: number;

        // Calculate hue
        if (delta === 0) h = 0;
        else if (cmax === r) h = ((g - b) / delta) % 6;
        else if (cmax === g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;

        h = Math.round(h * 60);
        if (h < 0) h += 360;

        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply s and l by 100
        s = Math.round(s * 100);
        l = Math.round(l * 100);

        return `hsl(${h}, ${s}%, ${l}%)`;
    };

    const getFormattedColor = () => {
        switch (colorFormat) {
            case "rgb": return hexToRgb(color);
            case "hsl": return hexToHsl(color);
            default: return color;
        }
    };

    const getTextColor = (bgColor: string) => {
        // Calculate contrast color for text (black or white)
        const r = parseInt(bgColor.slice(1, 3), 16);
        const g = parseInt(bgColor.slice(3, 5), 16);
        const b = parseInt(bgColor.slice(5, 7), 16);

        return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? "#000000" : "#ffffff";
    };

    return (
        <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Random Color Generator</h2>

            <div
                className="w-full h-48 rounded-lg mb-4 flex items-center justify-center transition-colors duration-500"
                style={{ backgroundColor: color, color: getTextColor(color) }}
            >
                <span className="text-xl font-bold select-all">{getFormattedColor()}</span>
            </div>

            <div className="w-full flex space-x-2 mb-4">
                <button
                    onClick={() => setColorFormat("hex")}
                    className={`flex-1 py-2 rounded-lg ${colorFormat === "hex" ? "bg-white/30 text-white" : "bg-white/10 text-white/70"}`}
                >
                    HEX
                </button>
                <button
                    onClick={() => setColorFormat("rgb")}
                    className={`flex-1 py-2 rounded-lg ${colorFormat === "rgb" ? "bg-white/30 text-white" : "bg-white/10 text-white/70"}`}
                >
                    RGB
                </button>
                <button
                    onClick={() => setColorFormat("hsl")}
                    className={`flex-1 py-2 rounded-lg ${colorFormat === "hsl" ? "bg-white/30 text-white" : "bg-white/10 text-white/70"}`}
                >
                    HSL
                </button>
            </div>

            <div className="w-full flex space-x-2 mb-4">
                <button
                    onClick={generateRandomColor}
                    disabled={isGenerating}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg
                   text-white font-bold shadow-lg hover:shadow-xl transform hover:scale-105
                   transition-all disabled:opacity-50 disabled:transform-none"
                >
                    {isGenerating ? "Generating..." : "Random Color"}
                </button>
                <button
                    onClick={() => copyToClipboard(getFormattedColor())}
                    className="px-4 py-3 bg-white/20 rounded-lg text-white hover:bg-white/30"
                >
                    Copy
                </button>
            </div>

            {colorHistory.length > 0 && (
                <div className="w-full">
                    <h3 className="text-white font-bold mb-2">History:</h3>
                    <div className="grid grid-cols-5 gap-2">
                        {colorHistory.map((historicColor, index) => (
                            <div
                                key={index}
                                className="w-full aspect-square rounded-md cursor-pointer transition-transform hover:scale-105"
                                style={{ backgroundColor: historicColor }}
                                onClick={() => setColor(historicColor)}
                                title={historicColor}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export {RandomColorGenerator};
