import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoIdComponent } from './curso-id.component';

describe('CursoIdComponent', () => {
  let component: CursoIdComponent;
  let fixture: ComponentFixture<CursoIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
