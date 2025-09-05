'use client';

import React, { useState } from 'react';
// Note: Using img tags instead of Astro Image component in React
import TicketModal from './TicketModal';

const Header: React.FC = () => {
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const openTicketModal = () => {
    setIsTicketModalOpen(true);
  };

  const closeTicketModal = () => {
    setIsTicketModalOpen(false);
  };

  return (
    <>
      <header
        className="flex w-full min-h-[10vh] justify-between items-center px-10 fixed top-0 left-0 bg-transparent z-50 animate-fade-in"
        style={{ animation: 'fadeIn 1s ease-in-out' }}
      >
        <a href="/" className="flex items-center -ml-10 lg:ml-0">
          {/* Mobile Logo (ethchile_logotipo_B.png) */}
          <img
            src="/ethchile_logotipo_B.png"
            alt="Logo Ethereum Chile"
            width={108}
            height={54}
            className="w-24 h-12 lg:hidden object-contain"
          />
          {/* Desktop Logo (ethchile_logotipo_A.png) */}
          <img
            src="/ethchile_logotipo_A.png"
            alt="Logo Ethereum Chile"
            width={240}
            height={120}
            className="hidden lg:block w-[240px] h-[120px] object-contain"
          />
        </a>

        {/* Buy Ticket Button */}
        <div className="flex items-center space-x-4">
          {/* Language Selector */}
          <div className="flex items-center space-x-1">
            <button
              className="px-3 py-2 text-white/60 font-raleway font-medium text-sm transition-colors duration-200"
              onClick={() => setLanguage('en')}
              id="lang-en"
            >
              EN
            </button>
            <button
              className="px-3 py-2 text-white/60 font-raleway font-medium text-sm transition-colors duration-200"
              onClick={() => setLanguage('es')}
              id="lang-es"
            >
              ES
            </button>
          </div>

          <button
            onClick={openTicketModal}
            className="relative px-6 py-3 text-white font-raleway font-medium rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 overflow-hidden group backdrop-blur-md border border-white/40 hover:border-white/60 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
            id="buy-tickets-btn"
            style={{ backdropFilter: 'blur(10px)', boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}
          >
            {/* Frosted glass background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-lg"></div>
            
            {/* Shiny hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out rounded-lg"></div>
            
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/20 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            
            {/* Button text */}
            <span className="relative z-10">Buy Tickets</span>
          </button>
        </div>
      </header>

      {/* Ticket Modal */}
      <TicketModal isOpen={isTicketModalOpen} onClose={closeTicketModal} />
    </>
  );
};

// Language switching functionality
function setLanguage(lang: string) {
  // Remove active class from all language buttons
  const enBtn = document.getElementById("lang-en");
  const esBtn = document.getElementById("lang-es");
  
  if (enBtn) enBtn.classList.remove("lang-active");
  if (esBtn) esBtn.classList.remove("lang-active");

  // Add active class to selected language
  const activeBtn = document.getElementById(`lang-${lang}`);
  if (activeBtn) activeBtn.classList.add("lang-active");

  // Store language preference
  localStorage.setItem("preferred-language", lang);

  // Update button text based on language
  const buyTicketsBtn = document.getElementById("buy-tickets-btn");
  if (buyTicketsBtn) {
    const buttonText = buyTicketsBtn.querySelector("span");
    if (buttonText) {
      buttonText.textContent = lang === "es" ? "Comprar Entradas" : "Buy Tickets";
    }
  }

  // Dispatch custom event for other components to listen to
  window.dispatchEvent(
    new CustomEvent("languageChanged", { detail: { language: lang } })
  );

  console.log(`Language switched to: ${lang}`);
}

// Set initial language on page load
if (typeof window !== 'undefined') {
  document.addEventListener("DOMContentLoaded", function () {
    const savedLang = localStorage.getItem("preferred-language") || "en";
    setLanguage(savedLang);
  });
}

export default Header;
