const rawBase = import.meta.env?.VITE_API_BASE_URL || ''

export const API_BASE_URL = rawBase.replace(/\/+$/, '')

export function apiUrl(path) {
  if (!path) return API_BASE_URL
  const p = path.startsWith('/') ? path : `/${path}`
  return `${API_BASE_URL}${p}`
}

export function resolveMediaUrl(url) {
  if (!url) return ''
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  if (url.startsWith('/uploads/')) return apiUrl(url)
  return url
}


