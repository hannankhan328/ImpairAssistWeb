"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ThreeDText } from "./3d-text"

export function AnimatedHeader() {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
  }, [])

  const backgroundCircleVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: [0, 1, 0],
      scale: [0, 1.5, 0],
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
      transition: {
        delay: 1 + i * 0.1,
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: Math.random() * 5 + 3,
      },
    }),
  }

  return (
    <div className="relative flex justify-center items-center py-10 overflow-hidden">
      {/* Background circle */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-primary/5 dark:bg-primary/10"
        variants={backgroundCircleVariants}
        initial="hidden"
        animate="visible"
      />

      {/* Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/60"
          custom={i}
          variants={particleVariants}
          initial="hidden"
          animate="visible"
        />
      ))}

      {/* 3D Text */}
      <ThreeDText text="ImpairAssist" />
    </div>
  )
}

