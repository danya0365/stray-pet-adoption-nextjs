'use client';

import React from 'react';
import { Info, AlertCircle, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface ToastProps {
  title?: string;
  message?: string;
  type?: ToastType;
  onClose?: () => void;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({ 
  title, 
  message, 
  type = 'info', 
  onClose,
  className 
}) => {
  const displayTitle = title || message;
  const displayMessage = title ? message : undefined;
  const config = {
    info: { icon: Info, color: 'var(--color-ios-blue)', bg: 'bg-blue-500/10' },
    success: { icon: CheckCircle, color: 'var(--color-ios-green)', bg: 'bg-green-500/10' },
    warning: { icon: AlertTriangle, color: 'var(--color-ios-orange)', bg: 'bg-orange-500/10' },
    error: { icon: AlertCircle, color: 'var(--color-ios-red)', bg: 'bg-red-500/10' },
  };

  const { icon: Icon, color, bg } = config[type];

  return (
    <div className={cn(
      "glass-elevated flex items-center gap-4 p-4 rounded-2xl max-w-[400px] animate-float-in",
      className
    )}>
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", bg)} style={{ color }}>
        <Icon size={20} />
      </div>
      <div className="flex flex-col flex-1">
        <h4 className="text-sm font-bold tracking-tight">{displayTitle}</h4>
        {displayMessage && <p className="text-xs font-medium opacity-60 leading-relaxed">{displayMessage}</p>}
      </div>
      {onClose && (
        <button onClick={onClose} className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-full opacity-40 hover:opacity-100 transition-all">
          <X size={14} />
        </button>
      )}
    </div>
  );
};
