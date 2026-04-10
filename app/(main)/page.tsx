'use client';

import React, { useState } from 'react';
import { Button } from '@/src/presentation/components/ui/Button';
import { HeroHeader } from '@/src/presentation/components/shared/HeroHeader';
import { MobileBottomNav } from '@/src/presentation/components/shared/MobileBottomNav';
import { PetFilter } from '@/src/presentation/components/features/pet-adoption/PetFilter';
import { PetListSection } from '@/src/presentation/components/features/pet-adoption/PetListSection';

// Mock Data (Would typically come from a Repository in Clean Architecture)
const MOCK_PETS = [
  { name: "โบว์ลิ่ง", type: "Dog" as const, breed: "Golden Retriever", image: "/images/dog1.png" },
  { name: "สโนว์", type: "Cat" as const, breed: "Angora", image: "/images/cat1.png" },
  { name: "คุกกี้", type: "Dog" as const, breed: "Beagle", image: "/images/dog2.png" },
  { name: "ม็อคค่า", type: "Dog" as const, breed: "Poodle Mix", image: "/images/dog1.png", className: "hidden md:block" },
  { name: "ลูน่า", type: "Cat" as const, breed: "Siamese", image: "/images/cat1.png", className: "hidden lg:block" },
];

const MOCK_METRICS = [
  { label: "หาบ้านได้แล้ว", value: "1,240", unit: "ตัว" },
  { label: "กำลังรอเจ้าของ", value: "84", unit: "ตัว" },
  { label: "อาสาสมัคร", value: "156", unit: "คน" },
  { label: "ความสำเร็จ", value: "98", unit: "%" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('All');

  // Filter logic based on tab
  const filteredPets = MOCK_PETS.filter(pet => 
    activeTab === 'All' ? true : pet.type === activeTab
  );

  return (
    <div className="w-full px-4 md:px-10 py-10 pb-32 flex flex-col gap-10">
      
      {/* Hero Header Section */}
      <HeroHeader 
        subtitle="Pet Adoption Kit"
        title={<>มาหาเพื่อนใหม่.. <br /><span className="font-extralight opacity-60 underline decoration-[var(--color-ios-blue)] decoration-[3px] underline-offset-[12px]">ไปอยู่บ้านกันนะ</span></>}
        metrics={MOCK_METRICS}
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
