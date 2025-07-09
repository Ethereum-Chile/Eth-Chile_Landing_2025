"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Logo {
  name: string;
  id: number;
  img: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

interface LogoCarouselProps {
  logos: Logo[];
  columnCount?: number;
  className?: string;
}

export function LogoCarousel({ logos, columnCount = 3, className = "" }: LogoCarouselProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  const columns = Array.from({ length: columnCount }, (_, i) => {
    const startIndex = Math.floor((i * duplicatedLogos.length) / columnCount);
    const endIndex = Math.floor(((i + 1) * duplicatedLogos.length) / columnCount);
    return duplicatedLogos.slice(startIndex, endIndex);
  });

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-8">
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="flex flex-col gap-8 min-w-[200px]"
          >
            {column.map((logo, logoIndex) => (
              <motion.div
                key={`${logo.id}-${logoIndex}`}
                className="flex items-center justify-center p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (columnIndex * 0.1) + (logoIndex * 0.05),
                }}
                whileHover={{ scale: 1.05 }}
              >
                <logo.img
                  className="w-16 h-16 md:w-20 md:h-20 opacity-70 hover:opacity-100 transition-opacity"
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-custom-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-custom-black to-transparent pointer-events-none" />
    </div>
  );
} 