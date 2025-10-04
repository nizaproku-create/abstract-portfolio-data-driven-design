"use client"

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="space-y-8 relative z-10"
        >
          {/* Name with split effect */}
          <motion.h1 
            className="text-7xl md:text-9xl font-extralight tracking-tight leading-none relative"
            style={{ fontWeight: 100 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="inline-block"
            >
              {data.name.split(' ')[0]}
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="inline-block ml-0 md:ml-32"
            >
              {data.name.split(' ').slice(1).join(' ')}
            </motion.span>
          </motion.h1>
          
          {/* Title with gradient line */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="ml-0 md:ml-32 relative"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60px' }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-px bg-foreground mb-4"
            />
            <h2 className="text-2xl md:text-4xl font-light tracking-wide" style={{ fontWeight: 200 }}>
              {data.title}
            </h2>
          </motion.div>

          {/* Tagline with typing effect feel */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-lg md:text-xl font-light max-w-2xl ml-0 md:ml-16 text-muted-foreground leading-relaxed"
            style={{ fontWeight: 200 }}
          >
            {data.tagline}
          </motion.p>

          {/* CTA buttons with enhanced hover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-wrap gap-6 pt-8 ml-0 md:ml-48"
          >
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="group relative px-8 py-4 bg-foreground text-background font-light tracking-wide overflow-hidden"
              style={{ fontWeight: 300 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-background"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 group-hover:text-foreground transition-colors duration-300">
                {data.cta.primary}
              </span>
            </motion.button>
            
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="group relative px-8 py-4 border border-foreground font-light tracking-wide overflow-hidden"
              style={{ fontWeight: 300 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-foreground"
                initial={{ y: '100%' }}
                whileHover={{ y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 group-hover:text-background transition-colors duration-300">
                {data.cta.secondary}
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Enhanced abstract decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute top-1/4 right-8 md:right-32 w-32 h-32 border border-foreground/20 rounded-full pointer-events-none"
          style={{ 
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
          }}
        />
        
        <motion.div
          initial={{ opacity: 0, rotate: 45 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1.5, delay: 0.7 }}
          className="absolute bottom-1/4 left-8 md:left-24 w-24 h-24 border border-foreground/10 pointer-events-none"
          style={{ 
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`
          }}
        />

        {/* Additional creative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-1/2 left-1/2 w-64 h-64 border border-foreground/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />
        
        <motion.div
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1.5, delay: 0.9 }}
          className="absolute top-16 right-1/4 w-16 h-16 border border-foreground/15 pointer-events-none"
          style={{ 
            transform: `rotate(${mousePosition.x * 0.05}deg) translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
          }}
        />

        {/* Animated dots */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0.1, 0.3, 0.1], scale: 1 }}
            transition={{ 
              duration: 3, 
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute w-1 h-1 bg-foreground rounded-full pointer-events-none"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
          />
        ))}

        {/* Floating line element */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.1, scaleX: 1 }}
          transition={{ duration: 2, delay: 1.2 }}
          className="absolute bottom-32 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground to-transparent pointer-events-none"
        />
      </div>
    </section>
  )
}