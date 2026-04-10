'use client';

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
  variant?: 'default' | 'elevated' | 'thick';
}

export const GlassCard = ({ 
  children, 
  className = "", 
  delay = "0s",
  variant = 'default' 
}: GlassCardProps) => {
  const variantClass = {
    default: 'glass',
    elevated: 'glass-elevated',
    thick: 'glass-thick'
  }[variant];

  return (
    <div 
      className={cn(variantClass, "animate-float-in", className)} 
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
};
