import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const steps = [
  { title: 'Choose your interests', desc: 'Nature, culture, wildlife, or relaxation', to: '/things-to-do', label: 'Things to Do' },
  { title: 'Pick places to visit', desc: 'Lake Nasho, Rusumo Falls, Akagera, and more', to: '/places-to-visit', label: 'Places to Visit' },
  { title: 'Find accommodation', desc: 'Hotels and guesthouses for every budget', to: '/accommodation', label: 'Accommodation' },
  { title: 'Check events', desc: 'Festivals and cultural events during your stay', to: '/events', label: 'Events & Culture' },
  { title: 'Read travel info', desc: 'How to get there, when to visit, what to pack', to: '/travel-info', label: 'Travel Info' },
  { title: 'Get in touch', desc: 'Ask questions or request a custom itinerary', to: '/contact', label: 'Contact Us' },
]

export default function PlanTripPage() {
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
            Plan Your Trip
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/95 max-w-2xl mx-auto"
          >
            Everything you need to plan an unforgettable visit to Kirehe
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-center text-gray-600 mb-12">
            Follow these steps to plan your journey to Kirehe District. Each link takes you to detailed information and booking options.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.to}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  to={step.to}
                  className="block glass rounded-xl p-6 card-hover h-full group"
                >
                  <span className="text-2xl text-nature font-bold opacity-80">0{i + 1}</span>
                  <h3 className="text-xl font-semibold text-nature mt-2 group-hover:underline">{step.title}</h3>
                  <p className="text-gray-600 mt-2">{step.desc}</p>
                  <span className="inline-block mt-4 text-lake-blue font-medium group-hover:underline">
                    {step.label} →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/contact" className="btn-primary inline-block">
              Contact Us for Custom Itineraries
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
