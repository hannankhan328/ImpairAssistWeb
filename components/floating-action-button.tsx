"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Upload, Video, Home } from "lucide-react"
import Link from "next/link"

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"
        onClick={toggleOpen}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(2, 63, 108, 0.5)" }}
      >
        <motion.div animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <Plus className="w-6 h-6" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="absolute bottom-20 right-0 flex flex-col gap-4 items-end z-50"
              // className="absolute bottom-20 right-0 flex flex-col gap-4 items-end"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ staggerChildren: 0.1, staggerDirection: -1 }}
            >
              <Link href="/" onClick={() => setIsOpen(false)}>
                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <span className="bg-white/80 dark:bg-black/80 backdrop-blur-md border border-white/20 dark:border-white/10 py-2 px-4 rounded-lg shadow-md">
                    Home
                  </span>
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                    <Home className="w-5 h-5" />
                  </div>
                </motion.div>
              </Link>

              <Link href="/upload" onClick={() => setIsOpen(false)}>
                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <span className="bg-white/80 dark:bg-black/80 backdrop-blur-md border border-white/20 dark:border-white/10 py-2 px-4 rounded-lg shadow-md">
                    Upload Video
                  </span>
                  <div className="w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center shadow-md">
                    <Upload className="w-5 h-5" />
                  </div>
                </motion.div>
              </Link>

              <Link href="/samples" onClick={() => setIsOpen(false)}>
                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <span className="bg-white/80 dark:bg-black/80 backdrop-blur-md border border-white/20 dark:border-white/10 py-2 px-4 rounded-lg shadow-md">
                    Sample Videos
                  </span>
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                    <Video className="w-5 h-5" />
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

