import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AdminRoutingModule } from './admin-routing.module';
import { AdminListaComponent } from './admin-lista/admin-lista.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { Shared1Module } from './../shared1/shared1.module';


@NgModule({
  declarations: [
    AdminListaComponent,
    AdminFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    Shared1Module,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
