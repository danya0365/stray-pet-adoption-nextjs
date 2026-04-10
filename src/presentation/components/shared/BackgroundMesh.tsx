'use client';

import React from 'react';

export const BackgroundMesh: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-700 bg-[var(--gradient-background)]">
      {/* Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[2px] opacity-[0.08] dark:opacity-[0.15] animate-breathe"
        style={{ background: 'radial-gradient(circle, #007AFF 0%, transparent 70%)' }} />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[2px] opacity-[0.07] dark:opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, #5E5CE6 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-5%] left-[30%] w-[450px] h-[450px] rounded-full blur-[2px] opacity-[0.06] dark:opacity-[0.1]"
        style={{ background: 'radial-gradient(circle, #30D5C8 0%, transparent 70%)' }} />
      
      {/* Grain overlay */}
      <div 
        className="absolute inset-0 opacity-40 mix-blend-soft-light pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
        }} 
      />
    </div>
  );
};
