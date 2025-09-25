'use client';

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { RaycastAnimatedBlueBackground } from "./ui/raycast-animated-blue-background";
import { useLanguage } from "../utils/language";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { getContent } = useLanguage();
  const content = getContent('hero');

  return (
    <div ref={containerRef} className="relative h-[100vh] md:h-[110vh] w-full overflow-hidden" style={{ scrollBehavior: 'smooth' }}>
      {/* Animated Blue Background */}
      <RaycastAnimatedBlueBackground />
      
      {/* Text Content Overlay - Now static without scroll animations */}
      <div 
        className="relative z-30 flex items-center justify-center px-6 text-center"
        style={{
          minHeight: "100vh",
          paddingTop: "0",
          marginTop: "0",
          zIndex: 30,
        }}
      >
        <div className="flex flex-col items-center justify-center space-y-6 max-w-4xl">
          <div
            className="font-raleway text-5xl font-extralight md:text-7xl lg:text-8xl text-white"
            style={{ 
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5)' 
            }}
          >
            {content.title}{" "}
            <span className="font-raleway font-extralight text-custom-blue" style={{ 
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 191, 255, 0.5)' 
            }}>
              {content.year}
            </span>
          </div>
          
          <div
            className="font-raleway text-xl font-light md:text-2xl lg:text-3xl text-white mb-4"
            style={{ 
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7), 0 0 8px rgba(0, 0, 0, 0.4)' 
            }}
          >
            <span className="text-custom-blue" style={{ 
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7), 0 0 8px rgba(0, 191, 255, 0.4)' 
            }}>{content.subtitle?.split(' ')[0]}</span> {content.subtitle?.split(' ').slice(1).join(' ')}
          </div>

          <div
            className="font-raleway font-extralight text-white text-2xl md:text-3xl lg:text-4xl mb-6"
            style={{ 
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7), 0 0 8px rgba(0, 0, 0, 0.4)' 
            }}
          >
            {content.date}
          </div>

          <div
            className="leading-relaxed tracking-wide text-gray-300 text-lg md:text-xl max-w-4xl mx-auto"
            style={{ 
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px rgba(0, 0, 0, 0.3)' 
            }}
            dangerouslySetInnerHTML={{
              __html: content.description
                ?.replace('blockchain', `<span class="text-custom-blue" style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px rgba(0, 191, 255, 0.3)">blockchain</span>`)
                ?.replace('revolución fintech', `<span class="text-custom-blue" style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px rgba(0, 191, 255, 0.3)">revolución fintech</span>`)
                ?.replace('fintech revolution', `<span class="text-custom-blue" style="text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px rgba(0, 191, 255, 0.3)">fintech revolution</span>`)
            }}
          />

          <div
            className="flex space-x-4 relative z-40"
          >
            <a
              href="/speakers"
              className="bg-blue-600 hover:bg-custom-blue text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 relative z-40"
              style={{ zIndex: 40 }}
            >
              {content.cta}
            </a>
            <a
              href="https://forms.gle/U5nWGcsZMLogwmEn7"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-custom-blue text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 relative z-40"
              style={{ zIndex: 40 }}
            >
              {content.ctaSponsor}
            </a>
          </div>
        </div>
      </div>

      {/* Mobile scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 md:hidden">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="flex items-center justify-center text-white/70"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-white/70"
          >
            <path 
              d="M7 10L12 15L17 10" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>

      {/* Removed bottom solid background to eliminate grey gap */}
    </div>
  );
};

export default Hero;
