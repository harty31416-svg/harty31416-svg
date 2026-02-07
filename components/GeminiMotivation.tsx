
import React, { useState, useEffect } from 'react';
import { generateAdvice } from '../services/geminiService';

interface GeminiMotivationProps {
  timeLeftTotal: number;
}

export const GeminiMotivation: React.FC<GeminiMotivationProps> = ({ timeLeftTotal }) => {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAdvice = async () => {
      setLoading(true);
      try {
        const daysRemaining = Math.floor(timeLeftTotal / (1000 * 60 * 60 * 24));
        const result = await generateAdvice(daysRemaining);
        setAdvice(result);
      } catch (error) {
        console.error("Failed to fetch Gemini advice:", error);
        setAdvice("Focus on the journey, not just the destination. Every second counts.");
      } finally {
        setLoading(false);
      }
    };

    fetchAdvice();
    // Refresh advice every hour
    const interval = setInterval(fetchAdvice, 3600000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-lg text-center relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-red-600/50 group-hover:bg-red-500 transition-colors"></div>
      <h3 className="text-xs font-orbitron uppercase tracking-[0.3em] text-white/40 mb-4 flex items-center justify-center gap-2">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        CBSE Tactical Intelligence
      </h3>
      {loading ? (
        <div className="flex justify-center items-center py-4">
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      ) : (
        <p className="text-white/70 italic text-sm md:text-base font-light leading-relaxed">
          "{advice}"
        </p>
      )}
    </div>
  );
};
