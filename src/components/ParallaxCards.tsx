import React from "react";
import { HyperText } from "./HyperText.tsx";

const cards = [
  {
    title: "19M+",
    subtitle: "Active Wallets",
    link: "https://cryptorank.io/news/feed/09613-ethereum-user-activity-2021-peak-nfts-charge",
  },
  {
    title: "$80B+",
    subtitle: "Total Value Locked",
    link: "https://defillama.com/chain/Ethereum",
  },
  {
    title: "Pectra",
    subtitle: "Upgrade",
    link: "https://consensys.io/ethereum-pectra-upgrade",
  },
];

export default function ParallaxCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, idx) => {
        return (
          <a
            key={idx}
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 rounded-lg border border-white/20 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center text-center aspect-[4/3] cursor-pointer touch-manipulation hover:bg-white/10 transition-colors duration-300"
            style={{
              WebkitTapHighlightColor: "transparent",
              WebkitTouchCallout: "none",
              WebkitUserSelect: "none",
              userSelect: "none",
            }}
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
            <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
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
            </div>
          </a>
        );
      })}
    </div>
  );
}