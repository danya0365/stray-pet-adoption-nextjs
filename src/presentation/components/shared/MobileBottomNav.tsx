'use client';

import React from 'react';
import { Home, Search, Heart, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NavItem = ({ icon: Icon, label, href, active }: any) => (
  <Link href={href} className="flex-1">
    <button className={cn(
      "pressable flex flex-col items-center justify-center gap-1 w-full py-2 rounded-2xl transition-all",
      active 
        ? "bg-white/10 text-[var(--color-ios-blue)]" 
        : "opacity-60 text-[var(--color-text-primary)]"
    )}>
      <Icon size={22} strokeWidth={active ? 2.5 : 2} />
      <span className="text-[10px] font-bold tracking-tight">{label}</span>
    </button>
  </Link>
);

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  const items = [
    { icon: Home, label: 'หน้าแรก', href: '/' },
    { icon: Search, label: 'ค้นหา', href: '/search' },
    { icon: Heart, label: 'ที่ชอบ', href: '/favorites' },
    { icon: User, label: 'โปรไฟล์', href: '/profile' }
  ];

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-float-in w-[90%] max-w-sm">
      <nav className="glass-thick px-2 py-2 rounded-[32px] flex items-center justify-around shadow-2xl border border-white/20">
        {items.map((item) => (
          <NavItem 
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            active={pathname === item.href}
          />
        ))}
      </nav>
    </div>
  );
};
