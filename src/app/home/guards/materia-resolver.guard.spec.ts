import { TestBed } from '@angular/core/testing';

import { MateriaResolverGuard } from './materia-resolver.guard';

describe('MateriaResolverGuard', () => {
  let guard: MateriaResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MateriaResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
