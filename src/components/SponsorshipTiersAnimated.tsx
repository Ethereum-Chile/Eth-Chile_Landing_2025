"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { HyperText } from './HyperText';
import { ProgressiveBlur } from './ProgressiveBlur';

interface SponsorshipTier {
  name: string;
  price: string;
  benefits: string[];
  description: string;
  color: string;
  imageUrl: string;
}

const sponsorshipTiers: SponsorshipTier[] = [
  {
    name: "Rare",
    price: "$10.000",
    benefits: [
      "Premium booth placement",
      "Keynote speaking opportunity",
      "Exclusive networking events",
      "Brand visibility across all materials",
      "VIP access to all sessions"
    ],
    description: "Protocolos, exchanges and exclusive businesses",
    color: "from-red-600 to-pink-600",
    imageUrl: "/imgs/RARE_sponsor.png"
  },
  {
    name: "WAGMI",
    price: "$8.000",
    benefits: [
      "Large exhibition booth",
      "Panel discussion participation",
      "Networking event hosting",
      "Logo on main stage",
      "Priority attendee access"
    ],
    description: "DeFi solutions and infraestructura",
    color: "from-green-600 to-emerald-600",
    imageUrl: "/imgs/WAGMI_sponsor.png"
  },
  {
    name: "Hash",
    price: "$6.000",
    benefits: [
      "Standard exhibition booth",
      "Workshop hosting opportunity",
      "Logo on promotional materials",
      "Networking event access",
      "Attendee list access"
    ],
    description: "6 Herramientas dev, apps, wallets",
    color: "from-blue-600 to-cyan-600",
    imageUrl: "/imgs/HASH.png"
  },
  {
    name: "Gwei",
    price: "$4.000",
    benefits: [
      "Small exhibition booth",
      "Logo on website",
      "Social media mentions",
      "Event attendance",
      "Basic networking access"
    ],
    description: "10 Startups en crecimiento, comunidades",
    color: "from-yellow-500 to-orange-500",
    imageUrl: "/imgs/gwei.png"
  },
  {
    name: "Startup Garden",
    price: "$500",
    benefits: [
      "Logo on website",
      "Social media recognition",
      "Event attendance",
      "Basic networking",
      "Demo/MVP showcase opportunity"
    ],
    description: "10 (curados) Proyectos early-stage con demo o MVP",
    color: "from-green-400 to-teal-500",
    imageUrl: "/imgs/garden.png"
  }
];

export const SponsorshipTiersAnimated: React.FC = () => {
  const [hoveredTier, setHoveredTier] = React.useState<string | null>(null);

  return (
    <section className="min-h-screen bg-custom-black p-8 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <HyperText
            text="Sponsorship Tiers"
            duration={1000}
            className="text-4xl font-raleway font-semibold"
            animateOnLoad={true}
          />
        </div>
        
        {/* Layout con títulos horizontales y cards más grandes */}
        <div className="place-content-center p-6 md:px-12">
          <h3 className="mb-4 text-blue-400 text-xs font-medium capitalize tracking-wide">
            / sponsorship packages
          </h3>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 relative z-50">
            {sponsorshipTiers.map((tier, index) => (
              <div
                key={tier.name}
                className="cursor-pointer text-xl md:text-2xl font-raleway font-bold uppercase tracking-tighter text-white hover:text-blue-400 transition-colors relative z-50"
                onMouseEnter={() => setHoveredTier(tier.name)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                {tier.name}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sponsorshipTiers.map((tier, index) => (
              <motion.div 
                key={tier.name} 
                className={`relative group cursor-pointer transition-all duration-300 ${
                  hoveredTier === tier.name ? 'ring-2 ring-blue-400 ring-opacity-60 shadow-lg shadow-blue-400/30' : ''
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredTier(tier.name)}
                onMouseLeave={() => setHoveredTier(null)}
              >
                <img
                  src={tier.imageUrl}
                  alt={tier.name}
                  className="w-full h-80 object-cover rounded-lg transition-all duration-300 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-black/90 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center p-4">
                  <div className="text-white text-center h-full flex flex-col justify-between py-3">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                      <p className="text-xl font-semibold text-blue-300">{tier.price}</p>
                    </div>
                    <div className="flex-1 flex flex-col justify-center py-4">
                      <p className="text-sm md:text-base text-gray-300 leading-relaxed px-2">
                        {tier.description}
                      </p>
                    </div>
                    
                    <div className="text-left">
                      <p className="text-sm font-semibold text-blue-300 mb-2">Key Benefits:</p>
                      <div className="space-y-1 text-sm">
                        {tier.benefits.slice(0, 3).map((benefit, i) => (
                          <p key={i} className="text-gray-200 leading-relaxed">
                            • {benefit}
                          </p>
                        ))}
                        {tier.benefits.length > 3 && (
                          <p className="text-gray-400 text-sm mt-2">
                            Plus {tier.benefits.length - 3} additional benefits
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-32 text-center">
            <p className="text-xl mb-8 text-gray-300">
              Ready to showcase your brand at Chile's premier Ethereum event?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                Download Sponsorship Deck
              </button>
              <a 
                href="https://t.me/cristpereirag" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors text-center"
              >
                Contactar al equipo de Ventas
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};