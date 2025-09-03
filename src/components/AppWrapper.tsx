'use client';

import React, { useState } from 'react';
import Preloader from './Preloader';

interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoaded(true);
  };

  return (
    <>
      {!isLoaded && (
        <Preloader onLoadingComplete={handleLoadingComplete} />
      )}
      {isLoaded && (
        <div 
          className="app-content"
          style={{
            backgroundColor: '#000000', // Ensure black background during transition
            minHeight: '100vh',
            transition: 'opacity 0.5s ease-in-out'
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default AppWrapper;
