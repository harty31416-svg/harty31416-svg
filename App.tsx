
import React, { useState, useEffect, useRef } from 'react';
import { CountdownDisplay } from './components/CountdownDisplay';
import { GeminiMotivation } from './components/GeminiMotivation';
import { playTickSound } from './utils/audio';

const TARGET_DATE = new Date('2026-02-17T00:00:00');

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isStarted, setIsStarted] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const audioInitialized = useRef(false);

  // Detect if we are in "Widget Mode"
  const isWidgetMode = new URLSearchParams(window.location.search).get('view') === 'widget';

  function calculateTimeLeft() {
    const difference = +TARGET_DATE - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      total: difference
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    // Check if running as PWA
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    // Listen for install prompt
    const handler = (e: any) => {
      console.log('Install prompt captured');
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    
    // Auto-start if in widget mode
    if (isWidgetMode) {
      setIsStarted(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, [isWidgetMode]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
      
      // Play tick sound every second if started AND NOT in widget mode
      if (isStarted && !isWidgetMode) {
        playTickSound();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, isWidgetMode]);

  const handleStart = () => {
    setIsStarted(true);
    audioInitialized.current = true;
  };

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const { outcome } = await installPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstallPrompt(null);
      }
    } else {
      // Fallback: Inform the user how to install manually if prompt isn't triggered
      alert("To add this as a widget/app:\n\nAndroid: Tap the three dots (⋮) and 'Add to Home Screen'.\n\nWindows/Chrome: Click the install icon in the address bar.\n\niOS: Tap 'Share' then 'Add to Home Screen'.");
    }
  };

  // Minimal Widget Rendering (Strictly for Home Screen display)
  if (isWidgetMode) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-black overflow-hidden p-2">
        <div className="text-center">
          <p className="text-[10px] font-orbitron text-white/20 tracking-[0.3em] uppercase mb-4">TACTICAL COUNTDOWN</p>
          <CountdownDisplay 
            days={timeLeft.days}
            hours={timeLeft.hours}
            minutes={timeLeft.minutes}
            seconds={timeLeft.seconds}
          />
          <p className="mt-4 text-[10px] font-orbitron text-red-600/40 tracking-[0.2em] uppercase">BOARDS 2026</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-black bg-grid overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Widget Install Button - Shows if not already standalone */}
      {!isStandalone && (
        <button 
          onClick={handleInstallClick}
          className="fixed top-6 right-6 z-50 flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border-2 border-white/10 hover:border-white/30 rounded-lg text-[10px] font-orbitron font-bold uppercase tracking-widest transition-all backdrop-blur-md"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
          Deploy Widget
        </button>
      )}

      {!isStarted ? (
        <div className="z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-orbitron font-black uppercase mb-8 tracking-widest glow-text animate-pulse">
            BOARDS EXAM
          </h1>
          <button 
            onClick={handleStart}
            className="px-12 py-4 border-2 border-white/20 hover:border-white text-white font-orbitron font-bold text-xl uppercase tracking-widest transition-all hover:bg-white hover:text-black group relative overflow-hidden"
          >
            <span className="relative z-10">Initiate Countdown</span>
            <div className="absolute inset-0 bg-white/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </button>
        </div>
      ) : (
        <div className="z-10 w-full max-w-7xl px-4 flex flex-col items-center gap-12">
          <div className="text-center space-y-2">
            <p className="text-white/40 uppercase tracking-[0.4em] text-sm md:text-base font-orbitron">MISSION OBJECTIVE</p>
            <h1 className="text-5xl md:text-8xl font-orbitron font-black uppercase tracking-tighter glow-text">
              BOARDS EXAM
            </h1>
          </div>

          <CountdownDisplay 
            days={timeLeft.days}
            hours={timeLeft.hours}
            minutes={timeLeft.minutes}
            seconds={timeLeft.seconds}
          />

          <div className="w-full max-w-2xl mt-8">
            <GeminiMotivation timeLeftTotal={timeLeft.total} />
          </div>
          
          <div className="fixed bottom-8 text-white/20 font-orbitron text-xs tracking-[0.5em] uppercase pointer-events-none">
            FEBRUARY 17, 2026
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
