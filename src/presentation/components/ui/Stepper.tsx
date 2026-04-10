'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StepperProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({ 
  label, 
  value, 
  min = 0, 
  max = 99, 
  onChange,
  className 
}) => {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      {label && <span className="text-sm font-semibold opacity-70 uppercase tracking-tight text-[11px]">{label}</span>}
      <div className="glass-stepper-container">
        <button 
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="glass-stepper-btn pressable"
        >
          <Minus size={16} strokeWidth={3} />
        </button>
        <div className="glass-stepper-value">
          {value}
        </div>
        <button 
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="glass-stepper-btn pressable"
        >
          <Plus size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};
