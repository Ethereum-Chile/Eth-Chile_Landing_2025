'use client';

import React, { useState } from 'react';
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
