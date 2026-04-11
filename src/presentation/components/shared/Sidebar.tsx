'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, Heart, User, Settings, Info, LogOut, Sun, Moon, LayoutGrid, MapPin } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useTheme } from 'next-themes';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const SidebarItem = ({ icon: Icon, label, href, active = false }: any) => {
  const content = (
    <div className={cn(
      "pressable w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300",
      active 
        ? "bg-white dark:bg-zinc-800 shadow-sm text-[var(--color-ios-blue)]" 
        : "opacity-60 hover:opacity-100 hover:bg-white/10"
    )}>
      <Icon size={22} strokeWidth={active ? 2.5 : 2} />
      <span className="font-semibold text-sm tracking-tight">{label}</span>
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
        <div className="flex items-center justify-between mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--gradient-primary)] flex items-center justify-center text-white font-bold text-xl shadow-lg border-2 border-white/20">
              M
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight">Maros</span>
              <span className="text-xs opacity-50 font-medium">Pet Adopter</span>
            </div>
          </div>
          
          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="pressable p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            {theme === 'dark' ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-500" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-grow">
          <div className="section-label px-2 opacity-40">Main Menu</div>
          <SidebarItem icon={Home} label="หน้าแรก" href="/" active={pathname === '/'} />
          <SidebarItem icon={MapPin} label="แผนที่" href="/map" active={pathname === '/map'} />
          <SidebarItem icon={Search} label="ค้นหา" href="/search" active={pathname === '/search'} />
          <SidebarItem icon={Heart} label="ที่ชอบ" href="/favorites" active={pathname === '/favorites'} />
          <SidebarItem icon={User} label="โปรไฟล์" href="/profile" active={pathname === '/profile'} />
          
          <div className="section-label px-2 opacity-40 mt-6">Settings</div>
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
