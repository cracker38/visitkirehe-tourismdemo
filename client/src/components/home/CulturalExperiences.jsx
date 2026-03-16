import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const items = [
  { title: 'Traditional Dance', desc: 'Intore and other Rwandan dances', icon: '💃', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600' },
  { title: 'Local Cuisine', desc: 'Brochettes, ugali, and fresh produce', icon: '🍽️', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600' },
  { title: 'Festivals', desc: 'Umuganura and community celebrations', icon: '🎉', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600' },
  { title: 'Community Tourism', desc: 'Village visits and homestays', icon: '🏠', image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600' },
]

export default function CulturalExperiences() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Cultural Experiences</h2>
          <p className="section-subtitle">
            Traditional dance, food, festivals, and community tourism—experience the soul of Kirehe.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-xl overflow-hidden shadow-soft card-hover bg-white"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 text-2xl bg-white/90 rounded-lg px-2 shadow">
                  {item.icon}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-nature text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/events" className="btn-secondary inline-block">
            Events & Festivals
          </Link>
        </div>
      </div>
    </section>
  )
}
