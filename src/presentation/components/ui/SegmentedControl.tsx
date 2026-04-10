'use client';

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SegmentedControlProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({ 
  options, 
  value, 
  onChange,
  className 
}) => {
  return (
    <div className={cn("glass-segmented-container", className)}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          data-state={value === option ? "active" : "inactive"}
          className="glass-segmented-item"
        >
          {option}
        </button>
      ))}
    </div>
  );
};
