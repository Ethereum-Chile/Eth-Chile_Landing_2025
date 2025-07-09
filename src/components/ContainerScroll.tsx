'use client';

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import type {
  HTMLMotionProps,
  MotionValue,
  Variants,
} from "framer-motion";

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
    // Return a default context during SSR to prevent errors
    return {
      scrollYProgress: { get: () => 0, set: () => {}, on: () => {}, off: () => {} } as any
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
        className={`relative min-h-[120vh] ${className}`}
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
        ...style,
      }}
      {...props}
    />
  );
};

GalleryCol.displayName = "GalleryCol";

export const ContainerStagger = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className = "", viewport, transition, ...props }, ref) => {
  return (
    <motion.div
      className={`relative ${className}`}
      ref={ref}
      initial="hidden"
      whileInView={"visible"}
      viewport={{ once: true || viewport?.once, ...viewport }}
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

export default ContainerScroll; 