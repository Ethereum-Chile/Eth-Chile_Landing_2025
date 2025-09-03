import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface VirtualScrollOptions {
  itemHeight: number;
  containerHeight: number;
  overscan?: number;
  threshold?: number;
}

interface VirtualScrollResult<T> {
  virtualItems: T[];
  totalHeight: number;
  startIndex: number;
  endIndex: number;
  containerRef: React.RefObject<HTMLDivElement>;
  scrollToIndex: (index: number) => void;
  scrollToTop: () => void;
  scrollToBottom: () => void;
}

export function useVirtualScroll<T>(
  items: T[],
  options: VirtualScrollOptions
): VirtualScrollResult<T> {
  const { itemHeight, containerHeight, overscan = 5, threshold = 100 } = options;
  
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate virtual scroll parameters
  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  // Get visible items
  const virtualItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1);
  }, [items, startIndex, endIndex]);

  // Throttled scroll handler for better performance
  const handleScroll = useCallback((event: Event) => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const target = event.target as HTMLElement;
      setScrollTop(target.scrollTop);
    }, 16); // ~60fps throttling
  }, []);

  // Scroll to specific index
  const scrollToIndex = useCallback((index: number) => {
    if (containerRef.current) {
      const scrollTop = index * itemHeight;
      containerRef.current.scrollTop = scrollTop;
      setScrollTop(scrollTop);
    }
  }, [itemHeight]);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    scrollToIndex(0);
  }, [scrollToIndex]);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    scrollToIndex(items.length - 1);
  }, [items.length, scrollToIndex]);

  // Set up scroll listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    virtualItems,
    totalHeight,
    startIndex,
    endIndex,
    containerRef,
    scrollToIndex,
    scrollToTop,
    scrollToBottom,
  };
}

// Hook for infinite scrolling with virtual scrolling
export function useInfiniteVirtualScroll<T>(
  items: T[],
  options: VirtualScrollOptions & {
    onLoadMore?: () => void;
    hasMore?: boolean;
    loading?: boolean;
  }
) {
  const {
    onLoadMore,
    hasMore = false,
    loading = false,
    ...virtualScrollOptions
  } = options;

  const virtualScroll = useVirtualScroll(items, virtualScrollOptions);
  const { endIndex, containerRef } = virtualScroll;

  // Load more when approaching the end
  useEffect(() => {
    if (!onLoadMore || loading || !hasMore) return;

    const remainingItems = items.length - endIndex;
    if (remainingItems <= options.overscan! + 10) {
      onLoadMore();
    }
  }, [endIndex, items.length, onLoadMore, loading, hasMore, options.overscan]);

  return {
    ...virtualScroll,
    hasMore,
    loading,
  };
}

// Hook for horizontal virtual scrolling
export function useHorizontalVirtualScroll<T>(
  items: T[],
  options: {
    itemWidth: number;
    containerWidth: number;
    overscan?: number;
  }
) {
  const { itemWidth, containerWidth, overscan = 5 } = options;
  
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalWidth = items.length * itemWidth;
  const startIndex = Math.max(0, Math.floor(scrollLeft / itemWidth) - overscan);
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollLeft + containerWidth) / itemWidth) + overscan
  );

  const virtualItems = useMemo(() => {
    return items.slice(startIndex, endIndex + 1);
  }, [items, startIndex, endIndex]);

  const handleScroll = useCallback((event: Event) => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      const target = event.target as HTMLElement;
      setScrollLeft(target.scrollLeft);
    }, 16);
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    if (containerRef.current) {
      const scrollLeft = index * itemWidth;
      containerRef.current.scrollLeft = scrollLeft;
      setScrollLeft(scrollLeft);
    }
  }, [itemWidth]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return {
    virtualItems,
    totalWidth,
    startIndex,
    endIndex,
    containerRef,
    scrollToIndex,
    scrollLeft,
  };
}
