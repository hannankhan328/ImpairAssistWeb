"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import Image from "next/image"
import { AudioWaveformIcon as Waveform, Cog, Zap } from "lucide-react"

export function ProcessFlowAnimation() {
  const controls = useAnimation()
  const [isPlaying, setIsPlaying] = useState(false)
  const [step, setStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Start animation when component is in view
  useEffect(() => {
    if (!isClient) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isPlaying) {
          setIsPlaying(true)
          startAnimation()
        }
      },
      { threshold: 0.3 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [isClient, isPlaying])

  const startAnimation = async () => {
    // Reset to beginning
    setStep(0)
    await controls.start("hidden")

    // Step 1: Show input
    setStep(1)
    await controls.start("visible")
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Step 2: Show preprocessing
    setStep(2)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Step 3: Show inference
    setStep(3)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Step 4: Show cross-attention
    setStep(4)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Step 5: Show post-processing
    setStep(5)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Step 6: Show caption generation
    setStep(6)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Reset after a delay
    setTimeout(() => {
      setIsPlaying(false)
    }, 90000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const arrowVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: { opacity: 1, pathLength: 1, transition: { duration: 0.8, ease: "easeInOut" } },
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
    },
  }

  const waveVariants = {
    animate: {
      opacity: [0.3, 1, 0.3],
      pathLength: [0.2, 1, 0.2],
      transition: { repeat: Number.POSITIVE_INFINITY, duration: 2, ease: "easeInOut" },
    },
  }

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  }

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  // Lips animation variants
  const lipsVariants = {
    closed: {
      d: "M25,20 Q35,15 50,20 Q65,15 75,20 Q65,25 50,20 Q35,25 25,20 Z",
      transition: { duration: 0.3 },
    },
    halfOpen: {
      d: "M25,20 Q35,10 50,20 Q65,10 75,20 Q65,30 50,25 Q35,30 25,20 Z",
      transition: { duration: 0.3 },
    },
    open: {
      d: "M25,20 Q35,5 50,20 Q65,5 75,20 Q65,35 50,30 Q35,35 25,20 Z",
      transition: { duration: 0.3 },
    },
  }

  const captionText = "MY NAME IS JEFF"

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-5xl mx-auto h-[500px] md:h-[400px] bg-[#f0f4f8] dark:bg-gray-900 rounded-xl overflow-hidden border-2 border-primary/20 dark:border-primary/30"
    >
      {/* Dashed border */}
      <div className="absolute inset-4 border-4 border-dashed border-blue-400/30 dark:border-blue-400/20 rounded-lg pointer-events-none"></div>

      {/* Process flow title */}
      <div className="absolute top-6 left-0 w-full text-center">
        <h3 className="text-2xl font-bold text-primary dark:text-primary-foreground">PROCESS FLOW</h3>
      </div>

      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center p-8 pt-16">
        <motion.div
          className="w-full grid grid-cols-5 gap-4 relative"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {/* Step 1: Input */}
          <motion.div
            className={`flex flex-col items-center justify-center ${step >= 1 ? "z-10" : "z-0"}`}
            variants={itemVariants}
            custom={0}
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 border-primary/50 bg-white dark:bg-gray-800">
              <Image src="/file.svg?height=100&width=100" alt="Person speaking" fill className="object-cover" />
              <motion.div
                className={`absolute inset-0 bg-primary/10 ${step >= 1 ? "opacity-100" : "opacity-0"}`}
                animate={step >= 1 ? "pulse" : "hidden"}
                variants={pulseVariants}
              />
            </div>
            <p className="mt-2 text-xs md:text-sm font-medium text-center">Input</p>
          </motion.div>

          {/* Step 2: Pre-processing */}
          <motion.div
            className={`flex flex-col items-center justify-center ${step >= 2 ? "z-10" : "z-0"}`}
            variants={itemVariants}
            custom={1}
          >
            <div className="relative flex flex-col items-center space-y-2">
              <div className="w-20 h-10 md:w-24 md:h-12 rounded-lg border-2 border-primary/50 bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                <motion.div
                  className={`w-full h-full flex items-center justify-center ${step >= 2 ? "opacity-100" : "opacity-0"}`}
                >
                  <svg width="100%" height="40" viewBox="0 0 100 40" className="text-primary">
                    <motion.path
                      d="M0,20 Q10,5 20,20 T40,20 T60,20 T80,20 T100,20"
                      fill="transparent"
                      stroke="currentColor"
                      strokeWidth="2"
                      variants={waveVariants}
                      animate={step >= 2 ? "animate" : ""}
                    />
                  </svg>
                </motion.div>
              </div>
              <div className="w-20 h-10 md:w-24 md:h-12 rounded-lg border-2 border-primary/50 bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                <motion.div
                  className={`w-full h-full flex items-center justify-center ${step >= 2 ? "opacity-100" : "opacity-0"}`}
                >
                  {/* Lips animation */}
                  <svg width="100" height="40" viewBox="0 0 100 40" className="text-secondary">
                    <motion.path
                      fill="#ffccb3" // Lip color
                      stroke="#d4846a" // Lip outline
                      strokeWidth="1"
                      initial="closed"
                      animate={
                        step >= 2
                          ? [
                              "closed",
                              "halfOpen",
                              "open",
                              "halfOpen",
                              "closed",
                              "closed",
                              "halfOpen",
                              "open",
                              "halfOpen",
                              "closed",
                            ]
                          : "closed"
                      }
                      variants={lipsVariants}
                      transition={{
                        duration: 0.3,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 0.5,
                        times: [0, 0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9, 1],
                        ease: "easeInOut",
                      }}
                    />

                    {/* Face outline */}
                    <motion.ellipse
                      cx="50"
                      cy="15"
                      rx="40"
                      ry="30"
                      fill="none"
                      stroke="#d4846a"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                      opacity="0.5"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
            <p className="mt-2 text-xs md:text-sm font-medium text-center">Pre-processing</p>
          </motion.div>

          {/* Step 3: Inference */}
          <motion.div
            className={`flex flex-col items-center justify-center ${step >= 3 ? "z-10" : "z-0"}`}
            variants={itemVariants}
            custom={2}
          >
            <div className="relative flex flex-col items-center space-y-2">
              <div className="w-20 h-10 md:w-24 md:h-12 rounded-lg border-2 border-secondary/50 bg-white dark:bg-gray-800 flex items-center justify-center">
                <motion.div
                  className={`text-secondary ${step >= 3 ? "opacity-100" : "opacity-0"}`}
                  animate={step >= 3 ? { rotate: [0, 360] } : {}}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "linear" }}
                >
                  <Waveform size={20} />
                </motion.div>
              </div>
              <div className="w-20 h-10 md:w-24 md:h-12 rounded-lg border-2 border-primary/50 bg-white dark:bg-gray-800 flex items-center justify-center">
                <motion.div
                  className={`text-primary ${step >= 3 ? "opacity-100" : "opacity-0"}`}
                  animate={step >= 3 ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="7" />
                    <path d="M8 14l-4 4" />
                    <path d="M16 14l4 4" />
                  </svg>
                </motion.div>
              </div>
            </div>
            <p className="mt-2 text-xs md:text-sm font-medium text-center">Inference</p>
          </motion.div>

          {/* Step 4 & 5: Cross-attention & Post-processing */}
          <motion.div
            className={`flex flex-col items-center justify-center ${step >= 4 ? "z-10" : "z-0"}`}
            variants={itemVariants}
            custom={3}
          >
            <div className="relative flex flex-col items-center space-y-2">
              <div className="w-20 h-10 md:w-24 md:h-12 rounded-lg border-2 border-primary/50 bg-white dark:bg-gray-800 flex items-center justify-center">
                <motion.div
                  className={`text-primary ${step >= 4 ? "opacity-100" : "opacity-0"}`}
                  animate={step >= 4 ? { rotate: [0, 10, -10, 0] } : {}}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                >
                  <Zap size={20} />
                </motion.div>
              </div>
              <div
                className={`w-20 h-10 md:w-24 md:h-12 rounded-lg border-2 border-secondary/50 bg-white dark:bg-gray-800 flex items-center justify-center ${step >= 5 ? "opacity-100" : "opacity-50"}`}
              >
                <motion.div
                  className={`text-secondary ${step >= 5 ? "opacity-100" : "opacity-0"}`}
                  animate={step >= 5 ? { rotate: [0, 360] } : {}}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 4, ease: "linear" }}
                >
                  <Cog size={20} />
                </motion.div>
              </div>
            </div>
            <p className="mt-2 text-xs md:text-sm font-medium text-center">
              {step >= 5 ? "Processing" : "Cross-attention"}
            </p>
          </motion.div>

          {/* Step 6: Caption Generation */}
          <motion.div
            className={`flex flex-col items-center justify-center ${step >= 6 ? "z-10" : "z-0"}`}
            variants={itemVariants}
            custom={4}
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 border-primary/50 bg-white dark:bg-gray-800">
              <Image
                src="/file.svg?height=100&width=100"
                alt="Person speaking with caption"
                fill
                className="object-cover"
              />
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-black/70 py-1 px-1"
                initial={{ opacity: 0, y: 10 }}
                animate={step >= 6 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="flex justify-center"
                  variants={textVariants}
                  initial="hidden"
                  animate={step >= 6 ? "visible" : "hidden"}
                >
                  {captionText.split("").map((letter, index) => (
                    <motion.span
                      key={index}
                      className="text-white text-[8px] md:text-[10px] font-bold"
                      variants={letterVariants}
                    >
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
            <p className="mt-2 text-xs md:text-sm font-medium text-center">Caption Generation</p>
          </motion.div>

          {/* Connecting arrows */}
          <svg
            className="absolute inset-0 w-full h-full z-0 pointer-events-none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Arrow 1 */}
            <motion.path
              d="M70,60 L110,60"
              stroke="#0284c7"
              strokeWidth="3"
              strokeDasharray="5,5"
              variants={arrowVariants}
              initial="hidden"
              animate={step >= 2 ? "visible" : "hidden"}
              custom={0}
            />
            <motion.polygon
              points="110,55 120,60 110,65"
              fill="#0284c7"
              variants={itemVariants}
              initial="hidden"
              animate={step >= 2 ? "visible" : "hidden"}
              custom={0.3}
            />

            {/* Arrow 2 */}
            <motion.path
              d="M170,60 L210,60"
              stroke="#0284c7"
              strokeWidth="3"
              strokeDasharray="5,5"
              variants={arrowVariants}
              initial="hidden"
              animate={step >= 3 ? "visible" : "hidden"}
              custom={1}
            />
            <motion.polygon
              points="210,55 220,60 210,65"
              fill="#0284c7"
              variants={itemVariants}
              initial="hidden"
              animate={step >= 3 ? "visible" : "hidden"}
              custom={1.3}
            />

            {/* Arrow 3 */}
            <motion.path
              d="M270,60 L310,60"
              stroke="#0284c7"
              strokeWidth="3"
              strokeDasharray="5,5"
              variants={arrowVariants}
              initial="hidden"
              animate={step >= 4 ? "visible" : "hidden"}
              custom={2}
            />
            <motion.polygon
              points="310,55 320,60 310,65"
              fill="#0284c7"
              variants={itemVariants}
              initial="hidden"
              animate={step >= 4 ? "visible" : "hidden"}
              custom={2.3}
            />

            {/* Arrow 4 */}
            <motion.path
              d="M370,60 L410,60"
              stroke="#0284c7"
              strokeWidth="3"
              strokeDasharray="5,5"
              variants={arrowVariants}
              initial="hidden"
              animate={step >= 6 ? "visible" : "hidden"}
              custom={3}
            />
            <motion.polygon
              points="410,55 420,60 410,65"
              fill="#0284c7"
              variants={itemVariants}
              initial="hidden"
              animate={step >= 6 ? "visible" : "hidden"}
              custom={3.3}
            />
          </svg>
        </motion.div>
      </div>

      {/* Replay button */}
      {!isPlaying && step > 0 && (
        <motion.button
          className="absolute bottom-4 right-4 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm font-medium"
          onClick={startAnimation}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Replay Animation
        </motion.button>
      )}
    </div>
  )
}

