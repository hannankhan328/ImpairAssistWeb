import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { FloatingActionButton } from "@/components/floating-action-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Impair Assist",
  description: "Video transcription and accessibility tool",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
          <FloatingActionButton />
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'