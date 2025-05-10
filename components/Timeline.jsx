import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useInView } from 'react-intersection-observer'

const Timeline = ({ image, heading, description, reverse = false }) => {
  const imageRef = useRef(null)
  const hasExploded = useRef(false)
  const [hideImage, setHideImage] = useState(false)

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  useEffect(() => {
    const handleScrollEvent = () => {
      if (!hasExploded.current && imageRef.current) {
        const rect = imageRef.current.getBoundingClientRect()
        const imageHeight = rect.height
        const visibleHeight =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)

        // Check if at least half of the image is visible
        const halfVisible = visibleHeight >= imageHeight / 2

        if (halfVisible) {
          const x = (rect.left + rect.width / 2) / window.innerWidth
          const y = (rect.top + rect.height / 2) / window.innerHeight

          confetti({
            particleCount: 150,
            spread: 80,
            origin: { x, y },
          })

          hasExploded.current = true
          setHideImage(true)
        }
      }
    }

    window.addEventListener('scroll', handleScrollEvent)
    return () => window.removeEventListener('scroll', handleScrollEvent)
  }, [])

  return (
    <section className="w-full py-12 px-4 md:px-12 bg-accent">
      <div
        ref={ref}
        className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
          reverse ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Image */}
        {!hideImage && (
          <motion.div
            ref={imageRef}
            initial={{ opacity: 1, scale: 1 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full md:w-1/2 hover:scale-105 transition duration-300 ease-in-out"
          >
            <img
              src={image}
              alt={heading}
              className="w-full h-auto rounded-2xl shadow-xl object-cover"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full md:w-1/2 space-y-4 text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 dark:text-white">
            {heading}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Timeline
