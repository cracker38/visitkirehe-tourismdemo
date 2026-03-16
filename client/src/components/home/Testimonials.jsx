import { motion } from 'framer-motion'

function StarRating({ n }) {
  return (
    <div className="flex gap-0.5 text-sunshine text-sm">
      {[...Array(5)].map((_, i) => (i < n ? '★' : '☆'))}
    </div>
  )
}

export default function Testimonials({ testimonials }) {
  if (!testimonials?.length) return null

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">What Travelers Say</h2>
          <p className="section-subtitle">
            Real experiences from visitors who explored Kirehe.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 card-hover"
            >
              <StarRating n={t.rating} />
              <p className="text-gray-700 mt-3 italic">"{t.text}"</p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-nature">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
