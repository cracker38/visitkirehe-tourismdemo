import { query } from './connection.js'

function rowToAttraction(r) {
  if (!r) return null
  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    description: r.description,
    shortDescription: r.short_description,
    image: r.image,
    location: r.location,
    category: r.category,
    mapLink: r.map_link,
    coordinates: typeof r.coordinates === 'string' ? JSON.parse(r.coordinates || '[]') : (r.coordinates || []),
  }
}

function rowToAccommodation(r) {
  if (!r) return null
  return {
    id: r.id, name: r.name, location: r.location, description: r.description,
    priceRange: r.price_range, priceMin: r.price_min, priceMax: r.price_max,
    rating: r.rating, image: r.image, contact: r.contact,
  }
}

function rowToGallery(r) {
  return r ? { id: r.id, src: r.src, alt: r.alt, category: r.category } : null
}

function rowToBlog(r) {
  if (!r) return null
  return { id: r.id, title: r.title, excerpt: r.excerpt, content: r.content, author: r.author, image: r.image, date: r.date, slug: r.slug }
}

function rowToMessage(r) {
  if (!r) return null
  return { id: r.id, name: r.name, email: r.email, message: r.message, read: !!r.is_read, date: r.created_at }
}

// Attractions
export async function getAttractions(search = '') {
  let sql = 'SELECT * FROM attractions ORDER BY name'
  const params = []
  if (search) {
    sql = 'SELECT * FROM attractions WHERE name LIKE ? OR description LIKE ? OR location LIKE ? ORDER BY name'
    const term = `%${search}%`
    params.push(term, term, term)
  }
  const rows = await query(sql, params)
  return rows.map(rowToAttraction)
}

export async function getAttractionById(id) {
  const [r] = await query('SELECT * FROM attractions WHERE id = ?', [id])
  return rowToAttraction(r)
}

export async function createAttraction(data) {
  const id = (data.name || 'item').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Date.now()
  const coords = JSON.stringify(data.coordinates || [0, 0])
  await query(
    `INSERT INTO attractions (id, name, slug, description, short_description, image, location, category, map_link, coordinates)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, data.name, id, data.description || null, (data.description || '').slice(0, 80), data.image || null, data.location || null, data.category || null, data.mapLink || null, coords]
  )
  return getAttractionById(id)
}

export async function updateAttraction(id, data) {
  await query(
    `UPDATE attractions SET name=?, description=?, short_description=?, image=?, location=?, category=?, map_link=?, coordinates=? WHERE id=?`,
    [data.name, data.description, (data.description || '').slice(0, 80), data.image, data.location, data.category, data.mapLink, JSON.stringify(data.coordinates || []), id]
  )
  return getAttractionById(id)
}

export async function deleteAttraction(id) {
  await query('DELETE FROM attractions WHERE id = ?', [id])
  return { success: true }
}

// Accommodations
export async function getAccommodations(search = '') {
  let sql = 'SELECT * FROM accommodations ORDER BY name'
  const params = []
  if (search) {
    sql = 'SELECT * FROM accommodations WHERE name LIKE ? OR location LIKE ? ORDER BY name'
    const term = `%${search}%`
    params.push(term, term)
  }
  const rows = await query(sql, params)
  return rows.map(rowToAccommodation)
}

export async function createAccommodation(data) {
  const id = String(Date.now())
  await query(
    `INSERT INTO accommodations (id, name, location, description, price_range, price_min, price_max, rating, image, contact)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, data.name, data.location, data.description, data.priceRange || '$$', data.priceMin || null, data.priceMax || null, data.rating || null, data.image, data.contact]
  )
  const [r] = await query('SELECT * FROM accommodations WHERE id = ?', [id])
  return rowToAccommodation(r)
}

export async function updateAccommodation(id, data) {
  await query(
    `UPDATE accommodations SET name=?, location=?, description=?, price_range=?, price_min=?, price_max=?, rating=?, image=?, contact=? WHERE id=?`,
    [data.name, data.location, data.description, data.priceRange, data.priceMin, data.priceMax, data.rating, data.image, data.contact, id]
  )
  const [r] = await query('SELECT * FROM accommodations WHERE id = ?', [id])
  return rowToAccommodation(r)
}

export async function deleteAccommodation(id) {
  await query('DELETE FROM accommodations WHERE id = ?', [id])
  return { success: true }
}

// Events
export async function getEvents() {
  const rows = await query('SELECT * FROM events ORDER BY date')
  return rows
}

export async function createEvent(data) {
  const id = String(Date.now())
  await query('INSERT INTO events (id, title, date, location, description, image) VALUES (?, ?, ?, ?, ?, ?)', [id, data.title, data.date || null, data.location, data.description, data.image])
  const [r] = await query('SELECT * FROM events WHERE id = ?', [id])
  return r
}

export async function updateEvent(id, data) {
  await query('UPDATE events SET title=?, date=?, location=?, description=?, image=? WHERE id=?', [data.title, data.date, data.location, data.description, data.image, id])
  const [r] = await query('SELECT * FROM events WHERE id = ?', [id])
  return r
}

export async function deleteEvent(id) {
  await query('DELETE FROM events WHERE id = ?', [id])
  return { success: true }
}

// Gallery
export async function getGallery() {
  const rows = await query('SELECT * FROM gallery ORDER BY created_at DESC')
  return rows.map(rowToGallery)
}

export async function createGalleryItem(data) {
  const id = String(Date.now())
  await query('INSERT INTO gallery (id, src, alt, category) VALUES (?, ?, ?, ?)', [id, data.src || data.image, data.alt || 'Image', data.category || 'Nature'])
  const [r] = await query('SELECT * FROM gallery WHERE id = ?', [id])
  return rowToGallery(r)
}

export async function updateGalleryItem(id, data) {
  await query('UPDATE gallery SET src=?, alt=?, category=? WHERE id=?', [data.src || data.image, data.alt || 'Image', data.category || 'Nature', id])
  const [r] = await query('SELECT * FROM gallery WHERE id = ?', [id])
  return rowToGallery(r)
}

export async function deleteGalleryItem(id) {
  await query('DELETE FROM gallery WHERE id = ?', [id])
  return { success: true }
}

// Blog
export async function getBlog() {
  const rows = await query('SELECT * FROM blog ORDER BY date DESC')
  return rows.map(rowToBlog)
}

export async function createBlogPost(data) {
  const id = String(Date.now())
  const slug = (data.title || '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || id
  const excerpt = (data.content || data.excerpt || '').slice(0, 200)
  await query(
    'INSERT INTO blog (id, title, excerpt, content, author, image, date, slug) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [id, data.title, excerpt, data.content || data.excerpt, data.author, data.image, data.date || new Date().toISOString().slice(0, 10), slug]
  )
  const [r] = await query('SELECT * FROM blog WHERE id = ?', [id])
  return rowToBlog(r)
}

export async function updateBlogPost(id, data) {
  await query(
    'UPDATE blog SET title=?, excerpt=?, content=?, author=?, image=?, date=? WHERE id=?',
    [data.title, (data.content || data.excerpt || '').slice(0, 200), data.content || data.excerpt, data.author, data.image, data.date, id]
  )
  const [r] = await query('SELECT * FROM blog WHERE id = ?', [id])
  return rowToBlog(r)
}

export async function deleteBlogPost(id) {
  await query('DELETE FROM blog WHERE id = ?', [id])
  return { success: true }
}

// Travel info
export async function getTravelInfo() {
  const [r] = await query('SELECT * FROM travel_info WHERE id = 1')
  if (!r) return {}
  return { transport: r.transport, bestTime: r.best_time, safety: r.safety, tips: r.tips }
}

export async function updateTravelInfo(data) {
  const current = await getTravelInfo()
  const transport = data.transport ?? current.transport
  const bestTime = data.bestTime ?? current.bestTime
  const safety = data.safety ?? current.safety
  const tips = data.tips ?? current.tips
  await query(
    'INSERT INTO travel_info (id, transport, best_time, safety, tips) VALUES (1, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE transport=VALUES(transport), best_time=VALUES(best_time), safety=VALUES(safety), tips=VALUES(tips)',
    [transport, bestTime, safety, tips]
  )
  return getTravelInfo()
}

// Messages
export async function getMessages() {
  const rows = await query('SELECT * FROM messages ORDER BY created_at DESC')
  return rows.map(rowToMessage)
}

export async function updateMessage(id, data) {
  if (data.read !== undefined) {
    await query('UPDATE messages SET is_read = ? WHERE id = ?', [data.read ? 1 : 0, id])
  }
  const [r] = await query('SELECT * FROM messages WHERE id = ?', [id])
  return rowToMessage(r)
}

export async function createMessage(data) {
  const id = String(Date.now())
  await query('INSERT INTO messages (id, name, email, message) VALUES (?, ?, ?, ?)', [id, data.name, data.email, data.message])
  const [r] = await query('SELECT * FROM messages WHERE id = ?', [id])
  return rowToMessage(r)
}

export async function deleteMessage(id) {
  await query('DELETE FROM messages WHERE id = ?', [id])
  return { success: true }
}

// Settings
export async function getSettings() {
  const [r] = await query('SELECT * FROM settings WHERE id = 1')
  if (!r) return {}
  return {
    siteName: r.site_name,
    contactEmail: r.contact_email,
    phone: r.phone,
    facebook: r.facebook,
    twitter: r.twitter,
    instagram: r.instagram,
    bannerImages: typeof r.banner_images === 'string' ? JSON.parse(r.banner_images || '[]') : (r.banner_images || []),
  }
}

export async function updateSettings(data) {
  const current = await getSettings()
  const merged = {
    siteName: data.siteName ?? current.siteName,
    contactEmail: data.contactEmail ?? current.contactEmail,
    phone: data.phone ?? current.phone,
    facebook: data.facebook ?? current.facebook,
    twitter: data.twitter ?? current.twitter,
    instagram: data.instagram ?? current.instagram,
    bannerImages: data.bannerImages ?? current.bannerImages ?? [],
  }
  const banner = JSON.stringify(merged.bannerImages)
  await query(
    `INSERT INTO settings (id, site_name, contact_email, phone, facebook, twitter, instagram, banner_images)
     VALUES (1, ?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE
     site_name=VALUES(site_name), contact_email=VALUES(contact_email), phone=VALUES(phone),
     facebook=VALUES(facebook), twitter=VALUES(twitter), instagram=VALUES(instagram), banner_images=VALUES(banner_images)`,
    [merged.siteName, merged.contactEmail, merged.phone, merged.facebook, merged.twitter, merged.instagram, banner]
  )
  return getSettings()
}

// Analytics
export async function getAnalytics() {
  const [r] = await query('SELECT * FROM analytics WHERE id = 1')
  if (!r) return { totalVisitors: 0, monthlyVisitors: [], attractionViews: {}, hotelViews: {} }
  return {
    totalVisitors: r.total_visitors || 0,
    monthlyVisitors: typeof r.monthly_visitors === 'string' ? JSON.parse(r.monthly_visitors || '[]') : (r.monthly_visitors || []),
    attractionViews: typeof r.attraction_views === 'string' ? JSON.parse(r.attraction_views || '{}') : (r.attraction_views || {}),
    hotelViews: typeof r.hotel_views === 'string' ? JSON.parse(r.hotel_views || '{}') : (r.hotel_views || {}),
  }
}

// Activities (things to do)
export async function getActivities() {
  const rows = await query('SELECT * FROM activities ORDER BY sort_order, id')
  return rows
}

export async function createActivity(data) {
  const slug = (data.title || 'activity').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const id = (slug || 'activity') + '-' + Date.now()
  await query(
    'INSERT INTO activities (id, title, description, icon, image, sort_order) VALUES (?, ?, ?, ?, ?, ?)',
    [id, data.title, data.description || null, data.icon || '✨', data.image || null, data.sort_order ?? 0]
  )
  const [r] = await query('SELECT * FROM activities WHERE id = ?', [id])
  return r
}

export async function updateActivity(id, data) {
  await query(
    'UPDATE activities SET title=?, description=?, icon=?, image=?, sort_order=? WHERE id=?',
    [data.title, data.description, data.icon || '✨', data.image, data.sort_order ?? 0, id]
  )
  const [r] = await query('SELECT * FROM activities WHERE id = ?', [id])
  return r
}

export async function deleteActivity(id) {
  await query('DELETE FROM activities WHERE id = ?', [id])
  return { success: true }
}

// Testimonials
export async function getTestimonials() {
  const rows = await query('SELECT * FROM testimonials ORDER BY id')
  return rows
}
