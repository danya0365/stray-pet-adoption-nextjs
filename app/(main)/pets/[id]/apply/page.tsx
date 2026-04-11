import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AdoptionRequestView from '@/src/presentation/components/features/adoption/AdoptionRequestView';
import { createServerAdoptionPresenter } from '@/src/presentation/presenters/adoption/AdoptionPresenterServerFactory';
import { MockPetRepository } from '@/src/infrastructure/repositories/mock/MockPetRepository';
import { Pet } from '@/src/domain/Pet';

interface AdoptionPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate Metadata for Adoption Page
 */
export async function generateMetadata({ params }: AdoptionPageProps): Promise<Metadata> {
  const { id } = await params;
  const petRepo = new MockPetRepository();
  const petResult = await petRepo.findById(id);
  
  if (petResult.isFailure()) return { title: 'สมัครรับเลี้ยง' };
  
  const presenter = createServerAdoptionPresenter();
  return presenter.generateMetadata((petResult as any).value.name);
}

/**
 * Adoption Application Page
 */
export default async function AdoptionPage({ params }: AdoptionPageProps) {
  const { id } = await params;
  const petRepo = new MockPetRepository();
  const petResult = await petRepo.findById(id);

  if (petResult.isFailure()) {
    return notFound();
  }

  const pet = (petResult as any).value as Pet;

  return (
    <main className="min-h-screen">
      <AdoptionRequestView pet={pet} />
    </main>
  );
}
