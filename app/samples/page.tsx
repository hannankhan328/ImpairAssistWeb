"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Video, Clock, Play } from "lucide-react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"

// Removed the sample videos hard-coded data

export default function SamplesPage() {
  const router = useRouter()
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchVideos() {
      try {
        const response = await axios.get("http://localhost:8080/videos")
        setVideos(response.data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchVideos()
  }, [])

  const handleSelectVideo = (videoId: string) => {
    setSelectedVideo(videoId)
    const video = videos.find((v: any) => v.id === videoId)
    if (video) {
      router.push(`/player?video=${encodeURIComponent(video.title)}&source=api&id=${videoId}`)
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Video className="h-6 w-6 text-primary" />
            <span className="gradient-heading">Impair Assist</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background dark:from-primary/10 dark:via-background dark:to-background -z-10" />
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl -z-10"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl -z-10"></div>

        <section className="container py-12 md:py-24">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-heading">
                Sample Videos
              </h1>
              <p className="text-muted-foreground dark:text-gray-200 md:text-xl">
                Choose from our collection of pre-uploaded videos
              </p>
            </div>

            {error ? (
              <div className="text-red-500 font-medium">Error: {error}</div>
            ) : isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-video w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {videos.map((video: any) => (
                  <motion.div key={video.id} variants={item}>
                    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                      <div className="relative aspect-video overflow-hidden">
                        
                        <Image
                          src={video.thumbnail || "/placeholder.svg"}
                          alt="Video thumbnail"
                          unoptimized
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.div
                            className="rounded-full bg-primary/90 p-3"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Play className="h-6 w-6 text-primary-foreground" fill="currentColor" />
                          </motion.div>
                        </div>
                        <div className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{video.duration}</span>
                          </div>
                        </div>
                      </div>
                      <CardHeader className="p-4">
                        <CardTitle className="line-clamp-1 text-lg">{video.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{video.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          className="w-full group bg-primary hover:bg-primary/90 text-white"
                          onClick={() => handleSelectVideo(video.id)}
                          disabled={selectedVideo === video.id}
                        >
                          {selectedVideo === video.id ? (
                            "Loading..."
                          ) : (
                            <>
                              Watch Video
                              <Play className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
