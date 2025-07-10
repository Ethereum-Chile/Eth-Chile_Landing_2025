'use client';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

export const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

export type ProgressiveBlurProps = {
  direction?: keyof typeof GRADIENT_ANGLES;
  blurLayers?: number;
  className?: string;
  blurIntensity?: number;
  isVisible?: boolean;
} & HTMLMotionProps<'div'>;

export function ProgressiveBlur({
  direction = 'bottom',
  blurLayers = 8,
  className,
  blurIntensity = 0.25,
  isVisible = true,
  ...props
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (blurLayers + 1);

  return (
    <div className={cn('relative', className)}>
      {Array.from({ length: layers }).map((_, index) => {
        const angle = GRADIENT_ANGLES[direction];
        
        // Create a more pronounced gradient effect
        const startPos = index * segmentSize;
        const endPos = (index + 1) * segmentSize;
        const midPos = (startPos + endPos) / 2;
        
        // Make the blur more aggressive by starting blur earlier
        const blurStart = Math.max(0, startPos - 0.1);
        const blurEnd = Math.min(1, endPos + 0.1);
        const gradientStops = [
          `${blurStart * 100}%`,
          `${startPos * 100}%`,
          `${endPos * 100}%`,
          `${blurEnd * 100}%`,
        ].map(
          (pos, posIndex) =>
            `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos}`
        );

        const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(
          ', '
        )})`;

        return (
          <motion.div
            key={index}
            className='pointer-events-none absolute inset-0 rounded-[inherit]'
            style={{
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${index * blurIntensity}px)`,
              filter: `blur(${index * blurIntensity}px)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            {...props}
          />
        );
      })}
    </div>
  );
} 