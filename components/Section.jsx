import React from 'react'

const Section = ({children}) => {
  return (
    <section className='bg-accent py-6'>
        <div className="section-wrapper">
            {children}
        </div>
    </section>
  )
}

export default Section