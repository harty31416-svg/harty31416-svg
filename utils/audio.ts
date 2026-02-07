
let audioCtx: AudioContext | null = null;

/**
 * Synthesizes a solid, mechanical 'tick' sound.
 * Using Web Audio API to avoid external asset dependency.
 */
export const playTickSound = () => {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Setup oscillator for a "wooden" mechanical tick
    oscillator.type = 'sine'; 
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + 0.05);

    // Envelope
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);

    // Add a second, higher "metal" component for a "solid" feel
    const metalOsc = audioCtx.createOscillator();
    const metalGain = audioCtx.createGain();
    
    metalOsc.type = 'triangle';
    metalOsc.frequency.setValueAtTime(2400, audioCtx.currentTime);
    
    metalGain.gain.setValueAtTime(0.02, audioCtx.currentTime);
    metalGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.02);

    metalOsc.connect(metalGain);
    metalGain.connect(audioCtx.destination);

    metalOsc.start();
    metalOsc.stop(audioCtx.currentTime + 0.02);

  } catch (err) {
    console.error("Audio playback failed:", err);
  }
};
