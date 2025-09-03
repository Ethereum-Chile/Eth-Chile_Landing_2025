"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
  clipPathVariants,
  useHoverSliderContext,
} from "./HoverSlider";
import { ProgressiveBlur } from "./ProgressiveBlur";

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
      "VIP access to all sessions",
    ],
    description: "Protocolos, exchanges and exclusive businesses",
    color: "from-red-600 to-pink-600",
    imageUrl: "/imgs/RARE_sponsor.png",
  },
  {
    name: "WAGMI",
    price: "$8.000",
    benefits: [
      "Large exhibition booth",
      "Panel discussion participation",
      "Networking event hosting",
      "Logo on main stage",
      "Priority attendee access",
    ],
    description: "DeFi solutions and infraestructura",
    color: "from-green-600 to-emerald-600",
    imageUrl: "/imgs/WAGMI_sponsor.png",
  },
  {
    name: "Hash",
    price: "$6.000",
    benefits: [
      "Standard exhibition booth",
      "Workshop hosting opportunity",
      "Logo on promotional materials",
      "Networking event access",
      "Attendee list access",
    ],
    description: "6 Herramientas dev, apps, wallets",
    color: "from-blue-600 to-cyan-600",
    imageUrl: "/imgs/HASH.png",
  },
  {
    name: "Gwei",
    price: "$4.000",
    benefits: [
      "Small exhibition booth",
      "Logo on website",
      "Social media mentions",
      "Event attendance",
      "Basic networking access",
    ],
    description: "10 Startups en crecimiento, comunidades",
    color: "from-yellow-500 to-orange-500",
    imageUrl: "/imgs/gwei.png",
  },
  {
    name: "Startup Garden",
    price: "$500",
    benefits: [
      "Logo on website",
      "Social media recognition",
      "Event attendance",
      "Basic networking",
      "Demo/MVP showcase opportunity",
    ],
    description: "10 (curados) Proyectos early-stage con demo o MVP",
    color: "from-green-400 to-teal-500",
    imageUrl: "/imgs/garden.png",
  },
];

// Custom component to handle the image with pricing overlay
const ImageWithPricing: React.FC<{ tier: SponsorshipTier; index: number }> = ({
  tier,
  index,
}) => {
  const { activeSlide } = useHoverSliderContext();

  return (
    <div
      className="w-full h-full relative group cursor-pointer overflow-visible"
      style={{ aspectRatio: "1/1" }}
    >
      <motion.img
        src={tier.imageUrl}
        alt={tier.name}
        className="w-full h-full object-cover rounded-lg aspect-square"
        style={{ objectPosition: "center" }}
        loading="eager"
        decoding="async"
        transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
        variants={clipPathVariants}
        animate={activeSlide === index ? "visible" : "hidden"}
      />

      {/* Progressive Blur Effect - Always visible when image is active */}
      <ProgressiveBlur
        direction="bottom"
        blurLayers={12}
        blurIntensity={0.6}
        className="absolute inset-0 rounded-lg"
        isVisible={activeSlide === index}
      />

      {/* Text - Always visible when image is active */}
      <motion.div
        className="absolute inset-0 z-50 flex flex-col justify-end p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: activeSlide === index ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div className="text-white">
          <p className="text-3xl font-bold mb-2 text-shadow-lg">{tier.name}</p>
          <p className="text-2xl font-semibold mb-4 text-white text-shadow-lg">
            {tier.price}
          </p>
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-300 mb-2 text-shadow-lg">
              Benefits:
            </p>
            {tier.benefits.map((benefit, benefitIndex) => (
              <p
                key={benefitIndex}
                className="text-xs text-gray-200 text-shadow-lg"
              >
                • {benefit}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Component to render the active image
const ActiveImageRenderer: React.FC = () => {
  const { activeSlide } = useHoverSliderContext();

  return (
    <>
      {sponsorshipTiers.map((tier, index) => {
        return activeSlide === index ? (
          <ImageWithPricing
            key={`${tier.name}-${index}`}
            tier={tier}
            index={index}
          />
        ) : null;
      })}
    </>
  );
};

export const SponsorshipTiersAnimated: React.FC = () => {
  return (
    <motion.section 
      className="min-h-screen p-8 flex flex-col justify-center relative" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-raleway font-bold text-white leading-tight">
            Sponsorship Tiers
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <HoverSlider className="min-h-svh place-content-center p-6 md:px-12">
            <h3 className="mb-6 text-blue-400 text-xs font-medium capitalize tracking-wide">
              / sponsorship packages
            </h3>

            <div className="flex flex-wrap items-center justify-evenly gap-6 md:gap-12 mb-20">
              {/* Left Side: Vertical List of Titles */}
              <div className="flex flex-col space-y-2 md:space-y-4">
                {sponsorshipTiers.map((tier, index) => (
                  <TextStaggerHover
                    key={tier.name}
                    index={index}
                    className="cursor-pointer text-4xl font-raleway font-bold uppercase tracking-tighter text-white hover:text-blue-400 transition-colors"
                    text={tier.name}
                  />
                ))}
              </div>

              {/* Right Side: Images that update on hover */}
              <HoverSliderImageWrap
                className="w-80 h-80 relative aspect-square"
                style={{ width: "320px", height: "320px", aspectRatio: "1/1" }}
              >
                <ActiveImageRenderer />
              </HoverSliderImageWrap>
            </div>

            {/* Additional Info */}
            <div className="mt-32 text-center">
              <p className="text-xl mb-8 text-gray-300">
                Ready to showcase your brand at Chile's premier Ethereum event?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://forms.gle/U5nWGcsZMLogwmEn7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-center"
                  onClick={() => {
                    // Google Analytics event tracking
                    if (typeof window !== 'undefined' && (window as any).gtag) {
                      (window as any).gtag('event', 'apply_sponsor', {
                        event_category: 'engagement',
                        event_label: 'sponsorship_tiers'
                      });
                    }
                  }}
                >
                  Aplica para ser sponsor
                </a>
                <a
                  href="https://t.me/cristpereirag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors text-center"
                >
                  Contact Sales Team
                </a>
              </div>
            </div>
          </HoverSlider>
        </motion.div>
      </div>
    </motion.section>
  );
};
