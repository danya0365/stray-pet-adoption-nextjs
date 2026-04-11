'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Heart, Home, User, CheckCircle2, ArrowLeft, Send } from 'lucide-react';
import { GlassCard } from '@/src/presentation/components/ui/GlassCard';
import { Button } from '@/src/presentation/components/ui/Button';
import { Input } from '@/src/presentation/components/ui/Input';
import { SegmentedControl } from '@/src/presentation/components/ui/SegmentedControl';
import { useAdoptionPresenter, AdoptionStep } from '@/src/presentation/presenters/adoption/useAdoptionPresenter';
import { Pet } from '@/src/domain/Pet';
import { cn } from '@/src/application/utils/ui';
import Link from 'next/link';
import Image from 'next/image';

interface AdoptionRequestViewProps {
  pet: Pet;
}

export default function AdoptionRequestView({ pet }: AdoptionRequestViewProps) {
  const {
    currentStep,
    formData,
    loading,
    nextStep,
    prevStep,
    updateField,
    submit,
  } = useAdoptionPresenter(pet.id, pet.name);

  // --- Components ---

  const ProgressBar = () => (
    <div className="flex items-center justify-between w-full max-w-sm mx-auto mb-12 relative px-2">
      {/* Background Line: Aligned with center of icons (w-12 icons means 24px/6rem radius) */}
      <div className="absolute top-1/2 left-6 right-6 h-[1.5px] bg-black/10 dark:bg-white/10 -translate-y-1/2 z-0" />
      
      {/* Active Line: Proportional width based on track length */}
      <motion.div 
        className="absolute top-1/2 left-6 h-[2px] bg-[var(--color-ios-blue)] -translate-y-1/2 z-0 shadow-[0_0_12px_var(--color-ios-blue)]"
        initial={{ width: '0%' }}
        animate={{ width: `calc(${((currentStep - 1) / 2) * 100}% - ${((currentStep - 1) / 2) * 0}px)` }}
        style={{ width: `calc(${((currentStep - 1) / 2)} * (100% - 48px))` }}
      />
      
      {[1, 2, 3].map((s) => {
        const isActive = currentStep === s;
        const isCompleted = currentStep > s;
        return (
          <div key={s} className="relative z-10">
            <motion.div 
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-500",
                isActive 
                  ? "bg-[var(--color-ios-blue)] border-[var(--color-ios-blue)] text-white shadow-[0_0_20px_rgba(0,122,255,0.4)]" 
                  : isCompleted
                    ? "bg-[var(--color-ios-blue)]/10 border-[var(--color-ios-blue)]/20 text-[var(--color-ios-blue)]" 
                    : "bg-white dark:bg-[#2c2c2e] border-slate-200 dark:border-white/5 text-slate-300 dark:text-white/20"
              )}
              animate={{ 
                scale: isActive ? 1.1 : 1,
                y: isActive ? -1 : 0
              }}
            >
                {isCompleted ? (
                  <CheckCircle2 size={24} strokeWidth={2.5} />
                ) : (
                  <>
                    {s === 1 && <User size={20} strokeWidth={2.5} />}
                    {s === 2 && <Home size={20} strokeWidth={2.5} />}
                    {s === 3 && <Heart size={20} strokeWidth={2.5} />}
                  </>
                )}
            </motion.div>
          </div>
        );
      })}
    </div>
  );

  const Step1 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6"
    >
      <div className="space-y-1">
         <h2 className="text-3xl font-black tracking-tight text-[var(--color-text-primary)]">ข้อมูลผู้สมัคร</h2>
         <p className="font-medium text-[var(--color-text-secondary)] opacity-80">แนะนำตัวให้เรารู้จักคุณหน่อยนะครับ</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-4">
        <Input 
          label="ชื่อ-นามสกุล"
          placeholder="นายใจดี มีเมตตา"
          value={formData.applicantName}
          onChange={(e) => updateField('applicantName', e.target.value)}
          icon={<User />}
        />
        <Input 
          label="เบอร์โทรศัพท์"
          placeholder="081-234-5678"
          value={formData.applicantPhone}
          onChange={(e) => updateField('applicantPhone', e.target.value)}
          icon={<Send />}
        />
        <Input 
          label="อีเมล"
          placeholder="jai-dee@email.com"
          value={formData.applicantEmail}
          onChange={(e) => updateField('applicantEmail', e.target.value)}
        />
        <Input 
          label="อาชีพ"
          placeholder="พนักงานอิสระ / เจ้าของธุรกิจ"
          value={formData.applicantOccupation}
          onChange={(e) => updateField('applicantOccupation', e.target.value)}
        />
      </div>
    </motion.div>
  );

  const Step2 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-8"
    >
      <div className="space-y-1">
         <h2 className="text-3xl font-black tracking-tight text-[var(--color-text-primary)]">สภาพแวดล้อม</h2>
         <p className="font-medium text-[var(--color-text-secondary)] opacity-80">พื้นที่ที่จะให้น้องเข้าไปอยู่เป็นอย่างไรครับ?</p>
      </div>

      <div className="space-y-4">
         <span className="section-label mb-0 text-[10px] pl-1 tracking-wider opacity-60 font-bold uppercase">ประเภทที่อยู่อาศัย</span>
         <SegmentedControl 
            options={['House', 'Condo', 'Apartment', 'Other']}
            value={formData.homeType || 'House'}
            onChange={(v) => updateField('homeType', v)}
            className="h-14"
         />
      </div>

      <div className="flex items-center justify-between p-8 rounded-[32px] bg-[var(--glass-bg)] border border-[var(--color-border-muted)] shadow-[var(--glass-shadow)]">
         <div className="space-y-1">
            <h4 className="font-bold text-lg text-[var(--color-text-primary)]">ปัจจุบันมีสัตว์เลี้ยงอื่นไหม?</h4>
            <p className="text-sm text-[var(--color-text-secondary)] opacity-80">เพื่อดูความเข้ากันได้ของน้องๆ</p>
         </div>
         <div className="flex bg-[rgba(120,120,128,0.12)] p-1 rounded-2xl">
            <button 
              onClick={() => updateField('hasOtherPets', true)}
              className={cn(
                "px-8 py-3 rounded-xl font-bold transition-all text-sm",
                formData.hasOtherPets ? "bg-white dark:bg-white/20 shadow-sm text-[var(--color-ios-blue)]" : "text-[var(--color-text-secondary)] opacity-60"
              )}
            >
              มี
            </button>
            <button 
               onClick={() => updateField('hasOtherPets', false)}
               className={cn(
                "px-8 py-3 rounded-xl font-bold transition-all text-sm",
                !formData.hasOtherPets ? "bg-white dark:bg-white/20 shadow-sm text-[var(--color-ios-blue)]" : "text-[var(--color-text-secondary)] opacity-60"
              )}
            >
               ไม่มี
            </button>
         </div>
      </div>
    </motion.div>
  );

  const Step3 = () => (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col gap-6"
    >
      <div className="space-y-1">
         <h2 className="text-3xl font-black tracking-tight text-[var(--color-text-primary)]">ความพร้อมและเหตุผล</h2>
         <p className="font-medium text-[var(--color-text-secondary)] opacity-80">เหตุผลสุดท้ายที่ทำให้คุณอยากพาน้องกลับบ้าน</p>
      </div>

      <div className="mt-4">
        <Input 
          label="เหตุผลในการรับเลี้ยง"
          multiline
          rows={6}
          placeholder="เช่น อยากให้น้องมาเป็นเพื่อนที่บ้าน มีความพร้อมด้านสถานที่และเวลา..."
          value={formData.reason}
          onChange={(e) => updateField('reason', e.target.value)}
        />
      </div>
    </motion.div>
  );

  const Success = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-10 gap-8"
    >
       <div className="w-24 h-24 rounded-full bg-[var(--color-ios-green)]/10 text-[var(--color-ios-green)] flex items-center justify-center shadow-2xl shadow-[var(--color-ios-green)]/20">
          <CheckCircle2 size={56} strokeWidth={2.5} />
       </div>
       <div className="space-y-2 px-6">
          <h2 className="text-3xl font-black tracking-tight">ส่งคำขอเรียบร้อย!</h2>
          <p className="text-md text-[var(--color-text-secondary)] font-medium leading-relaxed max-w-sm mx-auto">
             เราได้รับคำขอของคุณเรียบร้อยแล้ว เจ้าหน้าที่จะทำการตรวจสอบข้อมูลและติดต่อกลับหาคุณโดยเร็วที่สุดครับ
          </p>
       </div>
       <div className="flex flex-col w-full gap-3 pt-4">
          <Link href="/map" className="w-full">
            <Button fullWidth className="py-4 rounded-2xl font-black uppercase tracking-widest text-sm">กลับสู่หน้าแผนที่</Button>
          </Link>
          <Link href="/" className="w-full">
             <Button variant="secondary" fullWidth className="py-4 rounded-2xl font-bold">กลับหน้าแรก</Button>
          </Link>
       </div>
    </motion.div>
  );

  // --- Main Render ---

  if (currentStep === 4) return (
    <div className="max-w-xl mx-auto py-20 px-4">
       <GlassCard className="p-10 border-white/5 overflow-hidden">
          <Success />
       </GlassCard>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4 md:px-10 pb-32">
       
       <Link href={`/pets/${pet.id}`} className="group flex items-center gap-2 mb-10 opacity-60 hover:opacity-100 transition-opacity">
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-bold">ย้อนกลับไปหารายละเอียด</span>
       </Link>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Pet Context Summary */}
          <div className="lg:col-span-4 space-y-6">
             <div className="relative aspect-square w-full rounded-[40px] overflow-hidden shadow-2xl">
                <Image src={pet.image} alt={pet.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white text-left">
                   <h3 className="text-2xl font-black">{pet.name}</h3>
                   <p className="opacity-80 font-medium">{pet.breed}</p>
                </div>
             </div>
             <GlassCard className="p-6 border-white/5 space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-2xl bg-[var(--color-ios-blue)]/20 text-[var(--color-ios-blue)] flex items-center justify-center">
                      <Heart size={20} />
                   </div>
                   <div>
                      <h4 className="font-bold text-sm">พร้อมเป็นสมาชิกใหม่</h4>
                      <p className="text-[10px] opacity-40 uppercase tracking-widest font-black">Application for home</p>
                   </div>
                </div>
                <p className="text-xs opacity-60 leading-relaxed font-medium">
                   "ขอบคุณที่สนใจพาน้องกลับบ้านนะครับ ทุกข้อมูลของคุณมีความสำคัญต่อการตัดสินใจของเรามากครับ"
                </p>
             </GlassCard>
          </div>

          {/* Right: Multi-step Form */}
          <div className="lg:col-span-8">
             <GlassCard variant="elevated" className="p-8 md:p-12 border-none shadow-2xl relative overflow-hidden h-full">
                <ProgressBar />
                
                <div className="min-h-[400px]">
                  <AnimatePresence mode="wait">
                    {currentStep === 1 && <Step1 key="s1" />}
                    {currentStep === 2 && <Step2 key="s2" />}
                    {currentStep === 3 && <Step3 key="s3" />}
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-center mt-12 pt-8 border-t border-[var(--color-border-muted)]">
                   <Button 
                     variant="ghost"
                     disabled={currentStep === 1}
                     onClick={prevStep}
                     className={cn(
                       "gap-2 font-bold px-4",
                       currentStep === 1 && "opacity-0 pointer-events-none"
                     )}
                   >
                      <ChevronLeft size={20} />
                      ก่อนหน้า
                   </Button>

                   {currentStep < 3 ? (
                      <Button 
                        onClick={nextStep}
                        className="px-12 py-4 shadow-xl shadow-[var(--color-ios-blue)]/20"
                      >
                         ถัดไป
                         <ChevronRight size={20} />
                      </Button>
                   ) : (
                      <Button 
                        onClick={submit}
                        disabled={loading}
                        className="bg-[var(--color-ios-green)] hover:opacity-90 px-12 py-4 shadow-xl shadow-[var(--color-ios-green)]/20 transition-all flex gap-2"
                      >
                         {loading ? 'กำลังส่งข้อมูล...' : 'ส่งคำขอรับเลี้ยง'}
                         {!loading && <Send size={18} />}
                      </Button>
                   )}
                </div>
             </GlassCard>
          </div>

       </div>
    </div>
  );
}
