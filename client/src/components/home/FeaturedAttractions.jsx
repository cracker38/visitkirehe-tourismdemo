import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function FeaturedAttractions({ attractions }) {
  if (!attractions?.length) return null

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Featured Attractions</h2>
          <p className="section-subtitle">
            From serene lakes to powerful waterfalls and wildlife—discover the best of Kirehe.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {attractions.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/places-to-visit#${item.id}`}
                className="block group rounded-xl overflow-hidden shadow-soft card-hover bg-white"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-nature text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{item.shortDescription}</p>
                  <span className="inline-block mt-3 text-lake-blue font-medium text-sm group-hover:underline">
                    Learn More →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/places-to-visit" className="btn-primary inline-block">
            View All Places
          </Link>
        </div>
      </div>
    </section>
  )
}
