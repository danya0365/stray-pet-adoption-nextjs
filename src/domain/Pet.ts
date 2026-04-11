import { Result } from './Result';
import { AppError } from './AppError';

export type PetType = 'Dog' | 'Cat';

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  image: string;
  description?: string;
  age?: number;
  gender?: 'Male' | 'Female';
  status: 'Available' | 'Adopted' | 'Pending';
  createdAt: Date;
}

export interface PetRepository {
  findAll(): Promise<Result<Pet[], AppError>>;
  findById(id: string): Promise<Result<Pet, AppError>>;
  findByType(type: PetType): Promise<Result<Pet[], AppError>>;
}
