import { useEffect, useRef } from 'react';

interface PerformanceMetrics {
  fps: number;
  memoryUsage?: number;
  renderTime: number;
}

export const usePerformanceMonitor = (enabled: boolean = true) => {
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const fpsRef = useRef(0);
  const renderTimeRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    let animationFrameId: number;
    let lastFpsUpdate = performance.now();

    const measurePerformance = () => {
      const currentTime = performance.now();
      frameCount.current++;

      // Update FPS every second
      if (currentTime - lastFpsUpdate >= 1000) {
        fpsRef.current = Math.round((frameCount.current * 1000) / (currentTime - lastFpsUpdate));
        frameCount.current = 0;
        lastFpsUpdate = currentTime;

        // Log performance warnings
        if (fpsRef.current < 30) {
          console.warn(`Low FPS detected: ${fpsRef.current}. Consider optimizing animations.`);
        }
      }

      // Measure render time
      const renderStart = performance.now();
      animationFrameId = requestAnimationFrame(() => {
        renderTimeRef.current = performance.now() - renderStart;
        
        // Log slow renders
        if (renderTimeRef.current > 16.67) { // More than 60fps threshold
          console.warn(`Slow render detected: ${renderTimeRef.current.toFixed(2)}ms`);
        }
        
        measurePerformance();
      });
    };

    measurePerformance();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [enabled]);

  // Monitor memory usage in development
  useEffect(() => {
    if (!enabled || process.env.NODE_ENV !== 'development') return;

    const memoryInterval = setInterval(() => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
        const totalMB = Math.round(memory.totalJSHeapSize / 1024 / 1024);
        
        if (usedMB > 100) { // Warning threshold
          console.warn(`High memory usage: ${usedMB}MB / ${totalMB}MB`);
        }
      }
    }, 5000);

    return () => clearInterval(memoryInterval);
  }, [enabled]);

  return {
    fps: fpsRef.current,
    renderTime: renderTimeRef.current,
    getMetrics: (): PerformanceMetrics => ({
      fps: fpsRef.current,
      renderTime: renderTimeRef.current,
    }),
  };
};
