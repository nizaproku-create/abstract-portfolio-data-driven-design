"use client"

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface BlogProps {
  data: {
    heading: string
    posts: Array<{
      id: number
      title: string
      excerpt: string
      date: string
      readTime: string
      category: string
    }>
  }
}

export default function Blog({ data }: BlogProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="blog" ref={ref} className="min-h-screen px-6 md:px-12 py-32 relative">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="border border-foreground/10 p-8 hover:border-foreground/30 transition-all duration-300 group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-light tracking-widest text-muted-foreground uppercase">
                  <span style={{ fontWeight: 300 }}>{post.category}</span>
                  <span style={{ fontWeight: 300 }}>{post.readTime}</span>
                </div>

                <h3 className="text-2xl font-light tracking-tight group-hover:translate-x-2 transition-transform duration-300" style={{ fontWeight: 200 }}>
                  {post.title}
                </h3>

                <p className="text-base font-light leading-relaxed text-muted-foreground" style={{ fontWeight: 200 }}>
                  {post.excerpt}
                </p>

                <div className="pt-2">
                  <time className="text-sm font-light text-muted-foreground" style={{ fontWeight: 300 }}>
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </time>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}