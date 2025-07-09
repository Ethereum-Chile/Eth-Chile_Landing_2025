import React, { useState, useEffect } from 'react';
import themeManager from '../utils/theme.js';

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [nextChangeTime, setNextChangeTime] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Ensure theme manager is initialized
    themeManager.forceInit();
    
    const updateState = () => {
      setCurrentTheme(themeManager.getCurrentTheme());
      setIsAutoMode(themeManager.isAutoModeEnabled());
      setNextChangeTime(themeManager.getNextThemeChangeTime());
      setIsReady(true);
    };

    // Initial update
    updateState();

    // Listen for theme changes
    const handleThemeChange = () => {
      updateState();
    };

    window.addEventListener('themeChanged', handleThemeChange);

    // Update next change time every minute
    const interval = setInterval(() => {
      if (isAutoMode) {
        setNextChangeTime(themeManager.getNextThemeChangeTime());
      }
    }, 60000);

    return () => {
      window.removeEventListener('themeChanged', handleThemeChange);
      clearInterval(interval);
    };
  }, [isAutoMode]);

  const handleThemeToggle = () => {
    themeManager.toggleTheme();
    setCurrentTheme(themeManager.getCurrentTheme());
    setIsAutoMode(false);
  };

  const handleAutoModeToggle = () => {
    const newAutoMode = !isAutoMode;
    themeManager.setAutoMode(newAutoMode);
    setIsAutoMode(newAutoMode);
    setCurrentTheme(themeManager.getCurrentTheme());
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-CL', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const getTimeUntilNextChange = () => {
    if (!nextChangeTime) return '';
    
    const now = new Date();
    const diff = nextChangeTime - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  // Don't render until ready
  if (!isReady) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
      <div className="flex flex-col gap-3">
        {/* Current Theme Display */}
        <div className="text-center">
          <div className="text-sm text-gray-300 mb-1">Current Theme</div>
          <div className="text-lg font-semibold">
            {currentTheme === 'light' ? '☀️ Light' : '🌙 Dark'}
          </div>
        </div>

        {/* Auto Mode Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-sm">Auto Mode</span>
          <button
            onClick={handleAutoModeToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isAutoMode ? 'bg-blue-600' : 'bg-gray-600'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAutoMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Manual Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          disabled={isAutoMode}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            isAutoMode
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {currentTheme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
        </button>

        {/* Next Change Info */}
        {isAutoMode && nextChangeTime && (
          <div className="text-center text-xs text-gray-400">
            <div>Next change in {getTimeUntilNextChange()}</div>
            <div>at {formatTime(nextChangeTime)}</div>
          </div>
        )}

        {/* Time-based Theme Info */}
        <div className="text-xs text-gray-400 text-center">
          <div>Light: 6:00 AM - 8:00 PM</div>
          <div>Dark: 8:00 PM - 6:00 AM</div>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle; 