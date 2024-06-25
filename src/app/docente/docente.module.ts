import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DocenteRoutingModule } from './docente-routing.module';
import { DocenteListaComponent } from './docente-lista/docente-lista.component';
import { DocenteFormComponent } from './docente-form/docente-form.component';
import { Shared1Module } from './../shared1/shared1.module';

@NgModule({
  declarations: [
    DocenteListaComponent,
    DocenteFormComponent
  ],
  imports: [
    CommonModule,
    DocenteRoutingModule,
    Shared1Module,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class DocenteModule { }
