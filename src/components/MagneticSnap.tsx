'use client';

import React, { useEffect, useRef } from 'react';

interface MagneticSnapProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  snapStrength?: number;
  threshold?: number;
}

export const MagneticSnap: React.FC<MagneticSnapProps> = ({
  children,
  className = '',
  style,
  snapStrength = 0.8,
  threshold = 100
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isSnapping = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculate how much of the section is visible
      const visibleTop = Math.max(0, windowHeight - rect.top);
      const visibleBottom = Math.max(0, rect.bottom);
      const visibleHeight = Math.min(visibleTop, visibleBottom);
      
      // Check if section is in viewport and should snap
      if (visibleHeight > threshold && !isSnapping.current) {
        isSnapping.current = true;
        
        // Calculate the center position
        const targetScroll = window.scrollY + rect.top - (windowHeight - sectionHeight) / 2;
        
        // Smooth scroll to center the section
        window.scrollTo({
          top: targetScroll,
          behavior: 'smooth'
        });
        
        // Reset snapping flag after animation
        setTimeout(() => {
          isSnapping.current = false;
        }, 1000);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [snapStrength, threshold]);

  return (
    <section ref={sectionRef} className={className} style={style}>
      {children}
    </section>
  );
};

export default MagneticSnap; 