const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Track connected clients
const clients = new Set();

// n8n webhook URL - configure this to your n8n instance
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/chat';

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log('Client connected. Total clients:', clients.size);

  ws.on('message', async (rawMessage) => {
    try {
      const message = JSON.parse(rawMessage.toString());
      console.log('Received from client:', message);

      if (message.type === 'chat') {
        // Forward to n8n
        const response = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: message.content, timestamp: Date.now() }),
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
      console.error('Error processing message:', error);
      ws.send(JSON.stringify({ type: 'error', error: error.message, timestamp: Date.now() }));
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected. Total clients:', clients.size);
  });
});

// Broadcast to all connected clients
function broadcast(data) {
  const message = JSON.stringify(data);
  clients.forEach((client) => {
    if (client.readyState === 1) { // WebSocket.OPEN
      client.send(message);
    }
  });
}

// n8n webhook endpoint - POST requests get broadcast to all WebSocket clients
app.post('/webhook', (req, res) => {
  console.log('Received webhook:', req.body);
  broadcast({ type: 'webhook', data: req.body, timestamp: Date.now() });
  res.json({ success: true, message: 'Broadcast sent' });
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
