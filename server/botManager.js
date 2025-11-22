
import { processConversationTurn } from './gemini.js';

// Mock Data
const MOCK_LEADS = [
  { id: 'l1', name: 'John Davis', company: 'Metro Warehousing', phone: '+1 (555) 123-4567', industry: 'Logistics', painPoints: ['Theft at night'], interestLevel: 0 },
  { id: 'l2', name: 'Sarah Miller', company: 'Miller Retail', phone: '+1 (555) 987-6543', industry: 'Retail', painPoints: ['Liability'], interestLevel: 0 },
  { id: 'l3', name: 'Mike Chen', company: 'Tech Park', phone: '+1 (555) 456-7890', industry: 'Real Estate', painPoints: ['Access Control'], interestLevel: 0 },
];

const AI_OPENERS = [
    "Hi, this is Alex from SecureView. We help businesses like yours reduce theft.",
    "Hello, calling from SecureView. Do you have a minute to talk about perimeter security?",
];

// Simplified Lead responses for the simulation input
const LEAD_RESPONSES_POSITIVE = [
    "Actually, we were just looking into cameras.",
    "How much does it cost?",
    "What kind of night vision do you have?",
    "Yes, I have a moment."
];

const LEAD_RESPONSES_NEGATIVE = [
    "Not interested.",
    "We are happy with our current provider.",
    "Please take me off your list.",
    "Too busy, bye."
];

export class BotManager {
  constructor(ioCallback) {
    this.broadcast = ioCallback;
    this.bots = Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      name: `Agent-0${i + 1}`,
      status: 'IDLE',
      currentLead: null,
      transcript: [],
      duration: 0,
      analysis: null
    }));
  }

  startSimulation() {
    console.log("Bot Simulation Started...");
    setInterval(async () => {
      await this.tick();
      this.broadcast(this.bots);
    }, 1000);
  }

  async tick() {
    for (let bot of this.bots) {
      await this.updateBotState(bot);
    }
  }

  async updateBotState(bot) {
    // 1. IDLE -> DIALING
    if (bot.status === 'IDLE') {
      if (Math.random() > 0.9) { // Slowed down dialing slightly
        bot.status = 'DIALING';
        bot.currentLead = MOCK_LEADS[Math.floor(Math.random() * MOCK_LEADS.length)];
        bot.transcript = [];
        bot.duration = 0;
        bot.analysis = null;
      }
    }
    
    // 2. DIALING -> PITCHING (Connected)
    else if (bot.status === 'DIALING') {
       if (Math.random() > 0.8) {
         bot.status = 'PITCHING';
         // Initial Opener
         bot.transcript.push({ speaker: 'AI', text: AI_OPENERS[Math.floor(Math.random() * AI_OPENERS.length)], timestamp: Date.now() });
       } else if (Math.random() > 0.95) {
         bot.status = 'COOLDOWN'; // Failed call
       }
    }

    // 3. CONVERSATION LOOP
    else if (bot.status === 'PITCHING' || bot.status === 'LISTENING') {
       bot.duration++;
       
       // Only trigger a turn occasionally
       if (Math.random() > 0.85) {
         
         // IF Bot was Speaking, now it's Lead's turn to reply
         if (bot.status === 'PITCHING') {
            bot.status = 'LISTENING';
            
            // Simulate Lead Input
            const isInterested = Math.random() > 0.6; 
            const text = isInterested 
                ? LEAD_RESPONSES_POSITIVE[Math.floor(Math.random() * LEAD_RESPONSES_POSITIVE.length)]
                : LEAD_RESPONSES_NEGATIVE[Math.floor(Math.random() * LEAD_RESPONSES_NEGATIVE.length)];
            
            bot.transcript.push({ speaker: 'LEAD', text, timestamp: Date.now() });

            // NOW: The "Decision" Phase
            // If the lead said something positive, we ASK GEMINI what to do.
            // We visualize this with 'THINKING' state.
            if (isInterested) {
                bot.status = 'THINKING';
                // We don't await here inside the loop to avoid blocking other bots, 
                // but for this simple demo code, we'll just do it.
                try {
                    const decision = await processConversationTurn(bot.transcript, bot.currentLead);
                    
                    if (decision.action === 'TRANSFER') {
                        bot.status = 'TRANSFERRING';
                        bot.analysis = decision.data; // Contains summary/strategy from the Tool Call
                    } else {
                        // Gemini generated a text response
                        bot.status = 'PITCHING';
                        bot.transcript.push({ speaker: 'AI', text: decision.text, timestamp: Date.now() });
                    }
                } catch (e) {
                    console.error("Decision failed", e);
                    bot.status = 'PITCHING';
                }
            } else {
                // Negative response - simple rejection logic
                if (Math.random() > 0.5) {
                    bot.status = 'COOLDOWN';
                } else {
                     bot.status = 'PITCHING';
                     bot.transcript.push({ speaker: 'AI', text: "I understand, have a great day.", timestamp: Date.now() });
                     // End call shortly after
                     setTimeout(() => { bot.status = 'COOLDOWN'; }, 2000);
                }
            }
         }
       }
    }
    
    // 4. COOLDOWN -> IDLE
    else if (bot.status === 'COOLDOWN') {
      if (Math.random() > 0.7) {
        bot.status = 'IDLE';
        bot.currentLead = null;
      }
    }
  }

  acceptTransfer(botId) {
    const bot = this.bots.find(b => b.id === botId);
    if (bot) {
        bot.status = 'IDLE'; 
        bot.currentLead = null;
        bot.transcript = [];
        this.broadcast(this.bots);
    }
  }
  
  rejectTransfer(botId) {
      const bot = this.bots.find(b => b.id === botId);
      if (bot) {
          bot.status = 'COOLDOWN';
          this.broadcast(this.bots);
      }
  }
}
