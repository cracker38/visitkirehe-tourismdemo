import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const tips = [
  { title: 'How to reach Kirehe', text: 'From Kigali via Nyagatare or Kayonza. Road conditions are good; 3–4 hours by car.' },
  { title: 'Transport from Kigali', text: 'Buses and minibuses run daily. Private hire and tour operators also available.' },
  { title: 'Best time to visit', text: 'Dry season (June–September) for wildlife and roads; green season (March–May) for lush landscapes.' },
  { title: 'Safety tips', text: 'Rwanda is safe; follow general travel advice. Carry water, sunscreen, and local currency.' },
]

export default function TravelInfoSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Travel Information</h2>
          <p className="section-subtitle">
            Practical tips to plan your journey to Kirehe and Eastern Rwanda.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tips.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-6 card-hover"
            >
              <h3 className="font-semibold text-nature text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/travel-info" className="btn-primary inline-block">
            Full Travel Guide
          </Link>
        </div>
      </div>
    </section>
  )
}
