"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
<<<<<<< HEAD
=======
import { motion } from "framer-motion"
>>>>>>> hannan

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
<<<<<<< HEAD
    <Button variant="outline" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
=======
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative overflow-hidden border-primary/20 dark:border-primary/40"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/20 dark:to-secondary/20"
        initial={false}
        animate={{ opacity: theme === "dark" ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      />
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-secondary" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-primary-foreground" />
>>>>>>> hannan
    </Button>
  )
}

