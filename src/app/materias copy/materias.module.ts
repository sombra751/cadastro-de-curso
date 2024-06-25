import { Shared1Module } from './../shared1/shared1.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MateriasRoutingModule } from './materias-routing.module';
import { MateriasComponent } from './materias/materias.component';
import { MateriasFormComponent } from './materias-form/materias-form.component';
import { MateriasListaComponent } from './materias-lista/materias-lista.component';


@NgModule({
  declarations: [
    MateriasComponent,
    MateriasFormComponent,
    MateriasListaComponent,
  ],
  imports: [
    CommonModule,
    MateriasRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    Shared1Module,

  ]
})
export class MateriasModule { }
