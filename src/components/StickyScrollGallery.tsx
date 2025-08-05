"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface StickyScrollGalleryProps {
  leftImages: string[];
  staticImage: string;
  rightImages: string[];
  className?: string;
}

export const StickyScrollGallery = ({
  leftImages,
  staticImage,
  rightImages,
  className = "",
}: StickyScrollGalleryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const scrollProgress = useMotionValue(0);

  const leftY = useTransform(scrollProgress, [0, 1], ["0%", "-40%"]);
  const rightY = useTransform(scrollProgress, [0, 1], ["0%", "40%"]);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!isInView || !containerRef.current) return;

      const currentProgress = scrollProgress.get();

      if (currentProgress >= 1 && e.deltaY > 0) {
        setIsInView(false);
        return;
      }

      if (currentProgress <= 0 && e.deltaY < 0) {
        setIsInView(false);
        return;
      }

      e.preventDefault();

      const delta = e.deltaY * 0.001;
      const newProgress = Math.max(0, Math.min(1, currentProgress + delta));
      scrollProgress.set(newProgress);
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.5,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    if (isInView) {
      window.addEventListener("wheel", handleScroll, { passive: false });
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", handleScroll);
    };
  }, [isInView, scrollProgress]);

  return (
    <div
      ref={containerRef}
      className={`relative h-screen bg-custom-black ${className}`}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid grid-cols-3 gap-2 h-full p-2">
          <motion.div
            className="flex flex-col gap-2 h-full overflow-hidden"
            style={{ y: leftY }}
          >
            <div className="flex flex-col gap-2">
              {[...leftImages, ...leftImages].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index}`}
                  className="w-full h-64 object-cover rounded-md flex-shrink-0"
                />
              ))}
            </div>
          </motion.div>

          <div className="flex items-center justify-center h-full">
            <img
              src={staticImage}
              alt="Featured"
              className="w-full h-full object-cover rounded-md"
            />
          </div>

          <motion.div
            className="flex flex-col gap-2 h-full overflow-hidden"
            style={{ y: rightY }}
          >
            <div className="flex flex-col gap-2">
              {[...rightImages, ...rightImages].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Gallery ${index}`}
                  className="w-full h-64 object-cover rounded-md flex-shrink-0"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
