import { IPetRepository } from '@/src/application/repositories/IPetRepository';
import { Pet } from '@/src/domain/Pet';
import { Metadata } from 'next';

export interface PetDetailViewModel {
  pet: Pet;
  metrics: {
    label: string;
    value: string | number;
    unit: string;
    delay?: string;
  }[];
}

/**
 * PetDetailPresenter
 * จัดการตรรกะทางธุรกิจสำหรับหน้ารายละเอียดสัตว์เลี้ยง
 */
export class PetDetailPresenter {
  constructor(private readonly repository: IPetRepository) {}

  /**
   * ดึง View Model สำหรับหน้ารายละเอียด
   */
  async getViewModel(id: string): Promise<PetDetailViewModel> {
    const result = await this.repository.findById(id);
    
    if (result.isFailure()) {
      throw result.error;
    }

    const pet = result.value;

    return {
      pet,
      metrics: [
        { label: "อายุ", value: pet.age || '?', unit: "ปี", delay: "0.4s" },
        { label: "เพศ", value: pet.gender === 'Male' ? 'ผู้' : 'เมีย', unit: pet.gender === 'Male' ? 'Boy' : 'Girl', delay: "0.5s" },
        { label: "สถานะ", value: pet.status === 'Available' ? 'ว่าง' : 'จอง', unit: "Ready", delay: "0.6s" },
      ]
    };
  }

  /**
   * สร้าง Metadata สำหรับหน้านี้ (SEO)
   */
  async generateMetadata(id: string): Promise<Metadata> {
    try {
      const result = await this.repository.findById(id);
      if (result.isFailure()) throw result.error;
      
      const pet = result.value;
      return {
        title: `${pet.name} (${pet.breed}) | Stray Pet Adoption`,
        description: pet.description || `มาทำความรู้จักกับน้อง ${pet.name} สัตว์เลี้ยงที่กำลังรอเจ้าของใหม่ใจดีมารับไปดูแล`,
        openGraph: {
          images: [pet.image]
        }
      };
    } catch (error) {
      return {
        title: 'รายละเอียดสัตว์เลี้ยง | Stray Pet Adoption',
      };
    }
  }
}
