
// NOTE: Gemini logic has been moved to server/gemini.js for security and architecture.
// This file is kept as a placeholder if we need client-side AI features later.

import { TranscriptLine, GeminiAnalysis } from "../types";

export const analyzeCallTranscript = async (transcript: TranscriptLine[]): Promise<GeminiAnalysis> => {
  console.warn("Client-side analysis is deprecated. Using Server WebSocket analysis.");
  return {
      summary: "Analysis provided by Server.",
      recommendedStrategy: "See server logs.",
      sentiment: "Neutral"
  };
};
