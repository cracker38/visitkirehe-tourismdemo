import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Map from '../components/Map'

const API = '/api'

export default function PlacesToVisit() {
  const [attractions, setAttractions] = useState([])
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    fetch(`${API}/attractions`).then((r) => r.json()).then((data) => {
      setAttractions(data)
      setFiltered(data)
    })
  }, [])

  useEffect(() => {
    if (!search.trim()) {
      setFiltered(attractions)
      return
    }
    const q = search.toLowerCase()
    setFiltered(attractions.filter((a) =>
      a.name.toLowerCase().includes(q) ||
      (a.description && a.description.toLowerCase().includes(q)) ||
      (a.location && a.location.toLowerCase().includes(q))
    ))
  }, [search, attractions])

  return (
    <div>
      <section className="relative py-24 bg-gray-50">
        <div className="absolute inset-0 bg-hero-pattern opacity-90" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Places to Visit
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/95 max-w-2xl mx-auto"
          >
            Lakes, falls, wildlife, and landscapes
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto mb-8">
            <label htmlFor="search-attractions" className="sr-only">Search attractions</label>
            <input
              id="search-attractions"
              type="search"
              placeholder="Search attractions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-lake-blue focus:border-lake-blue"
            />
          </div>

          <div className="mb-12">
            <h2 className="section-title text-left mb-4">Interactive Map</h2>
            <Map attractions={attractions} />
          </div>

          <h2 className="section-title text-left mb-6">All Attractions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                id={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden shadow-soft card-hover bg-white flex flex-col md:flex-row"
              >
                <div className="md:w-72 flex-shrink-0 aspect-video md:aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1">
                  <span className="text-lake-blue font-medium text-sm">{item.category}</span>
                  <h3 className="text-xl font-semibold text-nature mt-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">📍 {item.location}</p>
                  <p className="text-gray-600 mt-3">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-12">No attractions match your search.</p>
          )}
        </div>
      </section>
    </div>
  )
}
