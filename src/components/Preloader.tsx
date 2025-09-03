'use client';

import React, { useEffect, useState, useRef } from 'react';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [counter, setCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const counterRef = useRef<NodeJS.Timeout | null>(null);

  // Start counter immediately when component mounts
  useEffect(() => {
    counterRef.current = setInterval(() => {
      setCounter(prev => {
        const newValue = prev + 1;
        
        if (newValue >= 100) {
          if (counterRef.current) {
            clearInterval(counterRef.current);
            counterRef.current = null;
          }
          return 100;
        }
        return newValue;
      });
    }, 30); // 30ms per increment = ~3 seconds total

    return () => {
      if (counterRef.current) {
        clearInterval(counterRef.current);
        counterRef.current = null;
      }
    };
  }, []);

  // Handle completion and fade out
  useEffect(() => {
    if (counter >= 100) {
      // Start fade out
      setTimeout(() => {
        setIsVisible(false);
        
        // Wait for fade out animation, then call onLoadingComplete
        setTimeout(() => {
          onLoadingComplete();
        }, 500); // 500ms fade out duration
      }, 200);
    }
  }, [counter, onLoadingComplete]);

  // Video loading handlers
  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = () => {
    setVideoLoaded(true);
  };

  // Force completion after 5 seconds as safety
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (counter < 100) {
        setCounter(100);
      }
    }, 5000);

    return () => clearTimeout(safetyTimer);
  }, [counter]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* ASCII Animation Container */}
      <div className="flex-1 flex items-center justify-center">
        <video
          ref={videoRef}
          className="w-3/4 h-3/4 object-contain"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoLoad}
          onError={handleVideoError}
        >
          <source src="/eth_ascii_compressed.webm" type="video/webm" />
          {/* Fallback text if video doesn't load */}
          <div className="text-white text-center">
            <h2 className="text-2xl font-raleway font-light mb-2">ETH Chile</h2>
            <p className="text-sm text-blue-400 font-light">2025</p>
          </div>
        </video>
      </div>
      
      {/* Counter at the bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
        {/* Counter number - 2 digits */}
        <div 
          className="text-white text-2xl font-mono tracking-wider"
          style={{
            fontFamily: 'monospace',
            textShadow: '0 0 5px rgba(255, 255, 255, 0.5)'
          }}
        >
          {counter}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
