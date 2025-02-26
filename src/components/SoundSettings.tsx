import React, { useState, useEffect } from 'react';
import { setGlobalVolume } from '../utils/SoundManager';

const SoundSettings: React.FC = () => {
    const [isMuted, setIsMuted] = useState(() => {
        return localStorage.getItem('soundEnabled') === 'false';
    });

    const [volume, setVolume] = useState(() => {
        const savedVolume = localStorage.getItem('soundVolume');
        return savedVolume ? parseFloat(savedVolume) : 0.5;
    });

    const toggleMute = () => {
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        setGlobalVolume(newMuted ? 0 : volume);
        localStorage.setItem('soundEnabled', newMuted ? 'false' : 'true');
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setGlobalVolume(isMuted ? 0 : newVolume);
        localStorage.setItem('soundVolume', newVolume.toString());
    };

    useEffect(() => {
        // Initialize volume on component mount
        setGlobalVolume(isMuted ? 0 : volume);
    }, []);

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={toggleMute}
                className="text-white p-2 rounded-full hover:bg-white/10"
                aria-label={isMuted ? "Unmute" : "Mute"}
            >
                {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                )}
            </button>

            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-24 accent-purple-500"
                disabled={isMuted}
            />
        </div>
    );
};

export {SoundSettings};
