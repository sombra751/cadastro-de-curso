import { ModalAtividadeComponent } from './modal-atividade/modal-atividade.component';
import { ModalAlternativaComponent } from './modal-alternativa/modal-alternativa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AulasRoutingModule } from './aulas-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Shared1Module } from '../shared1/shared1.module';
import { AulasFormComponent } from './aulas-form/aulas-form.component';
import { AulasListaComponent } from './aulas-lista/aulas-lista.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AulasFormComponent,
    AulasListaComponent,
    ModalAlternativaComponent,
    ModalAtividadeComponent
  ],
  imports: [
    CommonModule,
    AulasRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    Shared1Module
  ]
})
export class AulasModule { }
