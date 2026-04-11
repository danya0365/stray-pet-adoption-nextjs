import { PetDetailView } from "@/src/presentation/components/features/pet-adoption/PetDetailView";
import { createServerPetDetailPresenter } from "@/src/presentation/presenters/pet-detail/PetDetailPresenterServerFactory";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PetDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate metadata for the page
 */
export async function generateMetadata({
  params,
}: PetDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const presenter = createServerPetDetailPresenter();

  try {
    return await presenter.generateMetadata(id);
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "รายละเอียดสัตว์เลี้ยง | Stray Pet Adoption",
    };
  }
}

/**
 * PetDetailPage - Server Component
 * ดึงข้อมูลผ่าน Presenter และส่งต่อให้ View
 */
export default async function PetDetailPage({ params }: PetDetailPageProps) {
  const { id } = await params;
  const presenter = createServerPetDetailPresenter();

  try {
    // ดึง View Model จาก Presenter
    const viewModel = await presenter.getViewModel(id);

    return (
      <PetDetailView id={id} initialViewModel={viewModel} />
    );
  } catch (error) {
    console.error("Error fetching pet data:", error);
    
    // ถ้าไม่พบข้อมูล ให้แสดงหน้า 404
    if ((error as any).code === 'NOT_FOUND' || (error as any).message?.includes('not found')) {
      notFound();
    }

    // Fallback UI สำหรับ Error อื่นๆ
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="glass-thick p-10 rounded-[40px] max-w-md flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-6 font-bold text-4xl">!</div>
          <h1 className="text-3xl font-bold mb-4 tracking-tight">เกิดข้อผิดพลาด</h1>
          <p className="opacity-60 mb-8 leading-relaxed">ไม่สามารถโหลดข้อมูลของน้องสัตว์เลี้ยงได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง</p>
          <Link
            href="/"
            className="w-full py-4 bg-[var(--color-ios-blue)] text-white rounded-2xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg"
          >
            กลับหน้าแรก
          </Link>
        </div>
      </div>
    );
  }
}
