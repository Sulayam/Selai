export enum BotStatus {
  IDLE = 'IDLE',
  DIALING = 'DIALING',
  CONNECTING = 'CONNECTING',
  PITCHING = 'PITCHING',   // AI is speaking
  LISTENING = 'LISTENING', // Lead is speaking
  TRANSFERRING = 'TRANSFERRING', // Warm transfer initiated
  COOLDOWN = 'COOLDOWN'
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  phone: string;
  industry: string;
  painPoints: string[];
  interestLevel: number; // 0-100
}

export interface TranscriptLine {
  speaker: 'AI' | 'LEAD';
  text: string;
  timestamp: number;
}

export interface BotAgent {
  id: number;
  name: string;
  status: BotStatus;
  currentLead: Lead | null;
  transcript: TranscriptLine[];
  duration: number;
  callSid?: string; // Mock Twilio Call SID
}

export interface GeminiAnalysis {
  summary: string;
  recommendedStrategy: string;
  sentiment: 'Positive' | 'Neutral' | 'Skeptical';
}
