import { preloadSounds } from './SoundManager';
import flipSound from '../assets/flip.wav';
import rollSound from "../assets/spin.wav";
import spinSound from '../assets/spin.wav';
import shakeSound from "../assets/spin.wav";
import gameSound from "../assets/spin.wav";
import clickSound from '../assets/click.mp3';

// Export all sound paths for use throughout the app
export const SOUNDS = {
    flip: flipSound,
    roll: rollSound,
    spin: spinSound,
    shake: shakeSound,
    game: gameSound,
    click: clickSound
};

// Preload all sounds when this module is imported
export const preloadedSounds = preloadSounds(Object.values(SOUNDS));
