import React, { useEffect, useRef, useState } from 'react';
import { App } from './app.js';
import './style.css';

const ASCIIProcessor = ({ 
  width = '400px', 
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
    if (!containerRef.current) {
      console.log('Container ref not available');
      return;
    }

    console.log('Initializing ASCII Processor...');
    setIsLoading(true);
    setHasError(false);

    try {
      // Create container for the ASCII effect
      const container = document.createElement('div');
      container.className = 'webglCanvas';
      container.style.width = '100%';
      container.style.height = '100%';
      container.style.backgroundColor = 'black'; // Add black background
      container.style.minWidth = '400px';
      container.style.minHeight = '400px';
      containerRef.current.appendChild(container);

      console.log('Container created, initializing App...');

      // Initialize the ASCII app
      appRef.current = new App(container);
      
      console.log('App initialized successfully');
      
      // Set up error handling
      const originalConsoleError = console.error;
      console.error = (...args) => {
        console.log('ASCII Processor Error:', args);
        if (args[0]?.includes?.('Error loading model')) {
          setHasError(true);
          if (onError) onError(new Error('Failed to load 3D model'));
        }
        originalConsoleError.apply(console, args);
      };

      // Simulate loading time for better UX
      setTimeout(() => {
        console.log('ASCII Processor ready');
        setIsLoading(false);
        if (onReady) {
          onReady(appRef.current);
        }
      }, 1000); // Reduced loading time

    } catch (error) {
      console.error('ASCII Processor initialization error:', error);
      setHasError(true);
      setIsLoading(false);
      if (onError) {
        onError(error);
      }
    }

    // Cleanup
    return () => {
      console.log('Cleaning up ASCII Processor...');
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
    <div className="eth-ascii-viewer" style={{ width, height }}>
      <div className="mb-6">
        <h3 className="text-2xl font-raleway font-semibold mb-4 text-white">
          🧠 Ethereum ASCII Animation
        </h3>
        <p className="text-white mb-4">
          Real-time ASCII art generated from 3D Ethereum model
        </p>
      </div>
      
      {/* ASCII Output - Full Width and Height with Black Background */}
      <div className="relative bg-black rounded-lg overflow-hidden" style={{ width: '400px', height: '400px' }}>
    <div 
      ref={containerRef}
          className="w-full h-full"
          style={{ width: '400px', height: '400px' }}
        />
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading ASCII Animation...</p>
            </div>
          </div>
        )}
        
      {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white">
            <div className="text-center">
              <p className="text-red-400 mb-4">Failed to load ASCII processor</p>
          <button 
            onClick={() => window.location.reload()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retry
          </button>
            </div>
        </div>
      )}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-white text-sm">
          The 3D Ethereum model is converted to ASCII art in real-time
        </p>
      </div>
    </div>
  );
};

export default ASCIIProcessor; 