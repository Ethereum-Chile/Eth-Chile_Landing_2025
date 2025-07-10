'use client';

import React, { useEffect, useRef, useState } from "react";
import {
  ContainerAnimated,
  ContainerScroll,
  ContainerStagger,
  ContainerSticky,
  GalleryCol,
  GalleryContainer,
} from "./ContainerScroll";

// Sample images for the gallery - replace with actual ETHChile images
const IMAGES_1 = [
  "/imgs/gallery/gallery_image_01.webp",
  "/imgs/gallery/gallery_image_02.webp",
  "/imgs/gallery/gallery_image_03.webp",
  "/imgs/gallery/gallery_image_04.webp",
];

const IMAGES_2 = [
  "/imgs/gallery/gallery_image_05.webp",
  "/imgs/gallery/gallery_image_06.webp",
  "/imgs/gallery/gallery_image_07.webp",
  "/imgs/gallery/gallery_image_08.webp",
];

const IMAGES_3 = [
  "/imgs/gallery/gallery_image_09.webp",
  "/imgs/gallery/gallery_image_10.webp",
  "/imgs/gallery/gallery_image_11.webp",
  "/imgs/gallery/gallery_image_12.webp",
];

export const Hero = () => {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [isWhyEthVisible, setIsWhyEthVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const autoScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollPosition(scrollY);
      
      // Check if WhyEthereum section is visible in viewport
      const whyEthereumSection = document.querySelector('[data-section="why-ethereum"]');
      if (whyEthereumSection) {
        const rect = whyEthereumSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setIsAutoScrolling(isVisible);
        setIsWhyEthVisible(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Removed manual animation frame loop for better performance
  // The CSS animations will handle the auto-scrolling effect

  return (
    <div className="relative bg-custom-black min-h-screen" style={{ scrollBehavior: 'smooth' }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          .auto-scroll .gallery-col:nth-child(1) {
            animation: autoScrollUp 20s linear infinite;
          }
          
          .auto-scroll .gallery-col:nth-child(2) {
            animation: autoScrollDown 20s linear infinite;
          }
          
          .auto-scroll .gallery-col:nth-child(3) {
            animation: autoScrollUp 20s linear infinite;
          }
          
          .auto-scroll.why-eth-visible .gallery-col:nth-child(1) {
            animation: autoScrollDown 20s linear infinite;
          }
          
          .auto-scroll.why-eth-visible .gallery-col:nth-child(2) {
            animation: autoScrollUp 20s linear infinite;
          }
          
          .auto-scroll.why-eth-visible .gallery-col:nth-child(3) {
            animation: autoScrollDown 20s linear infinite;
          }
          
          @keyframes autoScrollUp {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-100%);
            }
          }
          
          @keyframes autoScrollDown {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(100%);
            }
          }
        `
      }} />
      <ContainerStagger className="relative z-[9999] place-self-center px-6 pt-32 text-center">
        <ContainerAnimated>
          <h1 className="font-raleway text-5xl font-extralight md:text-7xl lg:text-8xl text-white mb-4">
            ETH Chile{" "}
            <span className="font-raleway font-extralight text-blue-400">
              2025
            </span>
          </h1>
        </ContainerAnimated>
        <ContainerAnimated>
          <h2 className="font-raleway text-2xl font-light md:text-3xl lg:text-4xl text-white mb-6">
            Fintech meets Ethereum 
          </h2>
        </ContainerAnimated>

        <ContainerAnimated className="my-8">
          <p className="leading-relaxed tracking-wide text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
            Experience the future of blockchain technology
            <br /> in the heart of Latin America's fintech revolution.
          </p>
        </ContainerAnimated>

        <ContainerAnimated className="space-x-4">
          <button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg">
            Get ticket
          </button>
          <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors text-lg border border-blue-400 hover:border-blue-300 px-8 py-4 rounded-lg">
            Volunteer
          </button>
        </ContainerAnimated>
      </ContainerStagger>

      {/* Background gradient effect */}
      <div 
        className="pointer-events-none absolute z-10 h-[70vh] w-full"
        style={{
          background: "linear-gradient(to right, #1e40af, #7c3aed, #3b82f6)",
          filter: "blur(84px)",
          mixBlendMode: "screen",
        }}
      />

      <ContainerScroll className="relative h-[400vh]">
        <ContainerSticky className="h-svh">
          <GalleryContainer 
            ref={autoScrollRef}
            className={`transition-transform duration-1000 ${isAutoScrolling ? 'auto-scroll' : ''} ${isWhyEthVisible ? 'why-eth-visible' : ''}`}
          >
            <GalleryCol yRange={["-10%", "2%"]} className="-mt-2 gallery-col">
              {IMAGES_1.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-lg border border-white/10"
                  src={imageUrl}
                  alt="ETHChile gallery item"
                />
              ))}
            </GalleryCol>
            <GalleryCol className="mt-[-50%] gallery-col" yRange={["15%", "5%"]}>
              {IMAGES_2.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-lg border border-white/10"
                  src={imageUrl}
                  alt="ETHChile gallery item"
                />
              ))}
            </GalleryCol>
            <GalleryCol yRange={["-10%", "2%"]} className="-mt-2 gallery-col">
              {IMAGES_3.map((imageUrl, index) => (
                <img
                  key={index}
                  className="aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-lg border border-white/10"
                  src={imageUrl}
                  alt="ETHChile gallery item"
                />
              ))}
            </GalleryCol>
          </GalleryContainer>
        </ContainerSticky>
      </ContainerScroll>
    </div>
  );
};

export default Hero; 