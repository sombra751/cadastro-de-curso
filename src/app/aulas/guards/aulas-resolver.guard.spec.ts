import { TestBed } from '@angular/core/testing';

import { AulasResolverGuard } from './aulas-resolver.guard';

describe('AulasResolverGuard', () => {
  let guard: AulasResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AulasResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
