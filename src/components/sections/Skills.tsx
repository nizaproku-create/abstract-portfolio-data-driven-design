"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface SkillsProps {
  data: {
    heading: string
    categories: Array<{
      name: string
      items: string[]
    }>
  }
}

export default function Skills({ data }: SkillsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={ref} className="min-h-screen px-6 md:px-12 py-32 relative">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {data.categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-light tracking-wide" style={{ fontWeight: 200 }}>
                {category.name}
              </h3>
              
              <div className="space-y-3">
                {category.items.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, width: 0 }}
                    animate={isInView ? { opacity: 1, width: '100%' } : {}}
                    transition={{ duration: 0.5, delay: index * 0.15 + idx * 0.05 }}
                    className="flex items-center"
                  >
                    <div className="w-2 h-2 bg-foreground mr-4" />
                    <span className="text-lg font-light tracking-wide" style={{ fontWeight: 200 }}>
                      {skill}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Abstract decorative element */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={isInView ? { opacity: 1, rotate: 45 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-20 right-12 w-48 h-48 border border-foreground/10 pointer-events-none hidden md:block"
        />
      </div>
    </section>
  )
}