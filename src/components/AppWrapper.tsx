'use client';

import React, { useState, useEffect } from 'react';
import Preloader from './Preloader';
import { motion } from 'framer-motion';

interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoaded(true);
  };

  // Skip preloader in development mode
  useEffect(() => {
    if (import.meta.env.DEV) {
      setIsLoaded(true);
    }
  }, []);

  // Prevent scrolling while preloader is active
  useEffect(() => {
    if (!isLoaded) {
      // Disable scrolling
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    // Cleanup function to ensure scrolling is re-enabled if component unmounts
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isLoaded]);

  return (
    <div 
      style={{ 
        backgroundColor: '#000000', 
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Landing page content - always present but initially hidden */}
      <motion.div 
        className="app-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          backgroundColor: '#000000'
        }}
      >
        {children}
      </motion.div>

      {/* Preloader - fades out over the content */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          pointerEvents: isLoaded ? 'none' : 'auto',
          backgroundColor: '#000000'
        }}
      >
        <Preloader onLoadingComplete={handleLoadingComplete} />
      </motion.div>
    </div>
  );
};

export default AppWrapper;
