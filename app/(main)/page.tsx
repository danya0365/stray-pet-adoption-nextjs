import { createServerHomePresenter } from '@/src/presentation/presenters/home/HomePresenter';
import HomeView from './HomeView';

/**
 * HomePage - Server Component
 * ดึงข้อมูลผ่าน Presenter และส่งต่อให้ Client View
 */
export default async function HomePage() {
  const presenter = createServerHomePresenter();
  const viewModel = await presenter.getViewModel();

  return <HomeView initialViewModel={viewModel} />;
}
