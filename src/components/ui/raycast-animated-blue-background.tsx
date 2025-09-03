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

  return (
    <div className={cn("fixed inset-0 -z-10")} style={{ zIndex: -10 }}>
      <UnicornScene 
        production={true} 
        projectId="ed7SJMvTJEVxfqzypOOQ" 
        width={width} 
        height={height} 
      />
    </div>
  );
};

export default RaycastAnimatedBlueBackground;

