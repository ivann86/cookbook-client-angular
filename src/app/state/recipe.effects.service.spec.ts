import { TestBed } from '@angular/core/testing';

import { RecipeEffectsService } from './recipe.effects.service';

describe('RecipeEffectsTsService', () => {
  let service: RecipeEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
