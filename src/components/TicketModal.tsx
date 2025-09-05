'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ isOpen, onClose }) => {
  // Load Welcu script when modal opens
  useEffect(() => {
    if (isOpen) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://welcu.com/ethereum-chile/ethchile-2025/sales/0bc425c4a4.embed?currency_id=clp&locale=es';
      
      // Remove any existing welcu script
      const existingScript = document.querySelector('script[src*="welcu.com"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      document.head.appendChild(script);
      
      return () => {
        // Cleanup script when modal closes
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
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
            className="relative w-full max-w-6xl max-h-[90vh] bg-gradient-to-br from-gray-900/90 to-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div>
                <h2 className="text-3xl font-raleway font-bold text-white">
                  Get Your ETHChile 2025 Tickets
                </h2>
                <p className="text-gray-300 mt-2">
                  Join us this October in Campus Oriente, Santiago. 
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

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Welcu Widget Container */}
              <div className="mb-8">
                <div id="welcu_embed_sale_7182972057" className="welcu_embed min-h-[600px]">
                  <div className="flex items-center justify-center h-[600px]">
                    <div className="text-center">
                      <img
                        src="https://assets.welcu.com/images/loading.gif"
                        width="50"
                        height="50"
                        alt="Loading tickets..."
                        className="mx-auto mb-4"
                      />
                      <p className="text-gray-300">Loading ticket options...</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-custom-blue mb-4">
                    📅 Event Details
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li><strong>Date:</strong> March 2025</li>
                    <li><strong>Duration:</strong> 2 days</li>
                    <li><strong>Location:</strong> Santiago, Chile</li>
                    <li><strong>Format:</strong> In-person conference</li>
                  </ul>
                </div>

                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-custom-blue mb-4">
                    🎟️ What's Included
                  </h3>
                  <ul className="text-gray-300 space-y-2">
                    <li>• All conference sessions</li>
                    <li>• Networking opportunities</li>
                    <li>• Meals and refreshments</li>
                    <li>• Conference materials</li>
                    <li>• Digital certificate</li>
                  </ul>
                </div>
              </div>

              {/* Contact Info */}
              <div className="mt-8 text-center">
                <p className="text-gray-300 mb-4">
                  Need help? Contact us at{' '}
                  <a
                    href="mailto:info@ethchile.org"
                    className="text-custom-blue hover:text-blue-400 transition-colors"
                  >
                    info@ethchile.org
                  </a>
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="https://t.me/EthereumChile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-custom-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    💬 Join our Telegram
                  </a>
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
