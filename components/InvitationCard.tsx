
import React, { useState, useCallback } from 'react';
import { ResponseState } from '../types';

interface InvitationCardProps {
  onRespond: (response: ResponseState) => void;
}

const InvitationCard: React.FC<InvitationCardProps> = ({ onRespond }) => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesButtonPos, setYesButtonPos] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [isAngry, setIsAngry] = useState(false);

  const teleportButtons = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    
    // Bounds check for small screens
    const rangeX = window.innerWidth < 640 ? 100 : 150;
    const rangeY = window.innerWidth < 640 ? 100 : 150;
    
    const nextNoX = (Math.random() - 0.5) * rangeX;
    const nextNoY = (Math.random() - 0.5) * rangeY;
    
    setNoButtonPos({ x: nextNoX, y: nextNoY });
    // Yes "protects" by being right next to No or in front of it
    setYesButtonPos({ x: nextNoX - 55, y: nextNoY });
    
    setHasMoved(true);
    setIsAngry(true);
    
    // Reset anger slightly after teleport to give it a "flicker" of reaction
    setTimeout(() => setIsAngry(false), 1000);
  }, []);

  return (
    <div className="max-w-xs sm:max-w-md w-full mx-4 bg-white/95 backdrop-blur-xl rounded-[40px] shadow-2xl p-6 sm:p-10 text-center relative overflow-hidden flex flex-col items-center min-h-[550px]">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-400 to-indigo-400"></div>
      
      {/* Header */}
      <div className="z-10 mb-8">
        <div className="mb-4 flex justify-center">
          <div className="bg-pink-50 p-3 rounded-full floating shadow-sm border border-pink-100">
            <i className="fa-solid fa-envelope-open-heart text-pink-400 text-2xl"></i>
          </div>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-gray-800 mb-2 leading-tight">
          One more thing...
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm font-medium italic px-4">
          "If you don't interact with online messaging on insta, how about meeting offline?"
        </p>
      </div>

      {/* Main Interaction Scene */}
      <div className="flex-1 w-full relative flex flex-col items-center justify-center">
        
        {/* Maybe's Corner - Sitting on a chair reading */}
        <div className="absolute top-0 right-0 p-2 flex flex-col items-center scale-75 sm:scale-90 origin-top-right">
          <div className="relative">
            {/* Table */}
            <div className="table w-20 h-8 absolute -bottom-6 -left-12 z-20 flex items-center justify-center">
              <div className="book-open shadow-sm"></div>
            </div>
            {/* Chair */}
            <div className="w-12 h-16 bg-indigo-50 border border-indigo-100 rounded-t-2xl shadow-inner -z-10"></div>
            {/* Maybe Character Sitting */}
            <div className="absolute inset-0 flex flex-col items-center justify-center reading-character">
              <button
                onClick={() => onRespond('maybe')}
                className="relative px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold shadow-lg character-body text-[10px]"
              >
                <div className="flex gap-1 justify-center mb-0.5">
                  <div className="eye"></div>
                  <div className="eye"></div>
                </div>
                Maybe?
                {/* Sitting Limbs */}
                <div className="limb leg leg-l -bottom-2 bg-indigo-900 rotate-45"></div>
                <div className="limb leg leg-r -bottom-2 bg-indigo-900 -rotate-45"></div>
                <div className="limb arm arm-l bg-indigo-900 rotate-12"></div>
                <div className="limb arm arm-r bg-indigo-900 -rotate-12"></div>
              </button>
            </div>
          </div>
          <span className="mt-8 text-[8px] text-indigo-400 font-bold uppercase tracking-tighter">Reading Corner</span>
        </div>

        {/* Protection Logic Container */}
        <div className="relative w-full h-40 flex items-center justify-center mt-12">
          
          {/* Guardian Yes */}
          <div
            className="transition-all duration-300 z-30"
            style={{
              transform: `translate(${yesButtonPos.x}px, ${yesButtonPos.y}px)`,
              position: hasMoved ? 'absolute' : 'relative',
            }}
          >
            <div className={`flex flex-col items-center scale-75 sm:scale-100 ${isAngry ? 'angry' : ''}`}>
              <button
                onClick={() => onRespond('yes')}
                className="relative px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl font-black shadow-xl character-body border-2 border-pink-200 guardian-effect text-sm"
              >
                <div className="flex gap-2 justify-center mb-1">
                  <div className="eye bg-white">
                    <div className="eyebrow eyebrow-l"></div>
                  </div>
                  <div className="eye bg-white">
                    <div className="eyebrow eyebrow-r"></div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <i className="fa-solid fa-shield-heart text-pink-100 text-[10px]"></i>
                  YES!
                </div>
                {/* Limbs - Protective stance */}
                <div className="limb leg leg-l bg-pink-900 h-12 w-4 -bottom-10"></div>
                <div className="limb leg leg-r bg-pink-900 h-12 w-4 -bottom-10"></div>
                <div className="limb arm arm-l bg-pink-900 w-12 h-2 -left-10 rotate-45"></div>
                <div className="limb arm arm-r bg-pink-900 w-12 h-2 -right-10 -rotate-45"></div>
              </button>
            </div>
          </div>

          {/* Scared No */}
          <div
            className="transition-all duration-200 z-20"
            style={{
              transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
              position: hasMoved ? 'absolute' : 'relative',
            }}
          >
            <div className="flex flex-col items-center scale-75 sm:scale-100">
              <button
                onMouseEnter={teleportButtons}
                onTouchStart={teleportButtons}
                onClick={teleportButtons}
                className="relative px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold shadow-md character-body select-none text-xs"
              >
                <div className="flex gap-1 justify-center mb-0.5">
                  <div className="eye opacity-50"></div>
                  <div className="eye opacity-50"></div>
                </div>
                No
                {/* Intensive Crying */}
                <div className="tear" style={{ left: '15%', animationDelay: '0s' }}></div>
                <div className="tear" style={{ left: '35%', animationDelay: '0.2s' }}></div>
                <div className="tear" style={{ left: '65%', animationDelay: '0.4s' }}></div>
                <div className="tear" style={{ left: '85%', animationDelay: '0.1s' }}></div>
                
                {/* Limbs - Running away */}
                <div className="limb leg leg-l bg-gray-400 opacity-40"></div>
                <div className="limb leg leg-r bg-gray-400 opacity-40"></div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InvitationCard;
