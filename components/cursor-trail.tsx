"use client"

import { useEffect, useRef } from "react"

export function CursorTrail() {
  const trailsRef = useRef<HTMLDivElement[]>([])
  const mousePos = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number>()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      trailsRef.current.forEach((trail, index) => {
        if (trail) {
          const delay = index * 0.05
          const targetX = mousePos.current.x - 10
          const targetY = mousePos.current.y - 10

          const currentX = Number.parseFloat(trail.style.left || "0")
          const currentY = Number.parseFloat(trail.style.top || "0")

          const newX = currentX + (targetX - currentX) * (0.2 - delay)
          const newY = currentY + (targetY - currentY) * (0.2 - delay)

          trail.style.left = `${newX}px`
          trail.style.top = `${newY}px`
          trail.style.opacity = `${0.6 - index * 0.15}`
        }
      })

      animationFrameId.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailsRef.current[i] = el
          }}
          className="cursor-trail"
          style={{ opacity: 0 }}
        />
      ))}
    </>
  )
}
