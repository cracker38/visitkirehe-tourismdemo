import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { apiUrl, resolveMediaUrl } from '../api/apiUrl'

function formatDate(s) {
  if (!s) return ''
  return new Date(s).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export default function BlogPage() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch(apiUrl('/api/blog')).then((r) => r.json()).then(setPosts)
  }, [])

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
            Travel Stories & Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/95 max-w-2xl mx-auto"
          >
            Tips, guides, and stories from Kirehe
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl overflow-hidden shadow-soft card-hover bg-white"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={resolveMediaUrl(post.image)}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="text-lake-blue text-sm font-medium">{formatDate(post.date)}</span>
                  <h2 className="text-xl font-semibold text-nature mt-2">{post.title}</h2>
                  <p className="text-gray-600 mt-2 line-clamp-3">{post.excerpt}</p>
                  <p className="text-gray-500 text-sm mt-2">By {post.author}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
