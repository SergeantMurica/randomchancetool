import {Howl, HowlOptions} from 'howler';

/**
 * Plays a sound using the Howler.js library
 * @param src Path to the audio file
 * @param volume Volume level (0-1), defaults to 0.5
 * @param onEnd Optional callback when sound completes
 */
export const playSound = (
    src: string,
    volume: number = 0.5,
    onEnd?: () => void
) => {
    const sound = new Howl({
        src: [src],
        volume: volume,
        onend: onEnd
    });

    sound.play();
    return sound; // Return the sound object in case caller needs to control it
};

/**
 * Preloads sounds to avoid latency when playing them later
 * @param sources Array of sound file paths to preload
 */
export const preloadSounds = (sources: string[]) => {
    return sources.map(src => {
        return new Howl({src: [src], preload: true});
    });
};

/**
 * Creates a mutable sound instance that can be controlled
 * @param src Path to the audio file
 * @param options Additional Howl options
 */
export const createSound = (src: string, options: Partial<HowlOptions> = {}) => {
    return new Howl({
        src: [src],
        ...options
    });
};

/**
 * Set global volume for all future Howler sounds
 * @param volume Volume level (0-1)
 */
export const setGlobalVolume = (volume: number) => {
    Howler.volume(volume);
};
