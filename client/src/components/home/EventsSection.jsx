import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function formatDate(s) {
  if (!s) return ''
  const d = new Date(s)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function EventsSection({ events }) {
  if (!events?.length) return null

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Events & Festivals</h2>
          <p className="section-subtitle">
            Upcoming events and community celebrations in Kirehe.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.slice(0, 4).map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl overflow-hidden shadow-soft card-hover bg-white flex flex-col md:flex-row"
            >
              <div className="md:w-48 flex-shrink-0 aspect-video md:aspect-square overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex-1">
                <span className="text-lake-blue font-medium text-sm">{formatDate(event.date)}</span>
                <h3 className="font-semibold text-nature text-lg mt-1">{event.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{event.location}</p>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/events" className="btn-primary inline-block">
            All Events
          </Link>
        </div>
      </div>
    </section>
  )
}
