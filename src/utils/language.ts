import { useState, useEffect } from 'react';

export type Language = 'en' | 'es';

export interface LanguageContent {
  [key: string]: string;
}

// Language content for all components
export const languageContent: Record<Language, Record<string, LanguageContent>> = {
  en: {
    hero: {
      title: "ETH Chile",
      year: "2025",
      subtitle: "Fintech meets Ethereum",
      date: "October 24th & 25th",
      description: "Experience the future of blockchain technology in the heart of LatinAmerica's fintech revolution.",
      cta: "I Want to be a Speaker"
    },
    whyEthereum: {
      title: "Why Ethereum, Why Now",
      now: "Now",
      subtitle: "Ethereum is now critical infrastructure",
      description: "The world's programmable blockchain has evolved into the foundation for the next generation of financial applications, decentralized systems, and digital innovation."
    },
    latinAmerica: {
      title: "Latin America is the Future, Chile is the Catalyst",
      future: "Future",
      chile: "Chile",
      description: "Chile's stable economy, clear regulatory framework, and growing tech ecosystem make it the perfect gateway for blockchain innovation in Latin America."
    },
    whatMakesUnique: {
      title: "What Makes ETH Chile Unique",
      ethChile: "ETH Chile",
      description: "Discover why Chile's unique combination of regulatory clarity, fintech infrastructure, and technological talent makes it the ideal location for the next generation of blockchain innovation.",
      videoTitle: "Santiago is a fintech powerhouse.",
      fintech: "fintech",
      videoSubtitle: "Join Chile's premier Ethereum event.",
      ethereum: "Ethereum"
    },
    hackathon: {
      title: "ETH Chile Hackathon",
      hack: "Hack",
      description: "Join us for 48 hours of intense coding, innovation, and collaboration. Build the future of Web3 with like-minded developers, designers, and entrepreneurs.",
      cta: "Apply Now",
      ctaClicked: "Application Sent!"
    },
    team: {
      title: "ETHChile Team",
      team: "Team",
      description: "The organizers behind Chile's premier Ethereum event"
    },
    socialProof: {
      title: "Join The Community",
      community: "Community",
      description: "Join the growing ecosystem of builders, innovators, and leaders in Chile"
    },
    sponsorship: {
      title: "Sponsor the ETH Chile Conference",
      conference: "Conference",
      cta: "Apply to be a sponsor",
      contact: "Contact Sales Team"
    },
    footer: {
      title: "Let's build together",
      build: "build",
      submit: "Submit",
      name: "Name",
      email: "Email",
      message: "Message"
    }
  },
  es: {
    hero: {
      title: "ETH Chile",
      year: "2025",
      subtitle: "Fintech se encuentra con Ethereum",
      date: "24 y 25 de Octubre",
      description: "Experimenta el futuro de la tecnología blockchain<br />en el corazón de la revolución fintech de Latinoamérica.",
      cta: "Quiero ser Speaker"
    },
    whyEthereum: {
      title: "Por qué Ethereum, Por qué Ahora",
      now: "Ahora",
      subtitle: "Ethereum es ahora infraestructura crítica",
      description: "La blockchain programable del mundo ha evolucionado hasta convertirse en la base para la próxima generación de aplicaciones financieras, sistemas descentralizados e innovación digital."
    },
    latinAmerica: {
      title: "Latinoamérica es el Futuro, Chile es el Catalizador",
      future: "Futuro",
      chile: "Chile",
      description: "La economía estable de Chile, el marco regulatorio claro y el ecosistema tecnológico en crecimiento lo convierten en la puerta de entrada perfecta para la innovación blockchain en Latinoamérica."
    },
    whatMakesUnique: {
      title: "Qué Hace Único a ETH Chile",
      ethChile: "ETH Chile",
      description: "Descubre por qué la combinación única de Chile de claridad regulatoria, infraestructura fintech y talento tecnológico lo convierte en la ubicación ideal para la próxima generación de innovación blockchain.",
      videoTitle: "Santiago es una potencia fintech.",
      fintech: "fintech",
      videoSubtitle: "Únete al evento principal de Ethereum en Chile.",
      ethereum: "Ethereum"
    },
    hackathon: {
      title: "Hackathon ETH Chile",
      hack: "Hack",
      description: "Únete a nosotros por 48 horas de programación intensa, innovación y colaboración. Construye el futuro de Web3 con desarrolladores, diseñadores y emprendedores afines.",
      cta: "Aplicar Ahora",
      ctaClicked: "¡Aplicación Enviada!"
    },
    team: {
      title: "Equipo ETHChile",
      team: "Equipo",
      description: "Los organizadores detrás del evento principal de Ethereum en Chile"
    },
    socialProof: {
      title: "Únete a la Comunidad",
      community: "Comunidad",
      description: "Únete al creciente ecosistema de constructores, innovadores y líderes en Chile"
    },
    sponsorship: {
      title: "Patrocina la Conferencia ETH Chile",
      conference: "Conferencia",
      cta: "Aplicar para ser patrocinador",
      contact: "Contactar Equipo de Ventas"
    },
    footer: {
      title: "Construyamos juntos",
      build: "construir",
      submit: "Enviar",
      name: "Nombre",
      email: "Correo",
      message: "Mensaje"
    }
  }
};

// Hook to get current language and content
export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('eth-chile-language') as Language;
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

  const getContent = (section: string) => {
    return languageContent[language][section] || {};
  };

  return {
    language,
    setLanguage,
    mounted,
    getContent
  };
};
