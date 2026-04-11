import { IPetRepository } from '@/src/application/repositories/IPetRepository';
import { Pet, PetType } from '@/src/domain/Pet';
import { Result, success, failure } from '@/src/domain/Result';
import { AppError, ErrorCode } from '@/src/domain/AppError';

/**
 * MockPetRepository
 * การจำลองข้อมูลสัตว์เลี้ยงเพื่อใช้ในการพัฒนา
 * ตามหลัก Clean Architecture - อยู่ในชั้น Infrastructure Layer
 */
export class MockPetRepository implements IPetRepository {
  private pets: Pet[] = [
    {
      id: 'pet-1',
      name: "โบว์ลิ่ง",
      type: "Dog",
      breed: "Golden Retriever",
      image: "/images/dog1.png",
      description: "น้องโบว์ลิ่งเป็นสุนัขใจดี ร่าเริง เข้ากับคนง่ายมาก เหมาะสำหรับครอบครัวที่มีเด็กๆ น้องได้รับวัคซีนครบถ้วนแล้วและกำลังรอคนใจดีมารับไปดูแลครับ",
      age: 2,
      gender: "Male",
      status: "Available",
      createdAt: new Date('2024-03-20')
    },
    {
      id: 'pet-2',
      name: "สโนว์",
      type: "Cat",
      breed: "Angora",
      image: "/images/cat1.png",
      description: "น้องสโนว์ แมวพันธุ์แองโกร่าสีขาวสำลี นิสัยเรียบร้อย ชอบอ้อน รักความสงบ น้องทำหมันเรียบร้อยแล้วครับ",
      age: 1,
      gender: "Female",
      status: "Available",
      createdAt: new Date('2024-03-21')
    },
    {
      id: 'pet-3',
      name: "คุกกี้",
      type: "Dog",
      breed: "Beagle",
      image: "/images/dog2.png",
      description: "น้องคุกกี้ บีเกิลจอมซน พลังล้นเหลือ กระโดดเก่ง ชอบวิ่งเล่นในสนามหญ้า อยากได้เจ้าของที่พาไปออกกำลังกายได้บ่อยๆ ครับ",
      age: 3,
      gender: "Male",
      status: "Available",
      createdAt: new Date('2024-03-18')
    },
    {
      id: 'pet-4',
      name: "ม็อคค่า",
      type: "Dog",
      breed: "Poodle Mix",
      image: "/images/dog1.png",
      description: "น้องม็อคค่า พุดเดิ้ลผสมที่น่ารักที่สุดในโลก ฉลาด แสนรู้ ฝึกง่ายมากครับ",
      age: 1,
      gender: "Female",
      status: "Available",
      createdAt: new Date('2024-03-22')
    },
    {
      id: 'pet-5',
      name: "ลูน่า",
      type: "Cat",
      breed: "Siamese",
      image: "/images/cat1.png",
      description: "น้องลูน่า แมววิเชียรมาศนิสัยนิ่งๆ แต่แฝงไปด้วยความอ่อนโยน น้องชอบมานอนขดบนตักเวลาเราทำงานครับ",
      age: 4,
      gender: "Female",
      status: "Available",
      createdAt: new Date('2024-03-23')
    }
  ];

  async findAll(): Promise<Result<Pet[], AppError>> {
    await this.delay(300); // จำลอง network delay
    return success(this.pets);
  }

  async findById(id: string): Promise<Result<Pet, AppError>> {
    await this.delay(300);
    const pet = this.pets.find(p => p.id === id);
    if (!pet) {
      return failure(new AppError(ErrorCode.NOT_FOUND, 'ไม่พบรหัสน้องสัตว์เลี้ยงตัวนี้'));
    }
    return success(pet);
  }

  async findByType(type: PetType): Promise<Result<Pet[], AppError>> {
    await this.delay(300);
    return success(this.pets.filter(p => p.type === type));
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export const mockPetRepository = new MockPetRepository();
