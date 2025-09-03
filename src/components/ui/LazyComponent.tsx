import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';

interface LazyComponentProps {
  component: React.ComponentType<any>;
  fallback?: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  props?: any;
  preload?: boolean;
}

export const LazyComponent: React.FC<LazyComponentProps> = ({
  component: Component,
  fallback = <div className="animate-pulse bg-gray-700 rounded h-32"></div>,
  threshold = 0.1,
  rootMargin = '50px',
  props = {},
  preload = false
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(preload);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preload) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Start loading when component comes into view
            if (!shouldLoad) {
              setShouldLoad(true);
            }
          }
        });
      },
      {
        threshold,
        rootMargin
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [threshold, rootMargin, preload, shouldLoad]);

  // Preload component when shouldLoad becomes true
  useEffect(() => {
    if (shouldLoad && !isLoaded) {
      // Simulate component loading
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [shouldLoad, isLoaded]);

  if (!shouldLoad) {
    return (
      <div ref={containerRef} className="w-full">
        {fallback}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full">
        {fallback}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full">
      <Suspense fallback={fallback}>
        <Component {...props} />
      </Suspense>
    </div>
  );
};

// Higher-order component for lazy loading
export function withLazyLoading<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    fallback?: React.ReactNode;
    threshold?: number;
    rootMargin?: string;
    preload?: boolean;
  } = {}
) {
  return function LazyWrappedComponent(props: P) {
    return (
      <LazyComponent
        component={Component}
        props={props}
        fallback={options.fallback}
        threshold={options.threshold}
        rootMargin={options.rootMargin}
        preload={options.preload}
      />
    );
  };
}

// Utility for creating lazy components with better error boundaries
export function createLazyComponent<T extends object>(
  importFunc: () => Promise<{ default: React.ComponentType<T> }>,
  options: {
    fallback?: React.ReactNode;
    retryCount?: number;
    retryDelay?: number;
  } = {}
) {
  const { fallback, retryCount = 3, retryDelay = 1000 } = options;

  const LazyComponent = lazy(() => {
    let retries = 0;
    
    const loadComponent = (): Promise<{ default: React.ComponentType<T> }> => {
      return importFunc().catch((error) => {
        if (retries < retryCount) {
          retries++;
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(loadComponent());
            }, retryDelay);
          });
        }
        throw error;
      });
    };

    return loadComponent();
  });

  return function LazyComponentWrapper(props: T) {
    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

// Performance monitoring wrapper
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return function PerformanceMonitoredComponent(props: P) {
    const renderStart = useRef(performance.now());
    const renderCount = useRef(0);

    useEffect(() => {
      renderCount.current++;
      const renderTime = performance.now() - renderStart.current;
      
      if (renderTime > 16.67) { // More than 60fps threshold
        console.warn(`${componentName} slow render: ${renderTime.toFixed(2)}ms`);
      }
      
      renderStart.current = performance.now();
    });

    return <Component {...props} />;
  };
}
