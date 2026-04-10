'use client';

import React from 'react';
import { Sidebar } from '../shared/Sidebar';
import { BackgroundMesh } from '../shared/BackgroundMesh';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col font-sans">
      <BackgroundMesh />
      <Sidebar />
      <main className="relative z-10 flex-1 flex flex-col md:pl-72 lg:pl-80 transition-all duration-500">
        <div className="flex-1 w-full max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
