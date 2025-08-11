'use client';

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from "./ContainerScroll";

// Extended images for the gallery with more content to prevent empty spaces
const IMAGES_1 = [
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/DSC01614.webp",
  "/imgs/gallery/DSC01690.webp",
  "/imgs/gallery/DSC01731.webp",
  "/imgs/gallery/DSC03485.webp",
  "/imgs/gallery/DSC03501.webp",
  "/imgs/gallery/DSC03505.webp",
  "/imgs/gallery/DSC03506.webp",
  "/imgs/gallery/DSC03511.webp",
  "/imgs/gallery/DSC03514.webp",
  "/imgs/gallery/DSC03517.webp",
  "/imgs/gallery/DSC03520.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
];

const IMAGES_2 = [
  "/imgs/gallery/DSC03520.webp",
  "/imgs/gallery/DSC03517.webp",
  "/imgs/gallery/DSC03514.webp",
  "/imgs/gallery/DSC03511.webp",
  "/imgs/gallery/DSC03506.webp",
  "/imgs/gallery/DSC03505.webp",
  "/imgs/gallery/DSC03501.webp",
  "/imgs/gallery/DSC03485.webp",
  "/imgs/gallery/DSC01731.webp",
  "/imgs/gallery/DSC01690.webp",
  "/imgs/gallery/DSC01614.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/DSC03520.webp",
  "/imgs/gallery/DSC03517.webp",
  "/imgs/gallery/DSC03514.webp",
  "/imgs/gallery/DSC03511.webp",
  "/imgs/gallery/DSC03506.webp",
  "/imgs/gallery/DSC03505.webp",
  "/imgs/gallery/DSC03501.webp",
  "/imgs/gallery/DSC03485.webp",
  "/imgs/gallery/DSC01731.webp",
  "/imgs/gallery/DSC01690.webp",
  "/imgs/gallery/DSC01614.webp",
];

const IMAGES_3 = [
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/DSC01614.webp",
  "/imgs/gallery/DSC01690.webp",
  "/imgs/gallery/DSC01731.webp",
  "/imgs/gallery/DSC03485.webp",
  "/imgs/gallery/DSC03501.webp",
  "/imgs/gallery/DSC03505.webp",
  "/imgs/gallery/DSC03506.webp",
  "/imgs/gallery/DSC03511.webp",
  "/imgs/gallery/DSC03514.webp",
  "/imgs/gallery/DSC03517.webp",
  "/imgs/gallery/DSC03520.webp",
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/DSC01614.webp",
  "/imgs/gallery/DSC01690.webp",
  "/imgs/gallery/DSC01731.webp",
  "/imgs/gallery/DSC03485.webp",
  "/imgs/gallery/DSC03501.webp",
  "/imgs/gallery/DSC03505.webp",
  "/imgs/gallery/DSC03506.webp",
  "/imgs/gallery/DSC03511.webp",
  "/imgs/gallery/DSC03514.webp",
  "/imgs/gallery/DSC03517.webp",
  "/imgs/gallery/DSC03520.webp",
];

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transform scroll progress to text animations
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, 400]); // Slide down 400px (adjusted for 250vh)
  const textOpacity = useTransform(scrollYProgress, [0, 0.6, 0.8], [1, 1, 0]); // Fade out at 80% scroll (200vh of 250vh)
  const textScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]); // More scale down for visibility

  return (
    <div ref={containerRef} className="relative bg-custom-black h-[250vh] w-full overflow-hidden" style={{ scrollBehavior: 'smooth' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .gallery-col {
            animation: autoScrollUp 60s linear infinite;
          }
          
          .gallery-col:nth-child(2) {
            animation: autoScrollDown 60s linear infinite;
          }
          
          .gallery-col:nth-child(3) {
            animation: autoScrollUp 60s linear infinite;
          }
          
          @keyframes autoScrollUp {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-50%);
            }
          }
          
          @keyframes autoScrollDown {
            0% {
              transform: translateY(-50%);
            }
            100% {
              transform: translateY(0);
            }
          }
        `
      }} />
      
      {/* Gallery Background - Fixed position, fills entire 250vh */}
      <div className="fixed inset-0 w-full h-full z-0">
        <GalleryContainer className="w-full h-full grid-cols-3 gap-2 p-2">
          <GalleryCol className="gallery-col h-full">
            {IMAGES_1.map((imageUrl, index) => (
              <img
                key={index}
                className="aspect-video block h-auto w-full rounded-md object-cover shadow-lg border border-white/10 mb-2"
                src={imageUrl}
                alt="ETHChile gallery item"
              />
            ))}
          </GalleryCol>
          <GalleryCol className="gallery-col h-full">
            {IMAGES_2.map((imageUrl, index) => (
              <img
                key={index}
                className="aspect-video block h-auto w-full rounded-md object-cover shadow-lg border border-white/10 mb-2"
                src={imageUrl}
                alt="ETHChile gallery item"
              />
            ))}
          </GalleryCol>
          <GalleryCol className="gallery-col h-full">
            {IMAGES_3.map((imageUrl, index) => (
              <img
                key={index}
                className="aspect-video block h-auto w-full rounded-md object-cover shadow-lg border border-white/10 mb-2"
                src={imageUrl}
                alt="ETHChile gallery item"
              />
            ))}
          </GalleryCol>
        </GalleryContainer>
      </div>

      {/* Background gradient effect */}
      <div 
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: "linear-gradient(to right, #1e40af, #7c3aed, #3b82f6)",
          filter: "blur(84px)",
          mixBlendMode: "screen",
          opacity: 0.8,
        }}
      />

      {/* Separate Dark Overlay - Very visible gradient from top to bottom */}
      <div 
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0.5) 40%, rgba(0, 0, 0, 0.2) 60%, rgba(0, 0, 0, 0) 80%)",
        }}
      />

      {/* Text Content Overlay - Scroll-based animations, fades out completely */}
      <motion.div 
        className="relative z-30 flex items-center justify-center px-6 text-center"
        style={{
          y: textY,
          opacity: textOpacity,
          scale: textScale,
          minHeight: "100vh",
          paddingTop: "0",
          marginTop: "0",
        }}
      >
        <div className="flex flex-col items-center justify-center space-y-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="font-raleway text-5xl font-extralight md:text-7xl lg:text-8xl text-white mb-4">
              ETH Chile{" "}
              <span className="font-raleway font-extralight text-blue-400">
                2025
              </span>
              <br />
              <span className="font-raleway font-extralight text-white text-3xl md:text-4xl lg:text-5xl">
                October 21st
              </span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="font-raleway text-2xl font-light md:text-3xl lg:text-4xl text-white mb-6">
              Fintech meets Ethereum 
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="leading-relaxed tracking-wide text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
              Experience the future of blockchain technology
              <br /> in the heart of Latin America's fintech revolution.
            </p>
          </motion.div>

          <motion.div 
            className="flex space-x-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg">
              Buy Ticket
            </button>
            <a 
              href="/speakers"
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors text-lg border border-blue-400 hover:border-blue-300 px-8 py-4 rounded-lg inline-block"
            >
              Apply to Speak
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
