'use client';

import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  color?: string;
}

export const Switch: React.FC<SwitchProps> = ({ 
  checked, 
  onChange, 
  label,
  color = "var(--color-ios-blue)" 
}) => {
  return (
    <div className="flex items-center justify-between gap-4 group cursor-pointer" onClick={() => onChange(!checked)}>
      {label && <span className="text-sm font-semibold opacity-70 group-hover:opacity-100 transition-opacity uppercase tracking-tight text-[11px]">{label}</span>}
      <div
        className="glass-switch-track"
        data-state={checked ? "checked" : "unchecked"}
        style={checked ? { backgroundColor: color } : {}}
      >
        <div className="glass-switch-thumb" />
      </div>
    </div>
  );
};
