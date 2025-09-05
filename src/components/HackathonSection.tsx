"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Component as AnimatedBackground } from "./ui/open-ai-codex-animated-background";

const HackathonSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
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

  const handleButtonClick = () => {
    setIsButtonClicked(true);
  };

  return (
    <div 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center items-center relative py-20" 
    >
      {/* Animated Background Component - Only render when visible */}
      {isVisible && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <AnimatedBackground />
          
          {/* Subtle overlay to enhance background visibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/10"></div>
          
          {/* Additional animated elements for depth */}
          <div className="absolute inset-0">
            {/* Floating geometric shapes */}
            <div className="absolute top-20 left-20 w-16 h-16 border border-custom-blue/20 rounded-lg animate-pulse" style={{ animationDelay: '0s' }}></div>
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
          className="text-6xl md:text-7xl font-raleway font-black text-white mb-8 text-center"
          style={{ 
            opacity: 0.9,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5)'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          ETH Chile <span 
            className="text-custom-blue font-extralight" 
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 191, 255, 0.5)' }}
          >Hack</span>athon
        </motion.h2>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <button
            onClick={handleButtonClick}
            className="inline-block bg-blue-600 hover:bg-custom-blue text-white px-12 py-4 rounded-lg font-semibold transition-colors text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <AnimatePresence mode="wait">
              {!isButtonClicked ? (
                <motion.span
                  key="apply-now"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Apply Now
                </motion.span>
              ) : (
                <motion.span
                  key="coming-soon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  Coming Soon
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HackathonSection;
