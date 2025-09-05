"use client";

import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";

const gradientHeadingVariants = cva(
  "font-bold tracking-tight",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent",
        secondary: "bg-gradient-to-r from-foreground/70 to-foreground/50 bg-clip-text text-transparent",
      },
      size: {
        default: "text-3xl md:text-4xl lg:text-5xl",
        sm: "text-2xl md:text-3xl lg:text-4xl",
        lg: "text-4xl md:text-5xl lg:text-6xl",
        xl: "text-5xl md:text-6xl lg:text-7xl",
        xxl: "text-6xl md:text-7xl lg:text-8xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface GradientHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof gradientHeadingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const GradientHeading = forwardRef<HTMLHeadingElement, GradientHeadingProps>(
  ({ className, variant, size, as: Component = "h2", ...props }, ref) => {
    return (
      <Component
        className={cn(gradientHeadingVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

GradientHeading.displayName = "GradientHeading";

export { GradientHeading, gradientHeadingVariants }; 