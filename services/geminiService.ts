import { GoogleGenAI, Type } from "@google/genai";
import { TranscriptLine, GeminiAnalysis } from "../types";

const createClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing. AI features will be disabled.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const analyzeCallTranscript = async (transcript: TranscriptLine[]): Promise<GeminiAnalysis> => {
  const ai = createClient();
  if (!ai) {
    return {
      summary: "API Key missing. Cannot generate summary.",
      recommendedStrategy: "N/A",
      sentiment: "Neutral"
    };
  }

  const transcriptText = transcript.map(t => `${t.speaker}: ${t.text}`).join("\n");

  const prompt = `
    You are a sales manager assistant for a CCTV security company.
    Analyze the following transcript between an AI pre-screener and a potential lead.
    
    Transcript:
    ${transcriptText}
    
    Provide a JSON response with:
    1. A brief summary of the lead's needs.
    2. A specific closing strategy for the human agent taking over the call.
    3. The sentiment of the lead.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            recommendedStrategy: { type: Type.STRING },
            sentiment: { type: Type.STRING, enum: ["Positive", "Neutral", "Skeptical"] }
          },
          required: ["summary", "recommendedStrategy", "sentiment"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");
    
    return JSON.parse(text) as GeminiAnalysis;
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return {
      summary: "Analysis failed.",
      recommendedStrategy: "Proceed with standard discovery.",
      sentiment: "Neutral"
    };
  }
};
