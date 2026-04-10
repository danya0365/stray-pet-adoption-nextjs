'use client';

import { Badge } from '@/src/presentation/components/ui/Badge';
import { Button } from '@/src/presentation/components/ui/Button';
import { GlassCard } from '@/src/presentation/components/ui/GlassCard';
import { Input } from '@/src/presentation/components/ui/Input';
import { ListRow } from '@/src/presentation/components/ui/ListRow';
import { MetricCard } from '@/src/presentation/components/ui/MetricCard';
import { Progress } from '@/src/presentation/components/ui/Progress';
import { SegmentedControl } from '@/src/presentation/components/ui/SegmentedControl';
import { Slider } from '@/src/presentation/components/ui/Slider';
import { Stepper } from '@/src/presentation/components/ui/Stepper';
import { Switch } from '@/src/presentation/components/ui/Switch';
import { Toast } from '@/src/presentation/components/ui/Toast';
import { Brain, Search, Shield, Zap } from 'lucide-react';
import { useState } from 'react';

export default function DesignSystemPage() {
  const [switch1, setSwitch1] = useState(true);
  const [segment, setSegment] = useState('Overview');
  const [sliderVal, setSliderVal] = useState(72);
  const [stepVal, setStepVal] = useState(3);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="w-full px-4 md:px-10 py-10 pb-32 flex flex-col gap-12 animate-float-in">
      
      <header className="flex flex-col gap-2">
        <div className="section-label text-[var(--color-ios-blue)] mb-0">Design System</div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Liquid Glass UI Kit</h1>
        <p className="opacity-60 max-w-2xl text-lg">
          A comprehensive collection of high-fidelity, iOS 26 inspired components for building premium glassmorphic interfaces.
        </p>
      </header>

      {/* 1. Foundations: Glass & Effects */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold px-2">Foundations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-8 flex flex-col gap-4" variant="default">
            <span className="section-label mb-0">Glass Default</span>
            <p className="text-sm opacity-60">Blur: 24px, Saturation: 1.8. Used for basic containers and cards.</p>
          </GlassCard>
          <GlassCard className="p-8 flex flex-col gap-4" variant="elevated">
            <span className="section-label mb-0">Glass Elevated</span>
            <p className="text-sm opacity-60">Blur: 40px, Saturation: 2.0. Used for featured items and modals.</p>
          </GlassCard>
          <GlassCard className="p-8 flex flex-col gap-4" variant="thick">
            <span className="section-label mb-0">Glass Thick</span>
            <p className="text-sm opacity-60">Blur: 60px, Saturation: 2.2. Used for sidebars and top bars.</p>
          </GlassCard>
        </div>
      </section>

      {/* 2. Interaction: Buttons & Controls */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold px-2">Interactions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Buttons */}
          <GlassCard className="p-8 flex flex-col gap-6">
            <div className="section-label">Buttons</div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary Action</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="red">Destructive</Button>
            </div>
            <Button variant="primary" fullWidth>Full Width Button</Button>
          </GlassCard>

          {/* Form Controls */}
          <GlassCard className="p-8 flex flex-col gap-8">
            <div className="section-label">Form Controls</div>
            <Switch label="Neural Processing" checked={switch1} onChange={setSwitch1} />
            <SegmentedControl 
              options={['Overview', 'Analysis', 'Debug']} 
              value={segment} 
              onChange={setSegment} 
            />
            <Slider label="Intensity Level" value={sliderVal} onChange={setSliderVal} />
            <Stepper label="Priority Level" value={stepVal} onChange={setStepVal} />
          </GlassCard>
        </div>
      </section>

      {/* 3. Data & Status */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold px-2">Data & Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard label="Throughput" value="84.2" unit="TK/s" delay="0.1s" />
          <MetricCard label="Latency" value="12" unit="ms" delay="0.15s" />
          <MetricCard label="Accuracy" value="99.9" unit="%" delay="0.2s" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-8 flex flex-col gap-6">
             <div className="section-label">Status Chips</div>
             <div className="flex flex-wrap gap-2">
               <Badge label="Active" type="green" />
               <Badge label="Syncing" type="blue" />
               <Badge label="Warning" type="orange" />
               <Badge label="Critical" type="red" />
             </div>
          </GlassCard>
          <GlassCard className="p-8 flex flex-col gap-6">
             <div className="section-label">Progress Rings</div>
             <div className="flex justify-around items-center">
               <Progress variant="ring" value={92} label="CPU" color="var(--color-ios-blue)" size={70} />
               <Progress variant="ring" value={68} label="MEM" color="var(--color-ios-indigo)" size={70} />
               <Progress variant="ring" value={41} label="DISK" color="var(--color-ios-teal)" size={70} />
             </div>
          </GlassCard>
        </div>
      </section>

      {/* 4. Lists & Feedback */}
      <section className="flex flex-col gap-6">
        <h2 className="text-2xl font-bold px-2">Navigation & Feedback</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <div className="section-label px-2">Inputs</div>
            <Input 
              label="Search Matrix" 
              placeholder="Search data..." 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onClear={() => setInputValue('')}
              icon={<Search size={18} />}
            />
            <Input 
              label="Secure Key" 
              type="password"
              placeholder="••••••••" 
              error="Invalid security credentials"
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="section-label px-2">Lists</div>
            <GlassCard className="p-0 overflow-hidden">
               <ListRow icon={<Brain size={20} className="text-blue-500" />} title="Neural Core" subtitle="ACTIVE" detail="8.4B Params" onClick={() => {}} />
               <ListRow icon={<Zap size={20} className="text-orange-500" />} title="Accelerator" subtitle="IDLE" detail="90 TOPS" onClick={() => {}} />
               <ListRow icon={<Shield size={20} className="text-green-500" />} title="Secure Enclave" subtitle="LOCKED" detail="v2.4" onClick={() => {}} last />
            </GlassCard>
          </div>
        </div>

        <div className="flex flex-col gap-6 mt-6">
           <div className="section-label px-2">Toasts & Notifications</div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <Toast title="Intelligence Matrix Online" message="All 2.4B parameters have been successfully loaded into the neural core." type="success" onClose={() => {}} />
             <Toast title="Sync Error Occurred" message="Connection to the secure enclave was interrupted during handshake." type="error" onClose={() => {}} />
           </div>
        </div>
      </section>

    </div>
  );
}
