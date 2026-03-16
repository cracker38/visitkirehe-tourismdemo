import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function GallerySection({ images }) {
  if (!images?.length) return null

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="section-title">Image Gallery</h2>
          <p className="section-subtitle">
            Landscapes, culture, markets, lakes, and people—glimpses of Kirehe.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.slice(0, 6).map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square overflow-hidden rounded-lg group"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/gallery" className="btn-secondary inline-block">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  )
}
