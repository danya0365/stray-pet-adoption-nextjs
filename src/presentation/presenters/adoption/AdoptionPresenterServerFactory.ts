/**
 * AdoptionPresenterServerFactory
 */
import { AdoptionPresenter } from './AdoptionPresenter';
import { MockAdoptionRepository } from '@/src/infrastructure/repositories/mock/MockAdoptionRepository';

export class AdoptionPresenterServerFactory {
  static create(): AdoptionPresenter {
    const repository = new MockAdoptionRepository();
    return new AdoptionPresenter(repository);
  }
}

export function createServerAdoptionPresenter(): AdoptionPresenter {
  return AdoptionPresenterServerFactory.create();
}
