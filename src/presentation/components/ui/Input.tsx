'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/src/application/utils/ui';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  icon?: React.ReactNode;
  onClear?: () => void;
  error?: string;
  multiline?: boolean;
  rows?: number;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  icon, 
  onClear, 
  error,
  className,
  value,
  onChange,
  multiline = false,
  rows = 4,
  ...props 
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={cn("flex flex-col gap-1.5 w-full items-start group", className)}>
      {label && (
        <span className="section-label mb-0 text-[10px] pl-1 tracking-wider opacity-60 font-bold uppercase transition-opacity group-focus-within:opacity-100">
          {label}
        </span>
      )}
      <div className={cn(
        "glass-input-container",
        multiline ? "h-auto min-h-[120px]" : "h-12",
        error && "border-red-500/50 shadow-[0_0_0_3px_rgba(255,59,48,0.15)]"
      )}>
        {icon && (
          <div className={cn(
            "pl-4 flex items-center justify-center transition-all duration-300",
            multiline ? "pt-3.5 items-start" : "items-center",
            focused ? "text-[var(--color-ios-blue)] scale-110" : "text-black/30 dark:text-white/30"
          )}>
            {React.cloneElement(icon as React.ReactElement<{ size?: number; strokeWidth?: number }>, { size: 18, strokeWidth: 2.5 })}
          </div>
        )}
        {multiline ? (
          <textarea
            {...(props as any)}
            value={value}
            onChange={onChange as any}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rows={rows}
            className={cn(
              "w-full bg-transparent px-4 py-3.5 text-[15px] outline-none font-medium tracking-tight resize-none leading-relaxed",
              "text-black/90 dark:text-white/95", 
              "placeholder:text-black/30 dark:placeholder:text-white/30"
            )}
          />
        ) : (
          <input
            {...(props as any)}
            value={value}
            onChange={onChange as any}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={cn(
              "w-full bg-transparent px-4 py-3.5 text-[15px] outline-none font-medium tracking-tight h-12",
              "text-black/90 dark:text-white/95", 
              "placeholder:text-black/30 dark:placeholder:text-white/30"
            )}
          />
        )}
        {(value && onClear) && (
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onClear();
            }}
            className={cn(
              "mr-3 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-black/50 dark:text-white/50 hover:bg-black/20 dark:hover:bg-white/20 transition-all active:scale-90",
              multiline ? "w-6 h-6 mt-3.5 items-start" : "w-5 h-5"
            )}
          >
            <X size={11} strokeWidth={3} />
          </button>
        )}
      </div>
      {error && (
        <span className="text-[10px] font-bold text-red-500 pl-2 mt-0.5 animate-float-in">
          {error}
        </span>
      )}
    </div>
  );
};
