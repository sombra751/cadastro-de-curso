import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';


import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { Shared1Module } from '../shared1/shared1.module';
import { FormsModule } from '@angular/forms';
import { QuestionarioComponent } from './questionario/questionario.component';
import { CursoIdComponent } from './curso-id/curso-id.component';
import { MateriaIdComponent } from './materia-id/materia-id.component';


@NgModule({
  declarations: [
    HomeComponent,
    QuestionarioComponent,
    CursoIdComponent,
    MateriaIdComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    Shared1Module,
    FormsModule,
    
  ]
})
export class HomeModule { }
