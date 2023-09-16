import { Injectable } from '@angular/core';
import { crudService } from 'src/app/shared/crud-service';
import { Materia } from '../materias';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Materias2Service extends crudService<Materia>{

  constructor(protected override  http: HttpClient) {
    super(http, `${environment.API}materias`);
   }

}
