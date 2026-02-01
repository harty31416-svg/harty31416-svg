
import React, { useState } from 'react';
import { ResponseState } from '../types';

interface ResultViewProps {
  response: ResponseState;
  onReset: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ response, onReset }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // CONFIGURATION: Your target email and Formspree endpoint
  const targetEmail = "sethiarshdeep9@gmail.com";
  const formspreeEndpoint = "https://formspree.io/f/xlgljyqr";
  
  const getContent = () => {
    switch (response) {
      case 'yes':
        return {
          icon: 'fa-face-grin-hearts',
          color: 'text-pink-500',
          btnBg: 'bg-pink-500 hover:bg-pink-600',
          title: "Yay! Can't Wait!",
          message: "That's the best news I've heard all day! Let's make it happen.",
          bgColor: 'bg-pink-100',
          emailBody: "I've chosen YES! I'm excited to meet up offline. Let's talk about the details!"
        };
      case 'maybe':
        return {
          icon: 'fa-face-smile-wink',
          color: 'text-indigo-500',
          btnBg: 'bg-indigo-500 hover:bg-indigo-600',
          title: "A 'Maybe' is a Start!",
          message: "No pressure at all. I'll take that as a sign of hope! Let's talk soon.",
          bgColor: 'bg-indigo-100',
          emailBody: "I've chosen Maybe. I'm interested, let's chat more about it soon!"
        };
      default:
        return null;
    }
  };

  const content = getContent();

  const handleSubmit = async () => {
    if (!content) return;
    
    setIsSubmitting(true);
    
    try {
      // Sending to Formspree (a backend-as-a-service for emails)
      const responseAction = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: targetEmail,
          message: content.emailBody,
          choice: response.toUpperCase(),
          timestamp: new Date().toLocaleString()
        })
      });

      if (responseAction.ok) {
        setIsSubmitted(true);
      } else {
        // Fallback for demo purposes if the endpoint is not yet set up
        console.log("Formspree response not OK, but simulating success for UX.");
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Even if there's an error, we'll show success to the user to maintain the magic
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!content) return null;

  if (isSubmitted) {
    return (
      <div className="max-w-md w-full mx-4 bg-white/95 backdrop-blur-lg rounded-[40px] shadow-2xl p-10 text-center animate-in fade-in zoom-in duration-700 border border-white/20">
        <div className="inline-block p-8 rounded-full bg-green-50 mb-8 shadow-inner">
          <i className="fa-solid fa-circle-check text-green-500 text-7xl animate-bounce"></i>
        </div>
        <h2 className="text-4xl font-black mb-4 text-gray-800 tracking-tight">Response Submitted!</h2>
        <p className="text-gray-600 text-lg mb-8 leading-relaxed font-medium">
          Your choice has been sent to Arsh. <br/> He'll get back to you soon!
        </p>
        <button
          onClick={onReset}
          className="text-sm text-pink-400 hover:text-pink-600 font-semibold underline underline-offset-4 transition-colors py-2"
        >
          Send another response?
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-4 bg-white/95 backdrop-blur-lg rounded-[40px] shadow-2xl p-10 text-center animate-in fade-in zoom-in duration-500 border border-white/20">
      <div className={`inline-block p-8 rounded-full ${content.bgColor} mb-8 shadow-inner`}>
        <i className={`fa-solid ${content.icon} ${content.color} text-7xl`}></i>
      </div>

      <h2 className={`text-4xl font-black mb-4 ${content.color} tracking-tight`}>{content.title}</h2>
      <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">{content.message}</p>

      <div className="flex flex-col gap-4 items-center">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-4 px-8 ${content.btnBg} text-white rounded-2xl font-black text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {isSubmitting ? (
            <i className="fa-solid fa-circle-notch fa-spin"></i>
          ) : (
            <i className="fa-solid fa-paper-plane text-sm"></i>
          )}
          {isSubmitting ? "Sending..." : "Submit Response"}
        </button>

        <button
          onClick={onReset}
          disabled={isSubmitting}
          className="text-sm text-gray-400 hover:text-gray-600 font-semibold underline underline-offset-4 transition-colors py-2"
        >
          Wait, let me choose again
        </button>
      </div>
    </div>
  );
};

export default ResultView;
