import { IAdoptionRepository, AdoptionRequest, CreateAdoptionRequestData } from '@/src/application/repositories/IAdoptionRepository';
import { Result, success } from '@/src/domain/Result';
import { AppError } from '@/src/domain/AppError';

/**
 * MockAdoptionRepository
 * เก็บข้อมูลการสมัครรับเลี้ยงจำลอง
 */
export class MockAdoptionRepository implements IAdoptionRepository {
  private requests: AdoptionRequest[] = [];

  async create(data: CreateAdoptionRequestData): Promise<Result<AdoptionRequest, AppError>> {
    await this.delay(800);
    
    const newRequest: AdoptionRequest = {
      id: `req-${Date.now()}`,
      ...data,
      status: 'Pending',
      createdAt: new Date(),
    };

    this.requests.unshift(newRequest);
    console.log('✅ New Adoption Request submitted:', newRequest);
    return success(newRequest);
  }

  async getByPetId(petId: string): Promise<Result<AdoptionRequest[], AppError>> {
    await this.delay(300);
    return success(this.requests.filter(r => r.petId === petId));
  }

  async getAll(): Promise<Result<AdoptionRequest[], AppError>> {
    await this.delay(300);
    return success([...this.requests]);
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const mockAdoptionRepository = new MockAdoptionRepository();
