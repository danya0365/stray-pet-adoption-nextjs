import { Metadata } from 'next';
import { Pet } from '@/src/domain/Pet';
import { IPetRepository } from '@/src/application/repositories/IPetRepository';

export interface SearchFilters {
  query: string;
  type: string;
  breed: string;
  gender: string;
  age: string;
  radius: number;
  latitude?: number;
  longitude?: number;
}

export interface SearchViewModel {
  pets: (Pet & { distance?: number })[];
  totalCount: number;
  filters: SearchFilters;
  breeds: string[];
}

export class SearchPresenter {
  constructor(private repository: IPetRepository) {}

  /**
   * Get initial view model for the search page
   */
  async getViewModel(): Promise<SearchViewModel> {
    const defaultFilters: SearchFilters = {
      query: '',
      type: 'All',
      breed: 'All',
      gender: 'All',
      age: 'All',
      radius: 50,
    };
    return this.search(defaultFilters);
  }

  /**
   * Generate metadata for the search page
   */
  generateMetadata(): Metadata {
    return {
      title: 'ค้นหาน้องๆ | Stray Pet Adoption Kit',
      description: 'ค้นหาเพื่อนใหม่ที่ใช่ที่สุดสำหรับคุณ ด้วยระบบค้นหาตามระยะทางและสายพันธุ์ที่แม่นยำ',
    };
  }

  async search(filters: SearchFilters): Promise<SearchViewModel> {
    const result = await this.repository.findAll();
    
    // Check if result is success
    if (result.isFailure()) {
      return {
        pets: [],
        totalCount: 0,
        filters,
        breeds: []
      };
    }

    const allPets = (result as any).value as Pet[];
    
    // 1. Get unique breeds for the filter dropdown
    const breeds = Array.from(new Set(allPets.map((p: Pet) => p.breed))).sort();

    // 2. Perform search logic
    let results = allPets.map((pet: Pet) => {
      let distance: number | undefined;
      // Calculate distance if both points exist (simplified calculation here or use helper)
      if (filters.latitude && filters.longitude && pet.latitude && pet.longitude) {
         distance = this.calculateDistance(filters.latitude, filters.longitude, pet.latitude, pet.longitude);
      }
      return { ...pet, distance };
    });

    // Filtering
    results = results.filter((pet: any) => {
      const matchQuery = !filters.query || 
                        pet.name.toLowerCase().includes(filters.query.toLowerCase()) || 
                        pet.breed.toLowerCase().includes(filters.query.toLowerCase());
      
      const matchType = filters.type === 'All' || pet.type === filters.type;
      
      const matchGender = filters.gender === 'All' || pet.gender === filters.gender;
      
      const matchAge = filters.age === 'All' || pet.age === filters.age;

      const matchRadius = !pet.distance || pet.distance <= filters.radius;

      return matchQuery && matchType && matchGender && matchAge && matchRadius;
    });

    // Sorting (Default: Distance if location set, otherwise Latest)
    if (filters.latitude && filters.longitude) {
       results.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else {
       results.sort((a, b) => b.id.localeCompare(a.id));
    }

    return {
      pets: results,
      totalCount: results.length,
      filters,
      breeds
    };
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }
}
