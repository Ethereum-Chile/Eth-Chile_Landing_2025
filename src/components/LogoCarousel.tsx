"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type SVGProps,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

// Web3 Company Logo SVG Components
interface Logo {
  name: string;
  id: number;
  img: string;
}

interface LogoColumnProps {
  logos: Logo[];
  index: number;
  currentTime: number;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const distributeLogos = (allLogos: Logo[], columnCount: number): Logo[][] => {
  const columns: Logo[][] = Array.from({ length: columnCount }, () => []);

  // Figure out how many logos each column needs
  const logosPerColumn = Math.ceil(allLogos.length / columnCount);

  // Round-robin distribution to keep things balanced
  allLogos.forEach((logo, index) => {
    const columnIndex = index % columnCount;
    columns[columnIndex].push(logo);
  });

  // Fill any gaps by cycling through logos again
  if (allLogos.length < columnCount * logosPerColumn) {
    const repeatedLogos = [...allLogos, ...allLogos];
    columns.forEach((col, colIndex) => {
      while (col.length < logosPerColumn) {
        const nextLogoIndex =
          (col.length * columnCount + colIndex) % repeatedLogos.length;
        col.push(repeatedLogos[nextLogoIndex]);
      }
    });
  }

  return columns;
};

const LogoColumn: React.FC<LogoColumnProps> = React.memo(
  ({ logos, index, currentTime }) => {
    const cycleInterval = 2000;
    const columnDelay = index * 200;
    const adjustedTime =
      (currentTime + columnDelay) % (cycleInterval * logos.length);
    const currentIndex = Math.floor(adjustedTime / cycleInterval);
    const currentLogo = useMemo(
      () => logos[currentIndex].img,
      [logos, currentIndex],
    );

    return (
      <motion.div
        className="relative h-14 w-24 overflow-hidden md:h-24 md:w-48"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.1,
          duration: 0.5,
          ease: "easeOut",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${logos[currentIndex].id}-${currentIndex}`}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: "10%", opacity: 0, filter: "blur(8px)" }}
            animate={{
              y: "0%",
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 1,
                bounce: 0.2,
                duration: 0.5,
              },
            }}
            exit={{
              y: "-20%",
              opacity: 0,
              filter: "blur(6px)",
              transition: {
                type: "tween",
                ease: "easeIn",
                duration: 0.3,
              },
            }}
          >
            <img
              src={currentLogo}
              className="h-20 w-20 max-h-[80%] max-w-[80%] object-contain md:h-32 md:w-32"
              alt={logos[currentIndex].name}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  },
);

interface LogoCarouselProps {
  columnCount?: number;
  logos?: Logo[];
}

export function LogoCarousel({ columnCount = 2, logos }: LogoCarouselProps) {
  const [logoSets, setLogoSets] = useState<Logo[][]>([]);
  const [currentTime, setCurrentTime] = useState(0);

  // Default logos if none provided
  const defaultLogos: Logo[] = [
    { name: "Ethereum", id: 1, img: "/imgs/cripto/ethereum.webp" },
    { name: "Polygon", id: 2, img: "/imgs/cripto/polygon.webp" },
    { name: "Uniswap", id: 3, img: "/imgs/cripto/uniswap.webp" },
    { name: "Aave", id: 4, img: "/imgs/cripto/aave.webp" },
    { name: "Chainlink", id: 5, img: "/imgs/cripto/chainlink.webp" },
    { name: "Optimism", id: 6, img: "/imgs/cripto/optimism.webp" },
    { name: "Arbitrum", id: 7, img: "/imgs/cripto/arbitrum.webp" },
    { name: "MakerDAO", id: 8, img: "/imgs/cripto/maker.webp" },
    { name: "Compound", id: 9, img: "/imgs/cripto/compound.webp" },
    { name: "Balancer", id: 10, img: "/imgs/cripto/balancer.webp" },
  ];

  const logosToUse = logos || defaultLogos;

  const updateTime = useCallback(() => {
    setCurrentTime((prevTime) => prevTime + 100);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateTime, 100);
    return () => clearInterval(intervalId);
  }, [updateTime]);

  useEffect(() => {
    const distributedLogos = distributeLogos(logosToUse, columnCount);
    setLogoSets(distributedLogos);
  }, [logosToUse, columnCount]);

  return (
    <div className="w-full py-16 bg-custom-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Logo Carousel */}
        <div className="flex justify-center">
          <div className="flex space-x-4">
            {logoSets.map((logos, index) => (
              <LogoColumn
                key={index}
                logos={logos}
                index={index}
                currentTime={currentTime}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { LogoColumn };
