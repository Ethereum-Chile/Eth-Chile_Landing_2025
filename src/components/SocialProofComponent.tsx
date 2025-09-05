"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import SocialMediaIcons from "./SocialMediaIcons.tsx";

const SocialProofComponent = () => {
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
      title: "Join The",
      community: "Community",
      description: "Join the growing ecosystem of builders, innovators, and leaders in Chile"
    },
    es: {
      title: "Únete a la",
      community: "Comunidad",
      description: "Únete al creciente ecosistema de constructores, innovadores y líderes en Chile"
    }
  };

  const t = content[language];
  return (
    <section
      className="relative py-20"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center">
          <motion.h2 
            className="text-4xl md:text-6xl font-raleway font-bold mb-6 text-white"
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.5)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t.title} <span 
              className="text-custom-blue font-extralight" 
              style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 191, 255, 0.5)' }}
            >{t.community}</span>
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-gray-300 max-w-xs md:max-w-2xl mx-auto mb-8"
            style={{ textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7), 0 0 8px rgba(0, 0, 0, 0.4)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {t.description}
          </motion.p>
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <SocialMediaIcons />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofComponent;
