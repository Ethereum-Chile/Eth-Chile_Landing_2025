import React, { useEffect, useRef, useState } from 'react';
import { App } from './app-clean.js';
import './style-clean.css';

const ASCIIProcessor = ({ 
  width = '100%', 
  height = '400px',
  className = '',
  onReady = null,
  onError = null,
  showLoading = true,
  transparent = true
}) => {
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    console.log('ASCIIProcessor mounting...');
    setIsLoading(true);
    setHasError(false);

    try {
      // Create container for the ASCII effect
      const container = document.createElement('div');
      container.className = 'webglCanvas';
      containerRef.current.appendChild(container);
      
      console.log('Container created:', container);
      console.log('Container dimensions:', {
        width: container.offsetWidth,
        height: container.offsetHeight,
        parentWidth: containerRef.current.offsetWidth,
        parentHeight: containerRef.current.offsetHeight
      });

      // Wait a frame to ensure container is properly sized
      requestAnimationFrame(() => {
        // Initialize the ASCII app
        console.log('Initializing ASCII app...');
        appRef.current = new App(container);
        console.log('ASCII app initialized:', appRef.current);
      });
      
      // Set up error handling
      const originalConsoleError = console.error;
      console.error = (...args) => {
        if (args[0]?.includes?.('Error loading model')) {
          setHasError(true);
          if (onError) onError(new Error('Failed to load 3D model'));
        }
        originalConsoleError.apply(console, args);
      };

      // Simulate loading time for better UX
      setTimeout(() => {
        setIsLoading(false);
        if (onReady) {
          onReady(appRef.current);
        }
      }, 1000);

    } catch (error) {
      setHasError(true);
      setIsLoading(false);
      if (onError) {
        onError(error);
      }
    }

    // Cleanup
    return () => {
      if (appRef.current && appRef.current.dispose) {
        appRef.current.dispose();
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  const containerClassName = `ascii-processor ${className} ${
    isLoading && showLoading ? 'loading' : ''
  } ${hasError ? 'error' : ''} ${transparent ? 'transparent' : ''}`;

  return (
    <div 
      ref={containerRef}
      className={containerClassName}
      style={{ 
        width, 
        height,
        position: 'relative',
        overflow: 'hidden',
        background: 'transparent',
        backgroundColor: 'transparent'
      }}
    >
      {hasError && (
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#ff6b6b',
          background: 'rgba(42, 42, 42, 0.9)',
          padding: '20px',
          borderRadius: '8px'
        }}>
          <p>Failed to load ASCII processor</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#667eea',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};

export default ASCIIProcessor; 