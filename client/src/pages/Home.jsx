import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { apiUrl } from '../api/apiUrl'
import Hero from '../components/home/Hero'
import FeaturedAttractions from '../components/home/FeaturedAttractions'
import ThingsToDo from '../components/home/ThingsToDo'
import Accommodation from '../components/home/Accommodation'
import CulturalExperiences from '../components/home/CulturalExperiences'
import TravelInfo from '../components/home/TravelInfoSection'
import Gallery from '../components/home/GallerySection'
import Events from '../components/home/EventsSection'
import Testimonials from '../components/home/Testimonials'
import CTA from '../components/home/CTA'

export default function Home() {
  const [attractions, setAttractions] = useState([])
  const [accommodations, setAccommodations] = useState([])
  const [activities, setActivities] = useState([])
  const [events, setEvents] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [gallery, setGallery] = useState([])

  useEffect(() => {
    Promise.all([
      fetch(apiUrl('/api/attractions')).then((r) => r.json()),
      fetch(apiUrl('/api/accommodations')).then((r) => r.json()),
      fetch(apiUrl('/api/activities')).then((r) => r.json()),
      fetch(apiUrl('/api/events')).then((r) => r.json()),
      fetch(apiUrl('/api/testimonials')).then((r) => r.json()),
      fetch(apiUrl('/api/gallery')).then((r) => r.json()),
    ]).then(([a, acc, act, e, t, g]) => {
      setAttractions(a)
      setAccommodations(acc)
      setActivities(act)
      setEvents(e)
      setTestimonials(t)
      setGallery(g)
    })
  }, [])

  return (
    <>
      <Hero />
      <FeaturedAttractions attractions={attractions} />
      <ThingsToDo activities={activities} />
      <Accommodation accommodations={accommodations} />
      <CulturalExperiences />
      <TravelInfo />
      <Gallery images={gallery} />
      <Events events={events} />
      <Testimonials testimonials={testimonials} />
      <CTA />
    </>
  )
}
