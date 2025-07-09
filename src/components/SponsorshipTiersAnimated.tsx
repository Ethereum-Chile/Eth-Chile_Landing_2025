"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { HoverSlider, TextStaggerHover, HoverSliderImageWrap, HoverSliderImage, clipPathVariants, useHoverSliderContext } from './HoverSlider';
import { HyperText } from './HyperText';

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
    price: "$10,000",
    benefits: [
      "Premium booth placement",
      "Keynote speaking opportunity",
      "Exclusive networking events",
      "Brand visibility across all materials",
      "VIP access to all sessions"
    ],
    description: "For protocols, exchanges, layer 1 and layer 2 companies. Maximum brand exposure and influence at ETHChile 2025.",
    color: "from-red-600 to-pink-600",
    imageUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "WAGMI",
    price: "$8,000",
    benefits: [
      "Large exhibition booth",
      "Panel discussion participation",
      "Networking event hosting",
      "Logo on main stage",
      "Priority attendee access"
    ],
    description: "For funds, DeFi solutions, and infrastructure companies. Comprehensive brand presence and engagement opportunities.",
    color: "from-green-600 to-emerald-600",
    imageUrl: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Hash",
    price: "$6,000",
    benefits: [
      "Standard exhibition booth",
      "Workshop hosting opportunity",
      "Logo on promotional materials",
      "Networking event access",
      "Attendee list access"
    ],
    description: "For dev tools, apps, and wallet companies. Balanced sponsorship package offering solid brand exposure.",
    color: "from-blue-600 to-cyan-600",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Gwei",
    price: "$4,000",
    benefits: [
      "Small exhibition booth",
      "Logo on website",
      "Social media mentions",
      "Event attendance",
      "Basic networking access"
    ],
    description: "For growing startups and communities. Entry-level sponsorship package for Web3 ecosystem presence.",
    color: "from-yellow-500 to-orange-500",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
    description: "For curated early-stage projects with demo or MVP. Affordable option for startups entering the Web3 space.",
    color: "from-green-400 to-teal-500",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

// Custom component to handle the image with pricing overlay
const ImageWithPricing: React.FC<{ tier: SponsorshipTier; index: number }> = ({ tier, index }) => {
  const { activeSlide } = useHoverSliderContext();
  
  return (
    <div className="w-full h-full relative">
      <motion.img
        src={tier.imageUrl}
        alt={tier.name}
        className="w-full h-full object-cover rounded-lg"
        loading="eager"
        decoding="async"
        transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
        variants={clipPathVariants}
        animate={activeSlide === index ? "visible" : "hidden"}
      />
      {/* Pricing overlay at bottom */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 backdrop-blur-sm rounded-b-lg p-4"
        transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
        variants={clipPathVariants}
        animate={activeSlide === index ? "visible" : "hidden"}
      >
        <p className="text-white text-2xl font-light tracking-wider text-center">
          {tier.price}
        </p>
      </motion.div>
    </div>
  );
};

export const SponsorshipTiersAnimated: React.FC = () => {
  return (
    <section className="min-h-screen border border-white p-8 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <HyperText
            text="Sponsorship Tiers"
            duration={1000}
            className="text-4xl font-raleway font-semibold"
            animateOnLoad={true}
          />
        </div>
        
        <HoverSlider className="min-h-svh place-content-center p-6 md:px-12">
          <h3 className="mb-6 text-blue-400 text-xs font-medium capitalize tracking-wide">
            / sponsorship packages
          </h3>
          
          <div className="flex flex-wrap items-center justify-evenly gap-6 md:gap-12">
            {/* Left Side: Vertical List of Titles */}
            <div className="flex flex-col space-y-2 md:space-y-4">
              {sponsorshipTiers.map((tier, index) => (
                <TextStaggerHover
                  key={tier.name}
                  index={index}
                  className="cursor-pointer text-4xl font-raleway font-bold uppercase tracking-tighter hover:text-blue-400 transition-colors"
                  text={tier.name}
                />
              ))}
            </div>

            {/* Right Side: Images that update on hover */}
            <HoverSliderImageWrap className="w-96 h-96 relative">
              {sponsorshipTiers.map((tier, index) => (
                <ImageWithPricing key={tier.name} tier={tier} index={index} />
              ))}
            </HoverSliderImageWrap>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <p className="text-xl mb-8">
              Ready to showcase your brand at Latin America's premier Ethereum event?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors">
                Download Sponsorship Deck
              </button>
              <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors">
                Contact Sales Team
              </button>
            </div>
          </div>
        </HoverSlider>
      </div>
    </section>
  );
}; 