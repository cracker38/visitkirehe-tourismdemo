import { motion } from 'framer-motion'

const sections = [
  {
    title: 'How to Reach Kirehe',
    content: 'Kirehe is in the Eastern Province of Rwanda. From Kigali, take the road via Kayonza or Nyagatare. The journey is approximately 3–4 hours by car. Road conditions are generally good, especially during the dry season.',
  },
  {
    title: 'Transport from Kigali',
    content: 'Regular buses and minibuses run from Kigali to Kirehe and nearby towns. Private hire (taxi) and organized tours are also available. For Akagera National Park visits, many safari operators offer combined Kirehe–Akagera packages.',
  },
  {
    title: 'Best Time to Visit',
    content: 'Dry season (June–September) is ideal for wildlife viewing, road travel, and outdoor activities. Green season (March–May) offers lush landscapes and fewer tourists. Year-round, Kirehe has a pleasant climate with warm days and cooler evenings.',
  },
  {
    title: 'Safety Tips',
    content: 'Rwanda is one of the safest countries in Africa. General travel advice: carry water and sunscreen, use local currency (RWF), and respect local customs. For nature activities, follow guide instructions and stay on designated paths.',
  },
  {
    title: 'What to Pack',
    content: 'Light clothing, a jacket for evenings, comfortable walking shoes, hat, sunscreen, insect repellent, and a camera. If visiting Akagera or doing boat rides, bring binoculars for bird and wildlife watching.',
  },
]

export default function TravelInfoPage() {
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
            Travel Information
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/95 max-w-2xl mx-auto"
          >
            Practical tips for your trip to Kirehe
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass rounded-xl p-6 md:p-8"
              >
                <h2 className="text-xl font-semibold text-nature mb-3">{section.title}</h2>
                <p className="text-gray-600">{section.content}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
