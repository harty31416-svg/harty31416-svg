
import React from 'react';

interface CountdownDisplayProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center px-4 md:px-8">
    <div className="relative group">
      {/* Background glow for digits */}
      <div className="absolute inset-0 bg-white/5 blur-xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
      <span className="relative text-7xl md:text-9xl font-orbitron font-black tracking-tighter text-white/90">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="mt-2 text-xs md:text-sm font-orbitron tracking-[0.5em] text-white/30 uppercase">
      {label}
    </span>
  </div>
);

export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-y-12">
      <TimeUnit value={days} label="Days" />
      <div className="hidden md:block text-5xl text-white/10 font-orbitron pt-4">:</div>
      <TimeUnit value={hours} label="Hours" />
      <div className="hidden md:block text-5xl text-white/10 font-orbitron pt-4">:</div>
      <TimeUnit value={minutes} label="Mins" />
      <div className="hidden md:block text-5xl text-white/10 font-orbitron pt-4">:</div>
      <TimeUnit value={seconds} label="Secs" />
    </div>
  );
};
