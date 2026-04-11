/**
 * AdoptionPresenterClientFactory
 */
'use client';

import { AdoptionPresenter } from './AdoptionPresenter';
import { MockAdoptionRepository } from '@/src/infrastructure/repositories/mock/MockAdoptionRepository';

export class AdoptionPresenterClientFactory {
  static create(): AdoptionPresenter {
    const repository = new MockAdoptionRepository();
    return new AdoptionPresenter(repository);
  }
}

export function createClientAdoptionPresenter(): AdoptionPresenter {
  return AdoptionPresenterClientFactory.create();
}
