import { useState, useEffect, useCallback, useRef } from 'react';

export const useGalleryControl = () => {
  // TEMPORARILY DISABLED: Gallery is disabled for now
  const [shouldRenderGallery, setShouldRenderGallery] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);

  const stopGallery = useCallback(() => {
    setShouldRenderGallery(false);
  }, []);

  const resumeGallery = useCallback(() => {
    setShouldRenderGallery(false); // Keep disabled for now
  }, []);

  useEffect(() => {
    const handleStopGallery = () => stopGallery();
    const handleResumeGallery = () => resumeGallery();

    // Optimized scroll handler with throttling and better logic
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Clear previous timeout to prevent multiple rapid state changes
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Hero section is 250vh (2.5 * window height)
      const heroSectionHeight = windowHeight * 2.5;
      
      // Only update state if there's a significant scroll change
      const scrollDifference = Math.abs(scrollY - lastScrollY.current);
      if (scrollDifference < 50) return; // Ignore small scroll changes
      
      // Throttle state updates to prevent excessive re-renders
      scrollTimeoutRef.current = setTimeout(() => {
        if (scrollY > heroSectionHeight) {
          setShouldRenderGallery(false);
        } else {
          setShouldRenderGallery(true);
        }
        lastScrollY.current = scrollY;
      }, 16); // ~60fps throttling
    };

    window.addEventListener('stopGalleryRendering', handleStopGallery);
    window.addEventListener('resumeGalleryRendering', handleResumeGallery);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('stopGalleryRendering', handleStopGallery);
      window.removeEventListener('resumeGalleryRendering', handleResumeGallery);
      window.removeEventListener('scroll', handleScroll);
      
      // Cleanup timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [stopGallery, resumeGallery]);

  return {
    shouldRenderGallery,
    stopGallery,
    resumeGallery
  };
};
