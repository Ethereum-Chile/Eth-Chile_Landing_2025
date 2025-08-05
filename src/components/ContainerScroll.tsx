"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { HTMLMotionProps, MotionValue, Variants } from "framer-motion";

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
  duration: 0.3,
};

const blurVariants: Variants = {
  hidden: {
    filter: "blur(10px)",
    opacity: 0,
  },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
  },
};

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    return {
      scrollYProgress: {
        get: () => 0,
        set: () => {},
        on: () => () => {},
        off: () => {},
      } as any,
    };
  }
  return context;
}

export const ContainerScroll = ({
  children,
  className = "",
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={`relative min-h-[50vh] ${className}`}
        style={{
          perspective: "1000px",
          perspectiveOrigin: "center top",
          transformStyle: "preserve-3d",
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};

ContainerScroll.displayName = "ContainerScroll";

export const ContainerSticky = ({
  className = "",
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`sticky left-0 top-0 min-h-[30rem] w-full overflow-hidden ${className}`}
      style={{
        perspective: "1000px",
        perspectiveOrigin: "center top",
        transformStyle: "preserve-3d",
        transformOrigin: "50% 50%",
        ...style,
      }}
      {...props}
    />
  );
};

ContainerSticky.displayName = "ContainerSticky";

export const GalleryContainer = ({
  children,
  className = "",
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & HTMLMotionProps<"div">) => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const { scrollYProgress } = useContainerScrollContext();

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [75, 0]);
  const scale = useTransform(scrollYProgress, [0.5, 0.9], [1.2, 1]);

  return (
    <motion.div
      className={`relative grid size-full grid-cols-3 gap-2 rounded-2xl ${className}`}
      style={{
        rotateX: isClient ? rotateX : 0,
        scale: isClient ? scale : 1,
        transformStyle: "preserve-3d",
        perspective: "1000px",
        willChange: "transform",
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

GalleryContainer.displayName = "GalleryContainer";

export const GalleryCol = ({
  className = "",
  style,
  yRange = ["0%", "-10%"],
  ...props
}: HTMLMotionProps<"div"> & { yRange?: string[] }) => {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const { scrollYProgress } = useContainerScrollContext();
  const y = useTransform(scrollYProgress, [0.5, 1], yRange);

  return (
    <motion.div
      className={`relative flex w-full flex-col gap-2 ${className}`}
      style={{
        y: isClient ? y : 0,
        willChange: "transform",
        ...style,
      }}
      {...props}
    />
  );
};

GalleryCol.displayName = "GalleryCol";

export const StickyScrollContainer = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div ref={scrollRef} className={`relative ${className}`} {...props}>
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};

StickyScrollContainer.displayName = "StickyScrollContainer";

export const StaticImageColumn = ({
  image,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  image: string;
}) => {
  return (
    <div className={`w-full min-h-[400vh] ${className}`} {...props}>
      <div className="sticky top-[50vh] -translate-y-1/2 h-[60vh] md:h-[70vh] lg:h-[80vh] w-full">
        <div className="relative h-full w-full rounded-lg overflow-hidden shadow-2xl border border-white/10">
          <img
            src={image}
            alt="ETH Chile 2025 Featured"
            className="h-full w-full object-cover"
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="text-white">
              <h3 className="text-xl font-semibold mb-2">ETH Chile 2025</h3>
              <p className="text-sm text-gray-300">Fintech meets Ethereum</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

StaticImageColumn.displayName = "StaticImageColumn";

export const ScrollColumn = ({
  images,
  className = "",
  direction = "normal",
}: {
  images: string[];
  direction?: "normal" | "reverse";
  className?: string;
}) => {
  const [isClient, setIsClient] = React.useState(false);
  const { scrollYProgress } = useContainerScrollContext();

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const yRange = direction === "reverse" ? ["0%", "20%"] : ["0%", "-20%"];

  const y = useTransform(scrollYProgress, [0.2, 0.8], yRange);

  return (
    <div className={`w-full ${className}`}>
      <motion.div
        className="space-y-4"
        style={{
          y: isClient ? y : 0,
          willChange: "transform",
        }}
      >
        {images.map((imageUrl, index) => (
          <figure key={index} className="w-full">
            <img
              src={imageUrl}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg shadow-lg border border-white/10"
            />
          </figure>
        ))}
      </motion.div>
    </div>
  );
};

ScrollColumn.displayName = "ScrollColumn";

export const ContainerStagger = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div"> & {
    viewport?: any;
    transition?: any;
  }
>(({ className = "", viewport, transition, ...props }, ref) => {
  return (
    <motion.div
      className={`relative ${className}`}
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, ...viewport }}
      transition={{
        staggerChildren: transition?.staggerChildren || 0.2,
        ...transition,
      }}
      {...props}
    />
  );
});

ContainerStagger.displayName = "ContainerStagger";

export const ContainerAnimated = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className = "", transition, ...props }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={blurVariants}
      transition={SPRING_CONFIG || transition}
      {...props}
    />
  );
});

ContainerAnimated.displayName = "ContainerAnimated";

export const StickyScrollGallery = ({
  leftImages,
  staticImage,
  rightImages,
  className = "",
}: {
  leftImages: string[];
  staticImage: string;
  rightImages: string[];
  className?: string;
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={`relative min-h-[400vh] bg-custom-black ${className}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 py-10">
          <div className="col-span-1 md:col-span-4 order-1 md:order-1">
            <ScrollColumn images={leftImages} direction="normal" />
          </div>

          <div className="col-span-1 md:col-span-4 order-3 md:order-2">
            <StaticImageColumn image={staticImage} />
          </div>

          <div className="col-span-1 md:col-span-4 order-2 md:order-3">
            <ScrollColumn images={rightImages} direction="reverse" />
          </div>
        </div>
      </div>
    </ContainerScrollContext.Provider>
  );
};

StickyScrollGallery.displayName = "StickyScrollGallery";

export default ContainerScroll;
