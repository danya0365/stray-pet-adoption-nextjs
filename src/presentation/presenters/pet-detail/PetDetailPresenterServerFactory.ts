import { PetDetailPresenter } from './PetDetailPresenter';
import { mockPetRepository } from '@/src/infrastructure/repositories/mock/MockPetRepository';

/**
 * PetDetailPresenterServerFactory
 * สร้างอินสแตนซ์ของ Presenter สำหรับ Server Components
 */
export class PetDetailPresenterServerFactory {
  static create(): PetDetailPresenter {
    const repository = mockPetRepository;
    return new PetDetailPresenter(repository);
  }
}

export function createServerPetDetailPresenter(): PetDetailPresenter {
  return PetDetailPresenterServerFactory.create();
}
