"use client"

import type React from "react"

import { useRef, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Maximize, Pause, Play, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/theme-toggle"

// Sample transcript data with timestamps
const sampleTranscript = [
  { id: 1, start: 0, end: 4.5, text: "Welcome to this video on web accessibility." },
  {
    id: 2,
    start: 4.5,
    end: 9.2,
    text: "Accessibility is about making your website usable by as many people as possible.",
  },
  {
    id: 3,
    start: 9.2,
    end: 15.8,
    text: "This includes people with disabilities, older people, people using mobile devices, and those with slow internet connections.",
  },
  {
    id: 4,
    start: 15.8,
    end: 22.5,
    text: "There are several key principles to keep in mind when designing for accessibility.",
  },
  {
    id: 5,
    start: 22.5,
    end: 28.3,
    text: "First, ensure your content is perceivable. This means providing text alternatives for non-text content.",
  },
  {
    id: 6,
    start: 28.3,
    end: 34.1,
    text: "Second, make your interface operable. Users should be able to navigate and use your site with a keyboard.",
  },
  {
    id: 7,
    start: 34.1,
    end: 40.6,
    text: "Third, content should be understandable. Use clear language and provide helpful instructions.",
  },
  {
    id: 8,
    start: 40.6,
    end: 46.2,
    text: "Fourth, your content should be robust. It should work across different browsers and assistive technologies.",
  },
  {
    id: 9,
    start: 46.2,
    end: 52.8,
    text: "Let's look at some practical examples of how to implement these principles.",
  },
  {
    id: 10,
    start: 52.8,
    end: 59.4,
    text: "For images, always include descriptive alt text that conveys the purpose of the image.",
  },
  {
    id: 11,
    start: 59.4,
    end: 65.7,
    text: "For videos, provide captions and transcripts like the one you're reading right now.",
  },
  {
    id: 12,
    start: 65.7,
    end: 72.3,
    text: "Ensure sufficient color contrast between text and background to help users with visual impairments.",
  },
  {
    id: 13,
    start: 72.3,
    end: 78.9,
    text: "Use semantic HTML elements that clearly define the structure of your content.",
  },
  {
    id: 14,
    start: 78.9,
    end: 85.5,
    text: "Implement proper heading hierarchy to help screen reader users navigate your content.",
  },
  {
    id: 15,
    start: 85.5,
    end: 92.1,
    text: "Make sure all interactive elements are keyboard accessible and have visible focus states.",
  },
  {
    id: 16,
    start: 92.1,
    end: 98.7,
    text: "Test your website with actual assistive technologies to identify and fix issues.",
  },
  {
    id: 17,
    start: 98.7,
    end: 105.3,
    text: "Remember that accessibility benefits everyone, not just users with disabilities.",
  },
  {
    id: 18,
    start: 105.3,
    end: 111.9,
    text: "By implementing these practices, you create a better experience for all your users.",
  },
  { id: 19, start: 111.9, end: 118.5, text: "Thank you for watching this introduction to web accessibility." },
  {
    id: 20,
    start: 118.5,
    end: 125,
    text: "For more resources, check out the Web Content Accessibility Guidelines (WCAG).",
  },
]

export default function PlayerPage() {
  const searchParams = useSearchParams()
  const videoName = searchParams.get("video") || "Video"
  const source = searchParams.get("source") || "upload"
  const videoId = searchParams.get("id") || "1"

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeLineId, setActiveLineId] = useState<number | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)

  // Handle video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime
      setCurrentTime(time)

      // Find the current transcript line based on time
      const activeLine = sampleTranscript.find((line) => time >= line.start && time <= line.end)

      if (activeLine && activeLine.id !== activeLineId) {
        setActiveLineId(activeLine.id)

        // Scroll to the active line
        const lineElement = document.getElementById(`line-${activeLine.id}`)
        if (lineElement && transcriptRef.current) {
          lineElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
        }
      }
    }
  }

  // Format time in MM:SS format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = seekTime
      setCurrentTime(seekTime)
    }
  }

  // Jump to specific transcript line
  const jumpToLine = (line: (typeof sampleTranscript)[0]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = line.start
      setCurrentTime(line.start)
      setActiveLineId(line.id)

      if (!isPlaying) {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  // Enter fullscreen
  const enterFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-xl font-bold">{videoName}</h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Video Player Section */}
          <div className="space-y-4">
            <Card className="overflow-hidden">
              <div className="relative bg-black aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full"
                  src="/placeholder.svg"
                  poster="/placeholder.svg?height=360&width=640"
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                />
                {/* Video Controls Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <Button
                    variant="outline"
                    size="icon"
                    className="bg-black/50 border-none text-white hover:bg-black/70"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" fill="currentColor" />}
                  </Button>
                </div>
              </div>
              {/* Video Controls */}
              <div className="p-4 space-y-2 bg-background">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-2 rounded-lg appearance-none bg-secondary cursor-pointer"
                  />
                  <span className="text-sm text-foreground">{formatTime(duration)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={togglePlay} className="h-9 w-9 text-foreground">
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" fill="currentColor" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={toggleMute} className="h-9 w-9 text-foreground">
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" onClick={enterFullscreen} className="h-9 w-9 text-foreground">
                    <Maximize className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{videoName}</h2>
              <p className="text-muted-foreground">
                {source === "upload" ? "Your uploaded video" : "Sample video from our library"}
              </p>
            </div>
          </div>

          {/* Transcript Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Transcript</h2>
              <p className="text-sm text-muted-foreground">Click on any line to jump to that part of the video</p>
            </div>
            <Card>
              <ScrollArea className="h-[500px] rounded-md" ref={transcriptRef}>
                <div className="p-4 space-y-2">
                  {sampleTranscript.map((line) => (
                    <div
                      key={line.id}
                      id={`line-${line.id}`}
                      className={`transcript-line cursor-pointer ${activeLineId === line.id ? "active" : ""}`}
                      onClick={() => jumpToLine(line)}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-xs text-muted-foreground pt-1 w-12 shrink-0">
                          {formatTime(line.start)}
                        </span>
                        <p>{line.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Impair Assist. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

