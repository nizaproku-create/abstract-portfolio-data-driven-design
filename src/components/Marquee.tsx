"use client"

import { useEffect, useRef } from 'react'

interface MarqueeProps {
  texts: string[]
  speed?: number
  direction?: 'left' | 'right'
  className?: string
}

export default function Marquee({ texts, speed = 50, direction = 'left', className = '' }: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const marquee = marqueeRef.current
    if (!marquee) return

    let position = 0
    const marqueeWidth = marquee.scrollWidth / 2

    const animate = () => {
      if (direction === 'left') {
        position -= speed / 60
        if (position <= -marqueeWidth) {
          position = 0
        }
      } else {
        position += speed / 60
        if (position >= 0) {
          position = -marqueeWidth
        }
      }

      marquee.style.transform = `translateX(${position}px)`
      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [speed, direction])

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={marqueeRef} className="inline-flex">
        {/* Render twice for seamless loop */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="inline-flex">
            {texts.map((text, idx) => (
              <span
                key={idx}
                className="px-8 text-6xl md:text-8xl font-extralight tracking-tight"
                style={{ fontWeight: 100 }}
              >
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}