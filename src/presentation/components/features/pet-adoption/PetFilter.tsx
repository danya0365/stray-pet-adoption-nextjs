'use client';

import React from 'react';
import { SegmentedControl } from '@/src/presentation/components/ui/SegmentedControl';
import { Button } from '@/src/presentation/components/ui/Button';

interface PetFilterProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  options?: string[];
}

export const PetFilter: React.FC<PetFilterProps> = ({ 
  activeTab, 
  onTabChange,
  options = ['All', 'Dog', 'Cat']
}) => {
  return (
    <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 animate-float-in" style={{ animationDelay: '0.35s' }}>
      <div className="w-full md:w-[400px]">
        <SegmentedControl 
          options={options}
          value={activeTab}
          onChange={onTabChange}
        />
      </div>
      
      <div className="hidden md:flex gap-3">
         <Button variant="secondary" className="py-2.5 px-6 text-sm font-bold">เรียงตาม: ล่าสุด</Button>
         <Button variant="primary" className="py-2.5 px-6 text-sm font-bold">ค้นหาขั้นสูง</Button>
      </div>
    </section>
  );
};
