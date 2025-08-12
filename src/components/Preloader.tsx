'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Hard 3-second cap - no matter what, preloader will complete
    const hardCapTimer = setTimeout(() => {
      console.log('Preloader: Hard 3-second cap reached');
      setIsLoading(false);
      onLoadingComplete();
    }, 3000);

    return () => clearTimeout(hardCapTimer);
  }, [onLoadingComplete]);

  useEffect(() => {
    // Wait for video to be ready before starting the timer
    if (!videoLoaded) return;

    // Faster timer when video is loaded - 1.5 seconds
    const videoTimer = setTimeout(() => {
      console.log('Preloader: Video loaded, completing after 1.5s');
      setIsLoading(false);
      onLoadingComplete();
    }, 1500);

    return () => clearTimeout(videoTimer);
  }, [onLoadingComplete, videoLoaded]);

  const handleVideoLoad = () => {
    console.log('Preloader: Video loaded successfully');
    setVideoLoaded(true);
    // Ensure video starts playing immediately
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Preloader: Video autoplay failed, but marking as loaded');
        setVideoLoaded(true);
      });
    }
  };

  // Also allow manual completion if user wants to skip
  const handleSkip = () => {
    console.log('Preloader: User skipped');
    setIsLoading(false);
    onLoadingComplete();
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* WebM Video Preloader */}
          <div className="relative w-full h-full flex items-center justify-center">
            <video
              ref={videoRef}
              className="w-1/2 h-1/2 object-contain"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={handleVideoLoad}
              onCanPlay={handleVideoLoad}
              onError={(error) => {
                console.log('Preloader: Video error, using fallback');
                // Fallback if video fails to load
                setVideoLoaded(true);
              }}
            >
              <source src="/eth_ascii_compressed.webm" type="video/webm" />
              {/* Fallback text if video doesn't load */}
              <div className="text-white text-center">
                <h2 className="text-2xl font-raleway font-light mb-2">ETH Chile</h2>
                <p className="text-sm text-blue-400 font-light">2025</p>
              </div>
            </video>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
