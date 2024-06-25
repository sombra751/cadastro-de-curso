import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { Shared1Module } from '../shared1/shared1.module';


@NgModule({
  declarations: [
    ProfileOverviewComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    Shared1Module
  ]
})
export class UserProfileModule { }
