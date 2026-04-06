/**
 * server.js — Tether AI Proxy
 *
 * Forwards requests from the frontend to the Anthropic Claude API,
 * keeping the API key server-side at all times.
 *
 * Start:
 *   npm start        (node server.js)
 *   npm run dev      (node --watch server.js)
 *
 * Endpoint:
 *   POST /api/ai   { prompt, systemPrompt, feature, stream? }
 *   GET  /health
 */

require('dotenv').config();

const express   = require('express');
const cors      = require('cors');
const Anthropic = require('@anthropic-ai/sdk');

const app    = express();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL  = 'claude-sonnet-4-20250514';
const PORT   = process.env.PORT || 3001;

const VALID_FEATURES = ['discharge-writer', 'risk-intelligence', 'task-suggester'];

const MAX_TOKENS = {
  'discharge-writer':  1500,
  'risk-intelligence':  600,
  'task-suggester':     800,
};

// ── CORS — allow localhost origins during development ─────────
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3002',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3002',
  ],
}));
app.use(express.json({ limit: '50kb' }));

// ── Health check ──────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', model: MODEL });
});

// ── AI proxy ──────────────────────────────────────────────────
app.post('/api/ai', async (req, res) => {
  const { prompt, systemPrompt, feature, stream: wantStream = true } = req.body;

  if (!prompt || typeof prompt !== 'string' || prompt.trim() === '') {
    return res.status(400).json({ error: '`prompt` string is required' });
  }
  if (!feature || !VALID_FEATURES.includes(feature)) {
    return res.status(400).json({
      error: `\`feature\` must be one of: ${VALID_FEATURES.join(', ')}`,
    });
  }

  const params = {
    model:      MODEL,
    max_tokens: MAX_TOKENS[feature],
    messages:   [{ role: 'user', content: prompt }],
    ...(systemPrompt ? { system: systemPrompt } : {}),
  };

  try {
    if (wantStream) {
      res.setHeader('Content-Type',  'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection',    'keep-alive');

      const stream = client.messages.stream(params);

      stream.on('text', text => {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      });

      stream.on('error', err => {
        console.error(`[Tether/${feature}]`, err.message);
        if (!res.writableEnded) {
          res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
          res.write('data: [DONE]\n\n');
          res.end();
        }
      });

      stream.on('finalMessage', () => {
        if (!res.writableEnded) {
          res.write('data: [DONE]\n\n');
          res.end();
        }
      });

    } else {
      const response = await client.messages.create(params);
      res.json({ content: response.content });
    }

  } catch (err) {
    console.error(`[Tether/${feature}]`, err.message);
    if (!res.headersSent) {
      res.status(500).json({ error: err.message });
    }
  }
});

app.listen(PORT, () => {
  const key = process.env.ANTHROPIC_API_KEY;
  console.log(`\n✦ Tether AI proxy  →  http://localhost:${PORT}`);
  console.log(`  Model   : ${MODEL}`);
  console.log(`  API key : ${key ? `${key.slice(0, 14)}…  ✓` : 'MISSING — set ANTHROPIC_API_KEY in .env'}`);
  console.log(`  Features: ${VALID_FEATURES.join(' · ')}\n`);
});
