"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface ContactProps {
  data: {
    heading: string
    description: string
    email: string
    social: Array<{
      platform: string
      url: string
    }>
  }
}

export default function Contact({ data }: ContactProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" ref={ref} className="min-h-screen flex items-center px-6 md:px-12 py-32 relative">
      <div className="max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <h2 className="text-5xl md:text-8xl font-extralight tracking-tight" style={{ fontWeight: 100 }}>
            {data.heading}
          </h2>

          <div className="max-w-3xl space-y-8 ml-0 md:ml-16">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-muted-foreground" style={{ fontWeight: 200 }}>
              {data.description}
            </p>

            <motion.a
              href={`mailto:${data.email}`}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block text-3xl md:text-5xl font-light tracking-tight hover:text-muted-foreground transition-colors duration-300 group"
              style={{ fontWeight: 200 }}
            >
              <span className="inline-block group-hover:translate-x-4 transition-transform duration-300">
                {data.email}
              </span>
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-6 pt-8"
            >
              {data.social.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border border-foreground/20 font-light tracking-wide hover:bg-foreground hover:text-background transition-all duration-300 hover:scale-105"
                  style={{ fontWeight: 300 }}
                >
                  {link.platform}
                </a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Abstract decorative elements */}
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={isInView ? { opacity: 1, rotate: 45 } : {}}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="absolute top-1/4 right-8 md:right-32 w-40 h-40 border border-foreground/10 pointer-events-none hidden md:block"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.9 }}
          className="absolute bottom-1/4 left-8 md:left-24 w-24 h-24 rounded-full border border-foreground/20 pointer-events-none hidden md:block"
        />
      </div>
    </section>
  )
}