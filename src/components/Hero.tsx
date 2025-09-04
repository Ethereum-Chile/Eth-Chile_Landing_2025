'use client';

import React, { useRef } from "react";
import { RaycastAnimatedBlueBackground } from "./ui/raycast-animated-blue-background";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative h-[120vh] w-full overflow-hidden" style={{ scrollBehavior: 'smooth' }}>
      {/* Animated Blue Background */}
      <RaycastAnimatedBlueBackground />
      
      {/* Text Content Overlay - Now static without scroll animations */}
      <div 
        className="relative z-30 flex items-center justify-center px-6 text-center"
        style={{
          minHeight: "100vh",
          paddingTop: "0",
          marginTop: "0",
        }}
      >
        <div className="flex flex-col items-center justify-center space-y-6 max-w-4xl">
          <div
            className="font-raleway text-5xl font-extralight md:text-7xl lg:text-8xl text-white"
          >
            ETH Chile{" "}
            <span className="font-raleway font-extralight" style={{ 
              color: '#00BFFF', 
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 191, 255, 0.5)' 
            }}>
              2025
            </span>
          </div>
          
          <div
            className="font-raleway text-xl font-light md:text-2xl lg:text-3xl text-white mb-4"
          >
            <span style={{ 
              color: '#00BFFF', 
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7), 0 0 8px rgba(0, 191, 255, 0.4)' 
            }}>Fintech</span> meets Ethereum 
          </div>

          <div
            className="font-raleway font-extralight text-white text-2xl md:text-3xl lg:text-4xl mb-6"
          >
            October 24th & 25th
          </div>

          <div
            className="leading-relaxed tracking-wide text-gray-300 text-lg md:text-xl max-w-4xl mx-auto"
          >
            Experience the future of <span style={{ 
              color: '#00BFFF', 
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px rgba(0, 191, 255, 0.3)' 
            }}>blockchain</span>&nbsp;technology
            <br /> in the heart of <span style={{ 
              color: '#00BFFF', 
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px rgba(0, 191, 255, 0.3)' 
            }}>Latin</span> America's
            <br /> fintech revolution.
          </div>

          <div 
            className="flex space-x-4"
          >
            <a 
              href="/speakers" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Quiero ser Speaker
            </a>
          </div>
        </div>
      </div>

      {/* Removed bottom solid background to eliminate grey gap */}
    </div>
  );
};

export default Hero;
