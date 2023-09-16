import { TestBed } from '@angular/core/testing';

import { Alunos2Service } from './alunos2.service';

describe('Alunos2Service', () => {
  let service: Alunos2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Alunos2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
