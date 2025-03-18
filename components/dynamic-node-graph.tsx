"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimationControls, AnimatePresence } from "framer-motion"

interface Node {
  id: string
  x: number
  y: number
  size: number
  label?: string
  color: string
  isMain?: boolean
}

interface Connection {
  source: string
  target: string
  strength: number
}

export function DynamicNodeGraph() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [nodes, setNodes] = useState<Node[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [zoomPhase, setZoomPhase] = useState(0) // 0: initial, 1: zooming, 2: zoomed
  const controls = useAnimationControls()
  const bgControls = useAnimationControls()
  const [isClient, setIsClient] = useState(false)

  // Words related to accessibility and video transcription
  const nodeLabels = [
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
  ]

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!containerRef.current || !isClient) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [isClient])

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return

    // Create nodes in a more structured way
    const newNodes: Node[] = []

    // Create the main "Impair Assist" node in the center
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    const mainNode: Node = {
      id: "main",
      x: centerX,
      y: centerY - 20, // Position it slightly higher initially
      size: 60, // Make it larger
      label: "Impair Assist",
      color: "gradient",
      isMain: true,
    }
    newNodes.push(mainNode)

    // Create other nodes in a more structured circular pattern
    const nodeCount = nodeLabels.length
    const radius = Math.min(dimensions.width, dimensions.height) * 0.3

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      // Add slight randomness to make it look more natural
      const jitter = Math.random() * 0.1 - 0.05
      const finalAngle = angle + jitter

      const x = centerX + Math.cos(finalAngle) * radius
      const y = centerY + Math.sin(finalAngle) * radius

      const node: Node = {
        id: `node-${i}`,
        x,
        y,
        size: Math.random() * 10 + 20, // Larger nodes
        label: nodeLabels[i],
        color: i % 2 === 0 ? "primary" : "secondary", // Alternate colors
      }
      newNodes.push(node)
    }

    // Create connections more deliberately
    const newConnections: Connection[] = []

    // Connect main node to all other nodes
    for (let i = 1; i < newNodes.length; i++) {
      newConnections.push({
        source: "main",
        target: newNodes[i].id,
        strength: 0.8,
      })
    }

    // Connect nodes to their neighbors to form a circle
    for (let i = 1; i < newNodes.length; i++) {
      const nextIndex = i === newNodes.length - 1 ? 1 : i + 1
      newConnections.push({
        source: newNodes[i].id,
        target: newNodes[nextIndex].id,
        strength: 0.6,
      })

      // Add a few cross connections for visual interest
      if (i % 3 === 0) {
        const targetIndex = ((i + Math.floor(newNodes.length / 2)) % (newNodes.length - 1)) + 1
        newConnections.push({
          source: newNodes[i].id,
          target: newNodes[targetIndex].id,
          strength: 0.4,
        })
      }
    }

    setNodes(newNodes)
    setConnections(newConnections)

    // Start animation sequence
    const startAnimation = async () => {
      // Initial movement animation
      await controls.start({
        opacity: 1,
        transition: { duration: 0.8 },
      })

      // Wait a bit before zooming
      setTimeout(() => {
        setZoomPhase(1) // Start zooming

        // After zoom completes, show only the main node
        setTimeout(() => {
          setZoomPhase(2) // Zoomed in

          // Start background animation after zoom completes
          bgControls.start({
            opacity: 1,
            scale: 1,
            transition: { duration: 1.5, ease: "easeOut" },
          })
        }, 2000)
      }, 3000)
    }

    startAnimation()
  }, [dimensions, controls, bgControls, isClient, nodeLabels])

  // Animation for nodes based on zoom phase
  const getNodeAnimation = (node: Node) => {
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    if (zoomPhase === 0) {
      // Initial phase - gentle floating movement
      if (node.isMain) {
        // Keep main node more stable with minimal movement
        return {
          x: centerX, // Always centered
          y: centerY - 20, // Slightly higher
          opacity: 1,
          scale: 1.2, // Slightly larger
          transition: {
            y: {
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse" as const,
              ease: "easeInOut",
              from: centerY - 20,
              to: centerY - 25, // Very subtle movement
            },
          },
        }
      } else {
        // Other nodes can move more freely
        return {
          x: node.x + (Math.random() * 10 - 5),
          y: node.y + (Math.random() * 10 - 5),
          opacity: 1,
          scale: 1,
          transition: {
            x: {
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse" as const,
              ease: "easeInOut",
            },
            y: {
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse" as const,
              ease: "easeInOut",
            },
          },
        }
      }
    } else if (zoomPhase === 1) {
      // Zooming phase - move towards or away from center
      if (node.isMain) {
        // Main node grows and stays centered
        return {
          x: centerX,
          y: centerY - 30, // Move it up by 30px
          scale: 2,
          opacity: 1,
          transition: { duration: 2, ease: "easeInOut" },
        }
      } else {
        // Other nodes fade out and move away
        const angle = Math.atan2(node.y - centerY, node.x - centerX)
        const distance = Math.sqrt(Math.pow(node.x - centerX, 2) + Math.pow(node.y - centerY, 2))
        const newDistance = distance * 1.5

        return {
          x: centerX + Math.cos(angle) * newDistance,
          y: centerY + Math.sin(angle) * newDistance,
          opacity: 0,
          scale: 0.5,
          transition: { duration: 2, ease: "easeInOut" },
        }
      }
    } else {
      // Final zoomed phase - only main node visible
      if (node.isMain) {
        return {
          x: centerX, // Explicitly center the node horizontally
          y: centerY - 30, // Move it up by 30px as requested
          scale: 2.5,
          opacity: 1, // Ensure opacity is 1
          transition: {
            duration: 1,
            ease: "easeInOut",
            scale: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse" as const,
              ease: "easeInOut",
              from: 2.5,
              to: 2.7,
            },
          },
        }
      } else {
        return {
          opacity: 0,
          scale: 0,
          transition: { duration: 0.5 },
        }
      }
    }
  }

  // Get connection points between nodes
  const getConnectionPoints = (source: Node, target: Node) => {
    const dx = target.x - source.x
    const dy = target.y - source.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Calculate connection points at the edge of each node
    const sourceRadius = source.size / 2
    const targetRadius = target.size / 2

    const ratio1 = sourceRadius / distance
    const ratio2 = targetRadius / distance

    const x1 = source.x + dx * ratio1
    const y1 = source.y + dy * ratio1
    const x2 = target.x - dx * ratio2
    const y2 = target.y - dy * ratio2

    return { x1, y1, x2, y2 }
  }

  // Generate random particles for the background effect
  const generateParticles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 4 + 2
      const x = Math.random() * dimensions.width
      const y = Math.random() * dimensions.height
      const delay = Math.random() * 2

      return (
        <motion.circle
          key={`particle-${i}`}
          cx={x}
          cy={y}
          r={size}
          fill={Math.random() > 0.5 ? "#023F6C" : "#830027"}
          opacity={Math.random() * 0.3 + 0.1}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, Math.random() * 0.3 + 0.1, 0],
            cx: x + (Math.random() * 100 - 50),
            cy: y + (Math.random() * 100 - 50),
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: delay,
            ease: "linear",
          }}
        />
      )
    })
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[300px] bg-[#d0dbe8] dark:bg-gray-900 overflow-hidden rounded-xl"
    >
      {/* Cool background effect that appears after zoom */}
      {dimensions.width > 0 && (
        <motion.div className="absolute inset-0 z-0" initial={{ opacity: 0, scale: 0.8 }} animate={bgControls}>
          {/* Radial gradient background */}
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent dark:from-primary/20" />

          {/* Animated circles */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Pulsing circle behind main node */}
            <motion.circle
              cx={dimensions.width / 2}
              cy={dimensions.height / 2 - 30} // Move it up by 30px
              r={80}
              fill="url(#radial-gradient)"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 0.4, // Increased opacity
                scale: [1, 1.5, 1],
                r: [80, 100, 80],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            />

            {/* Random floating particles */}
            {generateParticles(30)}

            {/* Gradient definitions */}
            <defs>
              <radialGradient id="radial-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#023F6C" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#830027" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#830027" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>

          {/* Subtle mesh pattern */}
          <div className="absolute inset-0 bg-gradient-mesh opacity-15 dark:opacity-10" />
        </motion.div>
      )}

      <AnimatePresence>
        {dimensions.width > 0 && (
          <motion.svg className="absolute inset-0 w-full h-full z-10" initial={{ opacity: 0 }} animate={controls}>
            {/* Connections */}
            {connections.map((connection, index) => {
              const sourceNode = nodes.find((n) => n.id === connection.source)
              const targetNode = nodes.find((n) => n.id === connection.target)

              if (!sourceNode || !targetNode) return null

              const { x1, y1, x2, y2 } = getConnectionPoints(sourceNode, targetNode)

              // Determine if connection involves main node
              const isMainConnection = sourceNode.isMain || targetNode.isMain

              return (
                <motion.line
                  key={`connection-${index}`}
                  x1={sourceNode.x}
                  y1={sourceNode.y}
                  x2={targetNode.x}
                  y2={targetNode.y}
                  stroke={isMainConnection ? "url(#line-gradient)" : "#CBD5E1"}
                  strokeWidth={isMainConnection ? 2 : 1}
                  strokeOpacity={connection.strength}
                  initial={{ pathLength: 0 }}
                  animate={{
                    pathLength: 1,
                    x1: x1,
                    y1: y1,
                    x2: x2,
                    y2: y2,
                    opacity: zoomPhase > 0 ? 0 : 1,
                  }}
                  transition={{
                    pathLength: { duration: 1.5, delay: index * 0.01 },
                    opacity: { duration: 1 },
                  }}
                />
              )
            })}

            {/* Gradient definitions */}
            <defs>
              <linearGradient id="node-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#023F6C" /> {/* Primary blue */}
                <stop offset="100%" stopColor="#830027" /> {/* Secondary red */}
              </linearGradient>
              <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#023F6C" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#830027" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Nodes */}
            {nodes.map((node) => (
              <motion.g key={node.id} initial={{ opacity: 0 }} animate={getNodeAnimation(node)}>
                {/* Glow effect for main node in final state */}
                {node.isMain && zoomPhase === 2 && (
                  <motion.circle
                    cx={dimensions.width / 2}
                    cy={dimensions.height / 2 - 30} // Move it up by 30px to match the node
                    r={node.size / 2 + 15} // Slightly larger glow
                    fill="url(#node-gradient)"
                    opacity={0.5} // Increased opacity
                    filter="url(#glow)"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                  />
                )}

                {/* Node circle */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size / 2}
                  fill={
                    node.color === "gradient" ? "url(#node-gradient)" : node.color === "primary" ? "#023F6C" : "#830027"
                  }
                  opacity={node.isMain ? 1 : 0.8}
                  filter={node.isMain && zoomPhase === 2 ? "url(#glow)" : ""}
                />

                {/* Node label */}
                {node.label && (
                  <motion.text
                    x={node.x}
                    y={node.isMain ? node.y + node.size / 2 + 30 : node.y + node.size / 2 + 20} // Position main node text lower
                    textAnchor="middle"
                    fill={node.isMain ? "url(#node-gradient)" : node.color === "primary" ? "#023F6C" : "#830027"}
                    fontSize={node.isMain ? 20 : 14} // Increase main node font size
                    fontWeight={node.isMain ? "bold" : "normal"}
                    className="pointer-events-none"
                    style={{
                      textShadow: node.isMain ? "0 0 8px rgba(255,255,255,0.7)" : "none", // Add stronger text shadow for visibility
                      opacity: node.isMain && zoomPhase === 2 ? 1 : undefined, // Ensure main node text is always visible in final state
                    }}
                  >
                    {node.label}
                  </motion.text>
                )}

                {/* Additional text element for final state */}
                {node.isMain && zoomPhase === 2 && (
                  <motion.text
                    x={dimensions.width / 2}
                    y={dimensions.height / 2 + 30} // Position below the node
                    textAnchor="middle"
                    fill="url(#node-gradient)"
                    fontSize={22} // Even larger for final state
                    fontWeight="bold"
                    className="pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    style={{
                      textShadow: "0 0 10px rgba(255,255,255,0.8)", // Stronger glow
                    }}
                  >
                    Impair Assist
                  </motion.text>
                )}
              </motion.g>
            ))}
          </motion.svg>
        )}
      </AnimatePresence>
    </div>
  )
}

