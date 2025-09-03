import { cn } from "../../lib/utils";
import { useState, useEffect } from "react";
import UnicornScene from "unicornstudio-react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export const RaycastAnimatedBlueBackground = () => {
  const { width, height } = useWindowSize();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(null);

  console.log('🎨 RaycastAnimatedBlueBackground rendering:', { 
    width, 
    height, 
    isLoading, 
    isLoaded, 
    loadError 
  });

  useEffect(() => {
    // Start loading immediately when component mounts
    console.log('🚀 Starting background animation load...');
    console.log('⏱️ Preloader timing: ~3 seconds, Background timing: 2.5 seconds');
    
    // Simulate loading time for UnicornStudio (should match preloader timing)
    const loadTimer = setTimeout(() => {
      console.log('🔄 Background loading complete, transitioning to animated state...');
      setIsLoading(false);
      setIsLoaded(true);
      console.log('✅ Background animation loaded successfully');
      console.log('🎬 UnicornStudio scene should now be visible');
    }, 2500); // 2.5 seconds to ensure it's ready when preloader finishes

    return () => clearTimeout(loadTimer);
  }, []);

  // Log state changes
  useEffect(() => {
    console.log('🔄 Background state changed:', { isLoading, isLoaded, loadError });
  }, [isLoading, isLoaded, loadError]);

  return (
    <div 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -100, // Much lower z-index to ensure it's behind everything
      }}
    >
      {/* Black fallback while loading - always visible until loaded */}
      {isLoading && (
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000000', // Pure black fallback
            zIndex: 1
          }}
        />
      )}
      
      {/* UnicornStudio Scene - only when fully loaded */}
      {isLoaded && (
        <div style={{ position: 'relative', zIndex: 2 }}>
          <UnicornScene 
            production={true} 
            projectId="ed7SJMvTJEVxfqzypOOQ" 
            width={width} 
            height={height} 
          />
        </div>
      )}
    </div>
  );
};

export default RaycastAnimatedBlueBackground;

