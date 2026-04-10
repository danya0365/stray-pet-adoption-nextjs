'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ListRowProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  detail?: string;
  onClick?: () => void;
  last?: boolean;
  className?: string;
}

export const ListRow: React.FC<ListRowProps> = ({ 
  icon, 
  title, 
  subtitle, 
  detail, 
  onClick, 
  last = false,
  className 
}) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "flex items-center gap-4 py-3.5 px-4 transition-all duration-200",
        onClick && "pressable hover:bg-black/5 dark:hover:bg-white/5",
        !last && "border-b border-black/5 dark:border-white/5",
        className
      )}
    >
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-zinc-200/50 dark:bg-zinc-800/50 flex items-center justify-center flex-shrink-0">
          <div className="opacity-80">{icon}</div>
        </div>
      )}
      <div className="flex flex-col flex-1">
        <span className="text-sm font-bold tracking-tight">{title}</span>
        {subtitle && <span className="text-[10px] font-semibold opacity-40 uppercase tracking-widest">{subtitle}</span>}
      </div>
      {detail && <span className="text-sm font-medium opacity-40">{detail}</span>}
      {onClick && <ChevronRight size={18} className="opacity-20" />}
    </div>
  );
};
