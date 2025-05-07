import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const Timeline = ({ image, heading, description, reverse = false }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3, // trigger when 30% of the element is visible
  })

  // Animation variant
  const imageVariants = {
    hidden: {
      x: reverse ? 100 : -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section className="w-full py-12 px-4 md:px-12 bg-accent">
      <div
        ref={ref}
        className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
          reverse ? 'md:flex-row-reverse' : ''
        }`}
      >
        {/* Image */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="w-full md:w-1/2 hover:scale-105 transition duration-300 ease-in-out"
        >
          <img
            src={image}
            alt={heading}
            className="w-full h-auto rounded-2xl shadow-xl object-cover"
          />
        </motion.div>

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
