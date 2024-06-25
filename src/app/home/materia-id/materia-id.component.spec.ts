import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaIdComponent } from './materia-id.component';

describe('MateriaIdComponent', () => {
  let component: MateriaIdComponent;
  let fixture: ComponentFixture<MateriaIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MateriaIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriaIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
