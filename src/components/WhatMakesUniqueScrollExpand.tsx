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

const sampleMediaContent: MediaContent = {
  src: 'https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1', // Placeholder video
  poster: 'https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg',
  background: '/imgs/ethchile2025.png', // Using the ETHChile background image
  title: 'What Makes ETHChile Unique',
  date: 'Latin America\'s Premier Ethereum Event',
  scrollToExpand: 'Scroll to Discover More',
  about: {
    overview:
      'ETHChile represents the perfect intersection of regulatory clarity and technological innovation. As the only Ethereum event in Latin America focused on tokenization, regulation, and AI integration, we bring together the brightest minds in blockchain.',
    conclusion:
      'Join us in Santiago for an unparalleled experience where traditional finance meets decentralized innovation, and where Latin America\'s Web3 future takes shape.',
  },
};

const MediaContent = () => {
  return (
    <div className='max-w-6xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6 text-white text-center'>
        What Industry Leaders Say About Chile
      </h2>
      
      <AnimatedTestimonials
        testimonials={[
          {
            quote:
              "Chile's regulatory framework and fintech ecosystem make it the perfect bridge between traditional finance and decentralized innovation. ETHChile is where the future of finance converges.",
            name: "María González",
            designation: "CEO, Fintech Chile",
            src: "/patricio.jpg",
          },
          {
            quote:
              "The combination of Chile's stable economy, progressive regulations, and tech talent creates an ideal environment for Ethereum adoption. This is where Latin America's DeFi revolution begins.",
            name: "Carlos Mendoza",
            designation: "Head of Innovation, Banco de Chile",
            src: "/cristobal.jpg",
          },
          {
            quote:
              "ETHChile represents the perfect intersection of regulatory clarity and technological innovation. Chile is positioned to become the fintech hub of Latin America.",
            name: "Ana Silva",
            designation: "Regulatory Affairs, CMF Chile",
            src: "/andres.jpg",
          },
          {
            quote:
              "The Chilean market's maturity and the government's forward-thinking approach to fintech make it an attractive destination for global blockchain projects and investments.",
            name: "Roberto Torres",
            designation: "Managing Partner, LatAm Ventures",
            src: "/joseph.jpg",
          },
        ]}
        autoplay={true}
        className="mt-8"
      />
    </div>
  );
};

const WhatMakesUniqueScrollExpand = () => {
  const currentMedia = sampleMediaContent;

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
        <MediaContent />
      </ScrollExpandMedia>
    </div>
  );
};

export default WhatMakesUniqueScrollExpand; 