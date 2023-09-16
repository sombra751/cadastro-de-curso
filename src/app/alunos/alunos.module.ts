// import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AlunosRoutingModule } from './alunos-routing.module';
import { AlunosComponent } from './alunos/alunos.component';
import { AlunosListaComponent } from './alunos-lista/alunos-lista.component';
import { AlunosFormComponent } from './alunos-form/alunos-form.component';
import { Shared1Module } from '../shared1/shared1.module';



@NgModule({
  declarations: [
    AlunosComponent,
    AlunosListaComponent,
    AlunosFormComponent,
  ],
  imports: [
    CommonModule,
    AlunosRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    Shared1Module,
   
    
  ]
})
export class AlunosModule { }
