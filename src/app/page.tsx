"use client"

import { useEffect, useState } from 'react'
import InteractiveBackground from '@/components/InteractiveBackground'
import Marquee from '@/components/Marquee'
import StackingScroll from '@/components/StackingScroll'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Blog from '@/components/sections/Blog'
import Awards from '@/components/sections/Awards'
import Certifications from '@/components/sections/Certifications'
import Contact from '@/components/sections/Contact'

interface PortfolioData {
  hero: any
  about: any
  projects: any
  skills: any
  blog: any
  awards: any
  certifications: any
  contact: any
  marqueeTexts: string[]
}

export default function Home() {
  const [data, setData] = useState<PortfolioData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(jsonData => {
        setData(jsonData)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error loading data:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-extralight tracking-wide" style={{ fontWeight: 100 }}>
          Loading...
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-extralight tracking-wide" style={{ fontWeight: 100 }}>
          Error loading portfolio data
        </div>
      </div>
    )
  }

  return (
    <main className="relative bg-background">
      <InteractiveBackground />
      
      <div className="relative z-10">
        <StackingScroll>
          <Hero data={data.hero} />
          
          <div className="bg-background">
            <Marquee texts={data.marqueeTexts} speed={40} className="py-16 border-y border-foreground/10" />
          </div>
          
          <div className="bg-foreground text-background">
            <About data={data.about} />
          </div>
          
          <div className="bg-background">
            <Projects data={data.projects} />
          </div>
          
          <div className="bg-background">
            <Marquee 
              texts={data.marqueeTexts} 
              speed={60} 
              direction="right" 
              className="py-16 border-y border-foreground/10" 
            />
          </div>
          
          <div className="bg-foreground text-background">
            <Skills data={data.skills} />
          </div>
          
          <div className="bg-background">
            <Blog data={data.blog} />
          </div>
          
          <div className="bg-foreground text-background">
            <Awards data={data.awards} />
          </div>
          
          <div className="bg-background">
            <Certifications data={data.certifications} />
          </div>
          
          <div className="bg-foreground text-background">
            <Contact data={data.contact} />
          </div>
        </StackingScroll>

        {/* Footer */}
        <footer className="relative z-10 bg-background border-t border-foreground/10 py-12 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm font-light tracking-wide text-muted-foreground" style={{ fontWeight: 300 }}>
              © {new Date().getFullYear()} {data.hero.name}. All rights reserved.
            </p>
            <div className="flex gap-8">
              {data.contact.social.map((social: any, index: number) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light tracking-wide hover:text-foreground transition-colors"
                  style={{ fontWeight: 300 }}
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}