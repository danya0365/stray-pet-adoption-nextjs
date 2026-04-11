'use client';

import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Map, { Marker, Popup, NavigationControl, FullscreenControl, MapRef, ViewStateChangeEvent } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Pet } from '@/src/domain/Pet';
import { MapViewModel } from '@/src/presentation/presenters/map/MapPresenter';
import { GlassCard } from '@/src/presentation/components/ui/GlassCard';
import { Badge } from '@/src/presentation/components/ui/Badge';
import { Button } from '@/src/presentation/components/ui/Button';
import { Slider } from '@/src/presentation/components/ui/Slider';
import { SegmentedControl } from '@/src/presentation/components/ui/SegmentedControl';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Info, ArrowRight, Crosshair, ChevronUp, ChevronDown, List, Dog, Cat } from 'lucide-react';
import { LocationPickerModal, SelectedLocation } from '@/src/presentation/components/shared/LocationPickerModal';
import { calculateDistance, formatDistance } from '@/src/application/utils/location';
import { cn } from '@/src/application/utils/ui';

interface PetMapViewProps {
  initialViewModel: MapViewModel;
}

/**
 * PetMapView v2 (Smart Explorer)
 * ระบบแผนที่อัจฉริยะ พร้อมการคำนวณระยะทางและการกรองขั้นสูง
 */
export default function PetMapView({ initialViewModel }: PetMapViewProps) {
  const { pets, center, zoom } = initialViewModel;
  
  // State Management
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [userLocation, setUserLocation] = useState<SelectedLocation | null>(null);
  const [radius, setRadius] = useState(20); // 20km default
  const [selectedType, setSelectedType] = useState('All');
  const [showNearbyList, setShowNearbyList] = useState(false);
  const mapRef = useRef<MapRef>(null);

  // Logic: Calculate distance and filter pets
  const filteredPets = useMemo(() => {
    let results = pets.map(pet => {
      let distance = null;
      if (userLocation && pet.latitude && pet.longitude) {
        distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          pet.latitude,
          pet.longitude
        );
      }
      return { ...pet, distance };
    });

    // Filter by Type
    if (selectedType !== 'All') {
      results = results.filter(pet => pet.type === selectedType);
    }

    // Filter by Radius (If user location is set)
    if (userLocation) {
        results = results.filter(pet => {
           if (pet.distance === null) return true;
           return pet.distance <= radius;
        });
    }

    // Sort by Distance
    if (userLocation) {
        results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    }

    return results;
  }, [pets, userLocation, radius, selectedType]);

  const handleConfirmLocation = (location: SelectedLocation) => {
    setUserLocation(location);
    setIsPickerOpen(false);
    mapRef.current?.flyTo({
      center: [location.longitude, location.latitude],
      zoom: 13,
      duration: 2000
    });
  };

  return (
    <div className="w-full h-[calc(100vh-120px)] mt-4 relative overflow-hidden rounded-[40px] shadow-2xl border border-[var(--color-border-muted)] flex flex-col bg-[var(--color-surface)]">
      
      {/* --- Filter Control Overlays --- */}
      
      {/* Top Left: Search & User Location */}
      <div className="absolute top-6 left-6 z-20 w-80 pointer-events-none">
         <div className="pointer-events-auto flex flex-col gap-4">
            <GlassCard className="p-4 flex flex-col gap-3 shadow-2xl">
                <h3 className="font-bold flex items-center gap-2 text-sm">
                  <MapPin size={18} className="text-[var(--color-ios-blue)]" />
                  Smart Pet Map
                </h3>
                {userLocation ? (
                  <div className="flex flex-col gap-2 p-3 rounded-2xl bg-[var(--color-ios-blue)]/10 border border-[var(--color-ios-blue)]/20">
                     <span className="text-[9px] font-black uppercase tracking-widest text-[var(--color-ios-blue)]">จุดศุนย์กลางการค้นหา</span>
                     <p className="text-xs font-bold truncate leading-none text-[var(--color-text-primary)]">{userLocation.address}</p>
                     <button 
                        onClick={() => setIsPickerOpen(true)}
                        className="text-[10px] font-bold text-[var(--color-ios-blue)] hover:underline text-left mt-1"
                     >
                       เปลี่ยนตำแหน่ง
                     </button>
                  </div>
                ) : (
                  <Button 
                    variant="secondary" 
                    fullWidth 
                    className="py-2.5 text-xs gap-2"
                    onClick={() => setIsPickerOpen(true)}
                  >
                    <Crosshair size={14} /> ระบุตำแหน่งของคุณ
                  </Button>
                )}
            </GlassCard>

            {/* Radius Slider (Only shown if user location is set) */}
            <AnimatePresence>
              {userLocation && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <GlassCard className="p-5 flex flex-col gap-3">
                    <Slider 
                      label="รัศมีการค้นหา (กม.)"
                      value={radius}
                      min={1}
                      max={100}
                      onChange={setRadius}
                      className="metrics-slider"
                    />
                    <div className="flex justify-between text-[10px] font-bold opacity-40 uppercase tracking-wider">
                       <span>1 กม.</span>
                       <span>100 กม.</span>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
         </div>
      </div>

      {/* Top Center: Category Toggle */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 hidden md:block">
          <SegmentedControl 
            options={['All', 'Dog', 'Cat']} 
            value={selectedType} 
            onChange={setSelectedType}
            className="shadow-2xl scale-110"
          />
      </div>

      {/* Map Content */}
      <div className="flex-1 relative">
        <Map
          ref={mapRef}
          initialViewState={{
            longitude: center.lng,
            latitude: center.lat,
            zoom: zoom
          }}
          mapStyle="https://tiles.openfreemap.org/styles/liberty"
          style={{ width: '100%', height: '100%' }}
        >
          <NavigationControl position="bottom-right" />
          
          {/* User Location Marker */}
          {userLocation && (
            <Marker
              longitude={userLocation.longitude}
              latitude={userLocation.latitude}
              anchor="bottom"
            >
              <div className="relative">
                 <div className="absolute -inset-10 bg-[var(--color-ios-blue)]/10 rounded-full animate-pulse blur-xl" />
                 <div className="w-10 h-10 rounded-full bg-[var(--color-ios-blue)] border-4 border-white shadow-2xl flex items-center justify-center text-white relative z-10 transition-transform hover:scale-110">
                    <Crosshair size={20} />
                 </div>
              </div>
            </Marker>
          )}

          {/* Pet Markers */}
          {filteredPets.map((pet) => (
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
                 <div className="absolute -inset-4 bg-[var(--color-ios-blue)]/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity blur-md" />
                 <div className="w-12 h-12 rounded-full border-[3px] border-white shadow-xl overflow-hidden relative z-10 transition-all duration-500 group-hover:scale-125 group-hover:-translate-y-4">
                    <Image src={pet.image} alt={pet.name} fill className="object-cover" />
                 </div>
                 {pet.distance && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-[var(--color-ios-blue)] text-white text-[9px] font-black shadow-lg z-20">
                        {formatDistance(pet.distance)}
                    </div>
                 )}
              </div>
            </Marker>
          ))}

          {/* Premium Popup */}
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
                className="glass-thick rounded-[32px] overflow-hidden shadow-2xl border border-white/20"
              >
                 <div className="relative h-44 w-full">
                    <Image src={selectedPet.image} alt={selectedPet.name} fill className="object-cover" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                       <h4 className="text-xl font-black text-white tracking-tight">{selectedPet.name}</h4>
                       {/* Show distance in popup if available */}
                       {userLocation && (
                          <div className="flex items-center gap-1.5 text-xs text-white/80 font-bold">
                             <MapPin size={12} />
                             {formatDistance(calculateDistance(userLocation.latitude, userLocation.longitude, selectedPet.latitude!, selectedPet.longitude!))}
                          </div>
                       )}
                    </div>
                    <div className="absolute top-4 right-4">
                       <Badge label={selectedPet.type === 'Dog' ? 'สุนัข' : 'แมว'} type={selectedPet.type === 'Dog' ? 'blue' : 'green'} />
                    </div>
                 </div>
                 <div className="p-5 flex flex-col gap-4">
                    <Link href={`/pets/${selectedPet.id}`} className="block">
                       <Button variant="primary" fullWidth className="py-4 text-sm font-black gap-2">
                          ดูรายละเอียด <ArrowRight size={18} />
                       </Button>
                    </Link>
                 </div>
              </motion.div>
            </Popup>
          )}
        </Map>
      </div>

      {/* --- Nearby List Bottom Drawer --- */}
      <AnimatePresence>
         {filteredPets.length > 0 && (
            <motion.div
              layout
              className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none"
            >
               <div className="max-w-4xl mx-auto w-full px-6 pb-6 pointer-events-auto">
                   <GlassCard className="flex flex-col overflow-hidden max-h-80 shadow-[var(--glass-shadow-elevated)]">
                     <button 
                        onClick={() => setShowNearbyList(!showNearbyList)}
                        className="w-full py-4 flex items-center justify-between px-6 hover:bg-[var(--color-border-muted)] transition-colors group"
                     >
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-2xl bg-[var(--color-ios-blue)]/10 text-[var(--color-ios-blue)] flex items-center justify-center">
                              <List size={20} />
                           </div>
                           <div className="flex flex-col items-start translate-y-[-1px]">
                              <span className="text-sm font-black tracking-tight text-[var(--color-text-primary)]">น้องๆ ในละแวกนี้ ({filteredPets.length})</span>
                              <span className="text-[10px] text-[var(--color-text-secondary)] opacity-60 font-bold uppercase tracking-wider">อิงจากตัวกรองปัจจุบันของคุณ</span>
                           </div>
                        </div>
                        {showNearbyList ? <ChevronDown size={20} className="opacity-40" /> : <ChevronUp size={20} className="opacity-40 group-hover:animate-bounce" />}
                     </button>

                     <AnimatePresence>
                        {showNearbyList && (
                           <motion.div 
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                           >
                              <div className="p-4 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto max-h-60 no-scrollbar">
                                 {filteredPets.map((pet) => (
                                    <div 
                                      key={pet.id}
                                      onClick={() => {
                                        setSelectedPet(pet);
                                        mapRef.current?.flyTo({ center: [pet.longitude!, pet.latitude!], zoom: 15 });
                                      }}
                                      className="pressable p-3 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border-muted)] hover:bg-[var(--color-border-muted)] flex items-center gap-4 cursor-pointer"
                                    >
                                       <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 shadow-lg">
                                          <Image src={pet.image} alt={pet.name} fill className="object-cover" />
                                       </div>
                                       <div className="flex flex-col min-w-0 flex-1">
                                          <span className="text-sm font-bold truncate text-[var(--color-text-primary)]">{pet.name}</span>
                                          <span className="text-[10px] text-[var(--color-text-secondary)] font-medium truncate">{pet.breed}</span>
                                          {pet.distance && (
                                             <div className="flex items-center gap-1 mt-1 text-[10px] text-[var(--color-ios-blue)] font-black">
                                                <MapPin size={10} />
                                                {formatDistance(pet.distance)}
                                             </div>
                                          )}
                                       </div>
                                       <div className="ml-auto shrink-0">
                                          <Badge label={pet.type === 'Dog' ? 'หมา' : 'แมว'} type={pet.type === 'Dog' ? 'blue' : 'green'} className="scale-75 origin-right" />
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </GlassCard>
               </div>
            </motion.div>
         )}
      </AnimatePresence>

      {/* Location Picker Modal */}
      <LocationPickerModal 
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onConfirm={handleConfirmLocation}
        initialLocation={userLocation ? { latitude: userLocation.latitude, longitude: userLocation.longitude } : undefined}
      />

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
