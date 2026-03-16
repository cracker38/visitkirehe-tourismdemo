import { Router } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import {
  getAttractions,
  getAttractionById,
  createAttraction,
  updateAttraction,
  deleteAttraction,
  getAccommodations,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getBlog,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getTravelInfo,
  updateTravelInfo,
  getMessages,
  updateMessage,
  createMessage,
  deleteMessage,
  getSettings,
  updateSettings,
  getAnalytics,
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} from '../db/queries.js'
import { login, requireAuth, logout } from '../middleware/auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const router = Router()
const uploadDir = path.join(__dirname, '../uploads')
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname.replace(/\s/g, '-')}`),
})
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } })

router.post('/login', (req, res) => {
  const { email, password } = req.body || {}
  const token = login(email, password)
  if (token) return res.json({ success: true, token })
  res.status(401).json({ error: 'Invalid email or password' })
})

router.post('/logout', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  logout(token)
  res.json({ success: true })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ email: 'elias38@gmail.com', ok: true })
})

router.use(requireAuth)

router.get('/stats', async (req, res) => {
  try {
    const [attractions, accommodations, events, gallery, analytics] = await Promise.all([
      getAttractions(),
      getAccommodations(),
      getEvents(),
      getGallery(),
      getAnalytics(),
    ])
    res.json({
      totalAttractions: attractions.length,
      totalHotels: accommodations.length,
      totalEvents: events.length,
      totalGallery: gallery.length,
      totalVisitors: analytics.totalVisitors || 0,
      monthlyVisitors: analytics.monthlyVisitors || [],
      attractionViews: analytics.attractionViews || {},
      hotelViews: analytics.hotelViews || {},
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/attractions', async (req, res) => {
  try {
    const list = await getAttractions()
    res.json(list)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.post('/attractions', async (req, res) => {
  try {
    const item = await createAttraction(req.body)
    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.put('/attractions/:id', async (req, res) => {
  try {
    const item = await updateAttraction(req.params.id, req.body)
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.delete('/attractions/:id', async (req, res) => {
  try {
    await deleteAttraction(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/accommodations', async (req, res) => {
  try {
    res.json(await getAccommodations())
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.post('/accommodations', async (req, res) => {
  try {
    const item = await createAccommodation(req.body)
    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.put('/accommodations/:id', async (req, res) => {
  try {
    const item = await updateAccommodation(req.params.id, req.body)
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.delete('/accommodations/:id', async (req, res) => {
  try {
    await deleteAccommodation(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/events', async (req, res) => {
  try {
    res.json(await getEvents())
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.post('/events', async (req, res) => {
  try {
    const item = await createEvent(req.body)
    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.put('/events/:id', async (req, res) => {
  try {
    const item = await updateEvent(req.params.id, req.body)
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.delete('/events/:id', async (req, res) => {
  try {
    await deleteEvent(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/gallery', async (req, res) => {
  try {
    res.json(await getGallery())
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.post('/gallery', async (req, res) => {
  try {
    const item = await createGalleryItem(req.body)
    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.put('/gallery/:id', async (req, res) => {
  try {
    const item = await updateGalleryItem(req.params.id, req.body)
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.delete('/gallery/:id', async (req, res) => {
  try {
    await deleteGalleryItem(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/activities', async (req, res) => {
  try {
    res.json(await getActivities())
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.post('/activities', async (req, res) => {
  try {
    const item = await createActivity(req.body)
    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.put('/activities/:id', async (req, res) => {
  try {
    const item = await updateActivity(req.params.id, req.body)
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.delete('/activities/:id', async (req, res) => {
  try {
    await deleteActivity(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/blog', async (req, res) => {
  try {
    res.json(await getBlog())
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.post('/blog', async (req, res) => {
  try {
    const item = await createBlogPost(req.body)
    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.put('/blog/:id', async (req, res) => {
  try {
    const item = await updateBlogPost(req.params.id, req.body)
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.delete('/blog/:id', async (req, res) => {
  try {
    await deleteBlogPost(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/travel-info', async (req, res) => {
  try {
    res.json(await getTravelInfo())
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.put('/travel-info', async (req, res) => {
  try {
    const data = await updateTravelInfo(req.body)
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/messages', async (req, res) => {
  try {
    res.json(await getMessages())
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.patch('/messages/:id', async (req, res) => {
  try {
    const item = await updateMessage(req.params.id, req.body)
    if (!item) return res.status(404).json({ error: 'Not found' })
    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.delete('/messages/:id', async (req, res) => {
  try {
    await deleteMessage(req.params.id)
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.get('/settings', async (req, res) => {
  try {
    res.json(await getSettings())
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})
router.put('/settings', async (req, res) => {
  try {
    const data = await updateSettings(req.body)
    res.json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' })
  const url = `/uploads/${req.file.filename}`
  res.json({ url })
})

export default router
