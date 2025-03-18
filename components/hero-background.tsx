"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        <title>ImpairAssist Background</title>
        {paths.map((path, index) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={index % 2 === 0 ? "#023F6C" : "#830027"} // Alternating blue and red colors
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

export default function HeroBackground() {
  const title = "ImpairAssist"
  const words = title.split(" ")

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#d0dbe8] dark:bg-gray-900">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-5xl mx-auto"
        >
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold mb-12 tracking-tighter">
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => {
                  // First half of letters in blue, second half in red
                  const isFirstHalf = letterIndex < word.length / 2
                  return (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: wordIndex * 0.1 + letterIndex * 0.05,
                        type: "spring",
                        stiffness: 150,
                        damping: 25,
                      }}
                      className={`inline-block text-transparent bg-clip-text 
                                ${
                                  isFirstHalf
                                    ? "bg-gradient-to-r from-[#023F6C] to-[#0284c7]"
                                    : "bg-gradient-to-r from-[#830027] to-[#be123c]"
                                }`}
                    >
                      {letter}
                    </motion.span>
                  )
                })}
              </span>
            ))}
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <div
              className="inline-block group relative bg-gradient-to-b from-[#023F6C]/10 to-[#023F6C]/5 
                        dark:from-[#023F6C]/20 dark:to-[#023F6C]/10 p-px rounded-2xl backdrop-blur-lg 
                        overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link href="/upload">
                <Button
                  variant="ghost"
                  className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                              bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                              text-[#023F6C] dark:text-[#0284c7] transition-all duration-300 
                              group-hover:-translate-y-0.5 border border-[#023F6C]/10 dark:border-[#0284c7]/20
                              hover:shadow-md dark:hover:shadow-[#023F6C]/30"
                >
                  <span className="opacity-90 group-hover:opacity-100 transition-opacity">Upload Video</span>
                  <span
                    className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                  transition-all duration-300"
                  >
                    →
                  </span>
                </Button>
              </Link>
            </div>

            <div
              className="inline-block group relative bg-gradient-to-b from-[#830027]/10 to-[#830027]/5 
                        dark:from-[#830027]/20 dark:to-[#830027]/10 p-px rounded-2xl backdrop-blur-lg 
                        overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <Link href="/samples">
                <Button
                  variant="ghost"
                  className="rounded-[1.15rem] px-8 py-6 text-lg font-semibold backdrop-blur-md 
                              bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                              text-[#830027] dark:text-[#be123c] transition-all duration-300 
                              group-hover:-translate-y-0.5 border border-[#830027]/10 dark:border-[#be123c]/20
                              hover:shadow-md dark:hover:shadow-[#830027]/30"
                >
                  <span className="opacity-90 group-hover:opacity-100 transition-opacity">Browse Samples</span>
                  <span
                    className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 
                                  transition-all duration-300"
                  >
                    →
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

