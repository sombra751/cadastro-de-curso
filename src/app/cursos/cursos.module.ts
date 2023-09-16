import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { CursosRoutingModule } from './cursos-routing.module';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursosFormComponent } from './cursos-form/cursos-form.component';
import { CursosComponent } from './cursos/cursos.component';
import { Shared1Module } from '../shared1/shared1.module';
// import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CursosListaComponent, CursosFormComponent, CursosComponent],
  imports: [
    CommonModule,
    CursosRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    Shared1Module,
  ],
})
export class CursosModule { }
