'use client';

import React, { useState } from 'react';
import { Button } from '@/src/presentation/components/ui/Button';
import { HeroHeader } from '@/src/presentation/components/shared/HeroHeader';
import { MobileBottomNav } from '@/src/presentation/components/shared/MobileBottomNav';
import { PetFilter } from '@/src/presentation/components/features/pet-adoption/PetFilter';
import { PetListSection } from '@/src/presentation/components/features/pet-adoption/PetListSection';
import { HomeViewModel } from '@/src/presentation/presenters/home/HomePresenter';

interface HomeViewProps {
  initialViewModel: HomeViewModel;
}

/**
 * HomeView - Client Component
 * จัดการสถานะ UI (เช่น Tab) และการแสดงผลหน้าแรก
 */
export default function HomeView({ initialViewModel }: HomeViewProps) {
  const [activeTab, setActiveTab] = useState('All');
  const { pets, metrics } = initialViewModel;

  // Filter logic based on tab
  const filteredPets = pets.filter(pet => 
    activeTab === 'All' ? true : pet.type === activeTab
  ).map((pet, i) => ({
    ...pet,
    // Add layout logic that was in the old mock
    className: (i === 3) ? "hidden md:block" : (i === 4) ? "hidden lg:block" : ""
  }));

  return (
    <div className="w-full px-4 md:px-10 py-10 pb-32 flex flex-col gap-10">
      
      {/* Hero Header Section */}
      <HeroHeader 
        subtitle="Pet Adoption Kit"
        title={<>มาหาเพื่อนใหม่.. <br /><span className="font-extralight opacity-60 underline decoration-[var(--color-ios-blue)] decoration-[3px] underline-offset-[12px]">ไปอยู่บ้านกันนะ</span></>}
        metrics={metrics}
      />

      {/* Main Content Area */}
      <div className="flex flex-col gap-8">
        
        {/* Filter Tabs & Advanced Search */}
        <PetFilter 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          options={['All', 'Dog', 'Cat']} 
        />

        {/* Pet Listings Grid */}
        <PetListSection 
          activeTab={activeTab === 'All' ? 'ทั้งหมด' : activeTab} 
          pets={filteredPets} 
        />

      </div>

      {/* Action Buttons */}
      <section className="flex flex-col md:flex-row gap-3 animate-float-in" style={{ animationDelay: '0.8s' }}>
        <Button variant="primary" fullWidth className="py-4 text-base font-bold">
          ลงทะเบียนรับเลี้ยง
        </Button>
        <Button variant="secondary" fullWidth className="py-4 text-base font-bold">
          บริจาคช่วยเหลือน้องๆ
        </Button>
      </section>

      {/* Mobile-Only Navigation Bar */}
      <MobileBottomNav />

    </div>
  );
}
