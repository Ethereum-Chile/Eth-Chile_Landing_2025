'use client';

import React, { useState, useEffect } from 'react';

const LanguageToggle: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('eth-chile-language') as 'en' | 'es';
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('eth-chile-language', newLanguage);
    
    // Dispatch custom event for other components to listen to
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: newLanguage } 
    }));
  };

  // Don't render during SSR
  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 bg-black/20 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300"
      aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
    >
      <div className="flex items-center space-x-2">
        <span className={`transition-opacity duration-300 ${language === 'en' ? 'opacity-100' : 'opacity-50'}`}>
          EN
        </span>
        <div className="w-px h-4 bg-white/30"></div>
        <span className={`transition-opacity duration-300 ${language === 'es' ? 'opacity-100' : 'opacity-50'}`}>
          ES
        </span>
      </div>
    </button>
  );
};

export default LanguageToggle;