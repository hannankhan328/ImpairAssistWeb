"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"

interface ThreeDTextProps {
  text: string
  className?: string
}

export function ThreeDText({ text, className = "" }: ThreeDTextProps) {
  const [isMounted, setIsMounted] = useState(false)
  const controls = useAnimation()

  // Mouse position values
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Transform mouse position into rotation values
  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  useEffect(() => {
    setIsMounted(true)
    controls.start({
      y: [20, 0],
      opacity: [0, 1],
      transition: { duration: 0.8, ease: "easeOut" },
    })
  }, [controls])

  if (!isMounted) return null

  return (
    <motion.div
      className={`relative inline-block ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={controls}
    >
      <motion.div
        className="relative"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            className={`inline-block text-5xl md:text-7xl font-bold ${index < 6 ? "text-primary" : "text-foreground"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.05 * index,
                duration: 0.5,
              },
            }}
            style={{
              textShadow: `
                0 1px 0 rgba(0,0,0,0.1),
                0 2px 0 rgba(0,0,0,0.07),
                0 3px 0 rgba(0,0,0,0.05),
                0 4px 0 rgba(0,0,0,0.03)
              `,
              display: "inline-block",
              transform: `translateZ(${Math.random() * 20 + 10}px)`,
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

