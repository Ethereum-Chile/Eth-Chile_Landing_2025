"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { ProgressiveBlur } from './ProgressiveBlur';

interface SponsorshipTier {
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  emoji: string;
}

const sponsorshipTiers: SponsorshipTier[] = [
  {
    name: "RARE",
    price: "$10.000",
    description: "2 Protocolos, exchanges, layer 1 y layer 2",
    imageUrl: "/imgs/RARE_sponsor.png",
    emoji: ""
  },
  {
    name: "WAGMI",
    price: "$8.000",
    description: "4 Fondos, soluciones DeFi, infraestructura",
    imageUrl: "/imgs/WAGMI_sponsor.png",
    emoji: ""
  },
  {
    name: "HASH",
    price: "$6.000",
    description: "6 Herramientas dev, apps, wallets",
    imageUrl: "/imgs/HASH.png",
    emoji: ""
  },
  {
    name: "GWEI",
    price: "$4.000",
    description: "10 Startups en crecimiento, comunidades",
    imageUrl: "/imgs/gwei.png",
    emoji: ""
  },
  {
    name: "Startup Garden",
    price: "$500",
    description: "10 (curados) Proyectos early-stage con demo o MVP",
    imageUrl: "/imgs/garden.png",
    emoji: ""
  }
];

const SponsorshipTierCard: React.FC<{ tier: SponsorshipTier }> = ({ tier }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <motion.div
      className="border border-white p-6 rounded-lg text-center relative group overflow-visible h-48 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* Background Image */}
      <img
        src={tier.imageUrl}
        alt={`${tier.name} Sponsor`}
        className="absolute inset-0 w-full h-full object-cover rounded-lg transition-all duration-300"
        loading="eager"
        decoding="async"
      />
      
      {/* Progressive Blur Effect - Always visible */}
      <ProgressiveBlur
        direction="bottom"
        blurLayers={15}
        blurIntensity={0.8}
        className="absolute inset-0 rounded-lg"
        isVisible={true}
      />
      
      {/* Text - Always visible */}
      <motion.div
        className="absolute inset-0 z-50 flex flex-col justify-end p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="text-white">
          <p className="text-2xl font-bold mb-2 text-shadow-lg">
            {tier.name}
          </p>
          <p className="text-xl font-semibold mb-3 text-white text-shadow-lg">
            {tier.price}
          </p>
          <p className="text-sm text-gray-200 leading-relaxed max-w-48 text-shadow-lg">
            {tier.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const SponsorshipTiers: React.FC = () => {
  return (
    <section className="min-h-screen border border-white p-8 flex flex-col justify-center">
      <h2 className="text-4xl font-raleway font-semibold mb-8 text-center">
        Sponsorship Tiers
      </h2>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-20">
          {sponsorshipTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SponsorshipTierCard tier={tier} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 