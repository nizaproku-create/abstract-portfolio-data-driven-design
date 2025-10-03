"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface AboutProps {
  data: {
    heading: string
    description: string
    stats: Array<{
      label: string
      value: string
    }>
  }
}

export default function About({ data }: AboutProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} className="min-h-screen flex items-center px-6 md:px-12 py-32 relative">
      <div className="max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start"
        >
          <div className="space-y-8">
            <h2 className="text-5xl md:text-7xl font-extralight tracking-tight" style={{ fontWeight: 100 }}>
              {data.heading}
            </h2>
            <p className="text-lg md:text-xl font-light leading-relaxed text-muted-foreground" style={{ fontWeight: 200 }}>
              {data.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:mt-16">
            {data.stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 border border-foreground/10 hover:border-foreground/30 transition-all duration-300"
              >
                <div className="text-4xl md:text-5xl font-extralight mb-2" style={{ fontWeight: 100 }}>
                  {stat.value}
                </div>
                <div className="text-sm font-light tracking-wide text-muted-foreground" style={{ fontWeight: 300 }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Abstract element */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute -left-8 top-1/2 w-64 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
        />
      </div>
    </section>
  )
}