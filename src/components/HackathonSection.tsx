"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Component as AnimatedBackground } from "./ui/open-ai-codex-animated-background";

const HackathonSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '50px' // Add some margin for smoother transitions
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen bg-custom-black flex flex-col justify-center items-center relative py-20" 
      style={{ backgroundColor: '#0a0a0a' }}
    >
      {/* Solid background to completely cover gallery */}
      <div className="absolute inset-0 bg-custom-black"></div>
      
      {/* Animated Background Component - Only render when visible */}
      {isVisible && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatedBackground />
          
          {/* Subtle overlay to enhance background visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/10"></div>
          
          {/* Additional animated elements for depth */}
          <div className="absolute inset-0">
            {/* Floating geometric shapes */}
            <div className="absolute top-20 left-20 w-16 h-16 border border-blue-400/20 rounded-lg animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-40 right-32 w-12 h-12 border border-purple-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-32 left-32 w-20 h-20 border border-indigo-400/20 rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>
      )}
      
      {/* Content Card with Glass Effect */}
      <motion.div 
        className="relative z-10 max-w-4xl mx-auto px-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.h2 
          className="text-5xl md:text-6xl font-raleway font-bold text-white mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          ETH Chile Hackathon
        </motion.h2>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <a
            href="/hack"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-lg font-semibold transition-colors text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Apply Now
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HackathonSection;
