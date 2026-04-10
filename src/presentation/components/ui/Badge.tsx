'use client';

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type BadgeType = 'blue' | 'indigo' | 'teal' | 'red' | 'green' | 'orange';

interface BadgeProps {
  label: string;
  type?: BadgeType;
  className?: string;
  pulse?: boolean;
}

export const Badge = ({ 
  label, 
  type = 'blue', 
  className = "",
  pulse = true 
}: BadgeProps) => (
  <span className={cn(`badge-ios badge-ios-${type}`, className)}>
    {pulse && <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
    {label}
  </span>
);
