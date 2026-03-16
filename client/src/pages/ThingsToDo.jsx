import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { apiUrl, resolveMediaUrl } from '../api/apiUrl'

export default function ThingsToDoPage() {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    fetch(apiUrl('/api/activities')).then((r) => r.json()).then(setActivities)
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
            Things To Do
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/95 max-w-2xl mx-auto"
          >
            Nature, culture, boat rides, markets, and more
          </motion.p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-xl overflow-hidden shadow-soft card-hover bg-white"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={resolveMediaUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-3xl mb-2 block">{item.icon}</span>
                  <h2 className="text-xl font-semibold text-nature">{item.title}</h2>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
