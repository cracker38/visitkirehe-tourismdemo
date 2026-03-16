import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { apiUrl, resolveMediaUrl } from '../api/apiUrl'

function StarRating({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <div className="flex gap-0.5 text-sunshine">
      {[...Array(5)].map((_, i) => (
        <span key={i}>{i < full ? '★' : i === full && half ? '★' : '☆'}</span>
      ))}
    </div>
  )
}

export default function AccommodationPage() {
  const [accommodations, setAccommodations] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(apiUrl('/api/accommodations')).then((r) => r.json()).then(setAccommodations)
  }, [])

  const filtered = search.trim()
    ? accommodations.filter(
        (a) =>
          a.name.toLowerCase().includes(search.toLowerCase()) ||
          a.location.toLowerCase().includes(search.toLowerCase())
      )
    : accommodations

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
            Accommodation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/95 max-w-2xl mx-auto"
          >
            Hotels and guesthouses for every budget
          </motion.p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto mb-10">
            <label htmlFor="search-accommodation" className="sr-only">Search accommodation</label>
            <input
              id="search-accommodation"
              type="search"
              placeholder="Search by name or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-lake-blue focus:border-lake-blue"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl overflow-hidden shadow-soft card-hover bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={resolveMediaUrl(item.image)}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-nature text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                    📍 {item.location}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <StarRating rating={item.rating} />
                    <span className="text-gray-600 font-medium">{item.priceRange}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{item.description}</p>
                  <button type="button" className="mt-4 btn-primary w-full text-sm py-2">
                    View Details / Book
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-gray-500 py-12">No accommodation matches your search.</p>
          )}
        </div>
      </section>
    </div>
  )
}
