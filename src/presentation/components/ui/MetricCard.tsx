'use client';

import React from 'react';
import { GlassCard } from './GlassCard';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MetricCardProps {
  label: string;
  value: string | number;
  unit: string;
  delay?: string;
  className?: string;
}

export const MetricCard = ({ 
  label, 
  value, 
  unit, 
  delay = "0s",
  className = "" 
}: MetricCardProps) => (
  <GlassCard className={cn("p-5 flex flex-col gap-1 min-w-[160px]", className)} delay={delay}>
    <span className="section-label mb-1">{label}</span>
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-extralight tracking-tight">{value}</span>
      <span className="text-sm font-medium opacity-60 uppercase">{unit}</span>
    </div>
  </GlassCard>
);
