import axios from 'axios'

const baseURL = '/api/admin'

function getToken() {
  return localStorage.getItem('adminToken')
}

function api() {
  const token = getToken()
  const client = axios.create({
    baseURL,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  })
  client.interceptors.response.use(
    (r) => r,
    (err) => {
      if (err.response?.status === 401 && err.config?.url !== '/login') {
        localStorage.removeItem('adminToken')
        window.location.href = '/admin/login'
      }
      return Promise.reject(err)
    }
  )
  return client
}

export async function login(email, password) {
  const { data } = await axios.post(baseURL + '/login', { email, password })
  if (data.token) localStorage.setItem('adminToken', data.token)
  return data
}

export async function logout() {
  try {
    await api().post('/logout')
  } catch (_) {}
  localStorage.removeItem('adminToken')
}

export async function getMe() {
  const { data } = await api().get('/me')
  return data
}

export async function getStats() {
  const { data } = await api().get('/stats')
  return data
}

// Attractions
export const attractionsApi = {
  list: () => api().get('/attractions').then(r => r.data),
  create: (body) => api().post('/attractions', body).then(r => r.data),
  update: (id, body) => api().put(`/attractions/${id}`, body).then(r => r.data),
  delete: (id) => api().delete(`/attractions/${id}`).then(r => r.data),
}

// Accommodations
export const accommodationsApi = {
  list: () => api().get('/accommodations').then(r => r.data),
  create: (body) => api().post('/accommodations', body).then(r => r.data),
  update: (id, body) => api().put(`/accommodations/${id}`, body).then(r => r.data),
  delete: (id) => api().delete(`/accommodations/${id}`).then(r => r.data),
}

// Events
export const eventsApi = {
  list: () => api().get('/events').then(r => r.data),
  create: (body) => api().post('/events', body).then(r => r.data),
  update: (id, body) => api().put(`/events/${id}`, body).then(r => r.data),
  delete: (id) => api().delete(`/events/${id}`).then(r => r.data),
}

// Activities (Things To Do)
export const activitiesApi = {
  list: () => api().get('/activities').then(r => r.data),
  create: (body) => api().post('/activities', body).then(r => r.data),
  update: (id, body) => api().put(`/activities/${id}`, body).then(r => r.data),
  delete: (id) => api().delete(`/activities/${id}`).then(r => r.data),
}

// Gallery
export const galleryApi = {
  list: () => api().get('/gallery').then(r => r.data),
  create: (body) => api().post('/gallery', body).then(r => r.data),
  update: (id, body) => api().put(`/gallery/${id}`, body).then(r => r.data),
  delete: (id) => api().delete(`/gallery/${id}`).then(r => r.data),
}

// Blog
export const blogApi = {
  list: () => api().get('/blog').then(r => r.data),
  create: (body) => api().post('/blog', body).then(r => r.data),
  update: (id, body) => api().put(`/blog/${id}`, body).then(r => r.data),
  delete: (id) => api().delete(`/blog/${id}`).then(r => r.data),
}

// Travel info
export const travelInfoApi = {
  get: () => api().get('/travel-info').then(r => r.data),
  update: (body) => api().put('/travel-info', body).then(r => r.data),
}

// Messages
export const messagesApi = {
  list: () => api().get('/messages').then(r => r.data),
  update: (id, body) => api().patch(`/messages/${id}`, body).then(r => r.data),
  delete: (id) => api().delete(`/messages/${id}`).then(r => r.data),
}

// Settings
export const settingsApi = {
  get: () => api().get('/settings').then(r => r.data),
  update: (body) => api().put('/settings', body).then(r => r.data),
}

// Upload
export async function uploadFile(file) {
  const form = new FormData()
  form.append('file', file)
  const { data } = await api().post('/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } })
  return data.url
}

export function isAuthenticated() {
  return !!getToken()
}
