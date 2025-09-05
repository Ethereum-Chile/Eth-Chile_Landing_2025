'use client';

import { useState, useEffect } from 'react';
import ScrollExpandMedia from './ScrollExpandMedia';
import { AnimatedTestimonials } from "./AnimatedTestimonials.tsx";

interface MediaAbout {
  overview: string;
  conclusion: string;
}

interface MediaContent {
  src: string;
  poster?: string;
  background: string;
  title: string;
  date: string;
  scrollToExpand: string;
  about: MediaAbout;
}

const getMediaContent = (language: 'en' | 'es'): MediaContent => ({
  src: 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1', // Placeholder video
  poster: 'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg',
  background: '/imgs/ethchile2025.png', // Using the ETHChile background image
  title: language === 'es' ? 'Qué Hace Único a ETHChile' : 'What Makes ETHChile Unique',
  date: language === 'es' ? 'El Evento Principal de Ethereum en Latinoamérica' : 'Latin America\'s Premier Ethereum Event',
  scrollToExpand: language === 'es' ? 'Desplázate para Descubrir Más' : 'Scroll to Discover More',
  about: {
    overview: language === 'es' 
      ? 'ETHChile representa la intersección perfecta entre claridad regulatoria e innovación tecnológica. Como el único evento de Ethereum en Latinoamérica enfocado en tokenización, regulación e integración de IA, reunimos a las mentes más brillantes en blockchain.'
      : 'ETHChile represents the perfect intersection of regulatory clarity and technological innovation. As the only Ethereum event in Latin America focused on tokenization, regulation, and AI integration, we bring together the brightest minds in blockchain.',
    conclusion: language === 'es'
      ? 'Únete a nosotros en Santiago para una experiencia sin precedentes donde las finanzas tradicionales se encuentran con la innovación descentralizada, y donde el futuro Web3 de Latinoamérica toma forma.'
      : 'Join us in Santiago for an unparalleled experience where traditional finance meets decentralized innovation, and where Latin America\'s Web3 future takes shape.',
  },
});

const MediaContent = ({ language }: { language: 'en' | 'es' }) => {
  const testimonials = language === 'es' ? [
    {
      quote: "El marco regulatorio y ecosistema fintech de Chile lo convierten en el puente perfecto entre las finanzas tradicionales y la innovación descentralizada. ETHChile es donde converge el futuro de las finanzas.",
      name: "María González",
      designation: "CEO, Fintech Chile",
      src: "/imgs/team/pato_pfp.webp",
    },
    {
      quote: "La combinación de la economía estable de Chile, las regulaciones progresivas y el talento tecnológico crea un ambiente ideal para la adopción de Ethereum. Aquí es donde comienza la revolución DeFi de Latinoamérica.",
      name: "Carlos Mendoza",
      designation: "Jefe de Innovación, Banco de Chile",
      src: "/imgs/team/cristobal_pfp.webp",
    },
    {
      quote: "ETHChile representa la intersección perfecta entre claridad regulatoria e innovación tecnológica. Chile está posicionado para convertirse en el centro fintech de Latinoamérica.",
      name: "Ana Silva",
      designation: "Asuntos Regulatorios, CMF Chile",
      src: "/imgs/team/andres_pfp.webp",
    },
    {
      quote: "La madurez del mercado chileno y el enfoque visionario del gobierno hacia fintech lo convierten en un destino atractivo para proyectos blockchain globales e inversiones.",
      name: "Roberto Torres",
      designation: "Socio Director, LatAm Ventures",
      src: "/imgs/team/joseph_pfp.webp",
    },
  ] : [
    {
      quote: "Chile's regulatory framework and fintech ecosystem make it the perfect bridge between traditional finance and decentralized innovation. ETHChile is where the future of finance converges.",
      name: "María González",
      designation: "CEO, Fintech Chile",
      src: "/imgs/team/pato_pfp.webp",
    },
    {
      quote: "The combination of Chile's stable economy, progressive regulations, and tech talent creates an ideal environment for Ethereum adoption. This is where Latin America's DeFi revolution begins.",
      name: "Carlos Mendoza",
      designation: "Head of Innovation, Banco de Chile",
      src: "/imgs/team/cristobal_pfp.webp",
    },
    {
      quote: "ETHChile represents the perfect intersection of regulatory clarity and technological innovation. Chile is positioned to become the fintech hub of Latin America.",
      name: "Ana Silva",
      designation: "Regulatory Affairs, CMF Chile",
      src: "/imgs/team/andres_pfp.webp",
    },
    {
      quote: "The Chilean market's maturity and the government's forward-thinking approach to fintech make it an attractive destination for global blockchain projects and investments.",
      name: "Roberto Torres",
      designation: "Managing Partner, LatAm Ventures",
      src: "/imgs/team/joseph_pfp.webp",
    },
  ];

  return (
    <div className='max-w-6xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6 text-white text-center'>
        {language === 'es' ? 'Lo que Dicen los Líderes de la Industria sobre Chile' : 'What Industry Leaders Say About Chile'}
      </h2>
      
      <AnimatedTestimonials
        testimonials={testimonials}
        autoplay={true}
        className="mt-8"
      />
    </div>
  );
};

const WhatMakesUniqueScrollExpand = () => {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es'>('es');

  useEffect(() => {
    setMounted(true);
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('eth-chile-language') as 'en' | 'es';
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail.language);
    };

    window.addEventListener('languageChanged', handleLanguageChange as EventListener);
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange as EventListener);
    };
  }, [mounted]);

  if (!mounted) {
    return null;
  }

  const currentMedia = getMediaContent(language);

  useEffect(() => {
    window.scrollTo(0, 0);

    const resetEvent = new Event('resetSection');
    window.dispatchEvent(resetEvent);
  }, []);

  return (
    <div className='min-h-screen'>
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={currentMedia.src}
        posterSrc={currentMedia.poster}
        bgImageSrc={currentMedia.background}
        title={currentMedia.title}
        date={currentMedia.date}
        scrollToExpand={currentMedia.scrollToExpand}
        textBlend
      >
        <MediaContent language={language} />
      </ScrollExpandMedia>
    </div>
  );
};

export default WhatMakesUniqueScrollExpand; 