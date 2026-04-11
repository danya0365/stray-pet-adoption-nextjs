'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Pet } from '@/src/domain/Pet';
import { Button } from '@/src/presentation/components/ui/Button';
import { Badge } from '@/src/presentation/components/ui/Badge';
import { GlassCard } from '@/src/presentation/components/ui/GlassCard';
import { MetricCard } from '@/src/presentation/components/ui/MetricCard';
import { HeroHeader } from '@/src/presentation/components/shared/HeroHeader';
import { cn } from '@/src/application/utils/ui';
import Link from 'next/link';
import { ChevronLeft, Share2, Heart, Shield, Info, Activity } from 'lucide-react';
import Image from 'next/image';

interface PetDetailViewProps {
  id: string;
  initialViewModel: {
    pet: Pet;
    metrics: {
      label: string;
      value: string | number;
      unit: string;
      delay?: string;
    }[];
  };
}

/**
 * PetDetailView
 * หน้ารายละเอียดสัตว์เลี้ยงสไตล์ iOS 26 Liquid Glass
 * เน้นความสะอาดตา การใช้ Glassmorphism และความลื่นไหลของ Animation
 */
export const PetDetailView: React.FC<PetDetailViewProps> = ({ initialViewModel }) => {
  const { pet, metrics } = initialViewModel;

  return (
    <div className="w-full px-4 md:px-10 py-10 pb-32 flex flex-col gap-10">
      
      {/* Top Breadcrumb & Navigation */}
      <nav className="flex items-center justify-between mb-2 animate-float-in">
        <div className="flex items-center gap-3">
          <Link href="/" className="pressable p-2 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border-muted)] hover:bg-[var(--color-border-muted)] transition-colors">
            <ChevronLeft size={24} className="text-[var(--color-text-primary)]" />
          </Link>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] opacity-60">Adoption Detail</span>
            <span className="text-sm font-semibold text-[var(--color-text-primary)] opacity-80">หน้าแรก / รายละเอียดน้อง{pet.type === 'Dog' ? 'สุนัข' : 'แมว'}</span>
          </div>
        </div>
        <div className="flex gap-2">
           <button className="pressable p-3 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border-muted)] hover:bg-[var(--color-border-muted)] transition-colors">
              <Share2 size={20} className="text-[var(--color-text-secondary)]" />
           </button>
           <button className="pressable p-3 rounded-2xl bg-[var(--color-surface-elevated)] border border-[var(--color-border-muted)] hover:bg-[var(--color-border-muted)] transition-colors group">
              <Heart size={20} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-ios-red)] transition-colors" />
           </button>
        </div>
      </nav>

      {/* Hero Header Section */}
      <HeroHeader 
        subtitle="Pet Adoption Kit"
        title={<>น้อง <span className="text-[var(--color-ios-blue)] font-black">{pet.name}</span>.. <br /><span className="font-extralight opacity-60 underline decoration-[var(--color-ios-blue)] decoration-[3px] underline-offset-[12px]">ต้องการบ้านที่อบอุ่น</span></>}
        metrics={metrics}
      />

      {/* Main Content Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Interactive Image Card */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlassCard className="p-3 bg-white/5 border-white/10 overflow-hidden group">
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden">
                <Image 
                  src={pet.image} 
                  alt={pet.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
                <div className="absolute top-6 left-6 flex gap-2">
                   <Badge label={pet.status === 'Available' ? 'พร้อมย้ายบ้าน' : 'ติดจอง'} type={pet.status === 'Available' ? 'green' : 'orange'} />
                   <Badge label={pet.breed} type="blue" />
                </div>
              </div>
            </GlassCard>
          </motion.div>
          
          {/* Quick Info row for Mobile (Hidden on Desktop) */}
          <section className="flex lg:hidden overflow-x-auto gap-4 py-2 no-scrollbar">
            {metrics.map((metric, i) => (
               <MetricCard 
                key={i}
                label={metric.label}
                value={metric.value}
                unit={metric.unit}
                className="min-w-[140px]"
               />
            ))}
          </section>
        </section>

        {/* Right: Info & Story */}
        <section className="lg:col-span-5 flex flex-col gap-8 animate-float-in" style={{ animationDelay: '0.4s' }}>
          
          {/* Story & Description Card */}
          <GlassCard className="p-8 flex flex-col gap-6">
            <div className="flex items-center gap-3">
               <div className="p-3 rounded-2xl bg-[var(--color-ios-blue)]/10 text-[var(--color-ios-blue)]">
                  <Shield size={24} />
               </div>
               <h3 className="text-xl font-bold tracking-tight">เรื่องราวของ{pet.name}</h3>
            </div>
            
            <p className="text-lg font-light leading-relaxed text-[var(--color-text-primary)] opacity-90 tracking-wide">
              "{pet.description || 'ยังไม่มีข้อมูลเรื่องราวของน้องในขณะนี้'}"
            </p>

            <div className="pt-4 border-t border-[var(--color-border-muted)] flex flex-col gap-4">
               <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                 <Activity size={18} />
                 <span className="text-sm font-medium">สุขภาพ: ฉีดวัคซีนแล้ว / ทำหมันแล้ว</span>
               </div>
               <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                 <Info size={18} />
                 <span className="text-sm font-medium">นิสัย: ร่าเริง, เข้ากับเด็กได้ดี</span>
               </div>
            </div>
          </GlassCard>

          {/* Call to Action Section */}
          <div className="flex flex-col gap-4 pt-4">
            <Link href={`/pets/${pet.id}/apply`} className="w-full">
              <Button variant="primary" fullWidth className="py-6 text-xl font-black shadow-[0_20px_40px_-10px_rgba(0,122,255,0.4)]">
                เริ่มต้นส่งใบสมัครรับเลี้ยง
              </Button>
            </Link>
            <div className="flex gap-4">
              <Button variant="secondary" fullWidth className="py-4 font-bold opacity-80">
                สอบถามข้อมูลเพิ่ม
              </Button>
              <Button variant="secondary" className="px-5 py-4">
                <Heart size={24} />
              </Button>
            </div>
            <p className="text-[10px] text-center opacity-40 uppercase tracking-[2px] mt-2">
               การรับเลี้ยงไม่มีค่าใช้จ่าย แต่จะมีการสัมภาษณ์ความพร้อม
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};
