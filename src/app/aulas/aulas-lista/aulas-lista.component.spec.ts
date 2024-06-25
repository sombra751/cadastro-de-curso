import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulasListaComponent } from './aulas-lista.component';

describe('AulasListaComponent', () => {
  let component: AulasListaComponent;
  let fixture: ComponentFixture<AulasListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AulasListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AulasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
