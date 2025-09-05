'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

// Translation data
const translations = {
  en: {
    // Hero Section
    'hero.title': 'ETH Chile',
    'hero.year': '2025',
    'hero.subtitle': 'Fintech meets Ethereum',
    'hero.date': 'October 24th & 25th',
    'hero.description': 'Experience the future of blockchain technology in the heart of LatinAmerica\'s fintech revolution.',
    'hero.blockchain': 'blockchain',
    'hero.latinamerica': 'LatinAmerica',
    'hero.cta': 'Quiero ser Speaker',
    
    // Team Section
    'team.title': 'ETHChile Team',
    'team.team': 'Team',
    'team.description': 'The organizers behind Chile\'s premier Ethereum event',
    
    // What Makes Unique Section
    'unique.title': 'What Makes ETH Chile Unique',
    'unique.eth_chile': 'ETH Chile',
    'unique.description': 'Discover why Chile\'s unique combination of regulatory clarity, fintech infrastructure, and technological talent makes it the ideal location for the next generation of blockchain innovation.',
    'unique.video.title': 'Santiago is a fintech powerhouse.',
    'unique.video.fintech': 'fintech',
    'unique.video.subtitle': 'Join Chile\'s premier Ethereum event.',
    'unique.video.ethereum': 'Ethereum',
    
    // Why Ethereum Section
    'why.title': 'Why Ethereum, Why Now',
    'why.now': 'Now',
    'why.subtitle': 'Ethereum is now critical infrastructure',
    'why.description': 'The world\'s programmable blockchain has evolved into the foundation for the next generation of financial applications, decentralized systems, and digital innovation.',
    
    // Hackathon Section
    'hackathon.title': 'ETH Chile Hackathon',
    'hackathon.hack': 'Hack',
    'hackathon.description': 'Join us for 48 hours of intense coding, innovation, and collaboration. Build the future of Web3 with like-minded developers, designers, and entrepreneurs.',
    'hackathon.cta': 'Apply Now',
    'hackathon.cta_clicked': 'Application Sent!',
    
    // Latin America Section
    'latinamerica.title': 'Latin America is the Future, Chile is the Catalyst',
    'latinamerica.future': 'Future',
    'latinamerica.chile': 'Chile',
    'latinamerica.description': 'Chile\'s stable economy, clear regulatory framework, and growing tech ecosystem make it the perfect gateway for blockchain innovation in Latin America.',
    
    // Social Proof Section
    'social.title': 'Join The Community',
    'social.community': 'Community',
    'social.description': 'Join the growing ecosystem of builders, innovators, and leaders in Chile',
    
    // Sponsorship Section
    'sponsorship.title': 'Sponsor the ETH Chile Conference',
    'sponsorship.conference': 'Conference',
    'sponsorship.cta': 'Apply to be a sponsor',
    'sponsorship.contact': 'Contact Sales Team',
    
    // Footer
    'footer.title': 'Let\'s build together',
    'footer.build': 'build',
    'footer.submit': 'Submit',
    'footer.name': 'Name',
    'footer.email': 'Email',
    'footer.message': 'Message',
    
    // Common
    'common.scroll': 'Scroll',
  },
  es: {
    // Hero Section
    'hero.title': 'ETH Chile',
    'hero.year': '2025',
    'hero.subtitle': 'Fintech se encuentra con Ethereum',
    'hero.date': '24 y 25 de Octubre',
    'hero.description': 'Experimenta el futuro de la tecnología blockchain en el corazón de la revolución fintech de Latinoamérica.',
    'hero.blockchain': 'blockchain',
    'hero.latinamerica': 'Latinoamérica',
    'hero.cta': 'Quiero ser Speaker',
    
    // Team Section
    'team.title': 'Equipo ETHChile',
    'team.team': 'Equipo',
    'team.description': 'Los organizadores detrás del evento principal de Ethereum en Chile',
    
    // What Makes Unique Section
    'unique.title': 'Qué Hace Único a ETH Chile',
    'unique.eth_chile': 'ETH Chile',
    'unique.description': 'Descubre por qué la combinación única de Chile de claridad regulatoria, infraestructura fintech y talento tecnológico lo convierte en la ubicación ideal para la próxima generación de innovación blockchain.',
    'unique.video.title': 'Santiago es una potencia fintech.',
    'unique.video.fintech': 'fintech',
    'unique.video.subtitle': 'Únete al evento principal de Ethereum en Chile.',
    'unique.video.ethereum': 'Ethereum',
    
    // Why Ethereum Section
    'why.title': 'Por qué Ethereum, Por qué Ahora',
    'why.now': 'Ahora',
    'why.subtitle': 'Ethereum es ahora infraestructura crítica',
    'why.description': 'La blockchain programable del mundo ha evolucionado hasta convertirse en la base para la próxima generación de aplicaciones financieras, sistemas descentralizados e innovación digital.',
    
    // Hackathon Section
    'hackathon.title': 'Hackathon ETH Chile',
    'hackathon.hack': 'Hack',
    'hackathon.description': 'Únete a nosotros por 48 horas de programación intensa, innovación y colaboración. Construye el futuro de Web3 con desarrolladores, diseñadores y emprendedores afines.',
    'hackathon.cta': 'Aplicar Ahora',
    'hackathon.cta_clicked': '¡Aplicación Enviada!',
    
    // Latin America Section
    'latinamerica.title': 'Latinoamérica es el Futuro, Chile es el Catalizador',
    'latinamerica.future': 'Futuro',
    'latinamerica.chile': 'Chile',
    'latinamerica.description': 'La economía estable de Chile, el marco regulatorio claro y el ecosistema tecnológico en crecimiento lo convierten en la puerta de entrada perfecta para la innovación blockchain en Latinoamérica.',
    
    // Social Proof Section
    'social.title': 'Únete a la Comunidad',
    'social.community': 'Comunidad',
    'social.description': 'Únete al creciente ecosistema de constructores, innovadores y líderes en Chile',
    
    // Sponsorship Section
    'sponsorship.title': 'Patrocina la Conferencia ETH Chile',
    'sponsorship.conference': 'Conferencia',
    'sponsorship.cta': 'Aplicar para ser patrocinador',
    'sponsorship.contact': 'Contactar Equipo de Ventas',
    
    // Footer
    'footer.title': 'Construyamos juntos',
    'footer.build': 'construir',
    'footer.submit': 'Enviar',
    'footer.name': 'Nombre',
    'footer.email': 'Correo',
    'footer.message': 'Mensaje',
    
    // Common
    'common.scroll': 'Desplázate',
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('es'); // Default to Spanish to match Layout.astro lang="es"

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('eth-chile-language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('eth-chile-language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
