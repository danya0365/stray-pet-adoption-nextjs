import { Pet, PetType } from '@/src/domain/Pet';
import { Result } from '@/src/domain/Result';
import { AppError } from '@/src/domain/AppError';

/**
 * IPetRepository
 * Interface สำหรับการเข้าถึงข้อมูลสัตว์เลี้ยง
 * ตามหลัก Clean Architecture - อยู่ในชั้น Application Layer
 */
export interface IPetRepository {
  /**
   * ดึงรายการสัตว์เลี้ยงทั้งหมด
   */
  findAll(): Promise<Result<Pet[], AppError>>;

  /**
   * ค้นหาสัตว์เลี้ยงด้วย ID
   */
  findById(id: string): Promise<Result<Pet, AppError>>;

  /**
   * ค้นหาสัตว์เลี้ยงตามประเภท (Dog, Cat)
   */
  findByType(type: PetType): Promise<Result<Pet[], AppError>>;
}
