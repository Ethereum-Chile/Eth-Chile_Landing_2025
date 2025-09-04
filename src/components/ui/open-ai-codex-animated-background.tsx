import { cn } from "../../lib/utils";
import { useState, useEffect, useCallback, useMemo } from "react";
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

export const Component = () => {
  const { width, height } = useWindowSize();
  const [useFallback, setUseFallback] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Memoize the fallback background to prevent unnecessary re-renders
  const FallbackBackground = useMemo(() => () => (
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20 animate-pulse rounded-2xl"></div>
      
      {/* Floating particles - Hidden on mobile to prevent unwanted animations */}
      <div className="absolute inset-0 hidden md:block">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animation: 'float 3s ease-in-out infinite'
            }}
          />
        ))}
      </div>
      
      {/* Animated grid pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:50px_50px] rounded-2xl"
        style={{
          animation: 'grid-move 20s linear infinite'
        }}
      ></div>
      
      {/* Glowing orbs - Reduced from 3 to 2 for better performance */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  ), []);

  // Optimized error handling and fallback logic
  const handleUnicornError = useCallback(() => {
    setUseFallback(true);
  }, []);

  const handleUnicornLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Try to render UnicornScene, fallback to custom animation if it fails
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setUseFallback(true);
      }
    }, 2000); // Reduced from 3s to 2s for faster fallback

    return () => clearTimeout(timer);
  }, [isLoaded]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      // Cleanup any running animations or timers
      setIsLoaded(false);
      setUseFallback(false);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { 
              transform: translateY(0px) rotate(0deg); 
              opacity: 0.3;
            }
            50% { 
              transform: translateY(-20px) rotate(180deg); 
              opacity: 0.8;
            }
          }
          
          @keyframes grid-move {
            0% { 
              transform: translate(0, 0); 
              opacity: 0.1;
            }
            100% { 
              transform: translate(50px, 50px); 
              opacity: 0.3;
            }
          }
        `
      }} />
      
      {/* Rounded border card container with balanced margins */}
      <div className="relative w-full h-full p-6">
        <div className="w-full h-full rounded-2xl border border-white/20 bg-black/10 backdrop-blur-sm overflow-hidden shadow-2xl">
          <div className={cn("absolute inset-0 w-full h-full rounded-2xl")}>
            {!useFallback ? (
              <div className="w-full h-full rounded-2xl">
                <UnicornScene 
                  production={true} 
                  projectId="1grEuiVDSVmyvEMAYhA6" 
                  width={width} 
                  height={height}
                  onError={handleUnicornError}
                  onLoad={handleUnicornLoad}
                />
              </div>
            ) : (
              <FallbackBackground />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
