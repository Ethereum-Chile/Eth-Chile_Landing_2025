'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [welcuLoaded, setWelcuLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [useTextFallback, setUseTextFallback] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<'en' | 'es'>('es');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Content translations
  const content = {
    en: {
      title: "Get Your ETHChile 2025 Tickets",
      subtitle: "Join us this October in Campus Oriente, Santiago.",
      eventDetails: "📅 Event Details",
      date: "Date:",
      duration: "Duration:",
      location: "Location:",
      format: "Format:",
      dateValue: "October 24th and 25th, 2025",
      durationValue: "2 days",
      locationValue: "Santiago, Chile",
      formatValue: "In-person conference",
      whatsIncluded: "🎟️ What's Included",
      sessions: "• All conference sessions",
      networking: "• Networking opportunities",
      materials: "• Access to Campus Oriente, Workshops and talks",
      contact: "Need help? Contact us at",
      email: "info@ethchile.org"
    },
    es: {
      title: "Obtén tus Entradas al ETHChile 2025",
      subtitle: "Únete a nosotros este octubre en Campus Oriente, Santiago.",
      eventDetails: "📅 Detalles del Evento",
      date: "Fecha:",
      duration: "Duración:",
      location: "Ubicación:",
      format: "Formato:",
      dateValue: "24 y 25 de Octubre 2025",
      durationValue: "2 días",
      locationValue: "Santiago, Chile",
      formatValue: "Conferencia presencial",
      whatsIncluded: "🎟️ Lo que Incluye",
      sessions: "• Todas las sesiones de la conferencia",
      networking: "• Oportunidades de networking",
      materials: "• Acceso a Campus Oriente, Workshops y charlas",
      contact: "¿Necesitas ayuda? Contáctanos en",
      email: "info@ethchile.org"
    }
  };

  const t = content[language];

  // Remove the early return - let the component render and handle mounting in useEffect

  // Language initialization
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

  // Load Welcu script when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setWelcuLoaded(false);
      
      // Inject custom CSS for Welcu widget
      const style = document.createElement('style');
      style.textContent = `
        .welcu_embed * {
          color: white !important;
        }
        .welcu_embed .ticket-option,
        .welcu_embed .price,
        .welcu_embed .ticket-name,
        .welcu_embed .ticket-description,
        .welcu_embed .ticket-title,
        .welcu_embed .ticket-price,
        .welcu_embed .ticket-details {
          color: white !important;
        }
        .welcu_embed .btn,
        .welcu_embed button,
        .welcu_embed input[type="button"],
        .welcu_embed input[type="submit"],
        .welcu_embed select,
        .welcu_embed .ticket-quantity,
        .welcu_embed .quantity-selector {
          background-color: #00bfff !important;
          color: white !important;
          border: 1px solid #00bfff !important;
          pointer-events: auto !important;
          cursor: pointer !important;
          z-index: 10 !important;
          position: relative !important;
          min-height: 32px !important;
          padding: 6px 8px !important;
        }
        .welcu_embed .btn:hover,
        .welcu_embed button:hover {
          background-color: #0099cc !important;
          border-color: #0099cc !important;
        }
        .welcu_embed .btn:active,
        .welcu_embed button:active {
          background-color: #0088bb !important;
          border-color: #0088bb !important;
        }
        .welcu_embed input,
        .welcu_embed select,
        .welcu_embed textarea {
          background-color: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
        }
        .welcu_embed select {
          background-color: rgba(0, 191, 255, 0.2) !important;
          border: 1px solid #00bfff !important;
          color: white !important;
          cursor: pointer !important;
          pointer-events: auto !important;
        }
        .welcu_embed select option {
          background-color: #1a1a1a !important;
          color: white !important;
        }
        .welcu_embed input::placeholder,
        .welcu_embed textarea::placeholder {
          color: rgba(255, 255, 255, 0.7) !important;
        }
        /* Hide the total column (3rd column) */
        .welcu_embed table th:nth-child(3),
        .welcu_embed table td:nth-child(3) {
          display: none !important;
        }
        .welcu_embed {
          overflow-y: auto !important;
          -webkit-overflow-scrolling: touch !important;
          touch-action: pan-y !important;
          height: 400px !important;
          max-height: 400px !important;
          width: 100% !important;
          max-width: 100% !important;
          overflow-x: hidden !important;
          pointer-events: auto !important;
          position: relative !important;
          margin-bottom: 0 !important;
          padding-bottom: 0 !important;
        }
        .welcu_embed * {
          -webkit-overflow-scrolling: touch !important;
          touch-action: pan-y !important;
        }
        .welcu_embed iframe {
          width: 100% !important;
          height: 100% !important;
          min-height: 500px !important;
          border: none !important;
          overflow: auto !important;
          -webkit-overflow-scrolling: touch !important;
        }
        .welcu_embed .welcu-widget {
          overflow: auto !important;
          -webkit-overflow-scrolling: touch !important;
          touch-action: pan-y !important;
        }
        /* Mobile table and content fixes */
        .welcu_embed table {
          width: 100% !important;
          max-width: 100% !important;
          table-layout: fixed !important;
          word-wrap: break-word !important;
        }
        .welcu_embed td, .welcu_embed th {
          word-wrap: break-word !important;
          word-break: break-word !important;
          overflow-wrap: break-word !important;
          max-width: 0 !important;
          padding: 8px 4px !important;
        }
        /* Responsive column widths for ticket table - 3 columns visible */
        .welcu_embed table th:nth-child(1),
        .welcu_embed table td:nth-child(1) {
          width: 50% !important;
        }
        .welcu_embed table th:nth-child(2),
        .welcu_embed table td:nth-child(2) {
          width: 25% !important;
        }
        .welcu_embed table th:nth-child(4),
        .welcu_embed table td:nth-child(4) {
          width: 25% !important;
        }
        .welcu_embed .ticket-option, .welcu_embed .ticket-row {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }
        .welcu_embed .ticket-name, .welcu_embed .ticket-description {
          word-wrap: break-word !important;
          word-break: break-word !important;
          overflow-wrap: break-word !important;
        }
        /* Desktop and mobile modal scrolling fixes */
        .ticket-modal-container {
          overflow: hidden !important;
        }
        .ticket-modal-content {
          -webkit-overflow-scrolling: touch !important;
          overflow-y: auto !important;
          touch-action: pan-y !important;
          min-height: 100% !important;
        }
        @media (max-width: 768px) {
          .ticket-modal-container {
            -webkit-overflow-scrolling: touch !important;
            overflow-y: auto !important;
            touch-action: pan-y !important;
          }
          .ticket-modal-content {
            -webkit-overflow-scrolling: touch !important;
            overflow-y: auto !important;
            touch-action: pan-y !important;
            min-height: 100% !important;
          }
          /* Mobile-specific Welcu fixes */
          .welcu_embed {
            width: 100% !important;
            max-width: 100% !important;
            overflow-x: hidden !important;
            padding: 0 !important;
            margin: 0 !important;
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
            /* Mobile height adjustment */
            height: 400px !important;
            max-height: 400px !important;
            min-height: 400px !important;
          }
          .welcu_embed table {
            font-size: 12px !important;
            width: 100% !important;
            table-layout: fixed !important;
          }
          /* Mobile responsive column widths - 3 columns visible (total column hidden) */
          .welcu_embed table th:nth-child(1),
          .welcu_embed table td:nth-child(1) {
            width: 45% !important;
          }
          .welcu_embed table th:nth-child(2),
          .welcu_embed table td:nth-child(2) {
            width: 25% !important;
          }
          .welcu_embed table th:nth-child(4),
          .welcu_embed table td:nth-child(4) {
            width: 30% !important;
          }
          .welcu_embed td, .welcu_embed th {
            padding: 6px 2px !important;
            font-size: 11px !important;
            line-height: 1.2 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          /* Mobile price cells - smaller font for better fit */
          .welcu_embed td:nth-child(2),
          .welcu_embed td:nth-child(4) {
            font-size: 10px !important;
            font-weight: bold !important;
            text-align: center !important;
            min-width: 40px !important;
            max-width: 50px !important;
          }
          .welcu_embed .ticket-name {
            font-size: 12px !important;
            line-height: 1.3 !important;
          }
          .welcu_embed .ticket-description {
            font-size: 10px !important;
            line-height: 1.2 !important;
          }
        }
      `;
      document.head.appendChild(style);
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://welcu.com/ethereum-chile/ethchile-2025/sales/0bc425c4a4.embed?currency_id=clp&locale=es';
      
      // Remove any existing welcu script
      const existingScript = document.querySelector('script[src*="welcu.com"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      script.onload = () => {
        // Wait for the widget to fully render and check for content
        const checkForWidget = () => {
          const widgetContainer = document.getElementById('welcu_embed_sale_7182972057');
          if (widgetContainer) {
            // Check if widget has actual content (not just our preloader)
            const hasContent = widgetContainer.children.length > 1 || 
                              widgetContainer.innerHTML.includes('welcu') ||
                              widgetContainer.querySelector('[class*="welcu"]') ||
                              widgetContainer.querySelector('iframe');
            
            if (hasContent) {
              setWelcuLoaded(true);
              setIsLoading(false);
              return;
            }
          }
          
          // If no content yet, check again in 500ms
          setTimeout(checkForWidget, 500);
        };
        
        // Start checking after a short delay
        setTimeout(checkForWidget, 1000);
        
        // Safety timeout - force completion after 5 seconds
        setTimeout(() => {
          if (isLoading) {
            setWelcuLoaded(true);
            setIsLoading(false);
          }
        }, 5000);
        
      };
      
      script.onerror = () => {
        setIsLoading(false);
      };
      
      document.head.appendChild(script);
      
      return () => {
        // Cleanup script and style when modal closes
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        if (style.parentNode) {
          style.parentNode.removeChild(style);
        }
      };
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);


  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Video loading handlers
  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  const handleVideoError = (e: any) => {
    setUseFallback(true);
    setVideoLoaded(true);
  };

  // Mobile-optimized video attributes
  const videoProps = {
    autoPlay: true,
    loop: true,
    muted: true,
    playsInline: true,
    preload: 'auto',
    onLoadedData: handleVideoLoad,
    onCanPlay: handleVideoLoad,
    onError: handleVideoError,
    style: {
      maxWidth: '100%',
      maxHeight: '100%',
      width: isMobile ? '60%' : '40%', // Smaller than main preloader
      height: isMobile ? '60%' : '40%'
    }
  };

  // Text-based ASCII fallback
  const TextASCIIFallback = () => (
    <div className="text-center text-white font-mono">
    </div>
  );

  // Custom preloader component
  const CustomPreloader = () => (
    <div 
      className="w-full h-full bg-black flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#000000',
        height: isMobile ? '400px' : '500px',
        minHeight: isMobile ? '400px' : '500px'
      }}
    >
      {/* Video Animation Container */}
      <div className="flex-1 flex items-center justify-center p-4">
        {!useFallback ? (
          <video
            ref={videoRef}
            className="object-contain"
            {...videoProps}
          >
            <source src="/eth_ascii_compressed.webm" type="video/webm" />
            <source src="/eth_ascii.gif" type="image/gif" />
            {/* Fallback text if video doesn't load */}
            <div className="text-white text-center">
              <h2 className="text-xl font-raleway font-light mb-2">ETH Chile</h2>
              <p className="text-sm text-blue-400 font-light">2025</p>
            </div>
          </video>
        ) : !useTextFallback ? (
          // Fallback: Static ASCII art or GIF
          <div className="text-center">
            <img 
              src="/eth_ascii.gif" 
              alt="ETH Chile ASCII Animation"
              className="object-contain"
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: isMobile ? '60%' : '40%',
                height: isMobile ? '60%' : '40%'
              }}
              onLoad={() => setVideoLoaded(true)}
              onError={() => {
                // Final fallback: Text-based ASCII
                setUseTextFallback(true);
                setVideoLoaded(true);
              }}
            />
          </div>
        ) : (
          // Final fallback: Text-based ASCII
          <TextASCIIFallback />
        )}
      </div>
      
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        >
          {/* Frosted Glass Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-6xl max-h-[95vh] bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden ticket-modal-container"
            style={{ 
              touchAction: 'pan-y',
              WebkitOverflowScrolling: 'touch',
              overflow: 'hidden'
            }}
            onClick={(e) => {
              // Only stop propagation if clicking on the modal background, not on Welcu content
              if (e.target === e.currentTarget) {
                e.stopPropagation();
              }
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-3xl font-raleway font-bold text-white">
                  {t.title}
                </h2>
                <p className="text-gray-300 mt-2">
                  {t.subtitle}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
                aria-label="Close modal"
              >
                <svg
                  className="w-6 h-6 text-white group-hover:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Content - Full Scrollable Area */}
            <div className="flex flex-col h-full overflow-y-auto ticket-modal-content" style={{ 
              WebkitOverflowScrolling: 'touch',
              maxHeight: 'calc(95vh - 120px)',
              overflowY: 'auto'
            }}>
              {/* Welcu Widget Container */}
              <div className="p-6">
                <div className="mb-4">
                  <div 
                    id="welcu_embed_sale_7182972057" 
                    className="welcu_embed"
                    style={{ 
                      overflow: 'auto',
                      WebkitOverflowScrolling: 'touch',
                      touchAction: 'pan-y',
                      height: isMobile ? '400px' : '500px',
                      minHeight: isMobile ? '400px' : '500px'
                    }}
                  >
                    {isLoading && !welcuLoaded ? (
                      <CustomPreloader />
                    ) : null}
                  </div>
                </div>
              </div>

              {/* Event Information and Contact - Now Scrollable */}
              <div className="px-6 pb-6 border-t border-white/10 bg-gradient-to-t from-gray-900/50 to-transparent">
                {/* Event Information */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h3 className="text-lg font-semibold text-custom-blue mb-3">
                      {t.eventDetails}
                    </h3>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li><strong>{t.date}</strong> {t.dateValue}</li>
                      <li><strong>{t.duration}</strong> {t.durationValue}</li>
                      <li><strong>{t.location}</strong> {t.locationValue}</li>
                      <li><strong>{t.format}</strong> {t.formatValue}</li>
                    </ul>
                  </div>

                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <h3 className="text-lg font-semibold text-custom-blue mb-3">
                      {t.whatsIncluded}
                    </h3>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>{t.sessions}</li>
                      <li>{t.networking}</li>
                      <li>{t.materials}</li>
                    </ul>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="text-center">
                  <p className="text-gray-300 mb-3 text-sm">
                    {t.contact}{' '}
                    <a
                      href={`mailto:${t.email}`}
                      className="text-custom-blue hover:text-blue-400 transition-colors"
                    >
                      {t.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TicketModal;
