import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden
      >
        <source src="/kirehe.mp4" type="video/mp4" />
      </video>
      {/* Lighter overlay so the video is clearly visible; text stays readable */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(27, 94, 32, 0.35) 0%, rgba(2, 136, 209, 0.3) 100%)',
        }}
      />
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          Discover the Beauty of Kirehe District Yacu neza
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)]"
        >
          Explore lakes, culture, nature, and authentic Rwandan experiences in the heart of Eastern Rwanda.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/places-to-visit" className="btn-accent inline-block text-center">
            Explore Attractions
          </Link>
          <Link to="/plan-your-trip" className="bg-white text-nature hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all duration-300 inline-block text-center">
            Plan Your Trip
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
