"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimationControls } from "framer-motion"

interface Point {
  x: number
  y: number
}

interface Word {
  text: string
  position: Point
  rotation: number
  fontSize: number
  outline: boolean
  color: string
}

interface Connection {
  start: Point
  end: Point
  controlPoints?: Point[]
  color: string
}

export function NetworkText() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [words, setWords] = useState<Word[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [nodes, setNodes] = useState<Point[]>([])
  const controls = useAnimationControls()
  const [isClient, setIsClient] = useState(false)

  // More relevant words for ImpairAssist
  const keywords = [
    "Impair",
    "Assist",
    "Video",
    "Audio",
    "Caption",
    "Transcript",
    "Text",
    "Accessibility",
    "Support",
    "Vision",
    "Hearing",
    "Analyze",
    "Interface",
    "Technology",
    "Understand",
    "Recognition",
    "Learning",
    "Enhance",
    "Communication",
    "Clarity",
  ]

  // Color palette
  const colors = [
    "text-primary",
    "text-secondary",
    "text-primary/80",
    "text-secondary/80",
    "text-primary/60",
    "text-secondary/60",
  ]

  const connectionColors = ["primary", "secondary", "primary/70", "secondary/70"]

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!containerRef.current || !isClient) return

    const container = containerRef.current
    const { width, height } = container.getBoundingClientRect()

    // Distribute words in diagonal grid pattern
    const grid = createDiagonalGrid(width, height, keywords.length)

    // Generate words with positions from grid
    const newWords: Word[] = keywords.map((text, i) => {
      const pos = grid[i]
      // Alternate outlining some words for visual effect
      const outline = Math.random() > 0.7
      const color = colors[Math.floor(Math.random() * colors.length)]

      return {
        text,
        position: { x: pos.x, y: pos.y },
        rotation: -25 + Math.random() * 50, // Random rotation between -25 and 25 degrees
        fontSize: 8 + Math.random() * 6, // Random size variation
        outline,
        color,
      }
    })

    // Generate connecting lines and nodes
    const newConnections: Connection[] = []
    const newNodes: Point[] = []

    // Create a graph-like structure with the words
    newWords.forEach((word, i) => {
      // Connect each word to 2-3 nearby words
      const nearbyWords = findNearbyWords(word, newWords, 3)

      nearbyWords.forEach((nearbyWord) => {
        // Create a simple connection with random color
        const connectionColor = connectionColors[Math.floor(Math.random() * connectionColors.length)]

        newConnections.push({
          start: word.position,
          end: nearbyWord.position,
          color: connectionColor,
        })

        // Add nodes along the connection
        const nodeCount = Math.floor(Math.random() * 2) + 1
        for (let j = 1; j <= nodeCount; j++) {
          const t = j / (nodeCount + 1)
          const offsetX = (Math.random() - 0.5) * 5
          const offsetY = (Math.random() - 0.5) * 5

          newNodes.push({
            x: word.position.x + (nearbyWord.position.x - word.position.x) * t + offsetX,
            y: word.position.y + (nearbyWord.position.y - word.position.y) * t + offsetY,
          })
        }
      })
    })

    setWords(newWords)
    setConnections(newConnections)
    setNodes(newNodes)

    // Animate in
    controls.start({
      opacity: 1,
      transition: { duration: 0.8 },
    })
  }, [controls, isClient, keywords, colors, connectionColors])

  // Create a diagonal grid to position elements
  const createDiagonalGrid = (width: number, height: number, count: number): Point[] => {
    const points: Point[] = []
    const padding = 10 // Padding from the edge of the container
    const usableWidth = width - padding * 2
    const usableHeight = height - padding * 2

    // Calculate rows and columns to distribute words
    const aspectRatio = usableWidth / usableHeight
    const cols = Math.ceil(Math.sqrt(count * aspectRatio))
    const rows = Math.ceil(count / cols)

    const cellWidth = usableWidth / cols
    const cellHeight = usableHeight / rows

    let index = 0

    // Create a diagonal-oriented grid
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (index < count) {
          // Base position
          const x = padding + j * cellWidth + cellWidth / 2
          const y = padding + i * cellHeight + cellHeight / 2

          // Add some randomness to the position
          const randomX = (Math.random() - 0.5) * cellWidth * 0.8
          const randomY = (Math.random() - 0.5) * cellHeight * 0.8

          points.push({
            x: x + randomX,
            y: y + randomY,
          })

          index++
        }
      }
    }

    // Shuffle the points for more randomness
    return shuffle(points)
  }

  // Find nearby words for connections
  const findNearbyWords = (word: Word, allWords: Word[], count: number): Word[] => {
    const otherWords = allWords.filter((w) => w !== word)

    // Sort by distance
    const sortedWords = otherWords.sort((a, b) => {
      const distA = Math.hypot(a.position.x - word.position.x, a.position.y - word.position.y)
      const distB = Math.hypot(b.position.x - word.position.x, b.position.y - word.position.y)
      return distA - distB
    })

    // Take only the closest few
    return sortedWords.slice(0, count)
  }

  // Shuffle array helper
  const shuffle = <T,>(array: T[]): T[] => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-[250px] overflow-hidden bg-white dark:bg-black"
      initial={{ opacity: 0 }}
      animate={controls}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 decorative-dots opacity-5"></div>

      {/* SVG for connections */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((connection, i) => (
          <motion.line
            key={i}
            x1={connection.start.x}
            y1={connection.start.y}
            x2={connection.end.x}
            y2={connection.end.y}
            stroke={`currentColor`}
            className={`text-${connection.color}`}
            strokeWidth={i % 3 === 0 ? "0.5" : "0.3"}
            strokeDasharray={i % 3 === 0 ? "none" : "3 3"}
            opacity={i % 3 === 0 ? 0.6 : 0.3}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 6, delay: i * 0.01, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* Nodes at connection points */}
      {nodes.map((node, i) => {
        const nodeColor = i % 2 === 0 ? "bg-primary" : "bg-secondary"
        return (
          <motion.div
            key={`node-${i}`}
            className={`absolute w-1.5 h-1.5 ${nodeColor} rounded-full opacity-70`}
            style={{ left: node.x - 1, top: node.y - 1 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.4, delay: 0.8 + i * 0.02 }}
          />
        )
      })}

      {/* Words */}
      {words.map((word, i) => (
        <motion.div
          key={`word-${i}`}
          className={`absolute font-mono whitespace-nowrap ${word.color}`}
          style={{
            left: word.position.x,
            top: word.position.y,
            transform: `translate(-50%, -50%) rotate(${word.rotation}deg)`,
            fontSize: `${word.fontSize}px`,
            fontWeight: "bold",
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
          whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
        >
          {word.outline ? (
            <span className="px-1 py-0.5 border border-current inline-block">{word.text}</span>
          ) : (
            <span>{word.text}</span>
          )}
        </motion.div>
      ))}
    </motion.div>
  )
}

