"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { HyperText } from "./HyperText.tsx"

interface Feature {
  step: string
  title?: string
  content: string
  image: string
}

interface FeatureStepsProps {
  features: Feature[]
  className?: string
  title?: string
  autoPlayInterval?: number
  imageHeight?: string
}

export function FeatureSteps({
  features,
  className,
  autoPlayInterval = 3000,
  imageHeight = "h-[400px]",
}: FeatureStepsProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isHovered) return; // Pause auto-slide when hovered

    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval, isHovered])

  const handleFeatureClick = (index: number) => {
    setCurrentFeature(index)
    setProgress(0)
  }

  return (
    <div className={`p-8 md:p-12 ${className || ""}`}>
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10">
          
          <div 
            className="order-2 md:order-1 flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="w-full max-w-lg"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div>
                        <h3 className="text-xl md:text-2xl font-semibold text-white">
                          {feature.title || feature.step}
                        </h3>
                        <p className="text-base md:text-xl text-gray-300">
                          {feature.content}
                        </p>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>

          <div
            className={`order-1 md:order-2 relative h-[200px] md:h-[300px] lg:h-[400px] overflow-hidden rounded-lg`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <AnimatePresence mode="wait">
              {features.map(
                (feature, index) =>
                  index === currentFeature && (
                    <motion.div
                      key={index}
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      initial={{ y: -100, opacity: 0, rotateX: 20 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: 100, opacity: 0, rotateX: -20 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      {feature.image.endsWith(".mp4") || feature.image.endsWith(".webm") ? (
                        <video
                          src={feature.image}
                          autoPlay
                          muted
                          loop
                          className="w-full h-full object-cover transition-transform transform"
                        />
                      ) : (
                        <img
                          src={feature.image}
                          alt={feature.step}
                          className="w-full h-full object-cover transition-transform transform"
                        />
                      )}
                      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-custom-black via-custom-black/50 to-transparent" />
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </div>
        
        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-3 mt-8">
          {features.map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentFeature
                  ? "bg-blue-500 scale-125"
                  : "bg-gray-500 hover:bg-gray-400"
              }`}
              initial={{ opacity: 0.5 }}
              animate={{ 
                opacity: index === currentFeature ? 1 : 0.5,
                scale: index === currentFeature ? 1.25 : 1
              }}
              transition={{ duration: 0.3 }}
              onClick={() => handleFeatureClick(index)}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 