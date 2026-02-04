require('dotenv').config();
const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Track connected clients by sessionId
const clients = new Map();

// n8n webhook URL - configure this to your n8n instance
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

wss.on('connection', (ws) => {
  // Generate unique session ID for this connection
  ws.sessionId = crypto.randomUUID();
  clients.set(ws.sessionId, ws);
  console.log(`Client connected: ${ws.sessionId}. Total clients: ${clients.size}`);

  // Send session ID to client
  ws.send(JSON.stringify({ type: 'session', sessionId: ws.sessionId }));

  ws.on('message', async (rawMessage) => {
    try {
      const message = JSON.parse(rawMessage.toString());
      console.log(`[${ws.sessionId}] Received:`, message);

      if (message.type === 'chat') {
        // Forward to n8n with session ID
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: ws.sessionId,
            content: message.content,
            timestamp: Date.now()
          }),
        });

        if (response.ok) {
          const data = await response.json();
          // Send n8n response back to the client
          ws.send(JSON.stringify({ type: 'response', data, timestamp: Date.now() }));
        } else {
          ws.send(JSON.stringify({ type: 'error', error: 'n8n request failed', timestamp: Date.now() }));
        }
      }
    } catch (error) {
      console.error(`[${ws.sessionId}] Error:`, error);
      ws.send(JSON.stringify({ type: 'error', error: error.message, timestamp: Date.now() }));
    }
  });

  ws.on('close', () => {
    clients.delete(ws.sessionId);
    console.log(`Client disconnected: ${ws.sessionId}. Total clients: ${clients.size}`);
  });
});

// Send to a specific session
function sendToSession(sessionId, data) {
  const client = clients.get(sessionId);
  if (client && client.readyState === 1) {
    client.send(JSON.stringify(data));
    return true;
  }
  return false;
}

app.post('/webhook', (req, res) => {
  const { sessionId, ...payload } = req.body;
  console.log('Received webhook:', req.body);

  if (sessionId) {
    // Send to specific session
    const sent = sendToSession(sessionId, { type: 'webhook', data: payload, timestamp: Date.now() });
    if (!sent) {
      res.status(404).json({ success: false, error: `Session ${sessionId} not found` });
    } else {
      res.json({ success: true });
    }
 
  } else {
    res.status(400).json({ success: false, error: 'sessionId is required' });
  }

});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', clients: clients.size });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Serving static files from /static`);
  console.log(`WebSocket: ws://localhost:${PORT}`);
  console.log(`n8n webhook: http://localhost:${PORT}/webhook`);
});
