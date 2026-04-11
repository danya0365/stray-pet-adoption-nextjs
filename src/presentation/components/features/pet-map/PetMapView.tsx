'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Pet } from '@/src/domain/Pet';
import { MapViewModel } from '@/src/presentation/presenters/map/MapPresenter';
import { GlassCard } from '@/src/presentation/components/ui/GlassCard';
import { Badge } from '@/src/presentation/components/ui/Badge';
import { Button } from '@/src/presentation/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Info, ArrowRight } from 'lucide-react';

interface PetMapViewProps {
  initialViewModel: MapViewModel;
}

/**
 * PetMapView
 * แสดงผลแผนที่ตำแหน่งน้องๆ โดยใช้ MapLibre
 */
export default function PetMapView({ initialViewModel }: PetMapViewProps) {
  const { pets, center, zoom } = initialViewModel;
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  return (
    <div className="w-full h-[calc(100vh-80px)] md:h-[calc(100vh-120px)] mt-4 relative overflow-hidden rounded-[40px] shadow-2xl border border-white/10 animate-float-in">
      
      {/* Search Overlay */}
      <div className="absolute top-6 left-6 right-6 md:left-auto md:right-6 md:w-80 z-20">
         <GlassCard className="p-4 flex flex-col gap-3">
            <h3 className="font-bold flex items-center gap-2">
              <MapPin size={18} className="text-[var(--color-ios-blue)]" />
              ค้นหาน้องๆ ใกล้ตัวคุณ
            </h3>
            <p className="text-xs opacity-60">แสดงตำแหน่งน้องๆ ในกรุงเทพฯ และปริมณฑล</p>
         </GlassCard>
      </div>

      <Map
        initialViewState={{
          longitude: center.lng,
          latitude: center.lat,
          zoom: zoom
        }}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        style={{ width: '100%', height: '100%' }}
      >
        <NavigationControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />

        {/* Pet Markers */}
        {pets.map((pet) => (
          <Marker
            key={pet.id}
            longitude={pet.longitude!}
            latitude={pet.latitude!}
            anchor="bottom"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              setSelectedPet(pet);
            }}
          >
            <div className="group cursor-pointer relative">
               {/* Marker Pulse Effect */}
               <div className="absolute -inset-4 bg-[var(--color-ios-blue)]/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
               
               {/* Marker Icon (Upgraded) */}
               <div className="w-12 h-12 rounded-full border-[3px] border-white shadow-[0_8px_20px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.6)] overflow-hidden relative z-10 transition-all duration-500 ease-[var(--spring)] group-hover:scale-125 group-hover:-translate-y-4">
                  <Image 
                    src={pet.image} 
                    alt={pet.name} 
                    fill 
                    className="object-cover" 
                  />
               </div>
               
               {/* Floating Label */}
               <div className={
                  `absolute top-full left-1/2 -translate-x-1/2 mt-3 px-4 py-1.5 rounded-2xl glass-thick text-[11px] font-bold text-white shadow-xl whitespace-nowrap transition-all duration-500
                  ${selectedPet?.id === pet.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100'}`
               }>
                  {pet.name} 🐾
               </div>
            </div>
          </Marker>
        ))}

        {/* Selected Pet Popup (Premium Redesign) */}
        {selectedPet && (
          <Popup
            longitude={selectedPet.longitude!}
            latitude={selectedPet.latitude!}
            anchor="top"
            onClose={() => setSelectedPet(null)}
            closeButton={false}
            maxWidth="320px"
            className="custom-map-popup"
            offset={20}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="glass-thick rounded-[32px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.3)] border border-white/20 select-none"
            >
               {/* Full-bleed Hero Image */}
               <div className="relative h-44 w-full group/img">
                  <Image 
                    src={selectedPet.image} 
                    alt={selectedPet.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex flex-col">
                     <h4 className="text-xl font-black text-white tracking-tight">{selectedPet.name}</h4>
                     <p className="text-xs text-white/70 font-medium">{selectedPet.breed}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                     <Badge label={selectedPet.type === 'Dog' ? 'สุนัข' : 'แมว'} type={selectedPet.type === 'Dog' ? 'blue' : 'green'} />
                  </div>
               </div>

               {/* Popup Body */}
               <div className="p-5 flex flex-col gap-4 bg-white/5 backdrop-blur-md">
                  <p className="text-[13px] leading-relaxed opacity-80 font-medium line-clamp-2">
                    {selectedPet.description}
                  </p>
                  
                  <Link href={`/pets/${selectedPet.id}`} className="block">
                     <Button variant="primary" fullWidth className="py-4 text-sm font-black gap-2 shadow-[0_10px_20px_rgba(0,122,255,0.3)]">
                        ดูรายละเอียดน้อง <ArrowRight size={18} />
                     </Button>
                  </Link>
               </div>
            </motion.div>
          </Popup>
        )}
      </Map>

      <style jsx global>{`
        .custom-map-popup .maplibregl-popup-content {
          background: transparent !important;
          padding: 0 !important;
          border-radius: 32px !important;
          box-shadow: none !important;
        }
        .custom-map-popup .maplibregl-popup-tip {
          border-bottom-color: rgba(255,255,255,0.2) !important;
          margin-bottom: -1px;
        }
        .maplibregl-canvas {
          outline: none;
        }
      `}</style>
    </div>
  );
}
