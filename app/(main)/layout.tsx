'use client';

import React from 'react';
import { MainLayout } from '@/src/presentation/components/layout/MainLayout';

export default function MainGroupLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
