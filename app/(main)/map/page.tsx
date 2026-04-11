import React from 'react';
import { createServerMapPresenter } from '@/src/presentation/presenters/map/MapPresenter';
import PetMapView from '@/src/presentation/components/features/pet-map/PetMapView';
import { HeroHeader } from '@/src/presentation/components/shared/HeroHeader';

/**
 * MapPage - Server Component
 * หน้าจอแผนที่สำรวจสัตว์เลี้ยง
 */
export default async function MapPage() {
  const presenter = createServerMapPresenter();
  const viewModel = await presenter.getViewModel();

  return (
    <div className="flex flex-col gap-6 py-10 px-4 md:px-10 h-full">
      <HeroHeader 
        subtitle="Explore Map"
        title={<>น้องๆ อยู่ตรงไหนบ้าง? <br /><span className="font-extralight opacity-60">สำรวจพื้นที่ใกล้คุณวันนี้</span></>}
        metrics={[
          { label: "น้องหมา", value: "3", unit: "Marker" },
          { label: "น้องแมว", value: "2", unit: "Marker" },
        ]}
      />
      
      <PetMapView initialViewModel={viewModel} />
    </div>
  );
}
