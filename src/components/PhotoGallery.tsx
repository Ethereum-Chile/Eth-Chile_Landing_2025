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
  "https://images.unsplash.com/photo-1529218402470-5dec8fea0761?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFkfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D",
  "https://images.unsplash.com/photo-1604928141064-207cea6f571f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dG9reW98ZW58MHwwfDB8fHwy",
  "https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dG9reW98ZW58MHwwfDB8fHwy",
];

const IMAGES_2 = [
  "https://images.unsplash.com/photo-1542052125323-e69ad37a47c2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D",
  "https://images.unsplash.com/photo-1564284369929-026ba231f89b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1532236204992-f5e85c024202?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D",
  "https://images.unsplash.com/photo-1493515322954-4fa727e97985?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D",
];

const IMAGES_3 = [
  "https://images.unsplash.com/photo-1528361237150-8a9a7df33035?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1493515322954-4fa727e97985?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D",
  "https://images.unsplash.com/photo-1608875004752-2fdb6a39ba4c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

export const PhotoGallery = () => {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
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
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let animationId: number;
    
    if (isAutoScrolling && autoScrollRef.current) {
      const animate = () => {
        if (autoScrollRef.current) {
          const currentTransform = autoScrollRef.current.style.transform;
          const currentY = currentTransform.includes('translateY') 
            ? parseFloat(currentTransform.match(/translateY\(([^)]+)px\)/)?.[1] || '0')
            : 0;
          
          autoScrollRef.current.style.transform = `translateY(${currentY - 1}px)`;
        }
        animationId = requestAnimationFrame(animate);
      };
      
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isAutoScrolling]);

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
            ETHChile{" "}
            <span className="font-raleway font-extralight text-blue-400">
              2025
            </span>
          </h1>
        </ContainerAnimated>
        <ContainerAnimated>
          <h2 className="font-raleway text-2xl font-light md:text-3xl lg:text-4xl text-white mb-6">
            Where Innovation Meets Reality
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
            Register Now
          </button>
          <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors text-lg border border-blue-400 hover:border-blue-300 px-8 py-4 rounded-lg">
            Learn More
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
            className={`transition-transform duration-1000 ${isAutoScrolling ? 'auto-scroll' : ''}`}
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

export default PhotoGallery; 