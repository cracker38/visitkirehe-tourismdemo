import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { apiUrl, resolveMediaUrl } from '../api/apiUrl'

function formatDate(s) {
  if (!s) return ''
  return new Date(s).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function EventsPage() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetch(apiUrl('/api/events')).then((r) => r.json()).then(setEvents)
  }, [])

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
            Events & Culture
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/95 max-w-2xl mx-auto"
          >
            Festivals and community celebrations
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, i) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl overflow-hidden shadow-soft card-hover bg-white flex flex-col md:flex-row"
              >
                <div className="md:w-64 flex-shrink-0 aspect-video md:aspect-square overflow-hidden">
                  <img
                    src={resolveMediaUrl(event.image)}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex-1">
                  <span className="text-lake-blue font-medium">{formatDate(event.date)}</span>
                  <h2 className="text-xl font-semibold text-nature mt-1">{event.title}</h2>
                  <p className="text-gray-500 text-sm mt-1">📍 {event.location}</p>
                  <p className="text-gray-600 mt-3">{event.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
