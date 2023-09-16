import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibSearchComponent } from './LibSearchComponent';

describe('LibSearchComponent', () => {
  let component: LibSearchComponent;
  let fixture: ComponentFixture<LibSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LibSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
