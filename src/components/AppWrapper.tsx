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
        <div className="app-content">
          {children}
        </div>
      )}
    </>
  );
};

export default AppWrapper;
