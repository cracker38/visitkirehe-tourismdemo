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

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;
const uploadsDir = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

const allowedOrigins = [
  'https://visitkirehe.cypadi.com',
  'https://www.visitkirehe.cypadi.com',
  'https://api.visitkirehe.cypadi.com',
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
];
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
    cb(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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

app.listen(PORT, () => console.log(`Visit Kirehe API running on http://localhost:${PORT}`));
