'use client';

import React from 'react';
import { PetCard } from './PetCard';

interface PetListSectionProps {
  activeTab: string;
  pets: {
    name: string;
    type: 'Dog' | 'Cat';
    breed: string;
    image: string;
    delay?: string;
    className?: string;
  }[];
}

export const PetListSection: React.FC<PetListSectionProps> = ({ 
  activeTab, 
  pets 
}) => {
  return (
    <section className="flex flex-col gap-6 animate-float-in" style={{ animationDelay: '0.4s' }}>
      <div className="flex justify-between items-center px-1">
        <div className="section-label mb-0">เพื่อนที่กำลังรอคุณ ({activeTab})</div>
        <div className="md:hidden">
          <button className="text-[var(--color-ios-blue)] text-sm font-semibold pressable">ตัวกรอง</button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet, i) => (
          <PetCard 
            key={i}
            name={pet.name}
            type={pet.type}
            breed={pet.breed}
            image={pet.image}
            delay={pet.delay || `${0.4 + (i * 0.1)}s`}
            className={pet.className}
          />
        ))}
      </div>
    </section>
  );
};
