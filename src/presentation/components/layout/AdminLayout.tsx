import React from 'react';
import { Sidebar } from '../shared/Sidebar';
import { BackgroundMesh } from '../shared/BackgroundMesh';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col font-sans">
      <BackgroundMesh />
      <div className="flex flex-1 relative z-10">
        <Sidebar /> 
        <main className="flex-1 md:pl-72 lg:pl-80 p-6 md:p-10 transition-all duration-500">
          <header className="mb-10 animate-float-in">
            <div className="section-label text-[var(--color-ios-indigo)] mb-1">Internal Control</div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="opacity-60 text-sm mt-1">Manage pet adoptions and system settings.</p>
          </header>
          {children}
        </main>
      </div>
    </div>
  );
};
