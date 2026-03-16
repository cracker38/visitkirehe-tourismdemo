import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { resolveMediaUrl } from '../../api/apiUrl'

export default function ThingsToDo({ activities }) {
  if (!activities?.length) return null

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Things To Do</h2>
          <p className="section-subtitle">
            Nature exploration, cultural experiences, boat rides, and more—something for every traveler.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to="/things-to-do"
                className="block group rounded-xl overflow-hidden shadow-soft card-hover bg-white border border-gray-100"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={resolveMediaUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 text-3xl bg-white/90 rounded-lg p-2 shadow">
                    {item.icon}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-nature text-lg mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/things-to-do" className="btn-secondary inline-block">
            Explore Activities
          </Link>
        </div>
      </div>
    </section>
  )
}
