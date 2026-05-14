import { useCallback, useRef } from 'react';

/**
 * Hook to play short Web Audio API sound effects
 * Avoids needing audio files (CORS-safe, lightweight)
 */
export const useSound = () => {
  const ctxRef = useRef(null);

  const getCtx = () => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  };

  const playTone = useCallback((frequency, duration = 0.2, type = 'sine', volume = 0.3) => {
    try {
      const ctx = getCtx();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = type;
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + duration);
    } catch (err) {
      // Silently fail (user hasn't interacted yet)
    }
  }, []);

  const playCorrect = useCallback(() => {
    playTone(523.25, 0.15, 'sine', 0.3); // C5
    setTimeout(() => playTone(659.25, 0.15, 'sine', 0.3), 100); // E5
    setTimeout(() => playTone(783.99, 0.25, 'sine', 0.3), 200); // G5
  }, [playTone]);

  const playWrong = useCallback(() => {
    playTone(220, 0.2, 'sawtooth', 0.2);
    setTimeout(() => playTone(196, 0.3, 'sawtooth', 0.2), 150);
  }, [playTone]);

  const playWin = useCallback(() => {
    const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5];
    notes.forEach((n, i) => setTimeout(() => playTone(n, 0.15, 'sine', 0.3), i * 80));
  }, [playTone]);

  const playClick = useCallback(() => {
    playTone(800, 0.05, 'square', 0.15);
  }, [playTone]);

  return { playCorrect, playWrong, playWin, playClick };
};
