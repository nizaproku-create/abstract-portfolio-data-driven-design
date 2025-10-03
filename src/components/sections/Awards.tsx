"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface AwardsProps {
  data: {
    heading: string
    items: Array<{
      title: string
      organization: string
      year: string
      project: string
    }>
  }
}

export default function Awards({ data }: AwardsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="awards" ref={ref} className="min-h-screen px-6 md:px-12 py-32 relative">
      <div className="max-w-7xl w-full mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extralight tracking-tight mb-20"
          style={{ fontWeight: 100 }}
        >
          {data.heading}
        </motion.h2>

        <div className="space-y-8">
          {data.items.map((award, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="border-l-2 border-foreground/20 pl-8 py-6 hover:border-foreground transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <h3 className="text-2xl md:text-3xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300" style={{ fontWeight: 200 }}>
                    {award.title}
                  </h3>
                  <p className="text-lg font-light text-muted-foreground" style={{ fontWeight: 200 }}>
                    {award.organization}
                  </p>
                  <p className="text-sm font-light text-muted-foreground italic" style={{ fontWeight: 300 }}>
                    Project: {award.project}
                  </p>
                </div>
                
                <div className="text-3xl md:text-4xl font-extralight text-muted-foreground" style={{ fontWeight: 100 }}>
                  {award.year}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Abstract element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-20 right-12 w-32 h-32 rounded-full border border-foreground/10 pointer-events-none hidden md:block"
        />
      </div>
    </section>
  )
}