import { Result } from '@/src/domain/Result';
import { AppError } from '@/src/domain/AppError';

export type AdoptionStatus = 'Pending' | 'Approved' | 'Rejected';

export interface AdoptionRequest {
  id: string;
  petId: string;
  petName: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  applicantOccupation: string;
  homeType: string;
  hasOtherPets: boolean;
  reason: string;
  status: AdoptionStatus;
  createdAt: Date;
}

export interface CreateAdoptionRequestData {
  petId: string;
  petName: string;
  applicantName: string;
  applicantPhone: string;
  applicantEmail: string;
  applicantOccupation: string;
  homeType: string;
  hasOtherPets: boolean;
  reason: string;
}

export interface IAdoptionRepository {
  create(data: CreateAdoptionRequestData): Promise<Result<AdoptionRequest, AppError>>;
  getByPetId(petId: string): Promise<Result<AdoptionRequest[], AppError>>;
  getAll(): Promise<Result<AdoptionRequest[], AppError>>;
}
