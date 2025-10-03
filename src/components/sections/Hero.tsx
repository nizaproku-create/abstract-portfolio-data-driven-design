"use client"

import { motion } from 'framer-motion'

interface HeroProps {
  data: {
    name: string
    title: string
    tagline: string
    cta: {
      primary: string
      secondary: string
    }
  }
}

export default function Hero({ data }: HeroProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative px-6 md:px-12">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="space-y-8"
        >
          <motion.h1 
            className="text-7xl md:text-9xl font-extralight tracking-tight leading-none"
            style={{ fontWeight: 100 }}
          >
            {data.name}
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="ml-0 md:ml-32"
          >
            <h2 className="text-2xl md:text-4xl font-light tracking-wide" style={{ fontWeight: 200 }}>
              {data.title}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl font-light max-w-2xl ml-0 md:ml-16 text-muted-foreground"
            style={{ fontWeight: 200 }}
          >
            {data.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex flex-wrap gap-6 pt-8 ml-0 md:ml-48"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-foreground text-background font-light tracking-wide hover:bg-foreground/90 transition-all duration-300 hover:scale-105"
              style={{ fontWeight: 300 }}
            >
              {data.cta.primary}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 border border-foreground font-light tracking-wide hover:bg-foreground hover:text-background transition-all duration-300"
              style={{ fontWeight: 300 }}
            >
              {data.cta.secondary}
            </button>
          </motion.div>
        </motion.div>

        {/* Abstract decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-1/4 right-8 md:right-32 w-32 h-32 border border-foreground/20 rounded-full"
          style={{ transform: 'translateZ(0)' }}
        />
        <motion.div
          initial={{ opacity: 0, rotate: 45 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="absolute bottom-1/4 left-8 md:left-24 w-24 h-24 border border-foreground/10"
        />
      </div>
    </section>
  )
}