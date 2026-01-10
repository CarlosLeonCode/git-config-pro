"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MotionButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'luxury' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const MotionButton = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ className, variant = 'luxury', size = 'md', ...props }, ref) => {
    
    const variantClasses = {
      primary: "action-button-primary",
      luxury: "action-button",
      outline: "glass border-border/40 hover:bg-secondary/50",
      ghost: "hover:bg-secondary/50 text-muted-foreground hover:text-foreground",
      destructive: "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/10"
    };

    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
      icon: "p-2 rounded-xl"
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95, y: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none overflow-hidden",
          variant === 'primary' || variant === 'luxury' ? variantClasses[variant] : cn("glass", variantClasses[variant]),
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

MotionButton.displayName = "MotionButton";

export { MotionButton };
