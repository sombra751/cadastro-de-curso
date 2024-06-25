import { Injectable } from '@angular/core';
import { crudService } from 'src/app/shared/crud-service';
import { Aulas } from '../aula';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Aulas2Service  extends crudService<Aulas>{

  constructor(protected override  http: HttpClient) {
    super(http, `${environment.API}aulas`);
   }
}
