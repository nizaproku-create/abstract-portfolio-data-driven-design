"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

interface ProjectsProps {
  data: {
    heading: string
    items: Array<{
      id: number
      title: string
      category: string
      description: string
      image: string
      tags: string[]
      year: string
    }>
  }
}

export default function Projects({ data }: ProjectsProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="min-h-screen px-6 md:px-12 py-32 relative">
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

        <div className="space-y-32">
          {data.items.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="space-y-2">
                  <div className="text-sm font-light tracking-widest text-muted-foreground uppercase" style={{ fontWeight: 300 }}>
                    {project.category} • {project.year}
                  </div>
                  <h3 className="text-3xl md:text-5xl font-extralight tracking-tight" style={{ fontWeight: 100 }}>
                    {project.title}
                  </h3>
                </div>
                
                <p className="text-lg font-light leading-relaxed text-muted-foreground" style={{ fontWeight: 200 }}>
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 pt-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 border border-foreground/20 text-sm font-light tracking-wide hover:bg-foreground hover:text-background transition-all duration-300"
                      style={{ fontWeight: 300 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative aspect-[4/3] overflow-hidden border border-foreground/10 ${
                  index % 2 === 1 ? 'md:order-1' : ''
                }`}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}