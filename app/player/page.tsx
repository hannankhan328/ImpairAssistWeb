"use client"
<<<<<<< HEAD
import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { ArrowLeft, Pause, Play, VolumeX, Volume2, Maximize } from "lucide-react" // adjust import paths
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/theme-toggle"
// import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/theme-toggle"

// Fallback sample transcript if not using API
const sampleTranscript = [
  { id: 1, start: 0, end: 10, text: "Welcome to the video." },
]

export default function PlayerPage() {
  const searchParams = useSearchParams()
  const videoName = searchParams.get("video") || "Video"
=======

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  Video,
  Maximize,
  Pause,
  Play,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
} from "lucide-react"
import axios from "axios"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ThemeToggle } from "@/components/theme-toggle"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"

// Sample transcript data with timestamps
const sampleTranscript = [
  { id: 1, start: 0, end: 10, text: "Welcome to the video." },
]
export default function PlayerPage() {
  const searchParams = useSearchParams()
  // const videoName = searchParams.get("video") || "Video"
>>>>>>> hannan
  const source = searchParams.get("source") || "upload"
  const videoId = searchParams.get("id") || "1"

  const [isPlaying, setIsPlaying] = useState(false)
<<<<<<< HEAD
=======
  const [videoTitle, setVideoTitle] = useState("Video Title")
>>>>>>> hannan
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeLineId, setActiveLineId] = useState<number | null>(null)
<<<<<<< HEAD

  // State for transcript and video source loaded via API
  // Transcript is expected to be an array of transcript lines
  const [transcript, setTranscript] = useState<Array<{ id: number; start: number; end: number; text: string }>>([])
  // const [videoSrc, setVideoSrc] = useState<string>("")
  const [videoSrc, setVideoSrc] = useState<string>("/placeholder.svg")

  const videoRef = useRef<HTMLVideoElement>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const VID = videoId;
  // Use Axios to fetch video data if using the API
  useEffect(() => {
    console.log("haha")
    console.log(source)
    if (source === "api") {
      async function fetchVideoData() {
        try {
          const response = await axios.get(`http://localhost:8080/get_video/${VID}`);
          if (response.status === 200) {
            const data = response.data
            console.log("Hannan Gay")
            console.log(response.data.transcription)
            // Assume the video is in mp4 format. Adjust MIME type if needed.
            const base64Video = data.video
            setVideoSrc(`data:video/mp4;base64,${base64Video}`)
            // Set transcript with hardcoded id, start, and end values.
            setTranscript([{ id: 1, start: 0, end: 10, text: data.transcription }])
=======
  const [isLoading, setIsLoading] = useState(true)
  const [showControls, setShowControls] = useState(false)
  const [volume, setVolume] = useState(1)
  const [transcript, setTranscript] = useState<typeof sampleTranscript>([])
  const [videoSrc, setVideoSrc] = useState("/placeholder.svg")

  const videoRef = useRef<HTMLVideoElement>(null)
  const transcriptRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<HTMLDivElement>(null)

  // Fetch video data via API if source === "api", else use fallback sample data
  useEffect(() => {
    async function fetchVideoData() {
      setIsLoading(true)
      if (source === "api") {
        try {
          const response = await axios.get(`http://localhost:8080/get_video/${videoId}`)
          if (response.status === 200) {
            const data = response.data
            const base64Video = data.video
            setVideoSrc(`data:video/mp4;base64,${base64Video}`)
            setTranscript([{ id: 1, start: 0, end: 10, text: data.transcription }])
            setVideoTitle(data.title)
>>>>>>> hannan
          } else {
            console.error("Failed to fetch video data", response)
          }
        } catch (error) {
          console.error("Error fetching video data:", error)
<<<<<<< HEAD
          console.log("hannan", error)
        }
      }
      fetchVideoData()
    } else {
      // Fallback: use the local sample transcript and video placeholder
      setTranscript(sampleTranscript)
      setVideoSrc("/placeholder.svg")
    }
=======
        } finally {
          setIsLoading(false)
        }
      } else {
        // Fallback: use sample transcript and placeholder video
        setTranscript(sampleTranscript)
        setVideoSrc("/placeholder.svg")
        setIsLoading(false)
      }
    }
    fetchVideoData()
>>>>>>> hannan
  }, [source, videoId])

  // Handle video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const time = videoRef.current.currentTime
      setCurrentTime(time)
      const activeLine = transcript.find((line) => time >= line.start && time <= line.end)
      if (activeLine && activeLine.id !== activeLineId) {
        setActiveLineId(activeLine.id)
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

<<<<<<< HEAD
  // Format time in MM:SS
=======
  // Format time in MM:SS format
>>>>>>> hannan
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

<<<<<<< HEAD
  // Jump to specific transcript line
  const jumpToLine = (line: { id: number; start: number; end: number; text: string }) => {
=======
  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setIsMuted(newVolume === 0)
    }
  }

  // Jump to specific transcript line
  const jumpToLine = (line: (typeof sampleTranscript)[0]) => {
>>>>>>> hannan
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

<<<<<<< HEAD
=======
  // Skip forward/backward
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds
      setCurrentTime(videoRef.current.currentTime)
    }
  }

>>>>>>> hannan
  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  // Enter fullscreen
  const enterFullscreen = () => {
<<<<<<< HEAD
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen()
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
                  src={videoSrc}
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
                {source === "upload" ? "Your uploaded video" : "Video loaded from API"}
=======
    if (playerRef.current && playerRef.current.requestFullscreen) {
      playerRef.current.requestFullscreen()
    }
  }

  // Show/hide controls on hover
  const handleMouseEnter = () => setShowControls(true)
  const handleMouseLeave = () => setShowControls(false)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Updated header to match homepage */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Video className="h-6 w-6 text-primary" />
            <span className="gradient-heading">Impair Assist</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 container py-8">
        {/* Background gradient and decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background dark:from-primary/10 dark:via-background dark:to-background -z-10" />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl -z-10"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl -z-10"></div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Video Player Section */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-2 hover:border-primary/30 transition-colors duration-300">
              <div
                ref={playerRef}
                className="relative bg-black aspect-video"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="space-y-4 w-full px-8">
                      <Skeleton className="h-full w-full aspect-video" />
                    </div>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      className="w-full h-full"
                      src={videoSrc}
                      poster="/placeholder.svg?height=360&width=640"
                      onTimeUpdate={handleTimeUpdate}
                      onLoadedMetadata={handleLoadedMetadata}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                    />

                    {/* Video Controls Overlay */}
                    <AnimatePresence>
                      {(showControls || !isPlaying) && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-4 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-white">{formatTime(currentTime)}</span>
                              <div className="relative flex-1 group">
                                <input
                                  type="range"
                                  min="0"
                                  max={duration || 100}
                                  value={currentTime}
                                  onChange={handleSeek}
                                  className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer group-hover:h-2 transition-all duration-200"
                                  style={{
                                    background: `linear-gradient(to right, white ${
                                      (currentTime / (duration || 100)) * 100
                                    }%, rgba(255,255,255,0.3) ${
                                      (currentTime / (duration || 100)) * 100
                                    }%)`,
                                  }}
                                />
                                <div
                                  className="absolute top-0 h-1 group-hover:h-2 transition-all duration-200 rounded-lg bg-primary"
                                  style={{
                                    width: `${(currentTime / (duration || 100)) * 100}%`,
                                  }}
                                />
                              </div>
                              <span className="text-xs text-white">{formatTime(duration)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-white p-1 rounded-full hover:bg-white/10"
                                  onClick={() => skip(-10)}
                                >
                                  <SkipBack className="h-5 w-5" />
                                </motion.button>

                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-white p-2 rounded-full bg-white/20 hover:bg-white/30"
                                  onClick={togglePlay}
                                >
                                  {isPlaying ? (
                                    <Pause className="h-5 w-5" />
                                  ) : (
                                    <Play className="h-5 w-5" fill="currentColor" />
                                  )}
                                </motion.button>

                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  className="text-white p-1 rounded-full hover:bg-white/10"
                                  onClick={() => skip(10)}
                                >
                                  <SkipForward className="h-5 w-5" />
                                </motion.button>

                                <div className="flex items-center gap-1 group relative">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-white p-1 rounded-full hover:bg-white/10"
                                    onClick={toggleMute}
                                  >
                                    {isMuted || volume === 0 ? (
                                      <VolumeX className="h-5 w-5" />
                                    ) : (
                                      <Volume2 className="h-5 w-5" />
                                    )}
                                  </motion.button>

                                  <div className="w-0 overflow-hidden group-hover:w-20 transition-all duration-300">
                                    <input
                                      type="range"
                                      min="0"
                                      max="1"
                                      step="0.01"
                                      value={volume}
                                      onChange={handleVolumeChange}
                                      className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                                      style={{
                                        background: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.3) ${volume * 100}%)`,
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="text-white p-1 rounded-full hover:bg-white/10"
                                onClick={enterFullscreen}
                              >
                                <Maximize className="h-5 w-5" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Center play button when paused */}
                    {!isPlaying && !showControls && (
                      <motion.button
                        className="absolute inset-0 flex items-center justify-center"
                        onClick={togglePlay}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <div className="rounded-full bg-white/20 p-4">
                          <Play className="h-8 w-8 text-white" fill="white" />
                        </div>
                      </motion.button>
                    )}
                  </>
                )}
              </div>
            </Card>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold gradient-heading">{videoTitle}</h2>
              <p className="text-muted-foreground dark:text-gray-200">
                {source === "upload" ? "Your uploaded video" : "Sample video from our library"}
>>>>>>> hannan
              </p>
            </div>
          </div>

          {/* Transcript Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
<<<<<<< HEAD
              <h2 className="text-xl font-bold">Transcript</h2>
              <p className="text-sm text-muted-foreground">Click on any line to jump to that part of the video</p>
            </div>
            <Card>
              <ScrollArea className="h-[500px] rounded-md" ref={transcriptRef}>
                <div className="p-4 space-y-2">
                  {transcript && transcript.length > 0 ? (
                    transcript.map((line) => (
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
                    ))
                  ) : (
                    <p>Loading transcript...</p>
                  )}
                </div>
              </ScrollArea>
=======
              <h2 className="text-xl font-bold gradient-heading">Transcript</h2>
              <p className="text-sm text-muted-foreground dark:text-gray-200">
                Click on any line to jump to that part of the video
              </p>
            </div>
            <Card className="border-2 hover:border-primary/30 transition-colors duration-300">
              {isLoading ? (
                <div className="p-4 space-y-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="flex gap-2">
                      <Skeleton className="h-5 w-12" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-3/4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <ScrollArea className="h-[325px] rounded-md" ref={transcriptRef}>
                  <div className="p-4 space-y-2">
                    {transcript.map((line) => (
                      <motion.div
                        key={line.id}
                        id={`line-${line.id}`}
                        className={`transcript-line cursor-pointer rounded-lg ${
                          activeLineId === line.id ? "active" : ""
                        }`}
                        onClick={() => jumpToLine(line)}
                        whileHover={{ backgroundColor: "rgba(2, 63, 108, 0.05)" }}
                        animate={
                          activeLineId === line.id
                            ? { backgroundColor: "rgba(2, 63, 108, 0.1)", transition: { duration: 0.3 } }
                            : {}
                        }
                      >
                        <div className="flex items-start gap-2">
                          <span className="text-xs text-muted-foreground dark:text-gray-200 pt-1 w-12 shrink-0">
                            {formatTime(line.start)}
                          </span>
                          <p className="dark:text-gray-200">{line.text}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </ScrollArea>
              )}
>>>>>>> hannan
            </Card>
          </div>
        </div>
      </main>
<<<<<<< HEAD
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
=======
      <footer className="border-t py-6 bg-[#b8c7d8] dark:bg-black">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground dark:text-gray-200 md:text-left">
>>>>>>> hannan
            © 2025 Impair Assist. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
