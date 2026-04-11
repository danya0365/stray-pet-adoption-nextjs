'use client';

import React from 'react';
import Image from 'next/image';
import { GlassCard } from '../../ui/GlassCard';
import { Badge, type BadgeType } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { cn } from '@/src/application/utils/ui';

import Link from 'next/link';

interface PetCardProps {
  id: string;
  name: string;
  type: 'Dog' | 'Cat';
  breed: string;
  image: string;
  distance?: string;
  delay?: string;
  className?: string;
}

export const PetCard = ({ 
  id,
  name, 
  type, 
  breed, 
  image, 
  distance,
  delay = "0s",
  className = "" 
}: PetCardProps) => {
  const badgeType: BadgeType = type === 'Dog' ? 'blue' : 'orange';

  return (
    <GlassCard className={cn("overflow-hidden group", className)} delay={delay}>
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <Badge label={type === 'Dog' ? 'สุนัข' : 'แมว'} type={badgeType} />
          {distance && (
            <div className="px-2 py-0.5 rounded-full bg-[var(--glass-bg)] backdrop-blur-md text-[var(--color-text-primary)] text-[10px] font-bold w-fit border border-[var(--glass-border)]">
              📍 {distance}
            </div>
          )}
        </div>
      </div>
      <div className="p-5 flex flex-col gap-4">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-xl font-black tracking-tight text-[var(--color-text-primary)]">{name}</h3>
          <p className="text-[10px] font-black uppercase tracking-[2px] text-[var(--color-text-secondary)] opacity-60">
            {breed}
          </p>
        </div>
        
        <Link href={`/pets/${id}`} className="block">
          <Button fullWidth className="text-xs py-3.5 rounded-2xl shadow-xl shadow-[var(--color-ios-blue)]/20 uppercase tracking-widest font-black">
            ดูรายละเอียด
          </Button>
        </Link>
      </div>
    </GlassCard>
  );
};
