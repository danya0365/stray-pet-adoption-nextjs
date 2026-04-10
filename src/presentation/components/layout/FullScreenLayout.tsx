'use client';

import React from 'react';
import { BackgroundMesh } from '../shared/BackgroundMesh';

interface FullScreenLayoutProps {
  children: React.ReactNode;
}

export const FullScreenLayout: React.FC<FullScreenLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col font-sans">
      <BackgroundMesh />
      <main className="relative z-10 flex-1 flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
};
