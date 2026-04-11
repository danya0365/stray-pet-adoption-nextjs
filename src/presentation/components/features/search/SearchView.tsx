'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, SlidersHorizontal, ArrowUpDown, SearchX, Map as MapIcon } from 'lucide-react';
import { GlassCard } from '@/src/presentation/components/ui/GlassCard';
import { Button } from '@/src/presentation/components/ui/Button';
import { SegmentedControl } from '@/src/presentation/components/ui/SegmentedControl';
import { Slider } from '@/src/presentation/components/ui/Slider';
import { PetCard } from '../pet-adoption/PetCard';
import { LocationPickerModal } from '../../shared/LocationPickerModal';
import { SearchViewModel } from '@/src/presentation/presenters/search/SearchPresenter';
import { useSearchPresenter } from '@/src/presentation/presenters/search/useSearchPresenter';
import { formatDistance } from '@/src/application/utils/location';
import Link from 'next/link';

interface SearchViewProps {
  initialViewModel: SearchViewModel;
}

/**
 * SearchView - Client Component
 * แสดงหน้าจอค้นหาขั้นสูง โดยใช้ Presenter Pattern
 * ปรับปรุง UI ให้พรีเมียมและรองรับ Dark Mode 100%
 */
export default function SearchView({ initialViewModel }: SearchViewProps) {
  const { 
    viewModel, 
    filters, 
    loading, 
    updateFilter, 
    handleLocationConfirm 
  } = useSearchPresenter(initialViewModel);

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-10 py-10 pb-32 flex flex-col gap-12">
      
      {/* --- Search Engine Header --- */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
           <h1 className="text-4xl md:text-6xl font-[1000] tracking-tight text-[var(--color-text-primary)]">
             ค้นหา<span className="text-[var(--color-ios-blue)]">เพื่อนใหม่</span>..
           </h1>
           <p className="text-xl font-medium text-[var(--color-text-secondary)] max-w-2xl leading-relaxed">
             ระบุเงื่อนไขที่ต้องการ แล้วให้เราช่วยหาบ้านที่ใช่ที่สุดสำหรับคุณและน้องๆ
           </p>
        </div>

        {/* --- Main Search Bar (Liquid Glass v2) --- */}
        <div className="relative z-10">
           <div className="flex flex-col lg:flex-row items-stretch gap-4 p-2 rounded-[36px] bg-[var(--color-surface)] backdrop-blur-3xl border border-[var(--glass-border)] shadow-2xl shadow-black/5">
              
              {/* Keyword Input Container */}
              <div className="flex-1 glass-input-container !bg-transparent !border-none !shadow-none !rounded-none">
                 <div className="flex items-center w-full px-6 gap-4">
                    <Search className="text-[var(--color-ios-blue)] shrink-0" size={24} />
                    <input 
                       type="text"
                       placeholder="ค้นหาชื่อ หรือ สายพันธุ์..."
                       className="w-full py-6 bg-transparent outline-none font-bold text-lg text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]"
                       value={filters.query}
                       onChange={(e) => updateFilter({ query: e.target.value })}
                    />
                 </div>
              </div>

              {/* Action Buttons Group */}
              <div className="flex flex-col sm:flex-row items-center gap-3 p-2">
                 {/* Location Picker Trigger */}
                 <button 
                   onClick={() => setIsLocationModalOpen(true)}
                   className="w-full sm:w-auto flex items-center gap-4 px-6 py-4 rounded-[28px] bg-[var(--color-ios-blue)]/10 hover:bg-[var(--color-ios-blue)]/15 border border-[var(--color-ios-blue)]/20 transition-all group pressable"
                 >
                    <div className="w-10 h-10 rounded-2xl bg-[var(--color-ios-blue)] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[var(--color-ios-blue)]/30">
                       <MapPin size={20} />
                    </div>
                    <div className="flex flex-col items-start min-w-[140px] text-left">
                       <span className="text-[10px] font-black uppercase tracking-widest text-[var(--color-ios-blue)]">พื้นที่การค้นหา</span>
                       <span className="text-sm font-bold text-[var(--color-text-primary)] truncate max-w-[180px]">
                           {filters.latitude ? 'ระบุพิกัดส่วนตัวแล้ว' : 'ทั่วประเทศไทย'}
                       </span>
                    </div>
                 </button>

                 <div className="hidden sm:block h-10 w-[1px] bg-[var(--color-border-muted)] mx-2" />

                 {/* Advanced Filter Toggle */}
                 <button 
                   onClick={() => setShowAdvanced(!showAdvanced)}
                   className={`w-full sm:w-auto px-6 py-4 rounded-[28px] flex items-center justify-center gap-3 transition-all pressable ${showAdvanced ? 'bg-[var(--color-ios-blue)] text-white' : 'bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] border border-[var(--glass-border)]'}`}
                 >
                    <SlidersHorizontal size={22} />
                    <span className="font-bold text-sm">ตัวกรอง</span>
                 </button>
              </div>
           </div>
        </div>

        {/* --- Advanced Filter Drawer --- */}
        <AnimatePresence>
           {showAdvanced && (
              <motion.div
                initial={{ height: 0, opacity: 0, scale: 0.95 }}
                animate={{ height: 'auto', opacity: 1, scale: 1 }}
                exit={{ height: 0, opacity: 0, scale: 0.95 }}
                className="overflow-hidden"
              >
                 <GlassCard className="p-10 border-[var(--glass-border)] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-2">
                    <div className="flex flex-col gap-4">
                       <label className="section-label !mb-0">ประเภทของน้อง</label>
                       <SegmentedControl 
                         options={['All', 'Dog', 'Cat']} 
                         value={filters.type} 
                         onChange={(v) => updateFilter({ type: v })} 
                       />
                    </div>

                    <div className="flex flex-col gap-4">
                       <Slider 
                         label="รัศมีการค้นหา (กม.)"
                         value={filters.radius}
                         min={1}
                         max={100}
                         onChange={(v) => updateFilter({ radius: v })}
                       />
                       <div className="flex justify-between px-1 text-[10px] font-black text-[var(--color-text-muted)] mt-[-8px]">
                          <span>1 KM</span>
                          <span>100 KM</span>
                       </div>
                    </div>

                    <div className="flex flex-col gap-4">
                       <label className="section-label !mb-0">สายพันธุ์ที่ต้องการ</label>
                       <div className="relative group">
                          <select 
                             className="w-full p-4 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border-muted)] outline-none font-bold text-sm text-[var(--color-text-primary)] appearance-none cursor-pointer focus:border-[var(--color-ios-blue)] transition-all"
                             value={filters.breed}
                             onChange={(e) => updateFilter({ breed: e.target.value })}
                          >
                             <option value="All">ทั้งหมด</option>
                             {viewModel?.breeds.map(b => <option key={b} value={b}>{b}</option>)}
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                             <ArrowUpDown size={14} />
                          </div>
                       </div>
                    </div>

                    <div className="flex items-end pb-1 lg:col-span-1">
                       <div className="flex items-center gap-3 p-4 px-6 rounded-2xl bg-[var(--color-ios-blue)]/5 border border-dashed border-[var(--color-ios-blue)]/20 text-xs font-bold text-[var(--color-ios-blue)]">
                          <ArrowUpDown size={14} />
                          {filters.latitude ? 'กำลังเรียงตามระยะใกล้ไปไกล' : 'กำลังเรียงตามประกาศล่าสุด'}
                       </div>
                    </div>
                 </GlassCard>
              </motion.div>
           )}
        </AnimatePresence>
      </section>

      {/* --- Results Section --- */}
      <section className="flex flex-col gap-8 min-h-[400px]">
         <div className="flex items-center justify-between px-2">
            <h2 className="text-xs font-black uppercase tracking-[3px] text-[var(--color-text-muted)]">
                พบเพื่อนใหม่ <span className="text-[var(--color-text-primary)]">({viewModel?.totalCount || 0})</span> รายการ
            </h2>
            
            <div className="flex items-center gap-4">
               {loading && <div className="text-[var(--color-ios-blue)] font-black animate-pulse text-xs tracking-widest uppercase items-center flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-ios-blue)] animate-ping" />
                  Searching...
               </div>}
               
               <Link href="/map" className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-ios-blue)]/10 hover:bg-[var(--color-ios-blue)] text-[var(--color-ios-blue)] hover:text-white transition-all pressable border border-[var(--color-ios-blue)]/20">
                  <MapIcon size={16} />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Map Mode</span>
               </Link>
            </div>
         </div>

         {!loading && viewModel?.pets.length === 0 ? (
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex flex-col items-center justify-center py-24 gap-8 text-center"
            >
               <div className="w-24 h-24 rounded-full bg-[var(--color-surface-elevated)] flex items-center justify-center text-[var(--color-text-muted)] shadow-inner">
                  <SearchX size={48} />
               </div>
               <div className="flex flex-col gap-3">
                  <h3 className="text-3xl font-black text-[var(--color-text-primary)]">ไม่พบเพื่อนที่ถูกใจ..</h3>
                  <p className="max-w-md text-[var(--color-text-secondary)] font-medium leading-relaxed">
                    ลองปรับตัวกรอง ขยายรัศมีการค้นหา หรือเปลี่ยนพิกัดดูอีกครั้งนะครับ น้องๆ อาจจะกำลังรอคุณอยู่ในพื้นที่ใกล้เคียงก็ได้นะ!
                  </p>
               </div>
               <Button variant="secondary" onClick={() => updateFilter({ query: '', type: 'All', breed: 'All', radius: 100 })}>
                  ล้างตัวกรองและลองใหม่
               </Button>
            </motion.div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               <AnimatePresence mode="popLayout">
                  {viewModel?.pets.map((pet, i) => (
                    <motion.div
                      layout
                      key={pet.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: Math.min(i * 0.05, 0.4),
                        ease: [0.23, 1, 0.32, 1] 
                      }}
                    >
                       <PetCard 
                         id={pet.id}
                         name={pet.name}
                         type={pet.type}
                         breed={pet.breed}
                         image={pet.image}
                         distance={pet.distance ? formatDistance(pet.distance) : undefined}
                       />
                    </motion.div>
                  ))}
               </AnimatePresence>
            </div>
         )}
      </section>

      <LocationPickerModal 
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onConfirm={handleLocationConfirm}
        initialLocation={filters.latitude && filters.longitude ? { latitude: filters.latitude, longitude: filters.longitude } : undefined}
      />
    </div>
  );
}
