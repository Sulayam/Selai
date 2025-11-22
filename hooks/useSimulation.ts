import { useState, useEffect, useCallback, useRef } from 'react';
import { BotAgent, BotStatus, Lead, TranscriptLine } from '../types';
import { MOCK_LEADS, AI_SCRIPTS, LEAD_RESPONSES_INTERESTED, LEAD_RESPONSES_REJECTED } from '../constants';

const TOTAL_BOTS = 4;

const initialBots: BotAgent[] = Array.from({ length: TOTAL_BOTS }, (_, i) => ({
  id: i + 1,
  name: `Agent-0${i + 1}`,
  status: BotStatus.IDLE,
  currentLead: null,
  transcript: [],
  duration: 0
}));

export const useSimulation = () => {
  const [bots, setBots] = useState<BotAgent[]>(initialBots);
  const [incomingTransfer, setIncomingTransfer] = useState<BotAgent | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to pick a random lead
  const getRandomLead = (): Lead => {
    return { ...MOCK_LEADS[Math.floor(Math.random() * MOCK_LEADS.length)] };
  };

  // Helper to update a specific bot
  const updateBot = useCallback((botId: number, updates: Partial<BotAgent>) => {
    setBots(prev => prev.map(b => b.id === botId ? { ...b, ...updates } : b));
  }, []);

  // The "Brain" of the simulation
  useEffect(() => {
    timerRef.current = setInterval(() => {
      bots.forEach(bot => {
        // 1. Handle IDLE -> DIALING
        if (bot.status === BotStatus.IDLE) {
          if (Math.random() > 0.8) {
            updateBot(bot.id, { 
              status: BotStatus.DIALING, 
              currentLead: getRandomLead(),
              transcript: [],
              duration: 0
            });
          }
        }

        // 2. Handle DIALING -> PITCHING (Connected)
        else if (bot.status === BotStatus.DIALING) {
          if (Math.random() > 0.85) {
            updateBot(bot.id, { status: BotStatus.PITCHING, duration: 0 });
            // Add initial script
            const script = AI_SCRIPTS[0];
            updateBot(bot.id, { 
              transcript: [{ speaker: 'AI', text: script, timestamp: Date.now() }] 
            });
          } else if (Math.random() > 0.95) {
             // Failed call
             updateBot(bot.id, { status: BotStatus.COOLDOWN });
          }
        }

        // 3. Handle Active Conversation (PITCHING <-> LISTENING)
        else if (bot.status === BotStatus.PITCHING || bot.status === BotStatus.LISTENING) {
          const isSpeaking = bot.status === BotStatus.PITCHING;
          
          // Switch turns occasionally
          if (Math.random() > 0.9) {
             const nextStatus = isSpeaking ? BotStatus.LISTENING : BotStatus.PITCHING;
             updateBot(bot.id, { status: nextStatus });

             // Generate text for the *previous* speaker who just finished
             if (isSpeaking) {
               // AI just finished
               // Already logged in previous step usually, but for simulation we add text on switch
             } else {
                // Lead just finished listening, now lead speaks
                const isInterested = Math.random() > 0.7; // 30% chance of interest in this simulation step
                const responseSet = isInterested ? LEAD_RESPONSES_INTERESTED : LEAD_RESPONSES_REJECTED;
                const text = responseSet[Math.floor(Math.random() * responseSet.length)];
                
                updateBot(bot.id, {
                  transcript: [...bot.transcript, { speaker: 'LEAD', text, timestamp: Date.now() }]
                });

                // Check for transfer trigger
                if (isInterested && Math.random() > 0.6) {
                   updateBot(bot.id, { status: BotStatus.TRANSFERRING });
                   // Trigger the main app modal
                   // We need to find the bot object again to get latest state
                   setIncomingTransfer(prev => prev ? prev : { ...bot, status: BotStatus.TRANSFERRING, transcript: [...bot.transcript, { speaker: 'LEAD', text, timestamp: Date.now() }] });
                   return; // Stop processing this bot
                }
                
                // Check for rejection/hangup
                if (!isInterested && Math.random() > 0.5) {
                    updateBot(bot.id, { status: BotStatus.COOLDOWN });
                }
             }

             if (nextStatus === BotStatus.PITCHING) {
               // AI Speaks
               const text = AI_SCRIPTS[Math.floor(Math.random() * AI_SCRIPTS.length)];
               updateBot(bot.id, {
                  transcript: [...bot.transcript, { speaker: 'AI', text, timestamp: Date.now() }]
                });
             }
          }
          
          // Increment duration
          updateBot(bot.id, { duration: bot.duration + 1 });
        }

        // 4. Handle TRANSFERRING
        else if (bot.status === BotStatus.TRANSFERRING) {
           // Should stay here until human accepts.
           // In simulation, maybe timeout if no one answers?
        }

        // 5. Handle COOLDOWN -> IDLE
        else if (bot.status === BotStatus.COOLDOWN) {
          if (Math.random() > 0.8) {
            updateBot(bot.id, { status: BotStatus.IDLE, currentLead: null, transcript: [], duration: 0 });
          }
        }

      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [bots, updateBot]);

  const acceptTransfer = (botId: number) => {
    // Reset that bot to IDLE (simulating it left the bot pool and went to human)
    updateBot(botId, { status: BotStatus.IDLE, currentLead: null, transcript: [] });
    setIncomingTransfer(null);
  };

  const rejectTransfer = (botId: number) => {
    updateBot(botId, { status: BotStatus.COOLDOWN });
    setIncomingTransfer(null);
  };

  return { bots, incomingTransfer, acceptTransfer, rejectTransfer };
};
