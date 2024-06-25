import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulasFormComponent } from './aulas-form.component';

describe('AulasFormComponent', () => {
  let component: AulasFormComponent;
  let fixture: ComponentFixture<AulasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AulasFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AulasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
