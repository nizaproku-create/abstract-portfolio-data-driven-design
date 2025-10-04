"use client"

import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

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

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  originalX: number
  originalY: number
}

export default function Hero({ data }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [nodes, setNodes] = useState<Node[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  
  useEffect(() => {
    // Initialize grid of nodes
    const nodeGrid: Node[] = []
    const cols = 12
    const rows = 8
    const canvas = canvasRef.current
    if (!canvas) return
    
    const width = canvas.width = window.innerWidth
    const height = canvas.height = window.innerHeight
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (width / (cols - 1)) * i
        const y = (height / (rows - 1)) * j
        nodeGrid.push({
          x,
          y,
          vx: 0,
          vy: 0,
          originalX: x,
          originalY: y
        })
      }
    }
    
    setNodes(nodeGrid)
  }, [])
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update node positions based on mouse
      const updatedNodes = nodes.map(node => {
        const dx = mousePosition.x - node.x
        const dy = mousePosition.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const repelRadius = 150
        
        if (distance < repelRadius && distance > 0) {
          const force = (repelRadius - distance) / repelRadius
          const angle = Math.atan2(dy, dx)
          node.vx -= Math.cos(angle) * force * 3
          node.vy -= Math.sin(angle) * force * 3
        }
        
        // Spring back to original position
        const returnForce = 0.05
        node.vx += (node.originalX - node.x) * returnForce
        node.vy += (node.originalY - node.y) * returnForce
        
        // Apply damping
        node.vx *= 0.9
        node.vy *= 0.9
        
        // Update position
        node.x += node.vx
        node.y += node.vy
        
        return node
      })
      
      setNodes(updatedNodes)
      
      // Draw connections between nearby nodes
      ctx.strokeStyle = 'rgba(23, 23, 23, 0.15)'
      ctx.lineWidth = 1
      
      for (let i = 0; i < updatedNodes.length; i++) {
        for (let j = i + 1; j < updatedNodes.length; j++) {
          const node1 = updatedNodes[i]
          const node2 = updatedNodes[j]
          
          const dx = node2.x - node1.x
          const dy = node2.y - node1.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Only draw lines between nodes that are close enough
          if (distance < 250) {
            const opacity = 1 - (distance / 250)
            ctx.strokeStyle = `rgba(23, 23, 23, ${opacity * 0.2})`
            
            ctx.beginPath()
            ctx.moveTo(node1.x, node1.y)
            ctx.lineTo(node2.x, node2.y)
            ctx.stroke()
          }
        }
      }
      
      // Draw nodes
      ctx.fillStyle = 'rgba(23, 23, 23, 0.3)'
      updatedNodes.forEach(node => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [nodes, mousePosition])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="min-h-screen flex items-center justify-center relative px-6 md:px-12 overflow-hidden">
      {/* Interactive connected lines background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

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
      </div>
    </section>
  )
}