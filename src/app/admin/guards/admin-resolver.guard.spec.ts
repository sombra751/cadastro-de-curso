import { TestBed } from '@angular/core/testing';

import { AdminResolverGuard } from './admin-resolver.guard';

describe('AdminResolverGuard', () => {
  let guard: AdminResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
