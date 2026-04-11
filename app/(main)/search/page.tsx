import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import SearchView from '@/src/presentation/components/features/search/SearchView';
import { createServerSearchPresenter } from '@/src/presentation/presenters/search/SearchPresenterServerFactory';

// Tell Next.js this is a dynamic page
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

/**
 * Generate metadata for the search page
 */
export async function generateMetadata(): Promise<Metadata> {
  const presenter = createServerSearchPresenter();
  try {
    return presenter.generateMetadata();
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: 'ค้นหาเพื่อนใหม่ | Stray Pet Adoption Kit',
      description: 'ค้นหาน้องหมาน้องแมวที่กำลังรอคุณอยู่',
    };
  }
}

/**
 * Search Page - Server Component
 * Uses presenter pattern following Clean Architecture and CREATE_PAGE_PATTERN.md
 */
export default async function SearchPage() {
  const presenter = createServerSearchPresenter();

  try {
    // Get initial view model from presenter
    const viewModel = await presenter.getViewModel();

    return (
      <main className="min-h-screen bg-transparent">
        <SearchView initialViewModel={viewModel} />
      </main>
    );
  } catch (error) {
    console.error("Error fetching search data:", error);

    // Fallback UI
    return (
      <div className="min-h-screen flex items-center justify-center p-10 text-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-black">เกิดข้อผิดพลาด</h1>
          <p className="opacity-60">ไม่สามารถโหลดข้อมูลการค้นหาได้ในขณะนี้</p>
          <Link href="/">
            <button className="px-6 py-3 rounded-2xl bg-[var(--color-ios-blue)] text-white font-bold">กลับหน้าแรก</button>
          </Link>
        </div>
      </div>
    );
  }
}
