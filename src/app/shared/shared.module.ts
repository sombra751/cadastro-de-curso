import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarrosselComponent } from './carrossel/carrossel.component';
import { InputComponentComponent } from './input-component/input-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CardComponent } from './card/card.component'; // Importe o FormsModule
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  imports: [
    CommonModule,
    ModalModule,
    MatButtonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    MatSlideToggleModule

    
  ],
  declarations: [
    AlertModalComponent,
    ModalConfirmComponent,
    CarrosselComponent,
    InputComponentComponent,
    CardComponent,
  ],
  exports: [
    AlertModalComponent,
    CarrosselComponent, 
    CardComponent,
    MatSlideToggleModule

  ]
})
export class SharedModule { }
