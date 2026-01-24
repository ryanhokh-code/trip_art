import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const askTravelAssistant = async (query: string): Promise<string> => {
  if (!apiKey) {
    return "API Key not configured. Please check environment variables.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert tour guide for Okinawa, Japan. 
      You are helping a family with a young child (named 愷蕎) on their trip (April 28 - May 2).
      Keep answers concise, helpful, and friendly. 
      User Query: ${query}`,
    });
    return response.text || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong while contacting the travel assistant.";
  }
};