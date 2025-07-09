// Theme utility for time-based light/dark mode switching

export class ThemeManager {
  constructor() {
    this.currentTheme = 'dark';
    this.isAutoMode = true;
    this.isInitialized = false;
    
    // Only initialize if we're in the browser
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  init() {
    if (this.isInitialized) return;
    
    // Check if we're in the browser
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      console.warn('ThemeManager: Not in browser environment, skipping initialization');
      return;
    }

    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('ethchile-theme');
    const savedAutoMode = localStorage.getItem('ethchile-auto-mode');
    
    if (savedAutoMode !== null) {
      this.isAutoMode = savedAutoMode === 'true';
    }
    
    if (!this.isAutoMode && savedTheme) {
      this.currentTheme = savedTheme;
    } else {
      this.updateThemeBasedOnTime();
    }
    
    this.applyTheme();
    this.startTimeCheck();
    this.isInitialized = true;
  }

  updateThemeBasedOnTime() {
    const now = new Date();
    const hour = now.getHours();
    
    // Light mode: 6 AM to 8 PM (6:00 - 20:00)
    // Dark mode: 8 PM to 6 AM (20:00 - 6:00)
    if (hour >= 6 && hour < 20) {
      this.currentTheme = 'light';
    } else {
      this.currentTheme = 'dark';
    }
  }

  applyTheme() {
    // Check if we're in the browser
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('theme-light', 'theme-dark');
    
    // Add current theme class
    root.classList.add(`theme-${this.currentTheme}`);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', this.currentTheme === 'dark' ? '#000000' : '#ffffff');
    }
    
    // Store current theme only if localStorage is available
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ethchile-theme', this.currentTheme);
      localStorage.setItem('ethchile-auto-mode', this.isAutoMode.toString());
    }
  }

  setTheme(theme) {
    this.currentTheme = theme;
    this.isAutoMode = false;
    this.applyTheme();
  }

  setAutoMode(enabled) {
    this.isAutoMode = enabled;
    if (enabled) {
      this.updateThemeBasedOnTime();
      this.applyTheme();
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('ethchile-auto-mode', enabled.toString());
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.isAutoMode = false;
    this.applyTheme();
  }

  getCurrentTheme() {
    return this.currentTheme;
  }

  isAutoModeEnabled() {
    return this.isAutoMode;
  }

  startTimeCheck() {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      return;
    }

    // Check for theme changes every minute
    setInterval(() => {
      if (this.isAutoMode) {
        const previousTheme = this.currentTheme;
        this.updateThemeBasedOnTime();
        
        if (previousTheme !== this.currentTheme) {
          this.applyTheme();
          // Dispatch custom event for components to react
          window.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: this.currentTheme }
          }));
        }
      }
    }, 60000); // Check every minute
  }

  // Get time-based theme without applying it
  getTimeBasedTheme() {
    const now = new Date();
    const hour = now.getHours();
    return (hour >= 6 && hour < 20) ? 'light' : 'dark';
  }

  // Get next theme change time
  getNextThemeChangeTime() {
    const now = new Date();
    const currentHour = now.getHours();
    
    if (currentHour >= 6 && currentHour < 20) {
      // Currently light mode, next change is at 8 PM
      const nextChange = new Date(now);
      nextChange.setHours(20, 0, 0, 0);
      return nextChange;
    } else {
      // Currently dark mode, next change is at 6 AM
      const nextChange = new Date(now);
      nextChange.setDate(nextChange.getDate() + 1);
      nextChange.setHours(6, 0, 0, 0);
      return nextChange;
    }
  }

  // Force initialization (for client-side use)
  forceInit() {
    if (!this.isInitialized) {
      this.init();
    }
  }
}

// Create global instance
export const themeManager = new ThemeManager();

// Export for use in components
export default themeManager; 