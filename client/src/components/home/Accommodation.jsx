import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function StarRating({ rating }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <div className="flex gap-0.5 text-sunshine">
      {[...Array(5)].map((_, i) => (
        <span key={i}>
          {i < full ? '★' : i === full && half ? '★' : '☆'}
        </span>
      ))}
    </div>
  )
}

export default function Accommodation({ accommodations }) {
  if (!accommodations?.length) return null

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Accommodation</h2>
          <p className="section-subtitle">
            Stay in comfort—hotels and guesthouses for every budget across Kirehe.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accommodations.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl overflow-hidden shadow-soft card-hover bg-white"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-nature text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                  <span>📍</span> {item.location}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <StarRating rating={item.rating} />
                  <span className="text-gray-600 font-medium">{item.priceRange}</span>
                </div>
                <Link
                  to="/accommodation"
                  className="mt-4 btn-primary inline-block text-center text-sm py-2 w-full"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/accommodation" className="btn-primary inline-block">
            See All Accommodation
          </Link>
        </div>
      </div>
    </section>
  )
}
