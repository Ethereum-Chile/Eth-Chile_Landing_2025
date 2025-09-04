import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HyperText } from "./HyperText.tsx";

const cards = [
  {
    title: "19M+",
    subtitle: "Active Wallets",
    f: 0.1,
    link: "https://cryptorank.io/news/feed/09613-ethereum-user-activity-2021-peak-nfts-charge",
  },
  {
    title: "$80B+",
    subtitle: "Total Value Locked",
    f: 0.12,
    link: "https://defillama.com/chain/Ethereum",
  },
  {
    title: "Pectra",
    subtitle: "Upgrade",
    f: 0.08,
    link: "https://consensys.io/blog/ethereum-pectra-upgrade/",
  },
];

export default function ParallaxCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => {
        // Create different scroll-based transforms for each card
        // Disable 3D transforms on mobile to prevent touch issues
        const rotateX = isMobile ? 0 : useTransform(scrollYProgress, [0, 1], [0, card.f * 15]);
        const rotateY = isMobile ? 0 : useTransform(scrollYProgress, [0, 1], [0, card.f * 10]);
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);
        // Remove the y transform to keep all cards aligned
        const y = useTransform(scrollYProgress, [0, 1], [0, 0]);

        return (
          <motion.a
            key={idx}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-center aspect-[4/3] cursor-pointer touch-manipulation"
            style={{
              rotateX,
              rotateY,
              scale,
              y,
              transformStyle: isMobile ? "flat" : "preserve-3d",
              perspective: isMobile ? "none" : "1000px",
              WebkitTapHighlightColor: "transparent",
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              userSelect: "none",
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            viewport={{ once: true }}
            onTouchStart={(e) => {
              // Ensure touch events are properly handled
              e.stopPropagation();
            }}
            onClick={(e) => {
              // Ensure click events work on mobile
              e.preventDefault();
              window.open(card.link, '_blank', 'noopener,noreferrer');
            }}
          >
            <motion.div
              className="w-full h-full flex flex-col items-center justify-center space-y-4"
              style={{
                willChange: "transform",
              }}
            >
              <HyperText
                text={card.title}
                duration={800}
                className={
                  card.title === "Pectra"
                    ? "text-2xl md:text-3xl font-bold text-white font-raleway"
                    : "text-3xl md:text-4xl font-bold text-white font-raleway"
                }
                animateOnLoad={false}
              />
              <h4 className="text-lg md:text-xl font-semibold text-blue-300 font-raleway">
                {card.subtitle}
              </h4>
            </motion.div>
          </motion.a>
        );
      })}
    </div>
  );
}
