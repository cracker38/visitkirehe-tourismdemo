import { useEffect, useRef } from 'react'
import L from 'leaflet'

// Fix default marker icon in React/Webpack
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

export default function Map({ attractions = [], center = [-2.2, 30.6], zoom = 10 }) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  useEffect(() => {
    if (!mapRef.current) return
    mapInstance.current = L.map(mapRef.current).setView(center, zoom)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstance.current)
    return () => {
      mapInstance.current?.remove()
      mapInstance.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapInstance.current || !attractions.length) return
    const markers = []
    attractions.forEach((a) => {
      if (a.coordinates && a.coordinates.length === 2) {
        const m = L.marker([a.coordinates[0], a.coordinates[1]])
          .bindPopup(`<strong>${a.name}</strong><br/>${a.shortDescription || ''}`)
          .addTo(mapInstance.current)
        markers.push(m)
      }
    })
    return () => markers.forEach((m) => m.remove())
  }, [attractions])

  return (
    <div
      ref={mapRef}
      className="w-full h-[400px] rounded-xl overflow-hidden shadow-soft z-0"
      style={{ minHeight: '300px' }}
    />
  )
}
