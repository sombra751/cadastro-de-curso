import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { crudService } from 'src/app/shared/crud-service';
import { Admin } from '../admin';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Admin2Service extends crudService<Admin>{

  constructor(protected override  http: HttpClient) {
    super(http, `${environment.API}usuarios-admin`);
   }
}
