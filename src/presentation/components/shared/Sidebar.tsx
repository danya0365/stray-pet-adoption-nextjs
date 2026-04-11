'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, User, Settings, Info, LogOut, Sun, Moon, LayoutGrid, MapPin } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/src/application/utils/ui';

const SidebarItem = ({ icon: Icon, label, href, active = false }: any) => {
  const content = (
    <div className={cn(
      "pressable w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 border border-transparent",
      active 
        ? "bg-[var(--color-surface-elevated)] border-[var(--color-border-muted)] shadow-[var(--glass-shadow)] text-[var(--color-ios-blue)]" 
        : "text-[var(--color-text-secondary)] opacity-100 hover:bg-[var(--color-border-muted)]"
    )}>
      <Icon size={20} className={active ? "text-[var(--color-ios-blue)]" : "text-[var(--color-text-secondary)] opacity-60"} strokeWidth={active ? 2.5 : 2} />
      <span className={cn(
        "font-semibold text-sm tracking-tight",
        active ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-secondary)]"
      )}>{label}</span>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return <button className="w-full text-left">{content}</button>;
};

export const Sidebar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside className="hidden md:flex fixed left-6 top-6 bottom-6 w-64 z-50 animate-float-in">
      <div className="glass-thick w-full h-full rounded-[40px] flex flex-col p-6 shadow-2xl">
        {/* Profile & Theme Toggle Section */}
        <div className="flex items-center justify-between mb-10 px-1 pt-2">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[var(--color-ios-blue)] flex items-center justify-center text-white font-black text-lg shadow-lg shadow-[var(--color-ios-blue)]/20 border border-white/20">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-[var(--color-text-primary)]">Maros</span>
              <span className="text-[10px] text-[var(--color-text-secondary)] opacity-60 font-black uppercase tracking-widest">Pet Adopter</span>
            </div>
          </div>
          
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="pressable p-2.5 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border-muted)] hover:bg-[var(--color-border-muted)] transition-colors group"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-yellow-400 group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon size={18} className="text-slate-400 group-hover:-rotate-12 transition-transform" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1.5 flex-grow">
          <div className="section-label px-4 text-[var(--color-text-muted)]">Main Menu</div>
          <SidebarItem icon={Home} label="หน้าแรก" href="/" active={pathname === '/'} />
          <SidebarItem icon={MapPin} label="แผนที่" href="/map" active={pathname === '/map'} />
          <SidebarItem icon={Search} label="ค้นหา" href="/search" active={pathname === '/search'} />
          <SidebarItem icon={Heart} label="ที่ชอบ" href="/favorites" active={pathname === '/favorites'} />
          <SidebarItem icon={User} label="โปรไฟล์" href="/profile" active={pathname === '/profile'} />
          
          <div className="section-label px-4 text-[var(--color-text-muted)] mt-6">Settings</div>
          <SidebarItem icon={LayoutGrid} label="Design System" href="/design-system" active={pathname === '/design-system'} />
          <SidebarItem icon={Settings} label="ตั้งค่า" href="/settings" active={pathname === '/settings'} />
          <SidebarItem icon={Info} label="ช่วยเหลือ" href="/help" active={pathname === '/help'} />
        </nav>

        {/* Footer */}
        <div className="mt-auto">
          <SidebarItem icon={LogOut} label="ออกจากระบบ" />
        </div>
      </div>
    </aside>
  );
};
