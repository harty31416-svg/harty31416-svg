
import { GoogleGenAI } from "@google/genai";

export const generateAdvice = async (daysRemaining: number): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `I am a student preparing for the CBSE (Central Board of Secondary Education) board exams. There are ${daysRemaining} days left until the exams start on February 17, 2026. 
  Give me a short (max 20 words), powerful, dramatic, and high-stakes motivational quote or specific CBSE-focused study advice (e.g., mentioning NCERT, sample papers, or consistent revision) that fits an 'Avengers' or 'Mission Impossible' vibe. 
  Focus on high performance, scoring 100%, and the importance of this mission.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.9,
        topP: 0.95,
      },
    });

    return response.text?.trim() || "NCERT is the manual. The exam is the battlefield. Secure the marks.";
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Whatever it takes. The CBSE clock is ticking.";
  }
};
