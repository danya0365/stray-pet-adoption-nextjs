'use client';

import React from 'react';
import { GlassCard } from '@/src/presentation/components/ui/GlassCard';
import { MetricCard } from '@/src/presentation/components/ui/MetricCard';
import { Badge } from '@/src/presentation/components/ui/Badge';
import { Button } from '@/src/presentation/components/ui/Button';
import { ClipboardList, Users, PawPrint, Activity } from 'lucide-react';

// --- Sub-Components ---

const TableRow = ({ request_id, pet_name, applicant, date, status }: any) => {
  const statusColorMap: any = {
    'Pending': 'orange',
    'Approved': 'green',
    'Rejected': 'red'
  };

  return (
    <tr className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
      <td className="py-4 px-4 font-mono text-xs opacity-50">{request_id}</td>
      <td className="py-4 px-4 font-bold">{pet_name}</td>
      <td className="py-4 px-4">{applicant}</td>
      <td className="py-4 px-4 text-sm opacity-60">{date}</td>
      <td className="py-4 px-4">
        <Badge label={status} type={statusColorMap[status]} />
      </td>
      <td className="py-4 px-4 text-right">
        <Button variant="secondary" className="py-1.5 px-3 text-xs">
          View Details
        </Button>
      </td>
    </tr>
  );
};

export default function AdminDashboardPage() {
  const requests = [
    { id: '#REQ-1092', pet: 'โบว์ลิ่ง', applicant: 'Somchai Jaidee', date: '2026-04-10', status: 'Pending' },
    { id: '#REQ-1091', pet: 'สโนว์', applicant: 'Mary Watson', date: '2026-04-09', status: 'Approved' },
    { id: '#REQ-1090', pet: 'คุกกี้', applicant: 'Jean-Pierre', date: '2026-04-09', status: 'Rejected' },
    { id: '#REQ-1089', pet: 'ม็อคค่า', applicant: 'Alice Johnson', date: '2026-04-08', status: 'Pending' },
  ];

  return (
    <div className="flex flex-col gap-8 animate-float-in">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          label="New Requests" 
          value="12" 
          unit="NEW" 
          delay="0.1s" 
          className="border-l-4 border-[var(--color-ios-orange)]"
        />
         <MetricCard 
          label="Total Pets" 
          value="84" 
          unit="PETS" 
          delay="0.15s" 
        />
         <MetricCard 
          label="Volunteers" 
          value="156" 
          unit="STAFF" 
          delay="0.2s" 
        />
         <MetricCard 
          label="System Health" 
          value="99.9" 
          unit="%" 
          delay="0.25s" 
          className="border-l-4 border-[var(--color-ios-green)]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Requests Table */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex justify-between items-end px-2">
             <h2 className="text-xl font-bold">Recent Adoption Requests</h2>
             <Button variant="secondary" className="py-2 px-4 text-sm">Download Report</Button>
          </div>
          
          <GlassCard className="overflow-hidden p-0" variant="elevated">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider opacity-60">ID</th>
                    <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider opacity-60">Pet Name</th>
                    <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider opacity-60">Applicant</th>
                    <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider opacity-60">Date</th>
                    <th className="py-4 px-4 text-xs font-bold uppercase tracking-wider opacity-60">Status</th>
                    <th className="py-4 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req, i) => (
                    <TableRow key={i} request_id={req.id} pet_name={req.pet} applicant={req.applicant} date={req.date} status={req.status} />
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>

        {/* Side Panel: System Activity */}
        <div className="flex flex-col gap-4">
           <h2 className="text-xl font-bold px-2">System Activity</h2>
           <GlassCard className="p-6 flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-ios-blue)]/20 flex items-center justify-center text-[var(--color-ios-blue)]">
                  <Activity size={20} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-sm">Real-time Sync</span>
                  <span className="text-xs opacity-50 underline decoration-[var(--color-ios-blue)] decoration-1 underline-offset-4">Active Connection established.</span>
                </div>
              </div>
              
              <div className="space-y-4">
                 {[
                   { label: 'DB Uptime', value: '14 Days' },
                   { label: 'Storage Usability', value: '42%' },
                   { label: 'API Latency', value: '24ms' }
                 ].map((stat, i) => (
                   <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0 grow">
                     <span className="text-sm opacity-60">{stat.label}</span>
                     <span className="text-sm font-bold font-mono">{stat.value}</span>
                   </div>
                 ))}
              </div>
              
              <Button fullWidth className="mt-2 py-3">Open Logs</Button>
           </GlassCard>
        </div>
      </div>
    </div>
  );
}
