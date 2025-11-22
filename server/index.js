
import 'dotenv/config';
import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
import { BotManager } from './botManager.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 1. Start HTTP Server
const server = app.listen(PORT, () => {
  console.log(`Selai Backend running on http://localhost:${PORT}`);
});

// 2. Start WebSocket Server
const wss = new WebSocketServer({ server });

// 3. Initialize Bot Orchestrator
// We pass a callback so the manager can broadcast updates to all clients
const broadcast = (data) => {
  const message = JSON.stringify({ type: 'UPDATE_BOTS', payload: data });
  wss.clients.forEach(client => {
    if (client.readyState === 1) {
      client.send(message);
    }
  });
};

const botManager = new BotManager(broadcast);
botManager.startSimulation();

// 4. WebSocket Connection Handling
wss.on('connection', (ws) => {
  console.log('Client connected to Dashboard');
  
  // Send initial state
  ws.send(JSON.stringify({ type: 'UPDATE_BOTS', payload: botManager.bots }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      
      if (data.type === 'ACCEPT_TRANSFER') {
        console.log(`Transfer Accepted for Bot ${data.botId}`);
        botManager.acceptTransfer(data.botId);
      }
      
      if (data.type === 'REJECT_TRANSFER') {
         botManager.rejectTransfer(data.botId);
      }

    } catch (e) {
      console.error('Error processing message:', e);
    }
  });
});

// 5. Webhook Endpoint (For Future Vapi/Twilio Integration)
app.post('/webhook/vapi', (req, res) => {
    // In production, Vapi would POST here when a call starts/ends
    console.log('Received Vapi Webhook:', req.body);
    res.sendStatus(200);
});
