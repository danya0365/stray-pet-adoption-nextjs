import { IPetRepository } from '@/src/application/repositories/IPetRepository';
import { Pet } from '@/src/domain/Pet';

export interface MapViewModel {
  pets: Pet[];
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
}

/**
 * MapPresenter
 * จัดการตรรกะสำหรับการแสดงผลแผนที่
 */
export class MapPresenter {
  constructor(private readonly repository: IPetRepository) {}

  async getViewModel(): Promise<MapViewModel> {
    const result = await this.repository.findAll();
    
    if (result.isFailure()) {
      throw result.error;
    }

    // กรองเฉพาะสัตว์ที่มีพิกัด (ใน Mock เราใส่ไว้ครบแล้ว)
    const petsWithLocation = result.value.filter(pet => pet.latitude && pet.longitude);

    return {
      pets: petsWithLocation,
      center: {
        lat: 13.736717, // เริ่มต้นที่ใจกลางกรุงเทพฯ (สยาม)
        lng: 100.523186,
      },
      zoom: 12,
    };
  }
}

import { mockPetRepository } from '@/src/infrastructure/repositories/mock/MockPetRepository';

export function createServerMapPresenter(): MapPresenter {
  return new MapPresenter(mockPetRepository);
}
