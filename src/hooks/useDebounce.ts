import { useCallback, useRef, useEffect } from 'react';
import { useState } from 'react';

interface DebounceOptions {
  delay: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

export function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  options: DebounceOptions
): T {
  const { delay, leading = false, trailing = true, maxWait } = options;
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCallTimeRef = useRef<number>(0);
  const lastCallArgsRef = useRef<Parameters<T> | null>(null);
  const lastInvokeTimeRef = useRef<number>(0);

  const clearTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const invokeCallback = useCallback((args: Parameters<T>) => {
    lastInvokeTimeRef.current = Date.now();
    callback(...args);
  }, [callback]);

  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    lastCallTimeRef.current = now;
    lastCallArgsRef.current = args;

    // Clear existing timeout
    clearTimeout();

    // Check if we should invoke immediately (leading edge)
    if (leading && now - lastInvokeTimeRef.current >= delay) {
      invokeCallback(args);
      return;
    }

    // Check maxWait constraint
    if (maxWait !== undefined) {
      const timeSinceLastCall = now - lastCallTimeRef.current;
      if (timeSinceLastCall >= maxWait) {
        invokeCallback(args);
        return;
      }
    }

    // Set timeout for trailing edge
    if (trailing) {
      timeoutRef.current = setTimeout(() => {
        if (lastCallArgsRef.current) {
          invokeCallback(lastCallArgsRef.current);
          lastCallArgsRef.current = null;
        }
      }, delay);
    }
  }, [delay, leading, trailing, maxWait, clearTimeout, invokeCallback]) as T;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimeout();
    };
  }, [clearTimeout]);

  return debouncedCallback;
}

// Hook for debouncing values (useful for search inputs, etc.)
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Hook for debouncing with immediate execution option
export function useDebounceImmediate<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
  immediate: boolean = false
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isImmediateRef = useRef(immediate);

  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    if (isImmediateRef.current) {
      isImmediateRef.current = false;
      callback(...args);
      return;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
      isImmediateRef.current = immediate;
    }, delay);
  }, [callback, delay, immediate]) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

// Hook for debouncing with cancel and flush methods
export function useDebounceAdvanced<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): {
  debouncedCallback: T;
  cancel: () => void;
  flush: () => void;
} {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastArgsRef = useRef<Parameters<T> | null>(null);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    lastArgsRef.current = null;
  }, []);

  const flush = useCallback(() => {
    if (lastArgsRef.current && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      callback(...lastArgsRef.current);
      lastArgsRef.current = null;
    }
  }, [callback]);

  const debouncedCallback = useCallback((...args: Parameters<T>) => {
    lastArgsRef.current = args;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      callback(...args);
      lastArgsRef.current = null;
    }, delay);
  }, [callback, delay]) as T;

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  return {
    debouncedCallback,
    cancel,
    flush,
  };
}

// Hook for throttling (alternative to debouncing)
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastCallTimeRef = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const throttledCallback = useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastCallTimeRef.current;

    if (timeSinceLastCall >= delay) {
      // Execute immediately if enough time has passed
      lastCallTimeRef.current = now;
      callback(...args);
    } else {
      // Schedule execution for the remaining time
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        lastCallTimeRef.current = Date.now();
        callback(...args);
      }, delay - timeSinceLastCall);
    }
  }, [callback, delay]) as T;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return throttledCallback;
}
