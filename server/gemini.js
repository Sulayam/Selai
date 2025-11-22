
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
const apiKey = process.env.API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Tool Definition: The capability we give the LLM
const transferTool = {
  name: "transfer_call",
  description: "Transfers the call to a human agent. Use this ONLY when the lead explicitly confirms interest or asks for a demo/pricing.",
  parameters: {
    type: "OBJECT",
    properties: {
      summary: { 
        type: "STRING",
        description: "A concise 1-sentence summary of why they are interested."
      },
      sentiment: { 
        type: "STRING", 
        enum: ["Positive", "Neutral", "Skeptical", "Urgent"],
        description: "The detected sentiment of the lead."
      },
      recommendedStrategy: {
        type: "STRING",
        description: "A tip for the human agent on how to close this specific lead."
      }
    },
    required: ["summary", "sentiment", "recommendedStrategy"]
  }
};

/**
 * Processes a conversation turn.
 * Returns either:
 * 1. { action: "TRANSFER", data: { ...args } }
 * 2. { action: "CONTINUE", text: "Suggested response..." }
 */
export const processConversationTurn = async (transcript, leadContext) => {
  if (!ai) {
    console.warn("Gemini API Key missing. Using mock response.");
    return { action: "CONTINUE", text: "I can help with that." };
  }

  const systemPrompt = `
    You are an AI Sales Development Rep named Alex working for 'SecureView', a commercial CCTV company.
    Your goal is to qualify leads for a 'Warm Transfer' to a human expert.
    
    LEAD CONTEXT: ${JSON.stringify(leadContext)}

    RULES:
    1. If the lead says "not interested", "stop calling", or hangs up, just reply politely to end it.
    2. If the lead asks about price, features, or says "yes", "maybe", or shows curiosity -> Call the 'transfer_call' tool immediately.
    3. Keep your text responses short (under 20 words).
  `;

  const conversationHistory = transcript.map(t => ({
     role: t.speaker === 'AI' ? 'model' : 'user',
     parts: [{ text: t.text }]
  }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: conversationHistory,
      config: {
        systemInstruction: systemPrompt,
        tools: [{ functionDeclarations: [transferTool] }],
        temperature: 0.7,
      }
    });

    // Check for Function Calls (The "Decision")
    // The SDK parses tool calls into response.functionCalls
    const functionCalls = response.functionCalls;

    if (functionCalls && functionCalls.length > 0) {
       const call = functionCalls[0];
       if (call.name === 'transfer_call') {
           return {
             action: "TRANSFER",
             data: call.args
           };
       }
    }

    // Otherwise, it's a text response
    const text = response.text || "I understand.";
    return {
      action: "CONTINUE",
      text: text
    };

  } catch (error) {
    console.error("Gemini Error:", error);
    return { action: "CONTINUE", text: "Could you repeat that?" };
  }
};
