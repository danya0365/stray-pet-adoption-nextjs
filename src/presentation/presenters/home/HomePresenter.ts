import { IPetRepository } from '@/src/application/repositories/IPetRepository';
import { Pet } from '@/src/domain/Pet';

export interface HomeViewModel {
  pets: Pet[];
  metrics: {
    label: string;
    value: string;
    unit: string;
  }[];
}

/**
 * HomePresenter
 * จัดการตรรกะสำหรับหน้า Home
 */
export class HomePresenter {
  constructor(private readonly repository: IPetRepository) {}

  async getViewModel(): Promise<HomeViewModel> {
    const petsResult = await this.repository.findAll();
    
    if (petsResult.isFailure()) {
      throw petsResult.error;
    }

    return {
      pets: petsResult.value,
      metrics: [
        { label: "หาบ้านได้แล้ว", value: "1,240", unit: "ตัว" },
        { label: "กำลังรอเจ้าของ", value: "84", unit: "ตัว" },
        { label: "อาสาสมัคร", value: "156", unit: "คน" },
        { label: "ความสำเร็จ", value: "98", unit: "%" },
      ]
    };
  }
}

import { mockPetRepository } from '@/src/infrastructure/repositories/mock/MockPetRepository';

export function createServerHomePresenter(): HomePresenter {
  return new HomePresenter(mockPetRepository);
}
