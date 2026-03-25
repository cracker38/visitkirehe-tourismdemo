import './loadEnv.js';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import adminRoutes from './routes/admin.js';
import {
  getAttractions,
  getAttractionById,
  getAccommodations,
  getEvents,
  getBlog,
  getGallery,
  getActivities,
  getTestimonials,
  createMessage,
} from './db/queries.js';
import pool from './db/connection.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const __filename = fileURLToPath(import.meta.url);
const isMain = process.argv[1] ? path.resolve(process.argv[1]) === __filename : false;
const app = express();

// Catch startup/runtime crashes so Passenger logs show the real error.
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled rejection:', reason);
});

// Passenger/cPanel may provide the port in different env vars depending on configuration.
// Use whatever is available and fall back to 5000 for local development.
const PORT =
  Number.parseInt(
    process.env.PORT || process.env.PASSENGER_APP_PORT || process.env.PASSENGER_PORT,
    10,
  ) || 5000;
const HOST = process.env.HOST || '0.0.0.0';

// Static frontend (built client) – same origin = no CORS
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir, { index: false }));
}

const uploadsDir = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Useful boot log for cPanel/Passenger (does not print DB passwords).
if (isMain) {
  console.log(
    'API boot:',
    JSON.stringify({
      PORT,
      HOST,
      uploadsDir,
      UPLOADS_DIR_ENV: process.env.UPLOADS_DIR || null,
      DB_NAME: process.env.DB_NAME || null,
    }),
  );
}

const allowedOrigins = [
  'https://visitkirehe.cypadi.com',
  'https://www.visitkirehe.cypadi.com',
  'https://api.visitkirehe.cypadi.com',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
];
const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  if (/^https?:\/\/([a-z0-9-]+\.)?visitkirehe\.cypadi\.com$/i.test(origin)) return true;
  if (/^https?:\/\/([a-z0-9-]+\.)?cypadi\.com$/i.test(origin)) return true;
  return false;
};
app.use(cors({
  origin: (origin, cb) => cb(null, isAllowedOrigin(origin)),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204,
}));
app.use(express.json());
app.use(
  '/uploads',
  express.static(uploadsDir, {
    fallthrough: false,
  })
);
app.use('/uploads', (err, req, res, _next) => {
  // Express static file errors (permissions, missing file, etc.)
  const code = err?.code;
  console.error('Uploads error:', {
    code,
    message: err?.message,
    path: err?.path,
    url: req.originalUrl,
    uploadsDir,
  });
  if (code === 'ENOENT') return res.status(404).send('Not found');
  if (code === 'EACCES' || code === 'EPERM') return res.status(403).send('Forbidden');
  return res.status(500).send('Uploads error');
});

// Health check (no DB) – verify API is reachable
app.get('/api/health', (req, res) => res.json({ ok: true, service: 'visitkirehe-api' }));

// DB health check – verify database connection
app.get('/api/health/db', async (req, res) => {
  try {
    await pool.execute('SELECT 1');
    res.json({ ok: true, db: 'connected' });
  } catch (err) {
    console.error('DB health check failed:', err.message);
    res.status(500).json({ ok: false, db: 'error', message: err.message });
  }
});

// Public API – all from database
app.get('/api/attractions', async (req, res) => {
  try {
    let result = await getAttractions();
    const { search } = req.query;
    if (search) result = await getAttractions(search);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/attractions/:id', async (req, res) => {
  try {
    const item = await getAttractionById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/accommodations', async (req, res) => {
  try {
    let result = await getAccommodations();
    const { search } = req.query;
    if (search) result = await getAccommodations(search);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/activities', async (req, res) => {
  try {
    const result = await getActivities();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const result = await getEvents();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/testimonials', async (req, res) => {
  try {
    const result = await getTestimonials();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/blog', async (req, res) => {
  try {
    const result = await getBlog();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/gallery', async (req, res) => {
  try {
    const result = await getGallery();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }
  try {
    await createMessage({ name, email, message });
    res.json({ success: true, message: 'Thank you for your message!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email is required' });
  res.json({ success: true, message: 'You have been subscribed!' });
});

app.use('/api/admin', adminRoutes);

// SPA fallback – serve index.html for frontend routes
const indexPath = path.join(publicDir, 'index.html');
if (fs.existsSync(indexPath)) {
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
    res.sendFile(indexPath);
  });
}

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Global error handler – ensure CORS headers on errors
app.use((err, req, res, next) => {
  const origin = req.headers.origin;
  if (origin && isAllowedOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

if (isMain) {
  app.listen(PORT, HOST, () =>
    console.log(`Visit Kirehe API running on http://${HOST}:${PORT}`)
  );
}

export default app;
