'use client';

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SliderProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  color?: string;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({ 
  label, 
  value, 
  min = 0, 
  max = 100, 
  onChange,
  color = "var(--color-ios-blue)",
  className 
}) => {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      <div className="flex justify-between items-center mb-1">
        {label && <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest pl-1">{label}</span>}
        <span className="text-sm font-mono font-bold" style={{ color }}>{value}%</span>
      </div>
      <div className="relative h-6 flex items-center">
        <div className="glass-slider-track w-full">
          <div 
            className="glass-slider-range" 
            style={{ 
              width: `${percentage}%`,
              background: percentage > 0 ? color : 'transparent'
            }}
          />
        </div>
        <input 
          type="range" 
          min={min} 
          max={max} 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div 
          className="absolute w-5 h-5 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-white pointer-events-none transition-all duration-100"
          style={{ 
            left: `calc(${percentage}% - 10px)`,
            boxShadow: `0 2px 8px ${color}40`
          }}
        />
      </div>
    </div>
  );
};
