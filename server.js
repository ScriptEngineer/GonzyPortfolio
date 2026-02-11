require('dotenv').config();
const express = require('express');
const { WebSocketServer } = require('ws');
const http = require('http');
const path = require('path');
const crypto = require('crypto');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'static')));

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Track connected clients by sessionId
const clients = new Map();

const PENNY_WEBHOOK_URL_PRO = process.env.N8N_WEBHOOK_URL_PENNY_PRO;
const PENNY_WEBHOOK_URL_DEV = process.env.N8N_WEBHOOK_URL_PENNY_DEV;

// TERRY WORKFLOW WEBHOOKS
const TERRY_WEBHOOK_URL_PRO = process.env.N8N_WEBHOOK_URL_TERRY_PRO;
const TERRY_WEBHOOK_URL_DEV = process.env.N8N_WEBHOOK_URL_TERRY_DEV;

// VAPI configuration
const VAPI_API_KEY = process.env.VAPI_API_KEY;
const VAPI_AGENT_NUMBER = process.env.VAPI_AGENT_NUMBER_JASON;
const VAPI_AGENT_ID = process.env.VAPI_AGENT_ID_JASON;

function getArgs(argv) {
  const args = { _: [] };

  for (const token of argv.slice(2)) {
    if (token.startsWith("--")) {
      const [k, v] = token.slice(2).split("=");
      args[k] = v === undefined ? true : v;
    } else {
      args._.push(token);
    }
  }
  return args;
}

const args = getArgs(process.argv);

const isDev = !!args.dev;
const isProd = !!args.pro;

let MODE = 'dev';
if (isProd) MODE = 'pro';

console.log(`Starting server in ${MODE} mode`);

if (!TERRY_WEBHOOK_URL_PRO || !TERRY_WEBHOOK_URL_DEV) {
  console.error('terry webhook not configured');
  return;
}

if (!PENNY_WEBHOOK_URL_PRO || !PENNY_WEBHOOK_URL_DEV) {
  console.error('penny webhook not configured');
  return;
}

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
        const response = await fetch(MODE === 'pro' ? PENNY_WEBHOOK_URL_PRO : PENNY_WEBHOOK_URL_DEV, {
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
      } else if (message.type === 'terry-audio') {
        // Forward audio chunk to Terry's n8n webhook

        try {
          // Convert base64 to binary buffer
          const audioBuffer = Buffer.from(message.audio, 'base64');

          // Determine file extension from mimeType
          const extension = message.mimeType.includes('webm') ? 'webm' : 'audio';

          // Create FormData with binary audio file
          const formData = new FormData();
          const audioBlob = new Blob([audioBuffer], { type: message.mimeType });
          formData.append('audio_file', audioBlob, `audio-${Date.now()}.${extension}`);
          formData.append('sessionId', ws.sessionId);
          formData.append('timestamp', message.timestamp.toString());

          const response = await fetch(MODE === 'pro' ? TERRY_WEBHOOK_URL_PRO : TERRY_WEBHOOK_URL_DEV, {
            method: 'POST',
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            // If n8n returns a transcription or response, send it back
            if (data.transcript || data.response) {
              ws.send(JSON.stringify({
                type: 'terry-response',
                data,
                timestamp: Date.now()
              }));
            }
          }
        } catch (error) {
          console.error('Terry webhook error:', error);
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
  const { sessionId, agent, agentResponse, userResponse } = req.body;
  console.log('Received webhook:', req.body);

  if (sessionId) {
    // Send to specific session
    const sent = sendToSession(sessionId, { type: 'webhook', agent, agentResponse , timestamp: Date.now() });
    if (!sent) {
      res.status(404).json({ success: false, error: `Session ${sessionId} not found` });
    } else {
      res.json({ success: true });
    }
 
  } else {
    res.status(400).json({ success: false, error: 'sessionId is required' });
  }

});

// VAPI call endpoint - proxy to protect API key
app.post('/api/vapi/call', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, error: 'phoneNumber is required' });
  }
  
  if (!VAPI_API_KEY || !VAPI_AGENT_ID) {
    console.error('VAPI_API_KEY or VAPI_AGENT_ID not configured');
    return res.status(500).json({ success: false, error: 'VAPI not configured' });
  }

  try {

    const fetchCall = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistantId: VAPI_AGENT_ID,
        phoneNumberId: VAPI_AGENT_NUMBER,
        customer: {
          number: "+1" + phoneNumber,
        },
      }),
    };

    console.log('Initiating VAPI call');
    console.log(fetchCall);

    const response = await fetch('https://api.vapi.ai/call', fetchCall);
    const data = await response.json();

    if (response.ok) {
      console.log('VAPI call initiated:', data);
      res.json({ success: true, data });
    } else {
      console.error('VAPI call failed:', data);
      res.status(response.status).json({ success: false, error: data });
    }
  } catch (error) {
    console.error('VAPI call error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PostgreSQL schema endpoint - fetch tables, columns, and relationships
app.get('/api/db/schema', async (req, res) => {

  // Use provided connection string or fall back to environment variable
  const dbUrl = process.env.TERRY_DATABASE_URL;

  if (!dbUrl) {
    return res.status(400).json({
      success: false,
      error: 'Database connection string is required. Provide connectionString in body or set TERRY_DATABASE_URL env var.'
    });
  }

  const pool = new Pool({ connectionString: dbUrl });

  try {
    // Query to get all tables in the public schema
    const tablesQuery = `
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;

    // Query to get columns for all tables
    const columnsQuery = `
      SELECT
        c.table_name,
        c.column_name,
        c.data_type,
        c.character_maximum_length,
        c.numeric_precision,
        c.numeric_scale,
        c.is_nullable,
        c.column_default,
        CASE WHEN pk.column_name IS NOT NULL THEN true ELSE false END as is_primary_key
      FROM information_schema.columns c
      LEFT JOIN (
        SELECT ku.table_name, ku.column_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.key_column_usage ku
          ON tc.constraint_name = ku.constraint_name
          AND tc.table_schema = ku.table_schema
        WHERE tc.constraint_type = 'PRIMARY KEY'
          AND tc.table_schema = 'public'
      ) pk ON c.table_name = pk.table_name AND c.column_name = pk.column_name
      WHERE c.table_schema = 'public'
      ORDER BY c.table_name, c.ordinal_position;
    `;

    // Query to get foreign key relationships
    const foreignKeysQuery = `
      SELECT
        tc.table_name as from_table,
        kcu.column_name as from_column,
        ccu.table_name as to_table,
        ccu.column_name as to_column
      FROM information_schema.table_constraints tc
      JOIN information_schema.key_column_usage kcu
        ON tc.constraint_name = kcu.constraint_name
        AND tc.table_schema = kcu.table_schema
      JOIN information_schema.constraint_column_usage ccu
        ON ccu.constraint_name = tc.constraint_name
        AND ccu.table_schema = tc.table_schema
      WHERE tc.constraint_type = 'FOREIGN KEY'
        AND tc.table_schema = 'public';
    `;

    // Execute all queries
    const [tablesResult, columnsResult, fkResult] = await Promise.all([
      pool.query(tablesQuery),
      pool.query(columnsQuery),
      pool.query(foreignKeysQuery)
    ]);

    // Build foreign key lookup
    const foreignKeys = {};
    fkResult.rows.forEach(fk => {
      const key = `${fk.from_table}.${fk.from_column}`;
      foreignKeys[key] = { table: fk.to_table, column: fk.to_column };
    });

    // Build tables with columns
    const tableMap = {};
    const tableCount = tablesResult.rows.length;

    // Calculate initial positions in a grid layout
    const cols = Math.ceil(Math.sqrt(tableCount));
    let index = 0;

    tablesResult.rows.forEach(table => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      tableMap[table.table_name] = {
        name: table.table_name,
        x: 20 + col * 180,
        y: 20 + row * 140,
        columns: []
      };
      index++;
    });

    // Add columns to tables
    columnsResult.rows.forEach(col => {
      if (tableMap[col.table_name]) {
        // Format the data type
        let dataType = col.data_type.toUpperCase();
        if (col.character_maximum_length) {
          dataType += `(${col.character_maximum_length})`;
        } else if (col.numeric_precision && col.data_type === 'numeric') {
          dataType = `DECIMAL(${col.numeric_precision},${col.numeric_scale || 0})`;
        }

        const fkKey = `${col.table_name}.${col.column_name}`;
        const foreignKey = foreignKeys[fkKey];

        tableMap[col.table_name].columns.push({
          name: col.column_name,
          type: dataType,
          isPrimary: col.is_primary_key,
          isNullable: col.is_nullable === 'YES',
          defaultValue: col.column_default,
          ...(foreignKey && { foreignKey })
        });
      }
    });

    const tables = Object.values(tableMap);

    res.json({
      success: true,
      schema: {
        tables,
        tableCount: tables.length,
        relationshipCount: fkResult.rows.length
      }
    });

  } catch (error) {
    console.error('Database schema error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  } finally {
    await pool.end();
  }
});

// Fetch all table rows in one call
app.get('/api/db/tabledata', async (req, res) => {
  const dbUrl = process.env.TERRY_DATABASE_URL;

  if (!dbUrl) {
    return res.status(400).json({
      success: false,
      error: 'Database connection string is required.'
    });
  }

  const pool = new Pool({ connectionString: dbUrl });

  try {
    // Get all public table names
    const tablesResult = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    const tableData = {};

    // Fetch rows for each table (limit to 50 per table)
    await Promise.all(
      tablesResult.rows.map(async ({ table_name }) => {
        const result = await pool.query(
          `SELECT * FROM "${table_name}" LIMIT 50`
        );
        tableData[table_name] = result.rows;
      })
    );

    res.json({ success: true, tableData });

  } catch (error) {
    console.error('Table data fetch error:', error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    await pool.end();
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
