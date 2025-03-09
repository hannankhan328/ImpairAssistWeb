"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

// Sample videos data
const sampleVideos = [
  {
    id: "1",
    title: "Introduction to Accessibility",
    description: "Learn the basics of web accessibility and why it matters.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "4:32",
  },
  {
    id: "2",
    title: "Screen Reader Demonstration",
    description: "See how screen readers interpret web content.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "6:15",
  },
  {
    id: "3",
    title: "Color Contrast Guidelines",
    description: "Understanding WCAG color contrast requirements.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "3:45",
  },
  {
    id: "4",
    title: "Keyboard Navigation",
    description: "How to make your site fully keyboard accessible.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "5:20",
  },
  {
    id: "5",
    title: "ARIA Roles and Attributes",
    description: "Using ARIA to enhance accessibility.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "7:10",
  },
  {
    id: "6",
    title: "Mobile Accessibility",
    description: "Best practices for accessible mobile experiences.",
    thumbnail: "/placeholder.svg?height=180&width=320",
    duration: "4:55",
  },
]

export default function SamplesPage() {
  const router = useRouter()
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const handleSelectVideo = (videoId: string) => {
    setSelectedVideo(videoId)
    const video = sampleVideos.find((v) => v.id === videoId)
    if (video) {
      router.push(`/player?video=${encodeURIComponent(video.title)}&source=sample&id=${videoId}`)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 md:py-24">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sample Videos</h1>
              <p className="text-muted-foreground md:text-xl">Choose from our collection of pre-uploaded videos</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sampleVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                      <div className="rounded-full bg-primary/90 p-3">
                        <Play className="h-6 w-6 text-primary-foreground" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
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
                      className="w-full"
                      onClick={() => handleSelectVideo(video.id)}
                      disabled={selectedVideo === video.id}
                    >
                      {selectedVideo === video.id ? "Loading..." : "Watch Video"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

