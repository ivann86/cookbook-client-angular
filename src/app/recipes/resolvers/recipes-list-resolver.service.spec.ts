import { TestBed } from '@angular/core/testing';

import { RecipesListResolverService } from './recipes-list-resolver.service';

describe('RecipesListResolverService', () => {
  let service: RecipesListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
