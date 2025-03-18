"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ConfettiProps {
  duration?: number
  pieces?: number
}

export function ConfettiEffect({ duration = 3000, pieces = 100 }: ConfettiProps) {
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (!isActive) return null

  const colors = ["bg-primary", "bg-secondary", "bg-primary/80", "bg-secondary/80", "bg-primary/60", "bg-secondary/60"]

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: pieces }).map((_, i) => {
        const size = Math.random() * 10 + 5
        const color = colors[Math.floor(Math.random() * colors.length)]
        const shape = Math.random() > 0.5 ? "rounded-md" : "rounded-full"

        return (
          <motion.div
            key={i}
            className={`absolute ${shape} ${color}`}
            initial={{
              top: -20,
              left: Math.random() * 100 + "vw",
              scale: 0,
              rotate: 0,
            }}
            animate={{
              top: "100vh",
              scale: 1,
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              ease: "easeOut",
              delay: Math.random() * 0.5,
            }}
            style={{
              width: size,
              height: size,
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          />
        )
      })}
    </div>
  )
}

