import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HyperText } from "./HyperText.tsx";

const cards = [
  {
    title: "17M+",
    subtitle: "Active Wallets",
    f: 0.1,
    link: "#", // Placeholder link for now
  },
  {
    title: "$50B+",
    subtitle: "Total Value Locked",
    f: 0.12,
    link: "#", // Placeholder link for now
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
  
  // Use scroll progress for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => {
        // Create different scroll-based transforms for each card
        const rotateX = useTransform(scrollYProgress, [0, 1], [0, card.f * 15]);
        const rotateY = useTransform(scrollYProgress, [0, 1], [0, card.f * 10]);
        const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1]);
        // Remove the y transform to keep all cards aligned
        const y = useTransform(scrollYProgress, [0, 1], [0, 0]);
        
        return (
          <motion.a 
            key={idx} 
            href={card.link}
            target={card.link.startsWith('http') ? "_blank" : "_self"}
            rel={card.link.startsWith('http') ? "noopener noreferrer" : ""}
            className="p-6 rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-center aspect-[4/3] cursor-pointer"
            style={{
              rotateX,
              rotateY,
              scale,
              y,
              transformStyle: "preserve-3d",
              perspective: "1000px"
            }}
            whileHover={{
              scale: 1.02,
              borderColor: "rgba(255, 255, 255, 0.4)",
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              className="w-full h-full flex flex-col items-center justify-center space-y-4"
              style={{ 
                willChange: "transform"
              }}
            >
              <HyperText
                text={card.title}
                duration={800}
                className="text-3xl md:text-4xl font-bold text-white font-raleway"
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