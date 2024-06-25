import { TestBed } from '@angular/core/testing';

import { MateriaIdService } from './materia-id.service';

describe('MateriaIdService', () => {
  let service: MateriaIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MateriaIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
