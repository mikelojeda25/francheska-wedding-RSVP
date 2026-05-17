// StarField.tsx
"use client"
import { useEffect, useRef } from "react"

export default function StarField() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const count = 200
    const stars: HTMLDivElement[] = []

    for (let i = 0; i < count; i++) {
      const star = document.createElement("div")
      const size = Math.random() < 0.6 ? 1.5 : Math.random() < 0.85 ? 2 : 3
      const peak = (0.5 + Math.random() * 0.5).toFixed(2)
      const dur = (2.5 + Math.random() * 4).toFixed(1)
      const delay = (Math.random() * 6).toFixed(1)

      star.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: white;
        left: ${(Math.random() * 100).toFixed(1)}%;
        top: ${(Math.random() * 100).toFixed(1)}%;
        width: ${size}px;
        height: ${size}px;
        animation: starShimmer ${dur}s ease-in-out -${delay}s infinite;
        --peak: ${peak};
        pointer-events: none;
      `
      container.appendChild(star)
      stars.push(star)
    }

    return () => stars.forEach((s) => s.remove())
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
    />
  )
}