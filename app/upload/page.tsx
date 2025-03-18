"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Video, Upload, FileUp, CheckCircle2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { ThemeToggle } from "@/components/theme-toggle"
import { ConfettiEffect } from "@/components/confetti-effect"
import { motion } from "framer-motion"
import axios, { AxiosResponse } from "axios"


export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showDialog, setShowDialog] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type.startsWith("video/")) {
        setFile(droppedFile)
        setShowDialog(true)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a video file.",
          variant: "destructive",
        })
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      if (selectedFile.type.startsWith("video/")) {
        setFile(selectedFile)
        setShowDialog(true)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a video file.",
          variant: "destructive",
        })
      }
    }
  }

  const uploadFile = () => {
    if (!file) return

    setIsUploading(true)
    setUploadProgress(0)
    const formData = new FormData()
    formData.append("video", file)

    axios
      .post("http://localhost:8080/transcribe", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: progressEvent => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          )
          setUploadProgress(progress)
        },
      })
      .then(response => {
        setIsUploading(false)
        setShowDialog(false)
        // You can use the response data as needed.
        // For now, we navigate to the player page using the file name as a query parameter.
        router.push(
          `/player?source=api&id=${response.data.record_id}`
        )
      })
      .catch(error => {
        setIsUploading(false)
        toast({
          title: "Upload error",
          description:
            error.response?.data?.error || error.message || "An error occurred during upload.",
          variant: "destructive",
        })
      })
  }
  const cancelUpload = () => {
    setFile(null)
    setShowDialog(false)
    setIsUploading(false)
    setUploadProgress(0)
    setUploadComplete(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      {uploadComplete && <ConfettiEffect />}

      {/* Updated header to match homepage */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <ArrowLeft className="h-5 w-5" />
            <Video className="h-6 w-6 text-primary" />
            <span className="gradient-heading">Impair Assist</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 relative">
        {/* Background gradient updated to match homepage */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background dark:from-primary/10 dark:via-background dark:to-background -z-10" />

        {/* Decorative elements to match homepage */}
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl -z-10"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl -z-10"></div>

        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl gradient-heading">
                Upload Your Video
              </h1>
              <p className="text-muted-foreground dark:text-gray-200 md:text-xl">
                Drag and drop your video file or click to browse
              </p>
            </div>
            <motion.div
              className={`flex flex-col items-center justify-center rounded-lg border-4 border-dashed p-12 text-center ${
                isDragging ? "border-secondary bg-secondary/5" : "border-primary"
              } shadow-md hover:shadow-lg transition-all duration-300`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <motion.div
                  className="rounded-full bg-primary/10 p-6"
                  animate={{
                    scale: isDragging ? 1.1 : 1,
                    backgroundColor: isDragging ? "rgba(2, 63, 108, 0.2)" : "rgba(2, 63, 108, 0.1)",
                  }}
                >
                  <Upload className="h-10 w-10 text-primary" />
                </motion.div>
                <div className="space-y-2">
                  <p className="text-xl font-medium">
                    {isDragging ? "Drop your video here" : "Drag & drop your video here"}
                  </p>
                  <p className="text-sm text-muted-foreground dark:text-gray-200">
                    Supports MP4, WebM, and MOV formats up to 500MB
                  </p>
                </div>
                <span className="text-sm text-muted-foreground dark:text-gray-200">or</span>
                <label htmlFor="video-upload">
                  {/* <Button as="span" variant="outline" className="cursor-pointer group">
                    <FileUp className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-[-2px]" />
                    Browse Files
                  </Button> */}
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    // className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </motion.div>
            <div className="space-y-4 text-center">
              <h2 className="text-xl font-semibold">Supported Formats</h2>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <motion.div
                  className="rounded-md bg-muted px-3 py-1 text-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(2, 63, 108, 0.1)" }}
                >
                  MP4
                </motion.div>
                <motion.div
                  className="rounded-md bg-muted px-3 py-1 text-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(2, 63, 108, 0.1)" }}
                >
                  WebM
                </motion.div>
                <motion.div
                  className="rounded-md bg-muted px-3 py-1 text-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(2, 63, 108, 0.1)" }}
                >
                  MOV
                </motion.div>
                <motion.div
                  className="rounded-md bg-muted px-3 py-1 text-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(2, 63, 108, 0.1)" }}
                >
                  AVI
                </motion.div>
                <motion.div
                  className="rounded-md bg-muted px-3 py-1 text-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(2, 63, 108, 0.1)" }}
                >
                  MKV
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Video</DialogTitle>
            <DialogDescription>
              {file && `File: ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)} MB)`}
            </DialogDescription>
          </DialogHeader>
          {isUploading && (
            <div className="space-y-2 py-4">
              <Progress value={uploadProgress} className="h-2 w-full" />
              <p className="text-sm text-center text-muted-foreground dark:text-gray-200">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}
          {uploadComplete && (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
              >
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </motion.div>
              <p className="text-center font-medium">Upload Complete!</p>
              <p className="text-sm text-center text-muted-foreground dark:text-gray-200">Redirecting to player...</p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={cancelUpload} disabled={isUploading || uploadComplete}>
              Cancel
            </Button>
            <Button onClick={uploadFile} disabled={isUploading || uploadComplete} className="bg-primary text-white">
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  )
}
