"use client"

import HeroBackground from "@/components/hero-background"
import Link from "next/link"
import { Video, Upload, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { ProcessFlowAnimation } from "@/components/process-flow-animation"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header moved to the top */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Video className="h-6 w-6 text-primary" />
            <span className="gradient-heading">Impair Assist</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section with Background Paths */}
      <HeroBackground />

      <main className="flex-1">
        <section className="relative overflow-hidden bg-[#d0dbe8] dark:bg-gray-900 py-8">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-mesh opacity-15 dark:opacity-10"></div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl -z-10"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl -z-10"></div>

          <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="gradient-heading">Video Transcription Made Easy</h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Upload your video or choose from our library to get started with real-time transcription.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2">
            <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border-2 hover:border-primary/50">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-primary dark:text-primary-foreground">Upload Video</CardTitle>
                  <CardDescription>Upload your own video file for transcription</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-2">
                  <div className="rounded-full bg-primary/10 dark:bg-primary/30 p-6 group-hover:bg-primary/20 dark:group-hover:bg-primary/40 transition-colors duration-300">
                    <Upload className="h-10 w-10 text-primary" />
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Link href="/upload" className="w-full">
                    <Button size="lg" className="w-full group bg-primary hover:bg-primary/90 text-white">
                      Upload Video
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border-2 hover:border-secondary/50">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-secondary dark:text-secondary-foreground">
                    Use Sample Video
                  </CardTitle>
                  <CardDescription>Choose from our pre-uploaded video library</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pb-2">
                  <div className="rounded-full bg-secondary/10 dark:bg-secondary/30 p-6 group-hover:bg-secondary/20 dark:group-hover:bg-secondary/40 transition-colors duration-300">
                    <Video className="h-10 w-10 text-secondary" />
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Link href="/samples" className="w-full">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full group border-secondary/50 hover:border-secondary text-secondary dark:text-secondary-foreground"
                    >
                      Browse Samples
                      <ArrowRight className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#c2d0e0] dark:bg-[#111827] relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 decorative-dots opacity-5"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="gradient-heading">How It Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground dark:text-gray-200 md:text-xl">
                  Our platform makes it easy to follow along with video content
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader className="text-center">
                  <div className="mx-auto rounded-full bg-primary/10 dark:bg-primary/30 p-4 mb-4 group-hover:bg-primary/20 dark:group-hover:bg-primary/40 transition-colors duration-300">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-primary dark:text-primary-foreground">Upload</CardTitle>
                  <CardDescription>Upload your video or select from our samples</CardDescription>
                </CardHeader>
              </Card>
              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-secondary/50">
                <CardHeader className="text-center">
                  <div className="mx-auto rounded-full bg-secondary/10 dark:bg-secondary/30 p-4 mb-4 group-hover:bg-secondary/20 dark:group-hover:bg-secondary/40 transition-colors duration-300">
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
                      className="h-6 w-6 text-secondary"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </div>
                  <CardTitle className="text-secondary dark:text-secondary-foreground">Transcribe</CardTitle>
                  <CardDescription>Our system automatically transcribes your video</CardDescription>
                </CardHeader>
              </Card>
              <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 hover:border-primary/50">
                <CardHeader className="text-center">
                  <div className="mx-auto rounded-full bg-primary/10 dark:bg-primary/30 p-4 mb-4 group-hover:bg-primary/20 dark:group-hover:bg-primary/40 transition-colors duration-300">
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
                  <CardTitle className="text-primary dark:text-primary-foreground">Watch & Read</CardTitle>
                  <CardDescription>Follow along with synchronized transcript highlighting</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* New section: ImpairAssist Visualized */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#d0dbe8] dark:bg-gray-900 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-mesh opacity-15 dark:opacity-10"></div>

          {/* Decorative elements */}
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl -z-10"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl -z-10"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="gradient-heading">ImpairAssist Visualized</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground dark:text-gray-200 md:text-xl">
                  See how our multi-model approach processes audio and visual inputs to generate accurate captions
                </p>
              </div>
              <div className="w-full py-8">
                <ProcessFlowAnimation />
              </div>
              <p className="text-sm text-muted-foreground dark:text-gray-200 max-w-2xl">
                Our advanced system combines audio speech recognition with visual lip movement analysis, using
                cross-attention mechanisms to improve accuracy in challenging environments.
              </p>
            </div>
          </div>
        </section>

        {/* About Impair Assist Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#b8c7d8] dark:bg-[#0f172a] relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-gradient-mesh opacity-15 dark:opacity-10"></div>

          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl -z-10"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl -z-10"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-heading">
                  About Impair Assist
                </h2>
                <p className="mx-auto max-w-[800px] text-lg text-muted-foreground dark:text-gray-200 leading-relaxed">
                  Impair Assist aims to bridge the communication gap for the hearing impaired by creating robust,
                  accurate captions that combine the outputs of both audio and visual input analysis.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 text-left">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary dark:text-primary-foreground">Our Mission</h3>
                    <p className="text-muted-foreground dark:text-gray-200">
                      We believe that everyone deserves equal access to video content. Our advanced captioning
                      technology analyzes both audio speech patterns and visual lip movements to generate highly
                      accurate transcriptions, even in challenging environments with background noise or multiple
                      speakers.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-secondary dark:text-secondary-foreground">
                      Our Technology
                    </h3>
                    <p className="text-muted-foreground dark:text-gray-200">
                      Using a multi-modal approach that combines state-of-the-art speech recognition with visual lip
                      reading AI, Impair Assist creates synchronized captions that are more accurate than traditional
                      methods. Our cross-attention mechanism intelligently weighs inputs from both modalities to produce
                      the most reliable transcription possible.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link href="/upload">
                  <Button size="lg" className="group bg-primary hover:bg-primary/90 text-white">
                    Try Impair Assist Today
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0 bg-[#b8c7d8] dark:bg-black">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground dark:text-gray-200 md:text-left">
            © 2025 Impair Assist. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

