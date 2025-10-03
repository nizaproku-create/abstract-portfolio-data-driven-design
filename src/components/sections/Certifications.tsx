"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface CertificationsProps {
  data: {
    heading: string
    items: Array<{
      name: string
      issuer: string
      date: string
      credential: string
    }>
  }
}

export default function Certifications({ data }: CertificationsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="certifications" ref={ref} className="min-h-screen px-6 md:px-12 py-32 relative">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-foreground/10 p-8 hover:border-foreground/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="text-xs font-light tracking-widest text-muted-foreground uppercase" style={{ fontWeight: 300 }}>
                  {cert.date}
                </div>

                <h3 className="text-xl md:text-2xl font-light tracking-tight group-hover:text-foreground/80 transition-colors" style={{ fontWeight: 200 }}>
                  {cert.name}
                </h3>

                <p className="text-base font-light text-muted-foreground" style={{ fontWeight: 200 }}>
                  {cert.issuer}
                </p>

                <div className="pt-2 border-t border-foreground/10">
                  <p className="text-xs font-light text-muted-foreground font-mono" style={{ fontWeight: 300 }}>
                    {cert.credential}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}