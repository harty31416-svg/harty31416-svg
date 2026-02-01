
import React, { useState } from 'react';
import InvitationCard from './components/InvitationCard';
import ResultView from './components/ResultView';
import { ResponseState } from './types';

const App: React.FC = () => {
  const [response, setResponse] = useState<ResponseState>('idle');

  const handleResponse = (res: ResponseState) => {
    setResponse(res);
  };

  const reset = () => {
    setResponse('idle');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4">
      {response === 'idle' ? (
        <InvitationCard onRespond={handleResponse} />
      ) : (
        <ResultView response={response} onReset={reset} />
      )}
      
      {/* Decorative Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute floating text-white/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 40 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          >
            <i className={`fa-solid ${['fa-heart', 'fa-star', 'fa-moon', 'fa-cloud'][i % 4]}`}></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
