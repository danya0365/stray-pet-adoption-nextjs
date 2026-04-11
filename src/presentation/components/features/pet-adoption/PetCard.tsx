'use client';

import React from 'react';
import Image from 'next/image';
import { GlassCard } from '../../ui/GlassCard';
import { Badge, type BadgeType } from '../../ui/Badge';
import { Button } from '../../ui/Button';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import Link from 'next/link';

interface PetCardProps {
  id: string;
  name: string;
  type: 'Dog' | 'Cat';
  breed: string;
  image: string;
  delay?: string;
  className?: string;
}

export const PetCard = ({ 
  id,
  name, 
  type, 
  breed, 
  image, 
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
        <div className="absolute top-3 left-3">
          <Badge label={type === 'Dog' ? 'สุนัข' : 'แมว'} type={badgeType} />
        </div>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold tracking-tight">{name}</h3>
          <span className="text-sm opacity-60 font-medium">{breed}</span>
        </div>
        <Link href={`/pets/${id}`} className="block mt-2">
          <Button variant="secondary" fullWidth>
            ดูรายละเอียด
          </Button>
        </Link>
      </div>
    </GlassCard>
  );
};
