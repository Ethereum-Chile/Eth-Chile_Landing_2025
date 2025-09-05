'use client';

import { useState, useEffect } from 'react';
import { AnimatedTestimonials } from "./AnimatedTestimonials.tsx";

const TeamContent = () => {
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
      title: "ETHChile Team",
      team: "Team",
      description: "The organizers behind Chile's premier Ethereum event",
      testimonials: [
        {
          quote: "Chile's regulatory framework makes it the perfect bridge between traditional finance and decentralized innovation.",
          name: "Andrés Junge",
          designation: "Community member",
          src: "/imgs/team/andres_pfp.webp",
          social: {
            twitter: "https://x.com/ajunge_m",
            linkedin: "https://www.linkedin.com/in/ajunge/",
          },
        },
        {
          quote: "Chile's stable economy and progressive regulations create an ideal environment for Ethereum adoption.",
          name: "Patricio López",
          designation: "Community member",
          src: "/imgs/team/pato_pfp.webp",
          social: {
            twitter: "https://x.com/maestrokongrio",
            linkedin: "https://www.linkedin.com/in/patriciolopezcerda",
          },
        },
        {
          quote: "ETHChile represents the perfect intersection between regulatory clarity and technological innovation.",
          name: "Cristóbal Pereira",
          designation: "Community member",
          src: "/imgs/team/cristobal_pfp.webp",
          social: {
            twitter: "https://x.com/cristpereirag",
            instagram: "https://www.instagram.com/cristpereirag/",
            linkedin: "https://www.linkedin.com/in/cpereirag/",
          },
        },
        {
          quote: "The maturity of the Chilean market and visionary approach to fintech makes it attractive for blockchain projects.",
          name: "Ignacio Puga",
          designation: "Community member",
          src: "/imgs/team/ignacio_pfp.webp",
          social: {
            linkedin: "https://www.linkedin.com/in/ignaciopugasalman/",
          },
        },
        {
          quote: "Building bridges between traditional finance and decentralized innovation is our mission.",
          name: "Joseph Sanchez",
          designation: "Community member",
          src: "/imgs/team/joseph_pfp.webp",
          social: {
            instagram: "https://www.instagram.com/josephhsv",
            linkedin: "https://www.linkedin.com/in/josephhsv/",
          },
        },
        {
          quote: "Empowering Latin America's Web3 ecosystem through education, innovation and community building.",
          name: "Joaquín Farfán",
          designation: "Community member",
          src: "/imgs/team/joaquin_pfp.webp",
          social: {
            twitter: "https://x.com/blessed_ux",
            instagram: "https://www.instagram.com/blessedux/",
            linkedin: "https://linkedin.com/in/joaquinfarfan",
          },
        },
      ]
    },
    es: {
      title: "ETHChile Equipo",
      team: "Equipo",
      description: "Los organizadores detrás del evento principal de Ethereum en Chile",
      testimonials: [
        {
          quote: "El marco regulatorio de Chile lo convierte en el puente perfecto entre las finanzas tradicionales y la innovación descentralizada.",
          name: "Andrés Junge",
          designation: "Miembro de la comunidad",
          src: "/imgs/team/andres_pfp.webp",
          social: {
            twitter: "https://x.com/ajunge_m",
            linkedin: "https://www.linkedin.com/in/ajunge/",
          },
        },
        {
          quote: "La economía estable de Chile y las regulaciones progresivas crean un ambiente ideal para la adopción de Ethereum.",
          name: "Patricio López",
          designation: "Miembro de la comunidad",
          src: "/imgs/team/pato_pfp.webp",
          social: {
            twitter: "https://x.com/maestrokongrio",
            linkedin: "https://www.linkedin.com/in/patriciolopezcerda",
          },
        },
        {
          quote: "ETHChile representa la intersección perfecta entre claridad regulatoria e innovación tecnológica.",
          name: "Cristóbal Pereira",
          designation: "Miembro de la comunidad",
          src: "/imgs/team/cristobal_pfp.webp",
          social: {
            twitter: "https://x.com/cristpereirag",
            instagram: "https://www.instagram.com/cristpereirag/",
            linkedin: "https://www.linkedin.com/in/cpereirag/",
          },
        },
        {
          quote: "La madurez del mercado chileno y el enfoque visionario hacia fintech lo hacen atractivo para proyectos blockchain.",
          name: "Ignacio Puga",
          designation: "Miembro de la comunidad",
          src: "/imgs/team/ignacio_pfp.webp",
          social: {
            linkedin: "https://www.linkedin.com/in/ignaciopugasalman/",
          },
        },
        {
          quote: "Construir puentes entre las finanzas tradicionales y la innovación descentralizada es nuestra misión.",
          name: "Joseph Sanchez",
          designation: "Miembro de la comunidad",
          src: "/imgs/team/joseph_pfp.webp",
          social: {
            instagram: "https://www.instagram.com/josephhsv",
            linkedin: "https://www.linkedin.com/in/josephhsv/",
          },
        },
        {
          quote: "Empoderando el ecosistema Web3 de Latinoamérica a través de educación, innovación y construcción de comunidad.",
          name: "Joaquín Farfán",
          designation: "Miembro de la comunidad",
          src: "/imgs/team/joaquin_pfp.webp",
          social: {
            twitter: "https://x.com/blessed_ux",
            instagram: "https://www.instagram.com/blessedux/",
            linkedin: "https://linkedin.com/in/joaquinfarfan",
          },
        },
      ]
    }
  };

  const t = content[language];

  return (
    <div className="max-w-7xl mx-auto relative z-10">
      <div className="mb-4 text-center">
        <div style={{minHeight: '3rem'}}>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-raleway font-bold text-white mb-4 leading-tight"
            style={{textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5)'}}
          >
            {t.title.split(' ').map((word, index) => {
              if (word === t.team) {
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
            })}
          </h2>
        </div>
        <p
          className="text-xl text-gray-300"
          style={{textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7), 0 0 8px rgba(0, 0, 0, 0.4)'}}
        >
          {t.description}
        </p>
      </div>

      <AnimatedTestimonials
        testimonials={t.testimonials}
      />
    </div>
  );
};

export default TeamContent;
