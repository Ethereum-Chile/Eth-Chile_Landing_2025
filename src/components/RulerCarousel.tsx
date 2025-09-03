"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'hero', name: 'Home' },
  { id: 'why-eth', name: 'ETH' },
  { id: 'why-latam', name: 'LATAM' },
  { id: 'chile', name: 'Chile' },
  { id: 'team', name: 'Team' },
  { id: 'hackathons', name: 'HACK' },
  { id: 'sponsors', name: 'Sponsors' },
  { id: 'web3', name: 'web3' },
  { id: 'footer', name: 'Contacto' }
];

// Ruler Lines Component - Only show on desktop
const RulerLines = ({ left = true }) => {
  const lines = [];
  const totalLines = 50;
  const lineSpacing = 100 / (totalLines - 1);

  for (let i = 0; i < totalLines; i++) {
    const isFifth = i % 5 === 0;
    const isTenth = i % 10 === 0;
    const isCenter = i === Math.floor(totalLines / 2);

    let width = "w-1";
    let color = "bg-gray-400";

    if (isCenter) {
      width = "w-4";
      color = "bg-white/70";
    } else if (isTenth) {
      width = "w-3";
      color = "bg-white/50";
    } else if (isFifth) {
      width = "w-2";
      color = "bg-gray-300/60";
    }

    const positionClass = left ? "left-0" : "right-0";
    const animatedTop = i * lineSpacing;

    lines.push(
      <div
        key={i}
        className={`absolute h-0.5 ${width} ${color} ${positionClass}`}
        style={{ 
          top: `${animatedTop}%`,
          transition: 'none',
        }}
      />
    );
  }

  return <div className="relative w-3 h-full py-4 overflow-visible">{lines}</div>;
};

export default function RulerCarousel() {
  const [scrollY, setScrollY] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileScrollX, setMobileScrollX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollX, setStartScrollX] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [lastTouchTime, setLastTouchTime] = useState(0);
  
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const touchStartTimeRef = useRef<number>(0);
  const lastTouchXRef = useRef<number>(0);

  // Custom gaps array - each number is the gap AFTER that button
  // Moved Sponsors very close to Web3 in navigation wheel
  const gaps = [0, 600, 400, 700, 400, 200, 500, 500, 600];

  // Calculate total height needed for all buttons
  const totalHeight = gaps.reduce((sum, gap) => sum + gap, 0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate scroll progress (0 to 1)
      const maxScroll = documentHeight - windowHeight;
      const scrollProgress = maxScroll > 0 ? Math.min(1, Math.max(0, currentScrollY / maxScroll)) : 0;
      
      // Calculate how much to move the carousel based on scroll progress
      const moveDistance = scrollProgress * totalHeight;
      setScrollY(moveDistance);
      
      // Determine active section
      const sectionProgress = scrollProgress * (sections.length - 1);
      const newActiveIndex = Math.min(Math.floor(sectionProgress), sections.length - 1);
      setActiveIndex(newActiveIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [totalHeight]);

  const handleItemClick = (index: number) => {
    const sectionId = sections[index].id;
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRulerClick = (event: React.MouseEvent) => {
    // Check if the click was on a button (navigation item)
    const target = event.target as HTMLElement;
    const isButtonClick = target.closest('[data-section-button]');
    
    // If it's a button click, don't handle the general ruler click
    if (isButtonClick) {
      return;
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    const clickY = event.clientY - rect.top;
    const rulerHeight = rect.height;
    
    // Calculate click position as percentage (0 = top, 1 = bottom)
    const clickPercentage = Math.max(0, Math.min(1, clickY / rulerHeight));
    
    // Map percentage to scroll position
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const maxScroll = documentHeight - windowHeight;
    const targetScrollY = clickPercentage * maxScroll;
    
    // Smooth scroll to target position
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
  };

  // Mobile touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setStartX(touch.clientX);
    setStartScrollX(mobileScrollX);
    setIsDragging(true);
    setVelocity(0);
    touchStartTimeRef.current = Date.now();
    lastTouchXRef.current = touch.clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    const newScrollX = startScrollX - deltaX;
    
    // Calculate velocity
    const now = Date.now();
    const timeDelta = now - lastTouchTime;
    if (timeDelta > 0) {
      const newVelocity = (touch.clientX - lastTouchXRef.current) / timeDelta;
      setVelocity(newVelocity);
    }
    
    setMobileScrollX(newScrollX);
    lastTouchXRef.current = touch.clientX;
    setLastTouchTime(now);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    
    // Apply momentum scrolling
    if (Math.abs(velocity) > 0.5) {
      const momentumDistance = velocity * 100; // Adjust multiplier for momentum
      const newScrollX = mobileScrollX - momentumDistance;
      
      // Animate to final position with easing
      const animateScroll = () => {
        const remaining = newScrollX - mobileScrollX;
        if (Math.abs(remaining) > 1) {
          setMobileScrollX(prev => prev + remaining * 0.1);
          requestAnimationFrame(animateScroll);
        }
      };
      requestAnimationFrame(animateScroll);
    }
    
    // Snap to nearest section
    const containerWidth = mobileNavRef.current?.scrollWidth || 0;
    const visibleWidth = mobileNavRef.current?.clientWidth || 0;
    const maxScroll = Math.max(0, containerWidth - visibleWidth);
    
    if (mobileScrollX < 0) {
      setMobileScrollX(0);
    } else if (mobileScrollX > maxScroll) {
      setMobileScrollX(maxScroll);
    }
  };

  // Mobile bottom navbar
  if (isMobile) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Background container */}
        <div className="bg-black/90 backdrop-blur-md border-t border-white/10">
          {/* Navigation items */}
          <div 
            ref={mobileNavRef}
            className="flex items-center justify-center px-4 py-3 overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth'
            }}
          >
            <motion.div 
              className="flex items-center relative"
              style={{ 
                transform: `translateX(-${mobileScrollX}px)`,
                touchAction: 'pan-x',
              }}
              animate={{
                transition: { type: "spring", stiffness: 300, damping: 30 }
              }}
            >
              {sections.map((section, index) => {
                const isActive = index === activeIndex;
                
                // Calculate position based on scroll progress for mobile
                const scrollProgress = scrollY / totalHeight;
                const sectionProgress = scrollProgress * (sections.length - 1);
                const isInView = Math.abs(index - sectionProgress) < 0.5;
                
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => handleItemClick(index)}
                    data-section-button
                    className="font-raleway font-bold text-xs px-3 py-2 whitespace-nowrap flex-shrink-0 mx-1 select-none"
                    style={{
                      color: "#ffffff",
                      textShadow: isActive ? "0 0 8px rgba(255,255,255,1)" : "0 0 3px rgba(255, 255, 255, 0.5)",
                      filter: "brightness(1.1)",
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                    }}
                    animate={{
                      scale: isActive ? 1.1 : isInView ? 1.05 : 1,
                      opacity: isActive ? 1 : isInView ? 0.9 : 0.6,
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {section.name}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop vertical sidebar
  return (
    <div 
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 h-96 w-16 overflow-hidden cursor-pointer hidden md:block"
      onClick={handleRulerClick}
    >
      {/* Background container with transparency fade-out using mask */}
      <div className="absolute inset-0 rounded-2xl backdrop-blur-sm border border-white/10 bg-black/80" 
           style={{
             maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.3) 90%, transparent 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.3) 90%, transparent 100%)'
           }} />
      
      {/* Lines container with fade-out mask */}
      <div className="absolute inset-0 pointer-events-none z-30" 
           style={{
             maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0.3) 90%, transparent 100%)',
             WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,1) 80%, rgba(0,0,0,1) 90%, transparent 100%)'
           }}>
        {/* Ruler lines on left */}
        <div className="absolute left-0 top-0 h-full">
          <RulerLines left={true} />
        </div>

        {/* Ruler lines on right */}
        <div className="absolute right-0 top-0 h-full">
          <RulerLines left={false} />
        </div>
      </div>
      
      {/* Navigation buttons container */}
      <div className="relative h-full flex flex-col items-center justify-center">
        <motion.div 
          className="flex flex-col items-center relative"
          style={{ 
            height: `${totalHeight}px`,
            transform: `translateY(-${scrollY}px)`,
            marginTop: '160px' // Center the Home button at the top
          }}
        >
          {sections.map((section, index) => {
            const isActive = index === activeIndex;
            const gap = gaps[index];
            
            return (
              <motion.button
                key={section.id}
                onClick={() => handleItemClick(index)}
                data-section-button
                className="absolute left-1/2 transform -translate-x-1/2 font-raleway font-bold text-xs px-3 py-2 whitespace-nowrap"
                style={{
                  top: `${index * 100 + gaps.slice(0, index).reduce((sum, gap) => sum + gap, 0)}px`,
                  color: "#ffffff",
                  textShadow: isActive ? "0 0 8px rgba(255,255,255,1)" : "0 0 3px rgba(255, 255, 255, 0.5)",
                  filter: "brightness(1.1)",
                }}
                animate={{
                  scale: isActive ? 1.2 : 1,
                  opacity: isActive ? 1 : 0.7,
                  y: isActive ? -2 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.1, opacity: 1 }}
              >
                {section.name}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
} 