"use client"

import { ReactNode } from 'react'

interface StackingScrollProps {
  children: ReactNode[]
}

export default function StackingScroll({ children }: StackingScrollProps) {
  return (
    <div className="relative">
      {children.map((child, index) => (
        <div
          key={index}
          className="stack-section sticky top-0"
          style={{
            zIndex: index + 1,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  )
}