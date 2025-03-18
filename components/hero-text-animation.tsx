"use client"

import { useEffect, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"

export function HeroTextAnimation() {
  const [isClient, setIsClient] = useState(false)
  const controls = useAnimationControls()

  useEffect(() => {
    setIsClient(true)

    // Start the animation sequence
    const animateText = async () => {
      // Initial fade in
      await controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1.2, ease: "easeOut" },
      })
    }

    animateText()
  }, [controls])

  if (!isClient) return null

  return (
    <div className="flex justify-center items-center py-6 mb-4">
      <motion.h1
        className="text-6xl md:text-8xl font-bold gradient-heading tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
      >
        ImpairAssist
      </motion.h1>
    </div>
  )
}

