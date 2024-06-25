import { TestBed } from '@angular/core/testing';

import { Docente2Service } from './docente2.service';

describe('Docente2Service', () => {
  let service: Docente2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Docente2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
