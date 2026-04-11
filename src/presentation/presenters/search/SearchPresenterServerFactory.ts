/**
 * SearchPresenterServerFactory
 * Factory for creating SearchPresenter instances on the server side
 * ✅ Injects the appropriate repository (Mock for now)
 */

import { SearchPresenter } from './SearchPresenter';
import { MockPetRepository } from '@/src/infrastructure/repositories/mock/MockPetRepository';

export class SearchPresenterServerFactory {
  static create(): SearchPresenter {
    // ✅ Use Mock Repository for development
    const repository = new MockPetRepository();
    
    // ⏳ TODO: Switch to Supabase Repository when backend is ready
    // const repository = new SupabasePetRepository();

    return new SearchPresenter(repository);
  }
}

export function createServerSearchPresenter(): SearchPresenter {
  return SearchPresenterServerFactory.create();
}
