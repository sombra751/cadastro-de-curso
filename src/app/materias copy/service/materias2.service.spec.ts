import { TestBed } from '@angular/core/testing';

import { Materias2Service } from './materias2.service';

describe('Materias2Service', () => {
  let service: Materias2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Materias2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
