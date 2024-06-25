import { TestBed } from '@angular/core/testing';

import { Admin2Service } from './admin2.service';

describe('Admin2Service', () => {
  let service: Admin2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Admin2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
