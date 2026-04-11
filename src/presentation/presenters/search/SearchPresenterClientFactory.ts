/**
 * SearchPresenterClientFactory
 * Factory for creating SearchPresenter instances on the client side
 * ✅ Injects the appropriate repository (Mock for now)
 */

'use client';

import { SearchPresenter } from './SearchPresenter';
import { MockPetRepository } from '@/src/infrastructure/repositories/mock/MockPetRepository';

export class SearchPresenterClientFactory {
  static create(): SearchPresenter {
    // ✅ Use Mock Repository for development
    const repository = new MockPetRepository();

    return new SearchPresenter(repository);
  }
}

export function createClientSearchPresenter(): SearchPresenter {
  return SearchPresenterClientFactory.create();
}
