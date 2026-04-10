'use client';

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'red';
  fullWidth?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  fullWidth = false,
  className = "",
  children,
  ...props 
}: ButtonProps) => {
  const variantClass = {
    primary: 'btn-ios-primary',
    secondary: 'btn-ios-secondary',
    ghost: '', // Can be customized later
    red: 'bg-[var(--color-ios-red)] text-white hover:opacity-90 active:scale-95'
  }[variant];

  return (
    <button 
      className={cn(
        "pressable btn-ios", 
        variantClass, 
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
