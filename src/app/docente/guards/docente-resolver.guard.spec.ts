import { TestBed } from '@angular/core/testing';

import { DocenteResolverGuard } from './docente-resolver.guard';

describe('DocenteResolverGuard', () => {
  let guard: DocenteResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DocenteResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
