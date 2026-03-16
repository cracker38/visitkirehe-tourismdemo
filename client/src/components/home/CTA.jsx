import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CTA() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920)`,
        }}
      />
      <div className="absolute inset-0 bg-nature/90" />
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Ready to Explore Kirehe?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg text-white/95 mb-8 max-w-xl mx-auto"
        >
          Plan your trip, discover attractions, and experience the beauty of Eastern Rwanda.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/plan-your-trip"
            className="bg-sunshine text-nature-dark hover:bg-sunshine-dark font-semibold py-3 px-8 rounded-lg transition-all inline-block"
          >
            Plan Your Trip
          </Link>
          <Link
            to="/contact"
            className="border-2 border-white text-white hover:bg-white hover:text-nature font-semibold py-3 px-8 rounded-lg transition-all inline-block"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
