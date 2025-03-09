import type { Metadata } from "next"
import Link from "next/link"
import { Upload, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

export const metadata: Metadata = {
  title: "Impair Assist - Video Transcription",
  description: "Upload or select a video to get started with Impair Assist",
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Video className="h-6 w-6" />
            <span>Impair Assist</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Video Transcription Made Easy
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Upload your video or choose from our library to get started with real-time transcription.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
              <Card className="flex flex-col items-center justify-center transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Upload Video</CardTitle>
                  <CardDescription>Upload your own video file for transcription</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-2">
                  <div className="rounded-full bg-primary/10 p-6">
                    <Upload className="h-10 w-10 text-primary" />
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Link href="/upload" className="w-full">
                    <Button size="lg" className="w-full">
                      Upload Video
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="flex flex-col items-center justify-center transition-all hover:shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Use Sample Video</CardTitle>
                  <CardDescription>Choose from our pre-uploaded video library</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-2">
                  <div className="rounded-full bg-primary/10 p-6">
                    <Video className="h-10 w-10 text-primary" />
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Link href="/samples" className="w-full">
                    <Button size="lg" variant="outline" className="w-full">
                      Browse Samples
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Our platform makes it easy to follow along with video content
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Upload</h3>
                <p className="text-center text-muted-foreground">Upload your video or select from our samples</p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Transcribe</h3>
                <p className="text-center text-muted-foreground">Our system automatically transcribes your video</p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Watch & Read</h3>
                <p className="text-center text-muted-foreground">
                  Follow along with synchronized transcript highlighting
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 Impair Assist. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

