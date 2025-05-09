import React from 'react'

const Section = ({children}) => {
  return (
    <section className='bg-accent py-6'>
        <div className="max-w-6xl mx-auto">
            {children}
        </div>
    </section>
  )
}

export default Section