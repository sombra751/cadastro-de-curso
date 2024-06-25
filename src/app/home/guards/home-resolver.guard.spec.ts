import { TestBed } from '@angular/core/testing';

import { HomeResolverGuard } from './home-resolver.guard';

describe('HomeResolverGuard', () => {
  let guard: HomeResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HomeResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
