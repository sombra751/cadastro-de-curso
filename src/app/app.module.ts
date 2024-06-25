import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnsubscribeRxjsModule } from './unsubscribe-rxjs/unsubscribe-rxjs.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './componentes/header/header.component';
import { RegisterComponent } from './register/register.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './componentes/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Shared1Module } from './shared1/shared1.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    SidebarComponent,
    BodyComponent,
    LoginComponent,
    FooterComponent,
    DashboardComponent,
  
  ],
  imports: [
    Shared1Module,
    BrowserModule,
    AppRoutingModule,
    UnsubscribeRxjsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    SharedModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
