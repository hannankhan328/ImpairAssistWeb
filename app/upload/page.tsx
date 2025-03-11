"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload } from "lucide-react"
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
import axios, { AxiosResponse } from "axios"


export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [showDialog, setShowDialog] = useState(false)

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
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Upload Your Video
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Drag and drop your video file or click to browse
              </p>
            </div>
            <div
              className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center ${
                isDragging ? "border-primary bg-primary/5" : "border-border"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="rounded-full bg-primary/10 p-6">
                  <Upload className="h-10 w-10 text-primary" />
                </div>
                <div className="space-y-2">
                  <p className="text-xl font-medium">
                    {isDragging ? "Drop your video here" : "Drag & drop your video here"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports MP4, WebM, and MOV formats up to 500MB
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">or</span>
                <label htmlFor="video-upload">
                  <input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
            <div className="space-y-4 text-center">
              <h2 className="text-xl font-semibold">Supported Formats</h2>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <div className="rounded-md bg-muted px-3 py-1 text-sm">MP4</div>
                <div className="rounded-md bg-muted px-3 py-1 text-sm">WebM</div>
                <div className="rounded-md bg-muted px-3 py-1 text-sm">MOV</div>
                <div className="rounded-md bg-muted px-3 py-1 text-sm">AVI</div>
                <div className="rounded-md bg-muted px-3 py-1 text-sm">MKV</div>
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
              <p className="text-sm text-center text-muted-foreground">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={cancelUpload} disabled={isUploading}>
              Cancel
            </Button>
            <Button onClick={uploadFile} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  )
}
