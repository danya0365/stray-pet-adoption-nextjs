'use client';

import React from 'react';
import { MetricCard } from '@/src/presentation/components/ui/MetricCard';

interface HeroHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
  metrics: {
    label: string;
    value: string;
    unit: string;
    delay?: string;
  }[];
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ 
  title, 
  subtitle, 
  metrics 
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12 animate-float-in">
      <header className="flex flex-col gap-2">
        {subtitle && <div className="section-label text-[var(--color-ios-blue)] mb-0">{subtitle}</div>}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          {title}
        </h1>
      </header>

      {/* Desktop Metrics */}
      <section className="hidden lg:flex gap-4">
        {metrics.map((metric, i) => (
          <MetricCard 
            key={i}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
            delay={metric.delay || `${0.2 + (i * 0.1)}s`}
          />
        ))}
      </section>

      {/* Mobile/Tablet Metrics Section */}
      <section className="flex lg:hidden flex-col gap-4">
        <div className="flex justify-between items-end">
          <h2 className="text-lg font-bold">สถิติล่าสุด</h2>
          <button className="text-sm font-semibold text-[var(--color-ios-blue)] pressable">ดูทั้งหมด</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metrics.map((metric, i) => (
            <MetricCard 
              key={i}
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              delay={metric.delay || `${0.2 + (i * 0.1)}s`}
              className={i >= 2 ? "hidden md:flex" : ""}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
