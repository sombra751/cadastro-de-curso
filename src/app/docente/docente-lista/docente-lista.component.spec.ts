import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteListaComponent } from './docente-lista.component';

describe('DocenteListaComponent', () => {
  let component: DocenteListaComponent;
  let fixture: ComponentFixture<DocenteListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocenteListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
