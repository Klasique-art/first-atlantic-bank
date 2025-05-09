import React from 'react'

import { Section } from '..'
import Link from 'next/link'

const TourSection = () => {
  return (
    <Section>
        <div className="h-screen flex justify-center items-center flex-col">
            <h1 className='text-6xl font-bold uppercase mb-4' data-aos="zoom-in">Tour Our Platform</h1>
            <p className='mb-8 text-lg' data-aos="fade-up" data-aos-delay="200">Learn how easy it is to use our platform. There's a reason we're #1</p>
            <Link href="/tour" data-aos="fade-up" data-aos-delay="400" className="px-6 py-3 rounded-full bg-primary text-white">Take the tour</Link>
        </div>
    </Section>
  )
}

export default TourSection