"use client"
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
  const source = searchParams.get("source") || "upload"
  const videoId = searchParams.get("id") || "1"

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeLineId, setActiveLineId] = useState<number | null>(null)

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
          } else {
            console.error("Failed to fetch video data", response)
          }
        } catch (error) {
          console.error("Error fetching video data:", error)
          console.log("hannan", error)
        }
      }
      fetchVideoData()
    } else {
      // Fallback: use the local sample transcript and video placeholder
      setTranscript(sampleTranscript)
      setVideoSrc("/placeholder.svg")
    }
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

  // Format time in MM:SS
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
  const jumpToLine = (line: { id: number; start: number; end: number; text: string }) => {
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
