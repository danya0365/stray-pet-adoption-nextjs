import { IAdoptionRepository, CreateAdoptionRequestData, AdoptionRequest } from '@/src/application/repositories/IAdoptionRepository';
import { Result } from '@/src/domain/Result';
import { AppError } from '@/src/domain/AppError';
import { Pet } from '@/src/domain/Pet';
import { Metadata } from 'next';

export interface AdoptionViewModel {
  pet: Pet;
  initialData?: Partial<CreateAdoptionRequestData>;
}

export class AdoptionPresenter {
  constructor(private repository: IAdoptionRepository) {}

  async submitRequest(data: CreateAdoptionRequestData): Promise<Result<AdoptionRequest, AppError>> {
    return await this.repository.create(data);
  }

  generateMetadata(petName: string): Metadata {
    return {
      title: `สมัครรับเลี้ยง ${petName} | Stray Pet Adoption`,
      description: `ขั้นตอนการส่งคำขอรับเลี้ยงน้อง ${petName} เพื่อมอบบ้านหลังใหม่ที่อบอุ่นที่สุด`,
    };
  }
}
