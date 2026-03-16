import { motion } from 'framer-motion'

export default function About() {
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
            About Kirehe
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/95 max-w-2xl mx-auto"
          >
            Discover the district at the heart of Eastern Rwanda
          </motion.p>
        </div>
      </section>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <h2 className="section-title text-left">Welcome to Kirehe</h2>
            <p className="text-gray-600">
              Kirehe is a district in the Eastern Province of Rwanda, known for its stunning landscapes,
              serene lakes, and rich culture. From the powerful Rusumo Falls on the Kagera River to the
              peaceful shores of Lake Nasho, and the rolling hills of Mahama, Kirehe offers travelers
              an authentic glimpse of Rwanda beyond the capital.
            </p>
            <p className="text-gray-600">
              The district is also a gateway to Akagera National Park, Rwanda&apos;s only savanna park,
              making it an ideal base for wildlife and nature enthusiasts. Local communities welcome
              visitors with traditional dance, cuisine, and village tourism experiences that create
              lasting memories.
            </p>
            <h3 className="text-xl font-semibold text-nature mt-8">Our Mission</h3>
            <p className="text-gray-600">
              Visit Kirehe aims to promote sustainable tourism in the district by showcasing its
              natural beauty, culture, and hospitality. We connect travelers with local businesses,
              guides, and experiences while supporting community development.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
