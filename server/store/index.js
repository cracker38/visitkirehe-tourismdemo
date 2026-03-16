import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { attractions as seedAttractions } from '../data/attractions.js'
import { accommodations as seedAccommodations } from '../data/accommodations.js'
import { events as seedEvents } from '../data/events.js'
import { galleryImages as seedGallery } from '../data/gallery.js'
import { blogPosts as seedBlog } from '../data/blog.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const STORE_DIR = path.join(__dirname, 'data')
const FILES = {
  attractions: 'attractions.json',
  accommodations: 'accommodations.json',
  events: 'events.json',
  gallery: 'gallery.json',
  blog: 'blog.json',
  messages: 'messages.json',
  travelInfo: 'travelInfo.json',
  settings: 'settings.json',
  analytics: 'analytics.json',
}

function ensureDir() {
  if (!fs.existsSync(STORE_DIR)) fs.mkdirSync(STORE_DIR, { recursive: true })
}

function read(key) {
  ensureDir()
  const file = path.join(STORE_DIR, FILES[key])
  if (!fs.existsSync(file)) return null
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

function write(key, data) {
  ensureDir()
  const file = path.join(STORE_DIR, FILES[key])
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8')
}

function initSeed() {
  if (read('attractions') === null) write('attractions', seedAttractions)
  if (read('accommodations') === null) write('accommodations', seedAccommodations)
  if (read('events') === null) write('events', seedEvents)
  if (read('gallery') === null) write('gallery', seedGallery)
  if (read('blog') === null) write('blog', seedBlog)
  if (read('messages') === null) write('messages', [])
  if (read('travelInfo') === null) write('travelInfo', {
    transport: 'Buses and minibuses from Kigali. Private hire available.',
    bestTime: 'June-September (dry), March-May (green).',
    safety: 'Rwanda is safe. General travel advice applies.',
    tips: 'Carry water, sunscreen, local currency (RWF).',
  })
  if (read('settings') === null) write('settings', {
    siteName: 'Visit Kirehe',
    contactEmail: 'info@visitkirehe.rw',
    phone: '+250785354935',
    facebook: '',
    twitter: '',
    instagram: '',
    bannerImages: [],
  })
  if (read('analytics') === null) write('analytics', {
    totalVisitors: 0,
    monthlyVisitors: [],
    attractionViews: {},
    hotelViews: {},
  })
}

initSeed()

export default { read, write, FILES }
