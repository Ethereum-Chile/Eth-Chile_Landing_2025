import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { FeatureSteps } from "./FeatureSteps";
import CircularText from "./CircularText";

const LatinAmericaSection = forwardRef<HTMLElement>((props, ref) => {
  const sectionRef = useRef<HTMLElement>(null);
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

  const content = {
    en: {
      title: "Latin America is the",
      future: "Future",
      chile: "Chile",
      catalyst: "is the Catalyst",
      description: "Latin America has emerged as the epicenter of blockchain innovation, with Chile leading the charge in",
      regulatory: "regulatory innovation",
      description2: ". From progressive fintech laws to open finance initiatives, this region is reshaping the future of",
      decentralized: "decentralized",
      description3: "technology.",
      circularText: "Destino Devconnect ",
      features: [
        {
          step: "Fintech Powerhouse",
          title: "Latin America's Financial Innovation Hub",
          content: "Chile leads Latin America with over 200 fintech companies and $1.2B in fintech investments. The 2023 Fintech Law created a sandbox environment where web3 startups can test innovative solutions while regulators learn and adapt."
        },
        {
          step: "Open Banking Pioneer",
          title: "API Infrastructure Ready for Web3",
          content: "Chile's Open Finance platform connects 80% of the banking system through standardized APIs. This existing infrastructure is perfectly positioned for web3 integration, creating unprecedented opportunities for DeFi and blockchain applications."
        },
        {
          step: "Untapped Potential",
          title: "Web3's Gateway to Latin America",
          content: "Despite Chile's advanced fintech ecosystem, web3 adoption remains at just 3%. With 19M people, high smartphone penetration, and regulatory clarity, Chile represents the perfect market for web3's next breakthrough moment."
        }
      ]
    },
    es: {
      title: "Latinoamérica es el",
      future: "Futuro",
      chile: "Chile",
      catalyst: "es el Catalizador",
      description: "Latinoamérica ha emergido como el epicentro de la innovación blockchain, con Chile liderando la carga en",
      regulatory: "innovación regulatoria",
      description2: ". Desde leyes fintech progresivas hasta iniciativas de finanzas abiertas, esta región está remodelando el futuro de la tecnología",
      decentralized: "descentralizada",
      description3: ".",
      circularText: "Destino Devconnect ",
      features: [
        {
          step: "Potencia Fintech",
          title: "Centro de Innovación Financiera de Latinoamérica",
          content: "Chile lidera Latinoamérica con más de 200 empresas fintech y $1.2B en inversiones fintech. La Ley Fintech 2023 creó un entorno sandbox donde las startups web3 pueden probar soluciones innovadoras mientras los reguladores aprenden y se adaptan."
        },
        {
          step: "Pionero en Banca Abierta",
          title: "Infraestructura API Lista para Web3",
          content: "La plataforma de Finanzas Abiertas de Chile conecta el 80% del sistema bancario a través de APIs estandarizadas. Esta infraestructura existente está perfectamente posicionada para la integración web3, creando oportunidades sin precedentes para aplicaciones DeFi y blockchain."
        },
        {
          step: "Potencial Sin Explotar",
          title: "Puerta de Entrada de Web3 a Latinoamérica",
          content: "A pesar del ecosistema fintech avanzado de Chile, la adopción web3 se mantiene en solo 3%. Con 19M de personas, alta penetración de smartphones y claridad regulatoria, Chile representa el mercado perfecto para el próximo momento de avance de web3."
        }
      ]
    }
  };

  const t = content[language];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <>
      <section 
        ref={sectionRef}
        className='py-20 mt-0 relative' 
      >
        {/* Removed Prism Background Animation */}
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="relative">
            {/* Circular Text positioned between text lines */}
            <div className="absolute top-[8%] left-0 transform  z-10">
              <CircularText
                text={t.circularText}
                spinDuration={30}
                onHover="speedUp"
                className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent"
              />
            </div>

            <div className="text-right mb-16 relative z-30 mr-8 md:mr-16">
              <h2 
                className="text-5xl md:text-6xl font-raleway font-bold mb-8 text-white leading-relaxed"
                style={{ 
                  lineHeight: '1.8',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div className="mb-4">{t.title} <span 
                  className="text-custom-blue font-extralight" 
                  style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 191, 255, 0.5)' }}
                >{t.future}</span>,</div>
                <div className="mb-4">
                  <span className="font-raleway font-light text-custom-blue" style={{ 
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 191, 255, 0.5)' 
                  }}>
                    {t.chile} 
                  </span> {t.catalyst}
                </div>
              </h2>
              <p 
                className="text-xl text-gray-300 max-w-3xl ml-auto"
                style={{ 
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px rgba(0, 0, 0, 0.3)' 
                }}
              >
                {t.description} <span className="text-custom-blue" style={{ 
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px rgba(59, 130, 246, 0.3)' 
            }}>{t.regulatory}</span>{t.description2} <span className="text-custom-blue" style={{ 
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6), 0 0 6px rgba(59, 130, 246, 0.3)' 
            }}>{t.decentralized}</span>{t.description3}
              </p>
            </div>

            <FeatureSteps
              features={t.features.map(feature => ({
                ...feature,
                image: feature === t.features[0] ? "/imgs/tvl.png" : 
                       feature === t.features[1] ? "/panel.jpg" : "/apertura.jpg"
              }))}
              autoPlayInterval={4000}
              className="bg-transparent"
            />
          </div>
        </div>
      </section>
    </>
  );
});

LatinAmericaSection.displayName = 'LatinAmericaSection';

export default LatinAmericaSection;
