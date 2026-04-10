'use client';

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ProgressProps {
  value: number; // 0 to 100
  label?: string;
  variant?: 'linear' | 'ring';
  size?: number; // for ring
  color?: string;
}

export const Progress: React.FC<ProgressProps> = ({ 
  value, 
  label, 
  variant = 'linear',
  size = 80,
  color = "var(--color-ios-blue)"
}) => {
  if (variant === 'ring') {
    const r = (size - 8) / 2;
    const circumference = 2 * Math.PI * r;
    const offset = circumference * (1 - value / 100);

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <circle 
              cx={size / 2} cy={size / 2} r={r} 
              fill="none" 
              className="stroke-zinc-200 dark:stroke-zinc-800" 
              strokeWidth={6} 
            />
            <circle 
              cx={size / 2} cy={size / 2} r={r} 
              fill="none" 
              stroke={color} 
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)", filter: `drop-shadow(0 0 4px ${color}40)` }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold opacity-90">
            {value}%
          </div>
        </div>
        {label && <span className="text-[10px] font-bold opacity-60 uppercase tracking-wider">{label}</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center px-0.5">
        {label && <span className="text-[10px] font-bold opacity-60 uppercase tracking-wider">{label}</span>}
        <span className="text-[10px] font-bold opacity-80">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${value}%`, 
            background: `linear-gradient(90deg, ${color}80, ${color})` 
          }}
        />
      </div>
    </div>
  );
};
