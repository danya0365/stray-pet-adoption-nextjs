'use client';

import React, { useCallback, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Map, { Marker, NavigationControl, MapRef, ViewStateChangeEvent, MapLayerMouseEvent } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Loader2, MapPin, Navigation, X, Check, Search, Info } from 'lucide-react';
import { GlassCard } from '@/src/presentation/components/ui/GlassCard';
import { Button } from '@/src/presentation/components/ui/Button';
import { Badge } from '@/src/presentation/components/ui/Badge';

export interface SelectedLocation {
  latitude: number;
  longitude: number;
  address: string;
}

interface LocationPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (location: SelectedLocation) => void;
  initialLocation?: { latitude: number; longitude: number };
}

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";
const THAILAND_CENTER = { latitude: 13.7563, longitude: 100.5018 };

/**
 * LocationPickerModal
 * คอมโพเนนต์ Pure UI สำหรับเลือกตำแหน่งบนแผนที่
 * เน้นความสวยงามสไตล์ iOS 26 Liquid Glass และความลื่นไหล
 */
export const LocationPickerModal: React.FC<LocationPickerModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialLocation,
}) => {
  const mapRef = useRef<MapRef>(null);

  const [viewState, setViewState] = useState({
    longitude: initialLocation?.longitude ?? THAILAND_CENTER.longitude,
    latitude: initialLocation?.latitude ?? THAILAND_CENTER.latitude,
    zoom: initialLocation ? 14 : 11,
  });

  const [selected, setSelected] = useState<SelectedLocation | null>(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  // เตรียมค่าเริ่มต้นเมื่อเปิด Modal
  useEffect(() => {
    if (isOpen && initialLocation) {
        setViewState({
            ...initialLocation,
            zoom: 14
        });
        setSelected({
            latitude: initialLocation.latitude,
            longitude: initialLocation.longitude,
            address: "ตำแหน่งเป้าหมาย"
        });
        // ทำการค้นหาที่อยู่จริงเมื่อเปิดมาเจอพิกัด
        reverseGeocode(initialLocation.latitude, initialLocation.longitude).then(addr => {
            setSelected(prev => prev ? { ...prev, address: addr } : null);
        });
    }
  }, [isOpen]);

  const reverseGeocode = useCallback(async (lat: number, lng: number): Promise<string> => {
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=th`
      );
      if (res.ok) {
        const data = await res.json();
        return (
          data.locality ||
          data.city ||
          data.principalSubdivision ||
          `${lat.toFixed(4)}, ${lng.toFixed(4)}`
        );
      }
    } catch (e) {
      console.error("Geocoding error:", e);
    }
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  }, []);

  const handleMapClick = useCallback(async (e: MapLayerMouseEvent) => {
    const lat = e.lngLat.lat;
    const lng = e.lngLat.lng;

    setSelected({ latitude: lat, longitude: lng, address: "กำลังโหลด..." });

    const address = await reverseGeocode(lat, lng);
    setSelected({ latitude: lat, longitude: lng, address });
  }, [reverseGeocode]);

  const handleUseCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setGeoError("เบราว์เซอร์ไม่รองรับ GPS");
      return;
    }

    setLocating(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        setViewState((prev) => ({ ...prev, latitude, longitude, zoom: 14 }));
        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: 14,
          duration: 1500,
        });

        setSelected({ latitude, longitude, address: "กำลังโหลด..." });
        const address = await reverseGeocode(latitude, longitude);
        setSelected({ latitude, longitude, address });
        setLocating(false);
      },
      (err) => {
        setLocating(false);
        setGeoError(err.message || "ระบุตำแหน่งไม่สำเร็จ");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [reverseGeocode]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 overflow-hidden">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl h-full max-h-[850px] glass-thick rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col overflow-hidden"
          >
            
            {/* Header */}
            <div className="px-8 py-6 flex items-center justify-between border-b border-white/10">
              <div className="flex flex-col">
                 <h2 className="text-2xl font-black tracking-tight">ปักหมุดตำแหน่ง</h2>
                 <p className="text-sm opacity-50 font-medium whitespace-nowrap overflow-hidden text-ellipsis">เลือกพื้นที่ที่คุณต้องการสำรวจน้องๆ</p>
              </div>
              <button 
                onClick={onClose}
                className="pressable p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* Left Panel: Info & Tools */}
              <aside className="w-full md:w-80 flex flex-col gap-6 p-8 border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto no-scrollbar">
                
                {/* GPS Button */}
                <button
                  onClick={handleUseCurrentLocation}
                  disabled={locating}
                  className="pressable flex items-center gap-4 p-5 rounded-3xl bg-[var(--color-ios-blue)] text-white shadow-[0_10px_25px_rgba(0,122,255,0.3)] disabled:opacity-50"
                >
                  <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                    {locating ? <Loader2 size={24} className="animate-spin" /> : <Navigation size={22} />}
                  </div>
                  <div className="flex flex-col items-start translate-y-[-1px]">
                     <span className="text-sm font-black tracking-tight">ตำแหน่งปัจจุบัน</span>
                     <span className="text-[10px] opacity-70 font-semibold uppercase tracking-wider">ใช้ GPS อัตโนมัติ</span>
                  </div>
                </button>

                {geoError && (
                  <div className="p-3 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold animate-shake">
                    {geoError}
                  </div>
                )}

                <div className="p-4 rounded-3xl bg-white/5 border border-white/5 flex gap-3 text-sm font-semibold opacity-60">
                   <Info size={16} className="shrink-0 mt-0.5" />
                   <span>แตะบนแผนที่เพื่อเลือกตำแหน่งที่ต้องการ</span>
                </div>

                {/* Selection Details */}
                <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
                  <div className="text-[10px] font-black uppercase tracking-[2px] opacity-30">Selected Location</div>
                  
                  <GlassCard className={`p-5 flex flex-col gap-3 transition-opacity duration-300 ${selected ? 'opacity-100' : 'opacity-40'}`}>
                    <div className="flex items-center gap-3 text-[var(--color-ios-blue)]">
                       <MapPin size={24} />
                       <span className="text-sm font-black tracking-tight">จุดพิกัดของคุณ</span>
                    </div>
                    {selected ? (
                      <div className="flex flex-col gap-1">
                        <p className="text-lg font-bold leading-tight">{selected.address}</p>
                        <p className="text-[10px] opacity-40 font-mono tracking-tighter">
                          {selected.latitude.toFixed(6)}, {selected.longitude.toFixed(6)}
                        </p>
                      </div>
                    ) : (
                        <p className="text-sm italic opacity-50">กรุณาปักหมุดบนแผนที่</p>
                    )}
                  </GlassCard>
                </div>
              </aside>

              {/* Right Panel: Map */}
              <main className="flex-1 relative bg-zinc-900 border-none outline-none overflow-hidden">
                <Map
                  ref={mapRef}
                  {...viewState}
                  onMove={(evt: ViewStateChangeEvent) => setViewState(evt.viewState)}
                  mapStyle={MAP_STYLE}
                  style={{ width: '100%', height: '100%' }}
                  onClick={handleMapClick}
                  cursor="crosshair"
                >
                  <NavigationControl position="bottom-right" />
                  
                  {selected && (
                    <Marker
                      latitude={selected.latitude}
                      longitude={selected.longitude}
                      anchor="bottom"
                    >
                      <motion.div 
                        initial={{ scale: 0, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="relative"
                      >
                         <div className="absolute -inset-4 bg-[var(--color-ios-blue)]/20 rounded-full animate-ping" />
                         <div className="w-10 h-10 rounded-full bg-[var(--color-ios-blue)] border-4 border-white shadow-2xl flex items-center justify-center text-white relative z-10">
                            <MapPin size={20} fill="currentColor" />
                         </div>
                      </motion.div>
                    </Marker>
                  )}
                </Map>
              </main>
            </div>

            {/* Footer */}
            <footer className="px-8 py-6 bg-white/5 backdrop-blur-md border-t border-white/10 flex items-center justify-end gap-4">
               <button 
                 onClick={onClose}
                 className="px-6 py-4 rounded-2xl font-bold opacity-50 hover:opacity-100 transition-opacity"
               >
                 ยกเลิก
               </button>
               <Button 
                 variant="primary" 
                 disabled={!selected}
                 onClick={() => selected && onConfirm(selected)}
                 className="px-8 py-4 text-base font-black gap-2 shadow-[0_10px_20px_rgba(0,122,255,0.3)] disabled:opacity-30"
               >
                 ยืนยันตำแหน่ง <Check size={20} />
               </Button>
            </footer>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
