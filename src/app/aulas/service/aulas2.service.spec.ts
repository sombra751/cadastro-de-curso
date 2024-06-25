import { TestBed } from '@angular/core/testing';

import { Aulas2Service } from './aulas2.service';

describe('Aulas2Service', () => {
  let service: Aulas2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Aulas2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
