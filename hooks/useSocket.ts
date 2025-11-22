
import { useState, useEffect, useRef, useCallback } from 'react';
import { BotAgent, BotStatus } from '../types';

export const useSocket = () => {
  const [bots, setBots] = useState<BotAgent[]>([]);
  const [incomingTransfer, setIncomingTransfer] = useState<BotAgent | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Connect to Backend
    // Assuming localhost:3000 for this environment
    const ws = new WebSocket('ws://localhost:3000');
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('Connected to Selai Backend');
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      try {
        const { type, payload } = JSON.parse(event.data);
        
        if (type === 'UPDATE_BOTS') {
          const updatedBots = payload as BotAgent[];
          setBots(updatedBots);

          // Check for any bot in TRANSFERRING state to trigger modal
          const transferringBot = updatedBots.find(b => b.status === BotStatus.TRANSFERRING);
          if (transferringBot) {
             // Only update if different to avoid loop, or if we don't have one
             setIncomingTransfer(transferringBot);
          } else {
             setIncomingTransfer(null);
          }
        }
      } catch (err) {
        console.error('Socket parse error:', err);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      ws.close();
    };
  }, []);

  const acceptTransfer = useCallback((botId: number) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'ACCEPT_TRANSFER', botId }));
      // Optimistic update (Frontend will be overwritten by next socket push anyway)
      setIncomingTransfer(null);
    }
  }, []);

  const rejectTransfer = useCallback((botId: number) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
       wsRef.current.send(JSON.stringify({ type: 'REJECT_TRANSFER', botId }));
       setIncomingTransfer(null);
    }
  }, []);

  return { bots, incomingTransfer, acceptTransfer, rejectTransfer, isConnected };
};
