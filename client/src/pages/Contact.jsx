import { useState } from 'react'
import { motion } from 'framer-motion'
import { apiUrl } from '../api/apiUrl'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/95 max-w-2xl mx-auto"
          >
            Get in touch for travel advice and partnerships
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="section-title text-left">Get in Touch</h2>
              <p className="text-gray-600">
                Have questions about visiting Kirehe? Want to partner with us or feature your business?
                Send us a message and we&apos;ll get back to you soon.
              </p>
              <div className="text-gray-600">
                <p><strong className="text-nature">Address:</strong> Kirehe District, Eastern Province, Rwanda</p>
                <p className="mt-2"><strong className="text-nature">Email:</strong> info@visitkirehe.rw</p>
                <p className="mt-2"><strong className="text-nature">Phone:</strong> +250785354935</p>
              </div>
              <div className="pt-4 rounded-xl overflow-hidden bg-gray-100">
                <iframe
                  title="Kirehe District, Rwanda"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.1!2d30.6!3d-2.2!2m3!1f0!2f0!3f0!3m2!1sen!2srw!4v1"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-xl p-6 md:p-8"
            >
              <h3 className="text-xl font-semibold text-nature mb-4">Send a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-lake-blue focus:border-lake-blue"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-lake-blue focus:border-lake-blue"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-lake-blue focus:border-lake-blue"
                  />
                </div>
                {status === 'success' && (
                  <p className="text-green-600 font-medium">Thank you! We&apos;ll get back to you soon.</p>
                )}
                {status === 'error' && (
                  <p className="text-red-600">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
