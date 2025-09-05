'use client';

import { useState, useEffect } from 'react';
import ScrollExpandMedia from "./ScrollExpandMedia.tsx";

const WhatMakesUniqueContent = () => {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es'>('es');

  useEffect(() => {
    setMounted(true);
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('eth-chile-language') as 'en' | 'es';
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }

    // Listen for language changes
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  const content = {
    en: {
      title: "What Makes ETH Chile",
      unique: "Unique",
      ethChile: "ETH Chile",
      description: "Discover why Chile's unique combination of",
      regulatoryClarity: "regulatory clarity",
      descriptionMiddle: ", fintech infrastructure, and technological talent makes it the",
      idealLocation: "ideal location",
      descriptionEnd: "for the next generation of blockchain innovation.",
      videoTitle: "Santiago <br> is a fintech <br> powerhouse",
      fintech: "fintech",
      videoSubtitle: "Join Chile's premier Ethereum event",
      ethereum: "Ethereum",
      scrollToExpand: "Scroll to Discover More"
    },
    es: {
      title: "Qué Hace ETH Chile",
      unique: "Único",
      ethChile: "ETH Chile",
      description: "Descubre por qué la combinación única de Chile de",
      regulatoryClarity: "claridad regulatoria",
      descriptionMiddle: ", infraestructura fintech y talento tecnológico lo convierte en la",
      idealLocation: "ubicación ideal",
      descriptionEnd: "para la próxima generación de innovación blockchain.",
      videoTitle: "Santiago <br> es una potencia <br> fintech",
      fintech: "fintech",
      videoSubtitle: "Únete al evento principal de Ethereum en Chile",
      ethereum: "Ethereum",
      scrollToExpand: "Desplázate para Descubrir Más"
    }
  };

  const t = content[language];

  return (
    <ScrollExpandMedia
      mediaType="video"
      mediaSrc="https://www.youtube.com/embed/JavAmLx8EG0?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=JavAmLx8EG0&start=30"
      posterSrc="https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg"
      title={t.videoTitle}
      date={t.videoSubtitle}
      scrollToExpand={t.scrollToExpand}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-raleway font-bold text-white leading-tight"
            style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5)'}}
          >
            {t.title.split(' ').map((word, index) => {
              if (word === t.ethChile) {
                return (
                  <span
                    key={index}
                    className="text-custom-blue font-extralight"
                    style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 191, 255, 0.5)'}}
                  >
                    {word}
                  </span>
                );
              }
              return (
                <span key={index}>
                  {word}{index < t.title.split(' ').length - 1 ? ' ' : ''}
                </span>
              );
            })}{' '}
            <span
              className="text-custom-blue font-extralight"
              style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 191, 255, 0.5)'}}
            >
              {t.unique}
            </span>
          </h2>
        </div>
        <p
          className="text-lg text-gray-300 text-center max-w-4xl mx-auto"
          style={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7), 0 0 8px rgba(0, 0, 0, 0.4)'}}
        >
          {t.description}{' '}
          <span
            className="text-custom-blue font-extralight"
            style={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7), 0 0 8px rgba(0, 191, 255, 0.4)'}}
          >
            {t.regulatoryClarity}
          </span>
          {t.descriptionMiddle}{' '}
          <span
            className="text-custom-blue font-extralight"
            style={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7), 0 0 8px rgba(0, 191, 255, 0.4)'}}
          >
            {t.idealLocation}
          </span>
          {t.descriptionEnd}
        </p>
      </div>
    </ScrollExpandMedia>
  );
};

export default WhatMakesUniqueContent;
