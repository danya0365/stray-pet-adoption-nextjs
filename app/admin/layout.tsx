'use client';

import React from 'react';
import { AdminLayout } from '@/src/presentation/components/layout/AdminLayout';

export default function AdminGroupLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}
