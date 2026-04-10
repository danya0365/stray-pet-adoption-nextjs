'use client';

import React from 'react';
import { FullScreenLayout } from '@/src/presentation/components/layout/FullScreenLayout';

export default function FullScreenGroupLayout({ children }: { children: React.ReactNode }) {
  return <FullScreenLayout>{children}</FullScreenLayout>;
}
