'use client';

import React, { useEffect, useState, useRef } from 'react';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [counter, setCounter] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [useTextFallback, setUseTextFallback] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const counterRef = useRef<NodeJS.Timeout | null>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  // Handle completion
  useEffect(() => {
    if (counter >= 100) {
      // Wait a bit then call onLoadingComplete
      setTimeout(() => {
        onLoadingComplete();
      }, 200);
    }
  }, [counter, onLoadingComplete]);

  // Video loading handlers
  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
    setVideoLoaded(true);
  };

  const handleVideoError = (e: any) => {
    console.log('Video failed to load:', e);
    console.log('User agent:', navigator.userAgent);
    console.log('Is mobile:', isMobile);
    setUseFallback(true);
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

  // Mobile-optimized video attributes
  const videoProps = {
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    preload: 'auto',
    onLoadedData: handleVideoLoad,
    onCanPlay: handleVideoLoad,
    onError: handleVideoError,
    style: {
      maxWidth: '100%',
      maxHeight: '100%',
      width: isMobile ? '90%' : '75%',
      height: isMobile ? '90%' : '75%'
    }
  };

  // Log mobile detection
  useEffect(() => {
    console.log('Mobile detection:', isMobile);
    console.log('User agent:', navigator.userAgent);
    console.log('Screen size:', window.innerWidth, 'x', window.innerHeight);
  }, [isMobile]);

  // Text-based ASCII fallback
  const TextASCIIFallback = () => (
    <div className="text-center text-white font-mono">
      <div className="text-xs md:text-sm leading-none">
        {`ETH Chile 2025
        ╔══════════════════════════════════════════════════════════════╗
        ║                                                            ║
        ║                    ███████╗████████╗██╗  ██╗             ║
        ║                    ██╔════╝╚══██╔══╝██║  ██║             ║
        ║                    █████╗     ██║   ███████║             ║
        ║                    ██╔══╝     ██║   ██╔══██║             ║
        ║                    ██║        ██║   ██║  ██║             ║
        ║                    ╚═╝        ╚═╝   ╚═╝  ╚═╝             ║
        ║                                                            ║
        ║                    ██████╗██╗  ██╗██╗██╗     ███████╗    ║
        ║                    ██╔══██╗██║  ██║██║██║     ██╔════╝    ║
        ║                    ██████╔╝███████║██║██║     █████╗      ║
        ║                    ██╔══██╗██╔══██║██║██║     ██╔══╝      ║
        ║                    ██║  ██║██║  ██║██║███████╗███████╗    ║
        ║                    ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝    ║
        ║                                                            ║
        ║                     ██████╗ ██╗███╗   ██╗███████╗        ║
        ║                    ██╔══██╗██║████╗  ██║██╔════╝        ║
        ║                    ██║  ██║██║██╔██╗ ██║█████╗          ║
        ║                    ██║  ██║██║██║╚██╗██║██╔══╝          ║
        ║                    ██████╔╝██║██║ ╚████║███████╗        ║
        ║                    ╚═════╝ ╚═╝╚═╝  ╚═══╝╚══════╝        ║
        ║                                                            ║
        ╚══════════════════════════════════════════════════════════════╝`}
      </div>
    </div>
  );

  return (
    <div 
      className="w-full h-full bg-black flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#000000',
        background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 100%)'
      }}
    >
      {/* ASCII Animation Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        {!useFallback ? (
          <video
            ref={videoRef}
            className="object-contain"
            {...videoProps}
          >
            <source src="/eth_ascii_compressed.webm" type="video/webm" />
            <source src="/eth_ascii.gif" type="image/gif" />
            {/* Fallback text if video doesn't load */}
            <div className="text-white text-center">
              <h2 className="text-2xl font-raleway font-light mb-2">ETH Chile</h2>
              <p className="text-sm text-blue-400 font-light">2025</p>
            </div>
          </video>
        ) : !useTextFallback ? (
          // Fallback: Static ASCII art or GIF
          <div className="text-center">
            <img 
              src="/eth_ascii.gif" 
              alt="ETH Chile ASCII Animation"
              className="object-contain"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: isMobile ? '90%' : '75%',
                height: isMobile ? '90%' : '75%'
              }}
              onLoad={() => setVideoLoaded(true)}
              onError={() => {
                // Final fallback: Text-based ASCII
                console.log('GIF failed to load, using text fallback');
                setUseTextFallback(true);
                setVideoLoaded(true);
              }}
            />
          </div>
        ) : (
          // Final fallback: Text-based ASCII
          <TextASCIIFallback />
        )}
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
