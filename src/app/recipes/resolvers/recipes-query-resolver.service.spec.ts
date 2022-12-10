import { TestBed } from '@angular/core/testing';

import { RecipesQueryResolverService } from './recipes-query-resolver.service';

describe('RecipesListResolverService', () => {
  let service: RecipesQueryResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipesQueryResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
